import { useState } from 'react'
import { asset, place } from '../utils'
import { rooms } from '../data'
import { SITE_URL } from '../stores'
import { FitText } from './FitText'
import { ArrowRight, Chevron } from './Icons'

export function Inspiration() {
  const [roomIndex, setRoomIndex] = useState(0)
  const [slide, setSlide] = useState(0)
  const room = rooms[roomIndex]
  const count = room.slides.length
  const go = (step: number) => setSlide((s) => (s + step + count) % count)

  const pickRoom = (i: number) => {
    setRoomIndex(i)
    setSlide(0)
  }

  return (
    <>
      <FitText fit={[364, 734, 7977]} fitM={[32, 130, 2332]} className="eyebrow insp-eb rv">Find Your Festive Inspiration</FitText>
      <FitText fit={[367, 720, 8012]} fitM={[33, 127, 2341]} className="ttl rv">Inspiration</FitText>
      <FitText fit={[364, 600, 8087]} fitM={[32, 95, 2361]} className="ttl rv">Gallery</FitText>
      <FitText fit={[363, 716, 8188]} fitM={[32, 126, 2388]} className="desc rv">Explore 20,000+ design ideas</FitText>
      <FitText fit={[362, 772, 8220]} fitM={[32, 140, 2396]} className="desc rv">and bring your dream home to life.</FitText>
      <a
        href={`${SITE_URL}/inspiration-gallery`}
        target="_blank"
        rel="noreferrer"
        className="a btn-o btn-insp rv"
        style={place({ x: 362, y: 8306, w: 413, h: 65 }, { x: 32, y: 2419, w: 109, h: 17 })}
        data-fsw="288"
        data-fsw-m="79"
        data-fst="Explore the designs"
      >
        Explore the designs <ArrowRight />
      </a>

      <div className="a insp-main" style={place({ x: 826, y: 7964, w: 607, h: 434 }, { x: 164, y: 2346, w: 186, h: 133 })}>
        {room.slides.map((s, i) => (
          <img key={s} src={asset(s)} alt={`${room.label} inspiration ${i + 1}`} className={i === slide ? 'on' : ''} loading={i === 0 ? 'eager' : 'lazy'} />
        ))}
        <button type="button" className="insp-arrow prev" aria-label="Previous design" onClick={() => go(-1)}><Chevron /></button>
        <button type="button" className="insp-arrow next" aria-label="Next design" onClick={() => go(1)}><Chevron /></button>
      </div>

      {rooms.map((r, i) => (
        <button
          key={r.key}
          type="button"
          className={`a insp-thumb${i === roomIndex ? ' on' : ''}`}
          style={place(r.thumbD, r.thumbM)}
          aria-pressed={i === roomIndex}
          aria-label={r.label}
          onClick={() => pickRoom(i)}
        >
          <img className="off" src={asset(`thumb-${r.key}-off`)} alt="" />
          <img className="on" src={asset(`thumb-${r.key}-on`)} alt="" />
        </button>
      ))}
    </>
  )
}
