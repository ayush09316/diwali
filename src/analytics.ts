// Same events and tags as materialdepot.com (materialdepot_nextjs utils/log_events.ts and
// helpers/logging_helper/logger): GTM + GA4 + Meta pixel are loaded in index.html.
//   book_appointment — a Book button was clicked
//   generate_lead    — the consultation was booked (after OTP)
// PII never goes out as event parameters; Meta gets it only as hashed advanced matching (init).
export const Events = {
  bookAppointment: 'book_appointment',
  bookAppointmentSuccess: 'generate_lead',
} as const

const PIXEL_ID = '552113979128378'
const PII_KEYS = ['phone', 'contact', 'mobile', 'email', 'fName', 'lName', 'f_name', 'l_name', 'pincode']

type Params = Record<string, string | number | null | undefined>
type Win = Window & { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void }

const clean = (p: Params) => Object.fromEntries(Object.entries(p).filter(([k, v]) => v != null && !PII_KEYS.includes(k)))

// Meta advanced matching, as the main site's FacebookLogger.identify does on a lead
function identify(p: Params) {
  const w = window as Win
  const ph = String(p.phone ?? '').replace(/\D/g, '').slice(-10)
  const [fn, ...rest] = String(p.fName ?? '').trim().toLowerCase().split(/\s+/).filter(Boolean)
  const data: Record<string, string> = {}
  if (/^[6-9]\d{9}$/.test(ph)) data.ph = `91${ph}`
  if (fn) data.fn = fn
  if (rest.length) data.ln = rest.join(' ')
  const zp = String(p.pincode ?? '').replace(/\s/g, '')
  if (zp) data.zp = zp
  if (data.ph) w.fbq?.('init', PIXEL_ID, { ...data, country: 'in' })
}

export function track(event: string, params: Params = {}) {
  try {
    const w = window as Win
    if (event === Events.bookAppointmentSuccess) identify(params)
    const safe = clean(params)
    w.gtag?.('event', event, safe)
    w.fbq?.('trackCustom', event, safe)
  } catch {
    // tracking must never break the page
  }
}
