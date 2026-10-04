import { Fragment } from 'react'
import { asset, place } from '../utils'
import { whyItems } from '../data'
import { FitText } from './FitText'
import { Zoom } from './Zoom'

export function WhyVisit() {
  return (
    <>
      <FitText as="h2" fit={[293, 1758, 7117]} fitM={[31, 372, 1915]} className="h rv" style={{ color: 'var(--maroon)' }}>Why Visit Our Experience Centre?</FitText>
      {whyItems.map((w) => (
        <Fragment key={w.img}>
          <Zoom shaped className="a" style={place(w.d, w.m)} src={asset(w.img)} />
          <span className="a wpill" style={place(w.pill, w.pillM)} data-fsw="161" data-fsw-m="52" data-fst="30,000 + Designs">
            {w.label.map((l, i) => (
              <Fragment key={i}>
                {i > 0 && (<>{' '}<br className="d" /></>)}
                {l}
              </Fragment>
            ))}
          </span>
        </Fragment>
      ))}
    </>
  )
}
