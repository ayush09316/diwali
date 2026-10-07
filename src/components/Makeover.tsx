import { useState } from 'react'
import { asset, place } from '../utils'
import { categories, transformations, type Category } from '../data'
import { FitText } from './FitText'
import { Caret } from './Icons'

const PANES = {
  before: { d: { x: 648, y: 2338, w: 366, h: 447 }, m: { x: 12, y: 932, w: 183, h: 224 } },
  after: { d: { x: 1022, y: 2343, w: 362, h: 435 }, m: { x: 202, y: 931, w: 180, h: 216 } },
}

function Tiles({ active, onPick }: { active: Category; onPick: (c: Category) => void }) {
  return (
    <>
      {categories.map((c) => {
        const on = c.key === active.key
        return (
          <button key={c.key} type="button" className={`cat${on ? ' on' : ''}`} aria-pressed={on} onClick={() => onPick(c)}>
            <img className="a tile tile-off" style={place(c.tileD, c.tileM)} src={asset(c.off)} alt="" />
            <img className="a tile tile-on" style={place(c.tileD, c.tileM)} src={asset(c.on)} alt="" />
            <span className="a pill" style={place(c.pillD, c.pillM)} data-fsw="94" data-fsw-m="50" data-fst="Wallpaper">{c.name}</span>
          </button>
        )
      })}
    </>
  )
}

function Carousel({ category }: { category: Category }) {
  const slides = transformations[category.key]
  const [state, setState] = useState({ key: category.key, index: 0 })
  const index = state.key === category.key ? state.index : 0
  const go = (step: number) => setState({ key: category.key, index: (index + step + slides.length) % slides.length })

  return (
    <>
      {(['before', 'after'] as const).map((side) => (
        <div key={side} className="a ba-pane" style={place(PANES[side].d, PANES[side].m)}>
          {slides.map((s, i) => (
            <img key={s.key} className={i === index ? 'on' : ''} src={asset(`ba-${s.key}-${side}`)} alt={`${s.alt} — ${side}`} />
          ))}
        </div>
      ))}
      <span className="a ba-tag before" style={place({ x: 758, y: 2734, w: 141, h: 33 }, { x: 71, y: 1125, w: 70, h: 17 })} data-fsw="66" data-fsw-m="33" data-fst="Before">Before</span>
      <span className="a ba-tag after" style={place({ x: 1099, y: 2734, w: 142, h: 33 }, { x: 241, y: 1125, w: 70, h: 17 })} data-fsw="53" data-fsw-m="26" data-fst="After">After</span>
      {slides.length > 1 && (
        <>
          <button type="button" className="a round-arrow prev" style={place({ x: 654, y: 2545, w: 35, h: 35 }, { x: 17, y: 1034, w: 17, h: 17 })} aria-label="Previous transformation" onClick={() => go(-1)}><Caret /></button>
          <button type="button" className="a round-arrow next" style={place({ x: 1343, y: 2545, w: 35, h: 35 }, { x: 360, y: 1034, w: 17, h: 17 })} aria-label="Next transformation" onClick={() => go(1)}><Caret /></button>
        </>
      )}
    </>
  )
}

export function Makeover() {
  const [active, setActive] = useState(categories[0])

  return (
    <>
      <FitText as="h2" fit={[680, 1327, 1771]} fitM={[57, 347, 668]} className="h rv" style={{ color: 'var(--maroon)' }}>Three Quick Upgrades</FitText>
      <FitText as="h2" fit={[636, 1354, 1845]} fitM={[37, 359, 699]} className="h rv" style={{ color: 'var(--maroon)' }}>for a Diwali-Ready Home</FitText>
      <FitText fit={[747, 1261, 1921]} fitM={[83, 322, 732]} className="subt rv">Simple Changes. A Whole New Look.</FitText>
      <Tiles active={active} onPick={setActive} />
      <Carousel category={active} />
    </>
  )
}
