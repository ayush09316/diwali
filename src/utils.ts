import type { CSSProperties } from 'react'

export type Box = { x: number; y: number; w: number; h?: number }
type MBox = Box & { s?: number }

// Images live in the Cloudflare R2 image bucket under application_image/diwali-makeover/ (they are
// not in this repo; git history before this change has the originals). VITE_ASSET_BASE overrides.
const ASSET_BASE = (import.meta.env.VITE_ASSET_BASE as string | undefined) ??
  'https://materialdepotimages.materialdepot.com/application_image/diwali-makeover/'

// Standalone HTML export embeds images in window.__ASSETS; otherwise they load from ASSET_BASE.
export const asset = (name: string) => {
  const file = `${name}${/\.\w+$/.test(name) ? '' : '.webp'}`
  return (window as { __ASSETS?: Record<string, string> }).__ASSETS?.[file] ?? `${ASSET_BASE}${file}`
}

export function place(d?: Box | null, m?: MBox | null): CSSProperties {
  const v: Record<string, number> = {}
  if (d) {
    v['--x'] = d.x
    v['--y'] = d.y
    v['--w'] = d.w
    if (d.h !== undefined) v['--h'] = d.h
  }
  if (m) {
    v['--mx'] = m.x
    v['--my'] = m.y
    v['--mw'] = m.w
    if (m.h !== undefined) v['--mh'] = m.h
    if (m.s !== undefined) v['--ms'] = m.s
  }
  return v as CSSProperties
}

export const only = (d: unknown, m: unknown) => (d && m ? '' : d ? ' d' : ' m')

export const relayout = () => window.dispatchEvent(new Event('relayout'))

// carousels only load the visible slide and its neighbours (wrapping)
export const isNear = (i: number, index: number, count: number) => {
  const d = Math.abs(i - index)
  return Math.min(d, count - d) <= 1
}
