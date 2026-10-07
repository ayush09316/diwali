import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { asset } from '../utils'
import { useIsDesktop } from '../hooks/useDesignCanvas'
import { bookConsultation, CITIES, PRODUCTS } from '../consultation'

type Rect = [x: number, y: number, w: number, h: number]
type Layout = {
  size: [number, number]
  bg: string
  font: { label: number; chip: number; product: number; banner: number; submit: number }
  chip: { city: [pad: number, square: number, gap: number]; product: [pad: number, square: number, gap: number] }
  bannerPad: number
  labels: [x: number, y: number][] // name, contact, pincode, city — ink top-left
  inputs: Rect[]
  cities: Rect[]
  banner: Rect
  products: Rect[]
  submit: Rect
}

// Positions in each design frame's own pixels (desktop 943×583, mobile 556×713)
const DESKTOP: Layout = {
  size: [943, 583],
  bg: 'consult-bg-d',
  font: { label: 18.4, chip: 12.2, product: 12.6, banner: 18.3, submit: 21 },
  chip: { city: [7, 14, 13], product: [5, 15, 12] },
  bannerPad: 13,
  labels: [[284, 32], [286, 128], [285, 224], [285, 320]],
  inputs: [[274, 62, 375, 42], [274, 158, 375, 42], [274, 254, 375, 42]],
  cities: [[274, 342, 111, 32], [393, 342, 111, 32]],
  banner: [274, 400, 342, 29],
  products: [[274, 437, 118, 33], [401, 437, 118, 33], [528, 437, 140, 33]],
  submit: [274, 511, 375, 42],
}
const MOBILE: Layout = {
  size: [556, 713],
  bg: 'consult-bg-m',
  font: { label: 21.4, chip: 14.6, product: 14.1, banner: 21.9, submit: 21.2 },
  chip: { city: [7, 19, 18], product: [5, 19, 15] },
  bannerPad: 8,
  labels: [[80, 66], [85, 175], [84, 284], [84, 393]],
  inputs: [[69, 100, 428, 48], [69, 209, 428, 48], [69, 318, 428, 48]],
  cities: [[69, 420, 135, 39], [214, 420, 135, 39]],
  banner: [65, 506, 391, 32],
  products: [[65, 548, 134, 38], [210, 548, 135, 38], [355, 548, 161, 38]],
  submit: [158, 612, 233, 49],
}

const box = ([x, y, w, h]: Rect): CSSProperties => ({ left: x, top: y, width: w, height: h })
const chipVars = ([pad, square, gap]: [number, number, number]) => ({ '--pad': `${pad}px`, '--sq': `${square}px`, '--gap': `${gap}px` }) as CSSProperties
const FIELDS = [
  { key: 'name', label: 'Name', type: 'text', autoComplete: 'name', inputMode: 'text' },
  { key: 'contact', label: 'Contact Number', type: 'tel', autoComplete: 'tel-national', inputMode: 'numeric' },
  { key: 'pincode', label: 'Pincode', type: 'text', autoComplete: 'postal-code', inputMode: 'numeric' },
] as const
type FieldKey = (typeof FIELDS)[number]['key']

function validate(v: Record<FieldKey, string>, products: string[]) {
  const errors: Partial<Record<FieldKey | 'products', string>> = {}
  if (v.name.trim().length < 2) errors.name = 'Please enter your name'
  if (!/^[6-9]\d{9}$/.test(v.contact)) errors.contact = 'Enter a valid 10-digit mobile number'
  if (!/^[1-9]\d{5}$/.test(v.pincode)) errors.pincode = 'Enter a valid 6-digit pincode'
  if (!products.length) errors.products = 'Pick at least one product'
  return errors
}

// keep digits only; drop a leading +91 / 0 from pasted phone numbers
const digits = (key: FieldKey, raw: string) => {
  if (key === 'name') return raw
  let d = raw.replace(/\D/g, '')
  if (key === 'contact' && d.length > 10) d = d.replace(/^(91|0)/, '')
  return d.slice(0, key === 'contact' ? 10 : 6)
}

function useFitScale([w, h]: [number, number]) {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerWidth - 24) / w, (window.innerHeight - 24) / h))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [w, h])
  return scale
}

export function ConsultModal({ onClose }: { onClose: () => void }) {
  const L = useIsDesktop() ? DESKTOP : MOBILE
  const scale = useFitScale(L.size)
  const [values, setValues] = useState<Record<FieldKey, string>>({ name: '', contact: '', pincode: '' })
  const [city, setCity] = useState<string>(CITIES[0].value)
  const [products, setProducts] = useState<string[]>(PRODUCTS.map((p) => p.value))
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const firstInput = useRef<HTMLInputElement>(null)
  const errors = validate(values, products)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    firstInput.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (Object.keys(errors).length || status === 'sending') return
    setStatus('sending')
    try {
      await bookConsultation({ ...values, name: values.name.trim(), city, products })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  const toggleProduct = (value: string) =>
    setProducts((p) => (p.includes(value) ? p.filter((v) => v !== value) : [...p, value]))

  const [W, H] = L.size
  return createPortal(
    <div className="consult-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="consult"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-title"
        style={{ width: W, height: H, zoom: scale, backgroundImage: `url(${asset(L.bg)})` }}
      >
        <h2 id="consult-title" className="sr-only">Book Free Online Consultation</h2>
        <button type="button" className="consult-close" aria-label="Close" onClick={onClose}>×</button>

        {status === 'done' ? (
          <div className="consult-done" role="status">
            <b>Thank you!</b>
            <p>Our design expert will call you shortly to plan your Diwali makeover.</p>
            <button type="button" className="consult-submit" style={{ fontSize: L.font.submit }} onClick={onClose}>Close</button>
          </div>
        ) : (
          <form noValidate onSubmit={submit}>
            {FIELDS.map((f, i) => (
              <label key={f.key} className="consult-field">
                <span className="consult-label" style={{ left: L.labels[i][0], top: L.labels[i][1], fontSize: L.font.label }}>{f.label}</span>
                <input
                  ref={i === 0 ? firstInput : undefined}
                  className={`consult-input${touched && errors[f.key] ? ' invalid' : ''}`}
                  style={box(L.inputs[i])}
                  type={f.type}
                  name={f.key}
                  inputMode={f.inputMode}
                  autoComplete={f.autoComplete}
                  maxLength={f.key === 'name' ? 60 : undefined}
                  value={values[f.key]}
                  aria-invalid={touched && !!errors[f.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: digits(f.key, e.target.value) }))}
                />
                {touched && errors[f.key] && (
                  <span className="consult-error" style={{ left: L.inputs[i][0], top: L.inputs[i][1] + L.inputs[i][3] + 3 }}>{errors[f.key]}</span>
                )}
              </label>
            ))}

            <fieldset className="consult-group">
              <legend className="consult-label" style={{ left: L.labels[3][0], top: L.labels[3][1], fontSize: L.font.label }}>City</legend>
              {CITIES.map((c, i) => (
                <label key={c.value} className="consult-chip city" style={{ ...box(L.cities[i]), ...chipVars(L.chip.city), fontSize: L.font.chip }}>
                  <input type="radio" name="city" value={c.value} checked={city === c.value} onChange={() => setCity(c.value)} />
                  <i aria-hidden="true" />
                  {c.label}
                </label>
              ))}
            </fieldset>

            <fieldset className="consult-group">
              <legend className="consult-banner" style={{ ...box(L.banner), fontSize: L.font.banner, paddingLeft: L.bannerPad }}>What products you are Interested in?</legend>
              {PRODUCTS.map((p, i) => (
                <label key={p.value} className="consult-chip product" style={{ ...box(L.products[i]), ...chipVars(L.chip.product), fontSize: L.font.product }}>
                  <input type="checkbox" value={p.value} checked={products.includes(p.value)} onChange={() => toggleProduct(p.value)} />
                  <i aria-hidden="true" />
                  {p.label}
                </label>
              ))}
              {touched && errors.products && (
                <span className="consult-error" style={{ left: L.products[0][0], top: L.products[0][1] + L.products[0][3] + 3 }}>{errors.products}</span>
              )}
            </fieldset>

            <button type="submit" className="consult-submit" style={{ ...box(L.submit), fontSize: L.font.submit }} disabled={status === 'sending'}>
              {status === 'sending' ? 'Submitting…' : 'Submit'}
            </button>
            {status === 'error' && (
              <span className="consult-error center" role="alert" style={{ left: L.submit[0], width: L.submit[2], top: L.submit[1] + L.submit[3] + 4 }}>
                Something went wrong — please try again or call +91 81215 23945.
              </span>
            )}
          </form>
        )}
      </div>
    </div>,
    document.body,
  )
}
