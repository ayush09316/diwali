import type { CSSProperties } from 'react'
import { asset } from '../utils'
import type { BeforeAfter } from '../data'

const CARD_WIDTH = 718
const cqw = (px: number) => `${(px / CARD_WIDTH) * 100}cqw`

export function BeforeAfterCard({ card }: { card: BeforeAfter }) {
  const src = asset(card.src)
  return (
    <div className="ba-card">
      <img className="ba-base" src={src} alt={card.alt} />
      {card.halves.map((half, i) => {
        const frame: CSSProperties = {
          left: `${(half.x / CARD_WIDTH) * 100}%`,
          top: `${(half.y / card.height) * 100}%`,
          width: `${(half.w / CARD_WIDTH) * 100}%`,
          height: `${(half.h / card.height) * 100}%`,
          clipPath: `inset(0 round ${half.radius.map(cqw).join(' ')})`,
        }
        const [ox, oy] = card.origins[i]
        const image: CSSProperties = {
          left: `${(-half.x / half.w) * 100}%`,
          top: `${(-half.y / half.h) * 100}%`,
          width: `${(CARD_WIDTH / half.w) * 100}%`,
          transformOrigin: `${ox}% ${oy}%`,
        }
        return (
          <div key={i} className="ba-half" style={frame}>
            <img src={src} alt="" style={image} />
          </div>
        )
      })}
    </div>
  )
}
