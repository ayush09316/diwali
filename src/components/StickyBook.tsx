import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ConsultModal } from './ConsultModal'
import { DESKTOP_QUERY } from '../hooks/useDesignCanvas'

const FLY_MS = 900
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

// Where the pill is at progress t (0 = on the hero button, 1 = resting in its corner) along an
// L: straight down from the button to the bottom row on the button's centre line, then right
// along the bottom into the corner. Each leg eases in and out. The hero rect is read live, so
// the path follows the button while the page scrolls. offsetLeft/Top/Width/Height describe the
// resting pill without any transform.
function lTransform(pill: HTMLElement, hero: DOMRect, t: number) {
  const w = pill.offsetWidth, h = pill.offsetHeight
  const rest = { x: pill.offsetLeft + w / 2, y: pill.offsetTop + h / 2 }
  const top = { x: hero.left + hero.width / 2, y: hero.top + hero.height / 2, s: hero.width / w }
  let cx: number, cy: number, s: number
  if (t < 0.5) {
    const p = ease(t / 0.5)
    cx = top.x; cy = lerp(top.y, rest.y, p); s = lerp(top.s, 1, p)
  } else {
    const p = ease((t - 0.5) / 0.5)
    cx = lerp(top.x, rest.x, p); cy = rest.y; s = 1
  }
  return `translate(${cx - (w * s) / 2 - pill.offsetLeft}px, ${cy - (h * s) / 2 - pill.offsetTop}px) scale(${s})`
}

// Floating "Book Free Online Consultation" pill. On desktop, when the hero's Book button scrolls
// out of view the pill flies from it into the bottom-right corner, and flies back as it returns.
// Portalled to <body> so it sits outside the zoomed design canvas at a real, readable size.
export function StickyBook() {
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const pill = useRef<HTMLButtonElement>(null)
  const shown = useRef(false)
  const raf = useRef(0)

  useEffect(() => {
    const hero = document.querySelector('.stage .book-btn')
    if (!hero) return
    // show once the button has left through the top; hide only when it is fully back in view,
    // so the return flight always lands on a visible button
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting && e.boundingClientRect.top < 0) setShow(true)
        else if (e.intersectionRatio === 1) setShow(false)
      },
      { threshold: [0, 1] },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  useLayoutEffect(() => {
    const el = pill.current
    const hero = document.querySelector<HTMLElement>('.stage .book-btn')
    if (shown.current === show) return // only animate real changes (not mount / StrictMode re-runs)
    shown.current = show
    // desktop only; phones keep the plain fade-in at the corner
    if (!el || !hero || !matchMedia(DESKTOP_QUERY).matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    cancelAnimationFrame(raf.current)
    // hero button far off-screen (e.g. a jump via a link): just fade, no long flight
    const r = hero.getBoundingClientRect()
    if (r.bottom < -innerHeight || r.top > 2 * innerHeight) return
    // fly down-then-right when showing, left-then-up when hiding; the hero button is hidden
    // while the pill is away from it and fades back in as the pill lands on it
    const t0 = performance.now()
    el.style.transition = hero.style.transition = 'none'
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / FLY_MS)
      el.style.transform = lTransform(el, hero.getBoundingClientRect(), show ? k : 1 - k)
      el.style.opacity = show || k < 0.9 ? '1' : String((1 - k) / 0.1)
      hero.style.opacity = show ? '' : k < 0.85 ? '0' : String((k - 0.85) / 0.15)
      if (k < 1) raf.current = requestAnimationFrame(step)
      else reset()
    }
    const reset = () => {
      el.style.transform = el.style.opacity = el.style.transition = ''
      hero.style.opacity = hero.style.transition = ''
    }
    raf.current = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf.current)
      reset()
    }
  }, [show])

  return createPortal(
    <>
      <button
        ref={pill}
        type="button"
        className={`sticky-book${show && !open ? ' on' : ''}`}
        aria-haspopup="dialog"
        tabIndex={show ? 0 : -1}
        aria-hidden={!show}
        onClick={() => setOpen(true)}
      >
        Book Free Online Consultation
      </button>
      {open && <ConsultModal onClose={close} />}
    </>,
    document.body,
  )
}
