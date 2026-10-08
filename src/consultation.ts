// "Book Free Online Consultation" lead — same endpoint as materialdepot.com's consultation modal
// (MaterialDepotDjangoBackend users/api/sales/views.py BookConsultationView → Kylas lead).
// city goes to the Kylas lead; name to the user/lead name; pincode and products are saved as the
// Locality and Interested Categories user properties (like the CRM store-visit form), and products
// also set the lead's cfCategoriesOfInterest.
const API = (import.meta.env.VITE_API_URL as string | undefined) ?? 'https://api.materialdepot.com/apiV1'

export const CITIES = [
  { label: 'Bengaluru', value: 'Bangalore' }, // CRM uses "Bangalore"
  { label: 'Hyderabad', value: 'Hyderabad' },
] as const

export const PRODUCTS = [
  { label: 'Wallpaper', value: 'wallpaper' },
  { label: 'Wall Panel', value: 'wall_panel' },
  { label: 'Wooden Flooring', value: 'wooden_flooring' },
] as const

export type Lead = { name: string; contact: string; pincode: string; city: string; products: string[] }

// ---- phone verification (OTP) ------------------------------------------------
// Reuses the site's OTP endpoints purely to prove the number belongs to the visitor.
// verify-otp also returns login tokens; they are ignored (only the user id is read, for
// analytics) and no cookies are kept
// (credentials: 'omit'), so nobody is logged in.
export const OTP_LENGTH = 4

export class OtpError extends Error {}

async function otpCall(path: string, init: RequestInit) {
  const res = await fetch(`${API}/${path}`, { ...init, credentials: 'omit' })
  if (res.status === 429) {
    const text = await res.text().catch(() => '')
    throw new OtpError(text.replace(/^"|"$/g, '') || 'Too many attempts for this number. Please try again later.')
  }
  return res
}

export async function sendOtp(contact: string) {
  const res = await otpCall('login-otp-post1/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contact, country_code: '91', user_source: JSON.stringify({ source: 'diwali_makeover' }) }),
  })
  if (!res.ok) throw new OtpError('Could not send the OTP. Please check the number and try again.')
}

export async function resendOtp(contact: string) {
  const res = await otpCall(`resend-login-otp/?contact=${contact}&country_code=91`, { method: 'GET' })
  if (!res.ok) throw new OtpError('Could not resend the OTP. Please try again.')
}

export async function verifyOtp(contact: string, otp: string) {
  const res = await otpCall('verify-otp/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contact, otp }),
  })
  if (!res.ok) throw new OtpError('Incorrect OTP. Please try again.')
  // only the user id is kept (to link analytics profiles); the login tokens are discarded
  const body = await res.json().catch(() => null)
  return (body?.user?.id ?? body?.id ?? null) as string | null
}

const cookie = (name: string) => document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1]

export async function bookConsultation(lead: Lead) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const fbp = cookie('_fbp')
  const fbc = cookie('_fbc')
  if (fbp) headers['X-Fbp'] = fbp
  if (fbc) headers['X-Fbc'] = fbc

  const res = await fetch(`${API}/book-consultation/`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...lead, banner_type: 'diwali_makeover' }),
  })
  if (!res.ok) throw new Error(`book-consultation failed: ${res.status}`)
}
