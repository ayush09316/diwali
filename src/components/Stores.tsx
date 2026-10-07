import { useEffect, useState } from 'react'
import { place } from '../utils'
import { getImageUrl } from '../helpers/image_helper'
import { CITIES, SITE_URL, STORES, type City, type Store } from '../stores'
import { Chat, Chevron, Clock, Eye, Home, Send, Shop, Star } from './Icons'

const AUTO_ADVANCE_MS = 3000

const isOpenNow = () => {
  const hour = new Date().getHours()
  return hour >= 10 && hour < 21
}

function Carousel({ store }: { store: Store }) {
  const [index, setIndex] = useState(0)
  const count = store.images.length

  useEffect(() => {
    setIndex(0)
    if (count <= 1) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [store, count])

  const go = (step: number) => setIndex((i) => (i + step + count) % count)
  const src = getImageUrl(store.images[index], '600')
  const open = isOpenNow()

  return (
    <div className="a tour" style={place({ x: 104, y: 6871, w: 1056, h: 616 }, { x: 27, y: 3355, w: 348, h: 203, s: 0.3295 })}>
      <img className="tour-blur" src={src} alt="" aria-hidden="true" />
      <img key={src} className="tour-img" src={src} alt={`${store.name} Experience Centre`} />

      <div className="tour-badges">
        <span className="badge-open"><i className={open ? 'on' : 'off'} />{open ? 'Open Now' : 'Closed'}</span>
        {store.rating && (
          <span className="badge-rating">
            <svg viewBox="0 0 48 48" width="14" height="14" aria-hidden="true">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-4z" />
              <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A11.9 11.9 0 0 1 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
              <path fill="#1976D2" d="M43.6 20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.7-.4-4z" />
            </svg>
            <Star />
            <b>{store.rating}</b>
            <small>({store.reviews} ratings)</small>
          </span>
        )}
      </div>

      {count > 1 && (
        <>
          <button type="button" className="tour-nav prev" aria-label="Previous image" onClick={() => go(-1)}><Chevron /></button>
          <button type="button" className="tour-nav next" aria-label="Next image" onClick={() => go(1)}><Chevron /></button>
          <div className="tour-dots">
            {store.images.map((_, i) => (
              <button key={i} type="button" aria-label={`Go to image ${i + 1}`} className={i === index ? 'on' : ''} onClick={() => setIndex(i)} />
            ))}
          </div>
        </>
      )}

      <div className="tour-bar">
        <div>
          <span className="tour-label">{store.label}</span>
          <h3>{store.name} Experience Centre</h3>
        </div>
        <div className="tour-meta">
          <span><Clock />{store.hours}</span>
          {store.area && <span><Shop />{store.area}</span>}
        </div>
      </div>
    </div>
  )
}

export function Stores() {
  const [city, setCity] = useState<City>('Bengaluru')
  const [selected, setSelected] = useState<Store>(STORES[0])
  const list = STORES.filter((s) => s.city === city)

  const pickCity = (c: City) => {
    setCity(c)
    setSelected(STORES.find((s) => s.city === c) ?? STORES[0])
  }

  return (
    <>
      <Carousel store={selected} />
      <div id="experience-centre" className="a finder" style={place({ x: 1160, y: 6871, w: 864, h: 616 }, { x: 28.3, y: 3599, w: 346.5, h: 247, s: 0.401 })}>
        <h4>Choose your nearest <em>Experience Centre.</em></h4>
        <div className="chips">
          {CITIES.map((c) => (
            <button key={c} type="button" className={`chip${c === city ? ' on' : ''}`} onClick={() => pickCity(c)}>
              {c} <i>{STORES.filter((s) => s.city === c).length}</i>
            </button>
          ))}
        </div>
        <div className="list">
          {list.map((s) => (
            <div key={s.id} role="button" tabIndex={0} className={`store${s.id === selected.id ? ' on' : ''}`} onClick={() => setSelected(s)} onKeyDown={(e) => e.key === 'Enter' && setSelected(s)}>
              <img className="thumb" src={getImageUrl(s.images[0], '100')} alt={s.name} loading="lazy" />
              <div className="info">
                <b>{s.name}</b>
                <span>· {s.label}</span>
                <br />
                {s.address}
              </div>
              <a href={`${SITE_URL}${s.handle}`} target="_blank" rel="noreferrer" className="see" onClick={(e) => e.stopPropagation()}>
                <span>See Details</span>
                <i className="go"><Chevron /></i>
              </a>
            </div>
          ))}
        </div>
        <div className="acts">
          <a href={`${SITE_URL}${selected.handle}`} target="_blank" rel="noreferrer" className="book">Book Appointment <i>›</i></a>
          <a href={selected.direction} target="_blank" rel="noreferrer" className="dir">Directions <Send /></a>
        </div>
        <div className="meta">
          <div><Home /><p><b>10000+</b>Happy Homes</p></div>
          <div><Chat /><p><b>Designer</b>Consultation</p></div>
          <div><Eye /><p><b>Live</b>Visualization</p></div>
        </div>
      </div>
    </>
  )
}
