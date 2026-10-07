import { useCallback, useState } from 'react'
import { place } from '../utils'
import { FitText } from './FitText'
import { ConsultModal } from './ConsultModal'

const glows = [
  { d: { x: 177, y: 625, w: 150, h: 150 }, m: { x: 5, y: 175, w: 50, h: 50 }, delay: '.3s' },
  { d: { x: 1741, y: 625, w: 150, h: 150 }, m: { x: 346, y: 175, w: 50, h: 50 }, delay: '1.1s' },
  { d: { x: 300, y: 7585, w: 110, h: 110 }, m: { x: 42, y: 3878, w: 30, h: 30 }, delay: '.7s' },
  { d: { x: 1565, y: 7585, w: 110, h: 110 }, m: { x: 329, y: 3878, w: 30, h: 30 }, delay: '1.5s' },
]

export function Glows() {
  return (
    <>
      {glows.map((g, i) => (
        <span key={i} className="a glow" style={{ ...place(g.d, g.m), animationDelay: g.delay }} />
      ))}
    </>
  )
}

export function Intro() {
  const [consultOpen, setConsultOpen] = useState(false)
  const closeConsult = useCallback(() => setConsultOpen(false), [])

  return (
    <>
      <FitText fit={[587, 1476, 937]} fitM={[33, 365, 353]} className="eyebrow rv">Give your home a fresh look, without the mess.</FitText>
      <p className="a d lead rv" style={{ top: 1017 }}>
        Sit back and relax while we take care of everything from <b>delivery to installation.</b>
      </p>
      <p className="a d lead rv" style={{ top: 1062 }}>
        Plus, <b>get a 1-year warranty installation.</b>
      </p>
      <p className="a m lead rv" style={{ top: 382 }}>Sit back and relax while we take care</p>
      <p className="a m lead rv" style={{ top: 397 }}>
        of everything from <b>delivery to installation.</b>
      </p>
      <p className="a m lead rv" style={{ top: 412 }}>
        Plus, get a <b>1-year warranty installation.</b>
      </p>
      <button
        type="button"
        className="a book-btn rv"
        style={place({ x: 611, y: 1178, w: 818, h: 120 }, { x: 55, y: 458, w: 292, h: 41 })}
        data-fsw="681"
        data-fsw-m="245"
        aria-haspopup="dialog"
        onClick={() => setConsultOpen(true)}
      >
        Book Free Online Consultation
      </button>
      {consultOpen && <ConsultModal onClose={closeConsult} />}
    </>
  )
}
