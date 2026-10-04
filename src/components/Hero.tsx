import { asset, place } from '../utils'
import { FitText } from './FitText'
import { Zoom } from './Zoom'

const glows = [
  { d: { x: 177, y: 625, w: 150, h: 150 }, m: { x: 8, y: 218, w: 40, h: 40 }, delay: '.3s' },
  { d: { x: 1741, y: 625, w: 150, h: 150 }, m: { x: 352, y: 218, w: 40, h: 40 }, delay: '1.1s' },
  { d: { x: 322, y: 9548, w: 110, h: 110 }, m: { x: 41, y: 3009, w: 30, h: 30 }, delay: '.7s' },
  { d: { x: 1590, y: 9548, w: 110, h: 110 }, m: { x: 329, y: 3009, w: 30, h: 30 }, delay: '1.5s' },
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
  return (
    <>
      <img className="a m" style={place(null, { x: 17, y: 350, w: 373 })} src={asset('features')} alt="30,000+ designs · Delivered at your doorstep · Installation within 1 day · No renovation needed · 1 year warranty on installation" />
      <FitText fit={[574, 1470, 1381]} className="eyebrow rv">Small Changes. Big Festive Vibe</FitText>
      <FitText fitM={[110, 287, 445]} className="eyebrow rv">Small Changes. Big Festive Vibe.</FitText>
      <Zoom shaped className="a" style={place({ x: 282, y: 1483, w: 1481 }, { x: 35, y: 463, w: 324 })} src={asset('family')} alt="Family celebrating Diwali at home" />
    </>
  )
}
