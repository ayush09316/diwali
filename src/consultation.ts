// "Book Free Online Consultation" lead — same endpoint as materialdepot.com's consultation modal
// (MaterialDepotDjangoBackend users/api/sales/views.py BookConsultationView → Kylas lead).
// It currently reads only `contact`, `city` and `banner_type`; name/pincode/products are sent
// along so they are captured as soon as the backend stores them.
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
