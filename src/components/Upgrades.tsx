import { useEffect, useState } from 'react'
import { asset, place, relayout } from '../utils'
import { categories, type Category } from '../data'
import { SITE_URL } from '../stores'
import { DESKTOP_QUERY } from '../hooks/useDesignCanvas'
import { FitText } from './FitText'
import { Chevron } from './Icons'

const CARD_PITCH = 275

function useVisibleCards() {
  const query = window.matchMedia(DESKTOP_QUERY)
  const [visible, setVisible] = useState(query.matches ? 5 : 3)
  useEffect(() => {
    const onChange = () => setVisible(query.matches ? 5 : 3)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [query])
  return visible
}

function Tiles({ active, onPick }: { active: Category; onPick: (c: Category) => void }) {
  return (
    <div className="a grp tiles" style={place({ x: 521, y: 4880, w: 1043, h: 360 }, { x: 68.7, y: 1312, w: 265, h: 91.5, s: 0.2541 })}>
      {categories.map((c) => {
        const on = c.key === active.key
        return (
          <button key={c.key} type="button" className={`cat${on ? ' on' : ''}`} aria-pressed={on} onClick={() => onPick(c)}>
            <img className="r tile tile-off" style={place(c.off)} src={asset(c.off.src)} alt="" />
            <img className="r tile tile-on" style={place(c.off)} src={asset(c.on.src)} alt="" />
            <span className="r pill" style={place({ x: c.pillX, y: 314, w: 204, h: 41 })} data-fsw="94" data-fst="Wallpaper">{c.name}</span>
          </button>
        )
      })}
    </div>
  )
}

function Panel({ category }: { category: Category }) {
  const visible = useVisibleCards()
  const [offset, setOffset] = useState(0)
  const total = category.cards.length + 1
  const maxOffset = Math.max(0, total - visible)

  useEffect(() => setOffset(0), [category, visible])
  useEffect(() => {
    relayout()
  }, [category])

  const link = `${SITE_URL}${category.href}`

  return (
    <div className="a grp panel" style={place({ x: 270, y: 5274, w: 1497, h: 467 }, { x: 45, y: 1425, w: 314, h: 162, s: 0.3489 })}>
      <FitText inGroup fit={[89, 287, 33]} fitM={[63, 261, 31.5]} refText="Wallpaper" className="panel-title" key={category.key}>
        {category.name}
      </FitText>
      {category.subtitle && (
        <FitText inGroup fit={[91, 231, 82]} fitM={[65, 205, 80]} className="panel-sub">{category.subtitle}</FitText>
      )}
      <div className="panel-clip">
        <div className="panel-track" style={{ transform: `translateX(${-offset * CARD_PITCH}px)` }}>
          {category.cards.map((card, i) => (
            <a key={card} href={link} target="_blank" rel="noreferrer" className="panel-card" style={{ left: i * CARD_PITCH }}>
              <img src={asset(card)} alt="" loading="lazy" />
            </a>
          ))}
          <a href={link} target="_blank" rel="noreferrer" className="panel-card" style={{ left: category.cards.length * CARD_PITCH }}>
            <img src={asset(`card-${category.key}-explore`)} alt={`Explore more ${category.name}`} loading="lazy" />
          </a>
        </div>
      </div>
      {offset > 0 && (
        <button type="button" className="panel-arrow prev" aria-label="Previous" onClick={() => setOffset((o) => o - 1)}><Chevron /></button>
      )}
      {offset < maxOffset && (
        <button type="button" className="panel-arrow next" aria-label="Next" onClick={() => setOffset((o) => o + 1)}><Chevron /></button>
      )}
    </div>
  )
}

export function Upgrades() {
  const [active, setActive] = useState(categories[0])

  return (
    <>
      <FitText as="h2" fit={[577, 1501, 4613]} fitM={[86, 312, 1243]} className="h rv" style={{ color: 'var(--maroon)' }}>Three Quick Upgrades</FitText>
      <FitText as="h2" fit={[513, 1540, 4709]} fitM={[71, 322, 1264]} className="h rv" style={{ color: 'var(--maroon)' }}>for a Diwali-Ready Home</FitText>
      <FitText fit={[560, 1518, 4812]} fitM={[78, 320, 1289]} className="subt rv">Get your home ready for every guest and every celebration.</FitText>
      <Tiles active={active} onPick={setActive} />
      <Panel category={active} />
    </>
  )
}
