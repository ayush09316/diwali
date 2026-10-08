import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ConsultModal } from './ConsultModal'
import { DESKTOP_QUERY } from '../hooks/useDesignCanvas'

const FLY_MS = 900
const LEG = 'cubic-bezier(.45, 0, .25, 1)' // each leg of the L eases in and out

// The pill rests in its fixed bottom-right corner. Its path to and from the hero button is an
// L: a vertical leg between the hero button and the bottom edge (keeping the button's centre
// line), then a horizontal leg along the bottom into the corner. Returns the transforms for
// the hero end and the elbow; offsetLeft/Top give the resting spot without mid-transition
// transforms.
function lPath(pill: HTMLElement, hero: DOMRect) {
  const s = hero.width / pill.offsetWidth
  const cx = hero.left + hero.width / 2
  const atHero = `translate(${hero.left - pill.offsetLeft}px, ${hero.top + (hero.height - pill.offsetHeight * s) / 2 - pill.offsetTop}px) scale(${s})`
  const elbow = `translate(${cx - pill.offsetWidth / 2 - pill.offsetLeft}px, 0px) scale(1)`
  return { atHero, elbow }
}

// Floating "Book Free Online Consultation" pill. On desktop, when the hero's Book button scrolls
// out of view the pill flies from it into the bottom-right corner, and flies back as it returns.
// Portalled to <body> so it sits outside the zoomed design canvas at a real, readable size.
export function StickyBook() {
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const pill = useRef<HTMLButtonElement>(null)
  const first = useRef(true)

  useEffect(() => {
    const hero = document.querySelector('.stage .book-btn')
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  useLayoutEffect(() => {
    const el = pill.current
    const hero = document.querySelector<HTMLElement>('.stage .book-btn')
    if (first.current) return void (first.current = false)
    // desktop only; phones keep the plain fade-in at the corner
    if (!el || !hero || !matchMedia(DESKTOP_QUERY).matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.getAnimations().forEach((a) => a.cancel())
    const { atHero, elbow } = lPath(el, hero.getBoundingClientRect())
    if (show) {
      // down from the hero button, then right into the corner
      el.animate(
        [
          { transform: atHero, opacity: 1, easing: LEG },
          { transform: elbow, opacity: 1, offset: 0.5, easing: LEG },
          { transform: 'none', opacity: 1 },
        ],
        { duration: FLY_MS },
      )
    } else {
      // back along the bottom, then up into the hero button, which fades in as the pill lands
      el.animate(
        [
          { transform: 'none', opacity: 1, easing: LEG },
          { transform: elbow, opacity: 1, offset: 0.45, easing: LEG },
          { transform: atHero, opacity: 1, offset: 0.9 },
          { transform: atHero, opacity: 0 },
        ],
        { duration: FLY_MS },
      )
      hero.animate([{ opacity: 0 }, { opacity: 0, offset: 0.85 }, { opacity: 1 }], { duration: FLY_MS })
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
