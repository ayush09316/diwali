import { useEffect, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { place } from '../utils'
import { videos } from '../data'
import { getImageUrl } from '../helpers/image_helper'
import { FitText } from './FitText'

// Desktop: all tiles share the 1466px strip with a 26px gap (mobile scrolls horizontally)
const STRIP_W = 1466
const GAP = 26
const TILE_W = (STRIP_W - GAP * (videos.length - 1)) / videos.length

const Play = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5.5v13l10.5-6.5z" fill="#1b2332" />
  </svg>
)

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <div className="lightbox" role="dialog" aria-label={alt} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <video src={src} controls autoPlay playsInline />
      <button type="button" className="lightbox-close" aria-label="Close video" onClick={onClose}>×</button>
    </div>,
    document.body,
  )
}

export function Videos() {
  const [open, setOpen] = useState<number | null>(null)
  const urls = videos.map((v) => getImageUrl(v.src, ''))

  return (
    <>
      <FitText as="h2" fit={[601, 1423, 2973]} fitM={[58, 359, 1198]} className="h rv" style={{ color: 'var(--maroon)' }}>See The Transformation Live</FitText>
      <div className="a vids" style={place({ x: 280, y: 3091, w: STRIP_W, h: 347 }, { x: 0, y: 1232, w: 402, h: 221 })}>
        {videos.map((v, i) => (
          <button
            key={v.src}
            type="button"
            className="vid"
            style={{ '--vx': i * (TILE_W + GAP), '--vw': TILE_W } as CSSProperties}
            aria-label={`Play ${v.alt}`}
            onClick={() => setOpen(i)}
            onMouseEnter={(e) => e.currentTarget.querySelector('video')?.play().catch(() => {})}
            onMouseLeave={(e) => e.currentTarget.querySelector('video')?.pause()}
          >
            <video src={`${urls[i]}#t=0.1`} muted loop playsInline preload="metadata" />
            <span className="play"><Play /></span>
          </button>
        ))}
      </div>
      {open !== null && <Lightbox src={urls[open]} alt={videos[open].alt} onClose={() => setOpen(null)} />}
    </>
  )
}
