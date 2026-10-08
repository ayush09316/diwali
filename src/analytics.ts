// Same events and destinations as materialdepot.com (materialdepot_nextjs utils/log_events.ts and
// helpers/logging_helper/logger/*). Tags are loaded in index.html; Mixpanel from npm.
//   book_appointment — a Book button was clicked
//   generate_lead    — the consultation was booked (after OTP)
// Per destination this mirrors the main site's loggers:
//   GA4 / Meta pixel: event without PII params (Meta gets PII only as hashed advanced matching)
//   Mixpanel: event with all params (as the main site does)
// MoEngage is not loaded here: its web SDK shows on-site popups. The backend still sends the
// lead to MoEngage when the form is submitted.
//   Pinterest: book_appointment -> 'schedule'      OpenAI: generate_lead -> 'appointment_scheduled'
// Wigzo and the CRM /track-event/ logger do nothing for these events on a logged-out page.
import mixpanel from 'mixpanel-browser'

export const Events = {
  bookAppointment: 'book_appointment',
  bookAppointmentSuccess: 'generate_lead',
  callClick: 'call_click',
} as const

const PIXEL_ID = '552113979128378'
const OPENAI_PIXEL_ID = 'CqnwD988SUYbikbZMZvLxK'
const PII_KEYS = ['phone', 'contact', 'mobile', 'email', 'fName', 'lName', 'f_name', 'l_name', 'pincode']

type Params = Record<string, string | number | null | undefined>
type Fn = (...a: unknown[]) => void
type Win = Window & {
  gtag?: Fn
  fbq?: Fn
  pintrk?: Fn
  oaiq?: Fn
}
const w = () => window as Win

let mixpanelReady = false
try {
  mixpanel.init('c844b410b3f69eb4501a33b728a94bc7', {
    track_pageview: true,
    autotrack: true,
    persistence: 'localStorage',
    record_sessions_percent: 100,
  } as Parameters<typeof mixpanel.init>[1])
  mixpanelReady = true
} catch {
  // tracking must never break the page
}

const safely = (f: () => void) => {
  try {
    f()
  } catch {
    // one destination failing must not stop the others
  }
}
const noPii = (p: Params) => Object.fromEntries(Object.entries(p).filter(([k, v]) => v != null && !PII_KEYS.includes(k)))
const defined = (p: Params) => Object.fromEntries(Object.entries(p).filter(([, v]) => v != null && v !== ''))

export function track(event: string, params: Params = {}) {
  const safe = noPii(params)
  safely(() => w().gtag?.('event', event, safe))
  safely(() => w().fbq?.('trackCustom', event, safe))
  safely(() => mixpanelReady && mixpanel.track(event, defined(params)))
  if (event === Events.bookAppointment) safely(() => w().pintrk?.('track', 'schedule', { lead_type: 'appointment' }))
  if (event === Events.bookAppointmentSuccess) safely(() => w().oaiq?.('measure', 'appointment_scheduled', { type: 'customer_action' }))
}

export type Lead = { userId?: string | null; phone: string; name: string; pincode?: string; city?: string }

const sha256 = async (s: string) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

// Link this visitor to the lead in every tool, as the main site's logger.identify does after
// login. Call before tracking generate_lead.
export async function identify(lead: Lead) {
  const phone = lead.phone.replace(/\D/g, '').slice(-10)
  if (!/^[6-9]\d{9}$/.test(phone)) return
  const [first = '', ...rest] = lead.name.trim().split(/\s+/)
  const last = rest.join(' ')
  const zip = /^\d{6}$/.test(lead.pincode ?? '') ? lead.pincode! : undefined
  const id = lead.userId ? String(lead.userId) : undefined
  const traits = defined({ id, contact: phone, f_name: first, l_name: last, name: lead.name.trim(), pincode: zip, city: lead.city })

  safely(() => {
    if (!mixpanelReady) return
    if (id) mixpanel.identify(id)
    mixpanel.people.set(traits)
  })
  // Google enhanced conversions (sticky for the generate_lead that follows)
  safely(() =>
    w().gtag?.('set', 'user_data', {
      phone_number: `+91${phone}`,
      ...(first ? { address: defined({ first_name: first.toLowerCase(), last_name: last.toLowerCase() || undefined, postal_code: zip, country: 'IN' }) } : {}),
    }),
  )
  // Meta advanced matching
  safely(() => w().fbq?.('init', PIXEL_ID, defined({ ph: `91${phone}`, fn: first.toLowerCase(), ln: last.toLowerCase(), zp: zip, external_id: id, country: 'in' })))
  // OpenAI pixel: hashed identifiers
  try {
    const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}]/gu, '')
    const user = defined({
      country: 'IN',
      phone_number_sha256: await sha256(`91${phone}`),
      first_name_sha256: first ? await sha256(norm(first)) : undefined,
      last_name_sha256: last ? await sha256(norm(last)) : undefined,
      external_id_sha256: id ? await sha256(id) : undefined,
      postal_code: zip,
    })
    w().oaiq?.('init', { pixelId: OPENAI_PIXEL_ID, user })
  } catch {
    // ignore
  }
}
