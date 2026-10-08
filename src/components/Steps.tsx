import { asset, place } from '../utils'
import { FitText } from './FitText'

// Sharp 3x step illustrations laid exactly over the softer ones in the backgrounds
// (the soft shadow under each stays in the background). Boxes are where each sat in the mockups.
const ILLUSTRATIONS = [
  { name: 'consult', d: { x: 361, y: 4950, w: 156, h: 88 }, m: { x: 262, y: 1995.7, w: 78, h: 44 } },
  { name: 'store', d: { x: 658, y: 4950, w: 173, h: 89 }, m: { x: 260, y: 2056.7, w: 86.7, h: 44.7 } },
  { name: 'materials', d: { x: 945, y: 4954, w: 175, h: 85 }, m: { x: 259, y: 2119.3, w: 89, h: 43.3 } },
  { name: 'delivery', d: { x: 1242, y: 4951, w: 128, h: 87 }, m: { x: 264.7, y: 2176.3, w: 80, h: 54.3 } },
  { name: 'install', d: { x: 1532, y: 4950, w: 92, h: 82 }, m: { x: 278.7, y: 2241.3, w: 47.7, h: 42.3 } },
]

// the steps card itself is part of the page background on both breakpoints
export function Steps() {
  return (
    <>
      <FitText as="h2" fit={[668, 1362, 4371]} fitM={[49, 360, 1814]} className="h rv" style={{ color: 'var(--brown)' }}>Your Diwali Makeover in</FitText>
      {ILLUSTRATIONS.map((i) => (
        <img key={i.name} className="a" style={place(i.d, i.m)} src={asset(`step-${i.name}`)} alt="" aria-hidden />
      ))}
      <FitText as="h2" fit={[855, 1138, 4431]} fitM={[131, 274, 1839]} className="h rv" style={{ color: 'var(--brown)' }}>5 Simple Steps</FitText>
    </>
  )
}
