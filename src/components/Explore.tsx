import { useEffect, useState } from 'react'
import { asset, place, relayout } from '../utils'
import { categories, type Category } from '../data'
import { SITE_URL } from '../stores'
import { useIsDesktop } from '../hooks/useDesignCanvas'
import { FitText } from './FitText'
import { Caret } from './Icons'

// Card pitch in desktop units (mobile renders the same strip scaled down)
const PITCH = 274.75
const cardLeft = (i: number) => Math.round(i * PITCH)

function Cards({ category }: { category: Category }) {
  // Arrows move one card at a time; the last stop ends with Explore More in the final slot
  const visible = useIsDesktop() ? 5 : 3
  const [page, setPage] = useState(0)
  const stops = Math.max(1, category.cards.length + 1 - visible + 1)
  const go = (step: number) => setPage((p) => (p + step + stops) % stops)

  useEffect(() => setPage(0), [visible])

  return (
    <>
      <div className="a explore-clip" style={place({ x: 328, y: 3866, w: 1359, h: 334 }, { x: 28.1, y: 1623, w: 343.6, h: 140.3, s: 0.42 })}>
        <div className="panel-track" style={{ transform: `translateX(${-cardLeft(page)}px)` }}>
          {category.cards.map((card, i) => (
            <a key={card.img} href={`${SITE_URL}${card.href}`} target="_blank" rel="noreferrer" className="panel-card" style={{ left: cardLeft(i) }}>
              <img src={asset(card.img)} alt={card.name} loading="lazy" />
            </a>
          ))}
          <a href={`${SITE_URL}${category.href}`} target="_blank" rel="noreferrer" className="panel-card" style={{ left: cardLeft(category.cards.length) }}>
            <img src={asset(`card-${category.key}-explore`)} alt={`Explore more ${category.name}`} loading="lazy" />
          </a>
        </div>
      </div>
      <button type="button" className="a round-arrow prev" style={place({ x: 297, y: 3983, w: 29, h: 29 }, { x: 14, y: 1671, w: 18, h: 17 })} aria-label="Previous designs" onClick={() => go(-1)}><Caret /></button>
      <button type="button" className="a round-arrow next" style={place({ x: 1710, y: 3982, w: 29, h: 29 }, { x: 370, y: 1671, w: 18, h: 17 })} aria-label="Next designs" onClick={() => go(1)}><Caret /></button>
    </>
  )
}

export function Explore() {
  const [active, setActive] = useState(categories[0])
  const price = active.price ? `₹${active.price}/sq ft` : active.name

  useEffect(() => {
    relayout()
  }, [active])

  return (
    <>
      <FitText as="h2" fit={[679, 1401, 3591]} fitM={[41, 365, 1497]} className="h rv" style={{ color: 'var(--maroon)' }}>Explore 25,000+ Designs</FitText>
      <div className="a tabs" role="tablist" style={place({ x: 682, y: 3689, w: 654, h: 44 }, { x: 10, y: 1533, w: 380, h: 25.6, s: 0.581 })}>
        {categories.map((c) => {
          const on = c.key === active.key
          return (
            <button key={c.key} type="button" role="tab" aria-selected={on} className={`tab${on ? ' on' : ''}`} style={{ width: on ? undefined : c.tabW }} onClick={() => setActive(c)}>
              {c.name}
            </button>
          )
        })}
      </div>
      <FitText fit={[336, 758, 3793]} refText="Starting at ₹ 26/sq ft" className="explore-title" key={`title-${active.key}`}>
        {active.price ? <>Starting at ₹ {active.price}/sq ft</> : active.name}
      </FitText>
      {/* mobile: small "Starting at" + larger price */}
      <FitText fitM={[33, 93, 1596]} className="explore-title explore-lead">Starting at</FitText>
      <FitText fitM={[98, 163, 1593]} refText="₹26/sq ft" className="explore-title" key={`price-${active.key}`}>{price}</FitText>
      <Cards key={`cards-${active.key}`} category={active} />
    </>
  )
}
