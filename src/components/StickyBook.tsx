import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ConsultModal } from './ConsultModal'

// Floating "Book Free Online Consultation" pill, shown once the hero's own Book button has
// scrolled out of view. Portalled to <body> so it sits outside the zoomed design canvas
// and keeps a real, readable size on every screen.
export function StickyBook() {
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const hero = document.querySelector('.stage .book-btn')
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return createPortal(
    <>
      <button
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
