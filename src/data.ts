import type { Box, MBox } from './utils'

export type Half = { x: number; y: number; w: number; h: number; radius: [number, number, number, number] }
export type BeforeAfter = {
  src: string
  alt: string
  d: Box
  height: number
  halves: [Half, Half]
  origins: [[number, number], [number, number]]
}

export const beforeAfter: BeforeAfter[] = [
  { src: 'ba1', alt: 'Wallpaper — before and after', d: { x: 295, y: 2776, w: 718 }, height: 434, halves: [{ x: 7, y: 7, w: 345, h: 414, radius: [131, 0, 0, 0] }, { x: 360, y: 7, w: 351, h: 414, radius: [0, 0, 114, 0] }], origins: [[25.63, 91.71], [70.06, 91.71]] },
  { src: 'ba2', alt: 'Bedroom — before and after', d: { x: 1047, y: 2776, w: 718 }, height: 434, halves: [{ x: 6, y: 7, w: 345, h: 414, radius: [0, 0, 0, 114] }, { x: 361, y: 7, w: 350, h: 414, radius: [0, 132, 0, 0] }], origins: [[25.35, 91.47], [69.64, 91.47]] },
  { src: 'ba3', alt: 'Wall panel — before and after', d: { x: 295, y: 3250, w: 718 }, height: 436, halves: [{ x: 7, y: 8, w: 345, h: 414, radius: [0, 0, 0, 114] }, { x: 360, y: 8, w: 351, h: 414, radius: [0, 131, 0, 0] }], origins: [[24.93, 90.83], [69.36, 90.83]] },
  { src: 'ba4', alt: 'Flooring — before and after', d: { x: 1047, y: 3250, w: 718 }, height: 436, halves: [{ x: 7, y: 8, w: 350, h: 414, radius: [132, 0, 0, 0] }, { x: 367, y: 8, w: 344, h: 414, radius: [0, 0, 114, 0] }], origins: [[24.37, 91.97], [67.69, 91.97]] },
]

export type CategoryKey = 'wallpaper' | 'panel' | 'flooring'
type Tile = { src: string; x: number; y: number; w: number }

export type Category = {
  key: CategoryKey
  name: string
  href: string
  subtitle?: string
  on: Tile
  off: Tile
  pillX: number
  cards: string[]
}

const cards = (key: CategoryKey) => [1, 2, 3, 4, 5, 6, 7].map((n) => `card-${key}-${n}`)

export const categories: Category[] = [
  {
    key: 'wallpaper',
    name: 'Wallpaper',
    href: '/wallpapers',
    on: { src: 'tile-wallpaper-on', x: 5, y: 8, w: 303 },
    off: { src: 'tile-wallpaper-off', x: 24, y: 53, w: 265 },
    pillX: 54,
    cards: cards('wallpaper'),
  },
  {
    key: 'panel',
    name: 'Wall Panel',
    href: '/panels',
    subtitle: 'Get your home',
    on: { src: 'tile-panel-on', x: 388, y: -9, w: 303 },
    off: { src: 'tile-panel-off', x: 407, y: 50, w: 255 },
    pillX: 438,
    cards: cards('panel'),
  },
  {
    key: 'flooring',
    name: 'Wooden Flooring',
    href: '/wooden-flooring',
    subtitle: 'Get your home',
    on: { src: 'tile-flooring-on', x: 758, y: 4, w: 296 },
    off: { src: 'tile-flooring-off', x: 779, y: 51, w: 255 },
    pillX: 804,
    cards: cards('flooring'),
  },
]

export type WhyItem = { img: string; label: string[]; d: Box; m: MBox; pill: Box; pillM: Box }
export const whyItems: WhyItem[] = [
  { img: 'why1', label: ['30,000 + Designs'], d: { x: 290, y: 7239, w: 293 }, m: { x: 61, y: 1944, w: 120 }, pill: { x: 298, y: 7545, w: 280, h: 75 }, pillM: { x: 63, y: 2061, w: 115, h: 24 } },
  { img: 'why2', label: ['Explore, touch & feel', 'in-person'], d: { x: 686, y: 7239, w: 293 }, m: { x: 222, y: 1944, w: 120 }, pill: { x: 691, y: 7545, w: 283, h: 75 }, pillM: { x: 224, y: 2061, w: 115, h: 25 } },
  { img: 'why3', label: ['Expert Consultation'], d: { x: 1082, y: 7239, w: 293 }, m: { x: 61, y: 2099, w: 120 }, pill: { x: 1087, y: 7544, w: 283, h: 76 }, pillM: { x: 63, y: 2216, w: 115, h: 25 } },
  { img: 'why4', label: ['Visualize before you buy'], d: { x: 1478, y: 7239, w: 293 }, m: { x: 222, y: 2099, w: 120 }, pill: { x: 1483, y: 7544, w: 283, h: 76 }, pillM: { x: 224, y: 2216, w: 115, h: 25 } },
]

export type Room = { key: string; label: string; thumbD: Box; thumbM: Box; slides: string[] }
const slides = (key: string, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => `slide-${key}-${from + i}.webp`)

export const rooms: Room[] = [
  { key: 'living', label: 'Living Area', thumbD: { x: 1450, y: 7964, w: 239 }, thumbM: { x: 160, y: 2306, w: 64 }, slides: slides('living', 0, 4) },
  { key: 'bedroom', label: 'Bedroom', thumbD: { x: 1448, y: 8116, w: 239 }, thumbM: { x: 226, y: 2306, w: 64 }, slides: slides('bedroom', 1, 5) },
  { key: 'tv', label: 'TV Unit', thumbD: { x: 1450, y: 8268, w: 239 }, thumbM: { x: 292, y: 2307, w: 64 }, slides: slides('tv', 1, 5) },
]

export const videos = [
  { alt: 'Pati Patni Interiors Episode 1', src: 'https://materialdepotimages.materialdepot.com/application_image/pati-patni-interiors-ep01.mp4' },
  { alt: 'Pati Patni Interiors Episode 2', src: 'https://materialdepotimages.materialdepot.com/application_image/pati-patni-interiors-ep02.mp4' },
  { alt: 'Customer Experience', src: 'https://materialdepotimages.materialdepot.com/application_image/ugc-content-01.mp4' },
  { alt: 'Home Makeover', src: 'https://materialdepotimages.materialdepot.com/application_image/ugc-content-02.mp4' },
  { alt: 'Interior Styling', src: 'https://materialdepotimages.materialdepot.com/application_image/ugc-content-03.mp4' },
]
