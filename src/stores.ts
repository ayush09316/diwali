export const SITE_URL = 'https://materialdepot.com'

export const CITIES = ['Bengaluru', 'Hyderabad'] as const
export type City = (typeof CITIES)[number]

export type Store = {
  id: number
  city: City
  name: string
  label: string
  address: string
  hours: string
  area: string
  rating?: string
  reviews?: string
  direction: string
  handle: string
  images: string[]
}

const img = (host: 'in' | 'com', name: string) => `https://materialdepotimages.materialdepot.${host}/application_image/${name}`
const series = (host: 'in' | 'com', prefix: string, exts: string[]) =>
  exts.map((ext, i) => img(host, `${prefix}${String(i + 1).padStart(2, '0')}.${ext}`))

export const STORES: Store[] = [
  {
    id: 1,
    city: 'Bengaluru',
    name: 'J.P. Nagar',
    label: 'BENGALURU',
    address: 'Ground Floor, 15, Bannerghatta Road, Sarakki, Industrial Layout, 3rd Phase',
    hours: '10 AM – 9 PM',
    area: '8,500 sq ft',
    rating: '4.7',
    reviews: '2,109',
    direction: 'https://www.google.com/maps/place/Material+Depot+-+JP+Nagar+(Tiles,+Laminates,+Wall+Panels+%26+more!)/@12.9119808,77.5996881,15z/data=!4m6!3m5!1s0x3bcb91ff8da48c9b:0x9dc7d8d546f346f8!8m2!3d12.9119808!4d77.5996881!16s%2Fg%2F11pts8mrld?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D',
    handle: '/store/bengaluru/jp-nagar-material-store',
    images: [
      img('in', 'jpnagar-store-photo-1.jpeg'),
      img('in', 'jpnagar-store-photo-2.jpg'),
      img('in', 'jpnagar-store-photo-3.jpg'),
      img('in', 'jpnagar-store-photo-4.jpeg'),
      img('in', 'jpnagar-store-photo-5.jpg'),
    ],
  },
  {
    id: 36,
    city: 'Bengaluru',
    name: 'Whitefield',
    label: 'BENGALURU',
    address: 'Ground Floor, 2, Puttapa Industrial Estate, Mahadevapura Main Rd',
    hours: '10 AM – 9 PM',
    area: '10,000 sq ft',
    rating: '4.9',
    reviews: '602',
    direction: 'https://www.google.com/maps/place/Material+Depot+%E2%80%93+Whitefield+(Tiles,+Laminates,+Wall+Panels+%26+more!)/@12.9961662,77.6877632,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae11f62012cf3f:0x479768cfdaf9a9a!8m2!3d12.9961662!4d77.6903381!16s%2Fg%2F11x8czvfvr?entry=tts&g_ep=EgoyMDI1MDgxMC4wIPu8ASoASAFQAw%3D%3D&skid=25a27c99-3e3b-4480-90d7-0c96ea43151e',
    handle: '/store/bengaluru/whitefield-material-store',
    images: [
      img('in', 'whitefield-store-photo-1.jpg'),
      img('in', 'whitefield-store-photo-2.jpeg'),
      img('in', 'whitefield-store-photo-3.jpeg'),
      img('in', 'whitefield-store-photo-4.jpeg'),
      img('in', 'whitefield-store-photo-5.jpeg'),
    ],
  },
  {
    id: 2,
    city: 'Bengaluru',
    name: 'Yelahanka',
    label: 'BENGALURU',
    address: '3rd Floor, RM Square, SH 9, Ambedkar Colony, Yelahanka New Town',
    hours: '10 AM – 9 PM',
    area: '4,000 sq ft',
    rating: '4.7',
    reviews: '899',
    direction: 'https://www.google.com/maps/place/Material+Depot+-+Yelahanka+(Tiles,+Laminates,+Wall+Panels+%26+more!)/@13.0928087,77.5939621,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae19cc244e13d1:0x7758b4eb3b7ef7aa!8m2!3d13.0928087!4d77.5939621!16s%2Fg%2F11x7cttrpq?entry=tts&g_ep=EgoyMDI1MDUwNy4wIPu8ASoASAFQAw%3D%3D&skid=7842a854-3e9d-4aa0-9682-ff90ae087ef4',
    handle: '/store/bengaluru/yelahanka-material-store',
    images: [
      img('in', 'yelahanka-store-photo-1.png'),
      img('in', 'yelahanka-store-photo-2.jpeg'),
      img('in', 'yelahanka-store-photo-3.jpeg'),
      img('in', 'yelahanka-store-photo-4.jpeg'),
      img('in', 'yelahanka-store-photo-5.jpeg'),
    ],
  },
  {
    id: 5,
    city: 'Hyderabad',
    name: 'Gachibowli',
    label: 'HYDERABAD',
    address: 'Financial District, Gachibowli, Nallagandla, Tellapur',
    hours: '10 AM – 9 PM',
    area: '13,000 sq ft',
    direction: 'https://maps.app.goo.gl/yR3jAwvHUejzUFMr9',
    handle: '/store/hyderabad/gachibowli-material-store',
    images: [
      img('com', 'gachibowli-store-image.png'),
      ...series('com', 'gachibowli-store-render-', Array(19).fill('png')),
    ],
  },
  {
    id: 4,
    city: 'Hyderabad',
    name: 'Kompally',
    label: 'HYDERABAD',
    address: 'Near Suchitra Junction Medchal Road, Suchitra Rd, beside Hyundai Service Centre, Hyderabad, Telangana 500067',
    hours: '10 AM – 9 PM',
    area: '20,000 sq ft',
    direction: 'https://maps.app.goo.gl/u5jvFLkvcNRqDmVf7',
    handle: '/store/hyderabad/kompally-material-store',
    images: [
      img('com', 'kompally-master-storev01.png'),
      img('com', 'kompally-store-0.jpeg'),
      img('com', 'kompally-store-1.png'),
      img('com', 'kompally-store-2.png'),
      img('com', 'kompally-store-3.png'),
      img('com', 'kompally-store-4.png'),
      img('com', 'kompally-store-5.jpeg'),
    ],
  },
  {
    id: 6,
    city: 'Bengaluru',
    name: 'HSR Layout',
    label: 'BENGALURU',
    address: 'Masti Square, No:1565, Outer Ring Rd, Agara Village, 1st Sector, HSR Layout',
    hours: '10 AM – 9 PM',
    area: '',
    direction: 'https://maps.app.goo.gl/LyPQ54eawLt16QLCA',
    handle: '/store/bengaluru/hsr-layout-material-store',
    images: series('com', 'mdepot-hsr-layout-store-', [
      'png', 'png', 'png', 'png', 'png', 'png', 'png', 'png', 'jpeg', 'png',
      'png', 'jpeg', 'jpeg', 'png', 'jpeg', 'png', 'png', 'png', 'png',
    ]),
  },
  {
    id: 7,
    city: 'Bengaluru',
    name: 'Basaveshwar Nagar',
    label: 'BENGALURU',
    address: 'Pavithra Paradise, 80 Feet Ring Rd, next to Punya Hospital, KHB Colony, Basaveshwar Nagar, 560079',
    hours: '10 AM – 9 PM',
    area: '',
    direction: 'https://maps.app.goo.gl/npJa19Jp7kFRwRBt9',
    handle: '/store/bengaluru/basaveshwar-nagar-material-store',
    images: [1, 2, 3, 4].map((n) => img('com', `Basaveshwar-nagar-store-materialdepot-0${n}.png`)),
  },
]
