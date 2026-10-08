import { asset, only, place } from '../utils'
import { FitText } from './FitText'

// Copy that used to be baked into the page backgrounds, now live text so it stays sharp.
// Each line is [text, x0, top] in design px (ink left / ink top as measured on the mockup);
// a block's lines share the font size of its `ref` line, whose ink spans `w`.
type Line = [text: string, x0: number, top: number]
type Block = { cls: string; ref: string; w: number; d?: Line[]; m?: Line[] }

const FEATURES: Block[] = [
  { cls: 'cap-feat b', ref: '30,000+', w: 70, d: [['30,000+', 591, 1540]] },
  { cls: 'cap-feat', ref: 'Designs', w: 63, d: [['Designs', 595, 1562]] },
  { cls: 'cap-feat', ref: 'Delivered at', w: 96, d: [['Delivered at', 760, 1541]] },
  { cls: 'cap-feat b', ref: 'Your Doorstep', w: 119, d: [['Your Doorstep', 748, 1563]] },
  { cls: 'cap-feat', ref: 'Installation', w: 87, d: [['Installation', 947, 1541]] },
  { cls: 'cap-feat b', ref: 'within 1 day', w: 98, d: [['within 1 day', 941, 1563]] },
  { cls: 'cap-feat b', ref: 'No Renovation', w: 121, d: [['No Renovation', 1111, 1541]] },
  { cls: 'cap-feat', ref: 'Needed', w: 62, d: [['Needed', 1141, 1563]] },
  { cls: 'cap-feat b', ref: '1 Year warranty', w: 130, d: [['1 Year warranty', 1306, 1542]] },
  { cls: 'cap-feat', ref: 'on installation', w: 112, d: [['on installation', 1315, 1563]] },

  { cls: 'cap-feat b', ref: '25,000+', w: 39.7, m: [['25,000+', 67.3, 589.7]] },
  { cls: 'cap-feat', ref: 'Designs', w: 36.7, m: [['Designs', 69.3, 599.7]] },
  { cls: 'cap-feat', ref: 'Delivered at', w: 55.7, m: [['Delivered at', 162.3, 589.7]] },
  { cls: 'cap-feat b', ref: 'Your Doorstep', w: 69, m: [['Your Doorstep', 155.3, 599.7]] },
  { cls: 'cap-feat', ref: 'Installation', w: 51.4, m: [['Installation', 272.3, 589.7]] },
  { cls: 'cap-feat b', ref: 'within 1 day', w: 56.3, m: [['within 1 day', 269.7, 599.3]] },
]

const STEPS: Block[] = [
  {
    cls: 'cap-step-t',
    ref: '01 — Book a Consultation',
    w: 193,
    d: [
      ['01 — Book a Consultation', 342, 5046],
      ['02 — Visit Our Experience Centre', 606, 5045],
      ['03 — Choose Your Materials', 919, 5046],
      ['04 — Get It Delivered', 1222, 5046],
      ['05 — Get It Installed', 1507, 5046],
    ],
  },
  {
    cls: 'cap-step-p',
    ref: 'your nearest Experience Centre',
    w: 239,
    d: [
      ['We’ll understand your needs', 330, 5074],
      ['and book an appointment at', 333, 5093],
      ['your nearest Experience Centre', 319, 5111],
      ['Explore 25,000+ designs in', 631, 5074],
      ['wallpapers, wall panels and', 629, 5093],
      ['wooden flooring', 670, 5111],
      ['Get expert guidance and', 933, 5074],
      ['shortlist the materials that', 927, 5093],
      ['bring your vision to life.', 938, 5111],
      ['We deliver your selected', 1209, 5074],
      ['materials to your doorstep,', 1201, 5093],
      ['ready for installation.', 1224, 5111],
      ['Our installation support', 1496, 5074],
      ['helps bring your chosen', 1494, 5093],
      ['look to life', 1545, 5111],
    ],
  },
  {
    cls: 'cap-step-t',
    ref: '01 Book a Consultation',
    w: 133.7,
    m: [
      ['01 Book a Consultation', 58, 2003.7],
      ['02 Visit Our Experience Centre', 55.3, 2064.3],
      ['03 Choose Your Materials', 53.7, 2126.3],
      ['04 Get It Delivered', 53.3, 2187.3],
      ['05 Get It Installed', 53.7, 2253.7],
    ],
  },
  {
    cls: 'cap-step-p',
    ref: 'We’ll understand your needs and book an',
    w: 176.7,
    m: [
      ['We’ll understand your needs and book an', 53, 2019.3],
      ['appointment at your nearest Experience Centre.', 53.3, 2028.3],
      ['Explore 25,000+ designs in wallpapers,', 53.3, 2078.7],
      ['wall panels and wooden flooring', 53.3, 2087.7],
      ['Get expert guidance and shortlist', 53.3, 2141],
      ['the materials that bring your vision to life.', 53.3, 2150],
      ['We deliver your selected materials to', 53.3, 2204],
      ['your doorstep, ready for installation.', 53.3, 2213],
      ['Our installation support helps', 53.3, 2269.3],
      ['bring your chosen look to life', 53.3, 2278.3],
    ],
  },
]

function Lines({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.flatMap((b) => [
        ...(b.d ?? []).map(([t, x, y]) => (
          <FitText key={`d${t}${y}`} fit={[x, x + b.w, y]} refText={b.ref} className={`cap ${b.cls}`}>{t}</FitText>
        )),
        ...(b.m ?? []).map(([t, x, y]) => (
          <FitText key={`m${t}${y}`} fitM={[x, x + b.w, y]} refText={b.ref} className={`cap ${b.cls}`}>{t}</FitText>
        )),
      ])}
    </>
  )
}

// Feature-strip icons (sharp 3x exports; the blurry ones were erased from the backgrounds).
// Boxes match where each icon sat in the mockup; mobile shows the first three.
type IconBox = { x: number; y: number; w: number; h: number }
const ICONS: { name: string; alt: string; d: IconBox; m?: IconBox }[] = [
  { name: 'designs', alt: 'Designs', d: { x: 579, y: 1432, w: 96, h: 93 }, m: { x: 68, y: 545, w: 40, h: 38.75 } },
  { name: 'truck', alt: 'Delivery', d: { x: 760, y: 1432, w: 96, h: 92 }, m: { x: 170, y: 545, w: 40, h: 38.33 } },
  { name: 'clock', alt: 'Quick installation', d: { x: 947, y: 1432, w: 88, h: 92 }, m: { x: 277.7, y: 545, w: 39.5, h: 41.3 } },
  { name: 'hammer', alt: 'No renovation', d: { x: 1128, y: 1432, w: 87, h: 92 } },
  { name: 'shield', alt: 'Warranty', d: { x: 1325, y: 1432, w: 93, h: 90 } },
]

export const FeatureCaptions = () => (
  <>
    {ICONS.map((i) => (
      <img key={i.name} className={`a${only(i.d, i.m)} feat-icon`} style={place(i.d, i.m)} src={asset(`feat-${i.name}`)} alt="" aria-hidden />
    ))}
    <Lines blocks={FEATURES} />
  </>
)
export const StepCaptions = () => <Lines blocks={STEPS} />
