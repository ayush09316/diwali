import { useRef, useState } from 'react'
import { place } from '../utils'
import { beforeAfter } from '../data'
import { BeforeAfterCard } from './BeforeAfterCard'
import { FitText } from './FitText'
import { Chevron } from './Icons'

function MobileSlider() {
  const [index, setIndex] = useState(1)
  const touchX = useRef<number | null>(null)
  const count = beforeAfter.length
  const go = (step: number) => setIndex((i) => (i + step + count) % count)

  return (
    <div
      className="a m ba-slider"
      style={place(null, { x: 51, y: 737, w: 293, h: 177 })}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 30) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <div className="ba-track" style={{ transform: `translateX(${-index * 100}%)` }}>
        {beforeAfter.map((card) => (
          <div key={card.src} className="ba-slide">
            <BeforeAfterCard card={card} />
          </div>
        ))}
      </div>
      <button type="button" className="ba-arrow prev" aria-label="Previous transformation" onClick={() => go(-1)}><Chevron /></button>
      <button type="button" className="ba-arrow next" aria-label="Next transformation" onClick={() => go(1)}><Chevron /></button>
    </div>
  )
}

export function BeforeAfterSection() {
  return (
    <>
      <FitText fit={[660, 1359, 2389]} fitM={[131, 268, 661]} className="eyebrow rv">Real Home. Real Transformation.</FitText>
      <FitText as="h2" fit={[513, 1538, 2450]} fitM={[103, 303, 673]} className="h rv" style={{ color: 'var(--brown)' }}>Before &amp; After Makeover</FitText>
      <FitText fit={[570, 1477, 2537]} fitM={[114, 291, 690]} className="subt rv">Get your home ready for every guest and every celebration.</FitText>
      <a
        href="#transformations"
        className="a btn-o rv"
        style={place({ x: 784, y: 2610, w: 478, h: 73 }, { x: 156, y: 708, w: 93, h: 14 })}
        data-fsw="360"
        data-fsw-m="70"
      >
        View&nbsp; Transformation
      </a>
      <div id="transformations">
        {beforeAfter.map((card) => (
          <div key={card.src} className="a d" style={place(card.d)}>
            <BeforeAfterCard card={card} />
          </div>
        ))}
      </div>
      <MobileSlider />
    </>
  )
}
