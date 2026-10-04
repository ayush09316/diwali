import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { place } from '../utils'
import { videos } from '../data'
import { getImageUrl } from '../helpers/image_helper'
import { FitText } from './FitText'

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
      <FitText as="h2" fit={[889, 1171, 3848]} fitM={[170, 226, 936]} className="h rv" style={{ color: 'var(--maroon)' }}>Videos</FitText>
      <div className="a vids" style={place({ x: 307, y: 4026, w: 1466, h: 346 }, { x: 0, y: 966, w: 402, h: 221 })}>
        {videos.map((v, i) => (
          <button
            key={v.src}
            type="button"
            className="vid"
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
