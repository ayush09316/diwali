import { useState } from 'react'
import { asset, place } from '../utils'
import { rooms } from '../data'
import { SITE_URL } from '../stores'
import { FitText } from './FitText'
import { ArrowRight, Chevron, LongArrow } from './Icons'

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
      <FitText fit={[332, 707, 6090]} fitM={[129, 275, 2862]} className="eyebrow insp-eb rv">Find Your Festive Inspiration</FitText>
      <FitText fit={[335, 694, 6127]} className="ttl rv">Inspiration</FitText>
      <FitText fit={[333, 572, 6203]} className="ttl rv">Gallery</FitText>
      <FitText fit={[332, 690, 6309]} className="desc rv">Explore 20,000+ design ideas</FitText>
      <FitText fit={[331, 746, 6343]} className="desc rv">and bring your dream home to life.</FitText>
      <FitText fitM={[88, 320, 2878]} className="ttl rv">Inspiration Gallery</FitText>
      <FitText fitM={[52, 355, 2909]} className="desc rv">Explore 20,000+ design ideas and bring your dream home to life.</FitText>
      <a
        href={`${SITE_URL}/inspiration-gallery`}
        target="_blank"
        rel="noreferrer"
        className="a btn-o btn-insp rv"
        style={place({ x: 330, y: 6433, w: 424, h: 67 }, { x: 134, y: 2929, w: 131, h: 25 })}
        data-fsw="289"
        data-fsw-m="97"
        data-fst="Explore the designs"
      >
        Explore the designs <ArrowRight />
      </a>
      <a
        href={`${SITE_URL}/inspiration-gallery`}
        target="_blank"
        rel="noreferrer"
        className="a btn-o btn-gallery rv"
        style={place({ x: 643, y: 6676, w: 610, h: 81 }, { x: 104, y: 3298, w: 189, h: 25 })}
        data-fsw="421"
        data-fsw-m="130"
        data-fst="Explore Inspiration Gallery"
      >
        Explore Inspiration Gallery <LongArrow />
      </a>

      <div className="a insp-main" style={place({ x: 806, y: 6080, w: 622, h: 445 }, { x: 22, y: 3044, w: 357, h: 235 })}>
        {room.slides.map((s, i) => (
          <img key={s} src={asset(s)} alt={`${room.label} inspiration ${i + 1}`} className={i === slide ? 'on' : ''} loading={i === 0 ? 'eager' : 'lazy'} />
        ))}
        <button type="button" className="insp-arrow prev" aria-label="Previous design" onClick={() => go(-1)}><Chevron /></button>
        <button type="button" className="insp-arrow next" aria-label="Next design" onClick={() => go(1)}><Chevron /></button>
      </div>

      {rooms.map((r, i) => {
        const on = i === roomIndex
        return (
          <button
            key={r.key}
            type="button"
            className={`a insp-thumb${on ? ' on' : ''}`}
            style={place(r.thumbD, r.thumbM)}
            aria-pressed={on}
            aria-label={r.label}
            onClick={() => pickRoom(i)}
          >
            <img className="d off" src={asset(`thumb-${r.key}-off`)} alt="" />
            <img className="d on" src={asset(`thumb-${r.key}-on`)} alt="" />
            <img className="m photo" src={asset(`thumb-${r.key}-photo`)} alt="" />
            <span className="m label">{r.label}</span>
          </button>
        )
      })}
    </>
  )
}
