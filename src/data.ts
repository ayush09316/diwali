import type { Box } from './utils'

// "Three Quick Upgrades" carousel — images live at /assets/ba-<key>-before.webp / -after.webp
export type Transformation = { key: string; alt: string }
export const transformations: Record<'wallpaper' | 'panel' | 'flooring', Transformation[]> = {
  wallpaper: [
    { key: 'wallpaper-1', alt: 'Living room — palace mural wallpaper' },
    { key: 'wallpaper-2', alt: 'TV unit — tropical arch wallpaper' },
    { key: 'wallpaper-3', alt: 'Study corner — landscape mural wallpaper' },
    { key: 'wallpaper-4', alt: 'Living room — pichwai panel wallpaper' },
    { key: 'wallpaper-5', alt: 'Bedroom — striped border wallpaper' },
    { key: 'wallpaper-6', alt: 'Bedroom — forest panel wallpaper' },
    { key: 'wallpaper-7', alt: 'Bedroom — floral wallpaper' },
  ],
  panel: [
    { key: 'panel-1', alt: 'Living room — fluted wall panel with mural' },
    { key: 'panel-2', alt: 'Bedroom — wave wall panel' },
    { key: 'panel-3', alt: 'Arched niches with fluted wall panel' },
    { key: 'panel-4', alt: 'Living room — wooden feature wall panel' },
    { key: 'panel-5', alt: 'Foyer — panelled console wall' },
    { key: 'panel-6', alt: 'Bedroom — fluted headboard wall panel' },
  ],
  flooring: [
    { key: 'flooring-1', alt: 'Bedroom corner — wooden flooring' },
    { key: 'flooring-2', alt: 'Bedroom — wooden flooring' },
    { key: 'flooring-3', alt: 'Bedroom — light wooden flooring' },
    { key: 'flooring-4', alt: 'Bedroom — herringbone wooden flooring' },
    { key: 'flooring-5', alt: 'Bedroom — dark wooden flooring' },
    { key: 'flooring-6', alt: 'Living room — wooden flooring' },
  ],
}

export type CategoryKey = 'wallpaper' | 'panel' | 'flooring'

export type Category = {
  key: CategoryKey
  name: string
  href: string // Explore More card → full collection
  price?: number
  on: string // tile image when selected
  off: string
  tileD: Box
  tileM: Box
  pillD: Box
  pillM: Box
  tabW: number // inactive Explore tab width (desktop)
  cards: Card[]
}

export type Card = { img: string; name: string; href: string }
// card-<key>-<n> images in display order, each linking to its own listing (paths on SITE_URL)
const cards = (key: CategoryKey, list: [name: string, href: string][]): Card[] =>
  list.map(([name, href], i) => ({ img: `card-${key}-${i + 1}`, name, href }))

export const categories: Category[] = [
  {
    key: 'wallpaper',
    name: 'Wallpaper',
    href: '/wallpapers/collection',
    price: 26,
    on: 'tile-wallpaper-on',
    off: 'tile-wallpaper-off',
    tileD: { x: 648.5, y: 2014, w: 189 }, // same size as the other tiles (the mockup drew it in its selected state)
    tileM: { x: 19.5, y: 776.6, w: 94 },
    pillD: { x: 660, y: 2246, w: 166, h: 32 },
    pillM: { x: 25, y: 878, w: 83, h: 16 },
    tabW: 152,
    cards: cards('wallpaper', [
      ['Tropical', '/tropical-wallpapers'],
      ['Chinoiserie', '/chinoserie-wallpapers'],
      ['Indian', '/indian-wallpapers'],
      ['Floral', '/floral-wallpapers'],
      ['Pichwai', '/pichwai-wallpapers'],
      ['Mural', '/mural-wallpapers'],
      ['Kids', '/kids-room-wallpapers'],
    ]),
  },
  {
    key: 'panel',
    name: 'Wall Panel',
    href: '/panels/collection',
    price: 450,
    on: 'tile-panel-on',
    off: 'tile-panel-off',
    tileD: { x: 933, y: 2003, w: 189 },
    tileM: { x: 161, y: 772, w: 94 },
    pillD: { x: 939, y: 2246, w: 166, h: 32 },
    pillM: { x: 164, y: 878, w: 83, h: 16 },
    tabW: 154,
    cards: cards('panel', [
      ['Wood', '/wood-look-panel'],
      ['Marble & Stone', '/marble-stone-panel'],
      ['Solid Colour', '/solid-colour-panels'],
      ['Geometric', '/geometric-panel'],
      ['Digital Patterns', '/patterned-look-panel'],
      ['Luxury Engravings', '/luxury-panels'],
      ['3D', '/3d-wall-panel'],
    ]),
  },
  {
    key: 'flooring',
    name: 'Wooden Flooring',
    href: '/wooden-flooring',
    price: 61,
    on: 'tile-flooring-on',
    off: 'tile-flooring-off',
    tileD: { x: 1196, y: 2010, w: 184 },
    tileM: { x: 291, y: 773, w: 94 },
    pillD: { x: 1182, y: 2246, w: 213, h: 33 },
    pillM: { x: 285, y: 878, w: 106, h: 16 },
    tabW: 198,
    cards: cards('flooring', [
      ['Natural Oak Light Wood', '/sp-00123-spc-floor-texture-finish-stone-core-4-ft-x-7-2-inch-x-6-5-mm/product'],
      ['HDF Brazilian Cherry', '/lf-00320-h-hdf-real-wood-matte-surface-laminate-wood-floor-ac4-grade-memento-brazilian-cherry-48-x-8-inch-1217x196-mm-8-mm/product'],
      ['Driftwood Grey Matte Finish', '/sp-00107-matte-finish-spc-floor-1220-x-181-mm-5-mm-b9mck6ad/product'],
      ['HDF Herringbone Matte', '/lf-00331-d-hdf-herringbone-matte-surface-ac5-grade-beaconia-olivia-19-x-4-inch-470x95-mm-8-mm/product'],
      ['Umber Brown Matte Finish', '/sp-00116-matte-finish-spc-floor-1220-x-181-mm-5-mm-inb55vkt/product'],
      ['Taupe Brown Matte Finish', '/sp-00108-matte-finish-spc-floor-1220-x-181-mm-5-mm-zer57gdd/product'],
      ['HDF Forest Oak', '/lf-00332-b-hdf-herringbone-matte-surface-ac5-grade-beaconia-forest-oak-19-x-4-inch-470x95-mm-8-mm/product'],
    ]),
  },
]

export type WhyItem = { img: string; label: string[]; d: Box; m: Box; pill: Box; pillM: Box }
export const whyItems: WhyItem[] = [
  { img: 'why1', label: ['30,000 + Designs'], d: { x: 264, y: 5449, w: 299 }, m: { x: 14, y: 2404, w: 160 }, pill: { x: 268, y: 5762, w: 285, h: 76 }, pillM: { x: 16, y: 2561, w: 154, h: 33 } },
  { img: 'why2', label: ['Explore, touch & feel', 'in-person'], d: { x: 665, y: 5449, w: 299 }, m: { x: 230, y: 2404, w: 160 }, pill: { x: 666, y: 5763, w: 288, h: 76 }, pillM: { x: 232, y: 2561, w: 154, h: 33 } },
  { img: 'why3', label: ['Expert Consultation'], d: { x: 1065, y: 5441, w: 299 }, m: { x: 13, y: 2610, w: 160 }, pill: { x: 1066, y: 5761, w: 288, h: 77 }, pillM: { x: 16, y: 2774, w: 154, h: 33 } },
  { img: 'why4', label: ['Visualize before you buy'], d: { x: 1465, y: 5451, w: 299 }, m: { x: 228, y: 2615, w: 160 }, pill: { x: 1472, y: 5761, w: 288, h: 77 }, pillM: { x: 232, y: 2773, w: 154, h: 33 } },
]

export type Room = { key: string; label: string; thumbD: Box; thumbM: Box; slides: string[] }
const slides = (key: string, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => `slide-${key}-${from + i}.webp`)

export const rooms: Room[] = [
  { key: 'living', label: 'Living Area', thumbD: { x: 1444, y: 6078, w: 244 }, thumbM: { x: 25, y: 2968, w: 111, h: 69 }, slides: slides('living', 0, 9) },
  { key: 'bedroom', label: 'Bedroom', thumbD: { x: 1443, y: 6236, w: 244 }, thumbM: { x: 144, y: 2968, w: 113, h: 69 }, slides: slides('bedroom', 1, 10) },
  { key: 'tv', label: 'TV Unit', thumbD: { x: 1445, y: 6394, w: 244 }, thumbM: { x: 266, y: 2968, w: 113, h: 69 }, slides: slides('tv', 1, 10) },
]

// Tiles play in the on-page lightbox. `instagram` holds each tile's post — not linked for now.
export const videos: { alt: string; src: string; instagram: string }[] = [
  { alt: 'Pati Patni Interiors Episode 1', src: 'https://materialdepotimages.materialdepot.com/application_image/pati-patni-interiors-ep01.mp4', instagram: 'https://www.instagram.com/p/DYwEnSOBdrw/' },
  { alt: 'Pati Patni Interiors Episode 2', src: 'https://materialdepotimages.materialdepot.com/application_image/pati-patni-interiors-ep02.mp4', instagram: 'https://www.instagram.com/p/DaiNo9ChRkb/' },
  { alt: 'Customer Experience', src: 'https://materialdepotimages.materialdepot.com/application_image/ugc-content-01.mp4', instagram: 'https://www.instagram.com/p/Ddsf6UfTh_s/' },
  { alt: 'Home Makeover', src: 'https://materialdepotimages.materialdepot.com/application_image/ugc-content-02.mp4', instagram: 'https://www.instagram.com/p/Dd8-zyDzDSL/' },
  { alt: 'Interior Styling', src: 'https://materialdepotimages.materialdepot.com/application_image/ugc-content-03.mp4', instagram: 'https://www.instagram.com/p/DaVEGQYu_aW/' },
]
