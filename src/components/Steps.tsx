import { asset, place } from '../utils'
import { FitText } from './FitText'

export function Steps() {
  return (
    <>
      <FitText as="h2" fit={[570, 1565, 5981]} fitM={[81, 324, 1630]} className="h rv" style={{ color: 'var(--brown)' }}>Your Diwali Makeover in</FitText>
      <FitText as="h2" fit={[769, 1338, 6070]} fitM={[127, 271, 1652]} className="h rv" style={{ color: 'var(--brown)' }}>5 Simple Steps</FitText>
      <img
        className="a m"
        style={place(null, { x: 7, y: 1675, w: 387 })}
        src={asset('steps-card')}
        alt="01 Book an appointment, 02 Visit our experience centre, 03 Choose your materials, 04 Get it delivered, 05 Get it installed"
      />
    </>
  )
}
