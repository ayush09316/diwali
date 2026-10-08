import { Fragment } from 'react'
import { asset, place } from '../utils'
import { whyItems } from '../data'
import { FitText } from './FitText'
import { Zoom } from './Zoom'

export function WhyVisit() {
  return (
    <>
      <FitText as="h2" fit={[487, 1484, 5329]} className="h rv" style={{ color: 'var(--maroon)' }}>Why Visit Our Experience Centre?</FitText>
      <FitText as="h2" fitM={[112, 289, 2348]} className="h rv" style={{ color: 'var(--maroon)' }}>Why Visit Our</FitText>
      <FitText as="h2" fitM={[75, 326, 2373]} className="h rv" style={{ color: 'var(--maroon)' }}>Experience Centre?</FitText>
      {whyItems.map((w) => (
        <Fragment key={w.img}>
          <Zoom shaped className="a" style={place(w.d, w.m)} src={asset(w.img)} />
          <span className="a wpill" style={place(w.pill, w.pillM)} data-fsw="170" data-fsw-m="83" data-fst="25,000 + Designs">
            {w.label.map((l, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {l}
              </Fragment>
            ))}
          </span>
        </Fragment>
      ))}
    </>
  )
}
