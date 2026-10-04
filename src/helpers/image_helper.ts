function removeAllQueryParams(url: string): string {
  if (!url) return url;
  return url.split("?")[0];
}

// Master switch between the new image-transform service and the legacy CDN
// behaviour. Set VITE_USE_IMAGE_TRANSFORM="false" to roll back to the old
// path (Azure CDN + ?width= for getImageUrl). Defaults to the new service.
const USE_IMAGE_TRANSFORM =
  (import.meta.env.VITE_USE_IMAGE_TRANSFORM ?? "true").toLowerCase() !== "false";

// image-transform service base (override per-env via VITE_IMAGE_TRANSFORM_BASE).
const IMAGE_TRANSFORM_BASE = (
  import.meta.env.VITE_IMAGE_TRANSFORM_BASE ||
  "https://image-transform.materialdepot.com"
).replace(/\/+$/, "");

// Source host -> image-transform bucket prefix (first match wins). Covers both
// the raw source domains and the endpoints getImageUrl normalises into.
//   main / azure -> R2 `materialdepotimages`        (watermarked, WebP)
//   content      -> R2 `material-depot-content-files` (no watermark, no WebP)
const BUCKET_BY_DOMAIN: [string, string][] = [
  ["materialdepot-images-hbh2cjbvbtfmanhx.z02.azurefd.net", "azure"],
  ["materialdepotimages.materialdepot.in", "main"],
  ["materialdepotimages.materialdepot.com", "main"],
  ["materialdepotimages.s3.ap-south-1.amazonaws.com", "main"],
  ["materialdepotimages.s3.amazonaws.com", "main"],
  ["materialdepot-content-files-endpoint-e8cnf0c2gxfhe5fb.z02.azurefd.net", "content"],
  ["material-depot-content-files-noresize-endpoint-bsbkh4asdwecc9dp.z02.azurefd.net", "content"],
  ["material-depot-content-files.s3.ap-south-1.amazonaws.com", "content"],
  ["materialdepot-content-files.materialdepot.in", "content"],
  ["dqzffhb3lxxp.cloudfront.net", "content"],
  ["d3faqy0icgqzj8.cloudfront.net", "content"],
];

/**
 * Convert a source (or already-normalised) image URL into an image-transform
 * service URL: `${BASE}/<bucket>/<path>?height=<N>&format=webp`.
 *  - WebP is added for the image buckets (main/azure); `content` is resize-only
 *    (the service never WebP-converts content).
 *  - Videos / GIF / SVG and unknown hosts are returned unchanged.
 *  - Idempotent: an existing image-transform URL is returned as-is, so
 *    `getWatermarkUrl(getImageUrl(...))` does not double-transform.
 */
function toImageTransform(url: string, width: string, watermark: boolean = false): string {
  if (!url) return "";

  // Idempotent: when handed an existing image-transform URL (e.g.
  // getWatermarkUrl(getImageUrl(...))) keep it, but still honour a watermark
  // request by appending the flag if it isn't already present. The service
  // ignores ?watermark on the content bucket, so this is always safe.
  if (url.startsWith(IMAGE_TRANSFORM_BASE)) {
    if (watermark && !/[?&]watermark=1(&|$)/.test(url)) {
      return url + (url.includes("?") ? "&" : "?") + "watermark=1";
    }
    return url;
  }

  const lower = url.toLowerCase();
  if (/\.(mp4|mov|gif|svg)(\?|$)/.test(lower)) return url;

  const [base, qs] = url.split("?");
  let height = width;
  if (qs) {
    const p = new URLSearchParams(qs);
    height = p.get("height") || p.get("width") || width;
  }
  // Safety net: never request the full-resolution original (a lossless WebP of a
  // full-size source can be several MB). When no size is given, cap to a large
  // but bounded height that covers fullscreen / social-card use.
  if (!height) height = "1200";

  for (const [domain, bucket] of BUCKET_BY_DOMAIN) {
    const idx = base.indexOf(domain);
    if (idx === -1) continue;
    const objectPath = base
      .slice(idx + domain.length)
      .replace(/^\/+/, "")
      .replaceAll("+", "%20");
    const params: string[] = [];
    if (height) params.push("height=" + height);
    if (bucket !== "content") params.push("format=webp");
    // Watermark is opt-in and only applies to the watermarkable image buckets.
    if (watermark && bucket !== "content") params.push("watermark=1");
    return `${IMAGE_TRANSFORM_BASE}/${bucket}/${objectPath}${params.length ? "?" + params.join("&") : ""}`;
  }

  return url;
}

export function getImageUrl(path: string, width: string) {
  if (!path) return "";
  path = removeAllQueryParams(path);

  let img_url: string = path.replace(
    "materialdepotimages.materialdepot.in",
    "materialdepot-images-hbh2cjbvbtfmanhx.z02.azurefd.net"
  );

  img_url = img_url.replace(
    "materialdepotimages.materialdepot.com",
    "materialdepot-images-hbh2cjbvbtfmanhx.z02.azurefd.net"
  );

  img_url = img_url.replace(
    "materialdepotimages.s3.ap-south-1.amazonaws.com",
    "materialdepot-images-hbh2cjbvbtfmanhx.z02.azurefd.net"
  );

  img_url = img_url.replaceAll(
    "pub-132f3882c2074e84999a9ab982950552.r2.dev",
    "materialdepot-images-hbh2cjbvbtfmanhx.z02.azurefd.net"
  );

  img_url = img_url.replaceAll(
    "materialdepotimages.s3.amazonaws.com",
    "materialdepot-images-hbh2cjbvbtfmanhx.z02.azurefd.net"
  );

  img_url = img_url.replaceAll(
    "material-depot-content-files.s3.ap-south-1.amazonaws.com",
    "materialdepot-content-files-endpoint-e8cnf0c2gxfhe5fb.z02.azurefd.net"
  );

  img_url = img_url.replaceAll(
    "dqzffhb3lxxp.cloudfront.net",
    "materialdepot-content-files-endpoint-e8cnf0c2gxfhe5fb.z02.azurefd.net"
  );
  img_url = img_url.replaceAll(
    "d3faqy0icgqzj8.cloudfront.net",
    "materialdepot-content-files-endpoint-e8cnf0c2gxfhe5fb.z02.azurefd.net"
  );

  img_url = img_url.replaceAll(
    "materialdepot-content-files.materialdepot.in",
    "materialdepot-content-files-endpoint-e8cnf0c2gxfhe5fb.z02.azurefd.net"
  );

  if (
    img_url.includes(".mp4") ||
    img_url.includes(".mov") ||
    img_url.includes(".gif") ||
    img_url.includes(".svg")
  ) {
    img_url = img_url.replaceAll(
      "materialdepot-images-hbh2cjbvbtfmanhx.z02.azurefd.net",
      "pub-132f3882c2074e84999a9ab982950552.r2.dev"
    );

    img_url = img_url.replaceAll(
      "materialdepot-content-files-endpoint-e8cnf0c2gxfhe5fb.z02.azurefd.net",
      "material-depot-content-files-noresize-endpoint-bsbkh4asdwecc9dp.z02.azurefd.net"
    );

    img_url = img_url.replaceAll(
      "dpy2z8n9cxui1.cloudfront.net",
      "d2cwt1uuomj2h5.cloudfront.net"
    );
  }

  if (img_url && img_url[0] === "/") {
    img_url = "https://materialdepot-images-hbh2cjbvbtfmanhx.z02.azurefd.net" + img_url;
  }

  img_url = img_url.replaceAll("+", "%20");
  if (!img_url.startsWith("https")) {
    img_url = "https://materialdepot-images-hbh2cjbvbtfmanhx.z02.azurefd.net" + img_url;
  }

  // New path: route the normalised URL through the image-transform service
  // (WebP for the image buckets, resize-only for content, videos/SVG untouched).
  if (USE_IMAGE_TRANSFORM) {
    return toImageTransform(img_url, width);
  }

  // Legacy path: serve the normalised CDN URL directly with the old ?width param.
  if (width !== "") {
    img_url += "?width=" + width;
  }
  return img_url;
}
