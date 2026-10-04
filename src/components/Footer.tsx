import { Fragment } from 'react'
import { place } from '../utils'
import { SITE_URL } from '../stores'
import { FitText } from './FitText'

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/materialdepot',
    path: 'M3 3h18v18H3zM7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/materialdepot/',
    path: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17.5 6.5v.01',
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/materialdepot',
    path: 'M22 5.9a8 8 0 0 1-2.3.6 4 4 0 0 0 1.8-2.2 8 8 0 0 1-2.5 1 4 4 0 0 0-6.8 3.6A11.4 11.4 0 0 1 3.9 4.7a4 4 0 0 0 1.2 5.4 4 4 0 0 1-1.8-.5 4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.1 11.4 11.4 0 0 0 8.2 20c7.4 0 11.5-6.2 11.5-11.5v-.5A8.2 8.2 0 0 0 22 5.9z',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@materialdepot',
    fill: 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/materialdepot/',
    fill: 'M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 12 2z',
  },
  {
    label: 'Pinterest',
    href: 'https://www.pinterest.com/materialdepot/',
    fill: 'M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.9 0-2.5-1.8-4.3-4.4-4.3-3 0-4.8 2.3-4.8 4.6 0 .9.4 1.9.8 2.4l.1.4-.3 1.2c0 .2-.2.3-.4.2-1.4-.6-2.2-2.6-2.2-4.2 0-3.4 2.5-6.6 7.2-6.6 3.8 0 6.7 2.7 6.7 6.3 0 3.8-2.4 6.8-5.7 6.8-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.2 1-.9 2.2-1.4 2.9A10 10 0 1 0 12 2z',
  },
]

const LEGAL = [
  { label: 'Terms & Conditions', href: '/terms', fit: [583, 732, 10123], fitM: [50, 104, 3220] },
  { label: 'Privacy Policy', href: '/privacy', fit: [776, 883, 10123], fitM: [121, 160, 3220] },
  { label: 'Cancellation & Refund Policy', href: '/cancellation-refund-policy', fit: [926, 1147, 10123], fitM: [177, 257, 3220] },
  { label: 'Shipping & Service Policy', href: '/shipping-service-policy', fit: [1190, 1386, 10123], fitM: [273, 344, 3220] },
] as const

const SEPARATORS = [
  { d: { x: 753, y: 10123, w: 2, h: 21 }, m: { x: 112, y: 3220, w: 1, h: 8 } },
  { d: { x: 903, y: 10123, w: 2, h: 21 }, m: { x: 168, y: 3220, w: 1, h: 8 } },
  { d: { x: 1167, y: 10123, w: 2, h: 21 }, m: { x: 265, y: 3220, w: 1, h: 8 } },
]

export function Footer() {
  return (
    <footer>
      <FitText fit={[798, 1253, 9561]} fitM={[152, 256, 3014]} className="f1 rv">This Festive Season</FitText>
      <FitText as="h3" fit={[509, 1513, 9622]} fitM={[86, 315, 3028]} className="f2 rv">Beautiful Homes, Brighter Moments</FitText>

      <FitText fit={[114, 300, 9960]} fitM={[26, 128, 3087]} className="foot-brand">Material Depot</FitText>
      <FitText as="a" href="tel:+918121523945" fit={[113, 254, 10020]} fitM={[25, 103, 3120]} className="foot-text">+91 81215 23945</FitText>
      <a href="tel:+918121523945" className="a foot-call" style={place({ x: 266, y: 10010, w: 91, h: 37 }, { x: 109, y: 3114, w: 50, h: 19 })} data-fsw="34" data-fsw-m="16" data-fst="Call">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" aria-hidden="true">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
        </svg>
        Call
      </a>
      <svg className="a foot-mail" style={place({ x: 393, y: 10020, w: 18, h: 20 }, { x: 178, y: 3120, w: 10, h: 10 })} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path d="M3 5h18v14H3zM3 5l9 7 9-7" />
      </svg>
      <FitText as="a" href="mailto:contact@materialdepot.com" fit={[422, 680, 10020]} fitM={[194, 335, 3120]} className="foot-text">contact@materialdepot.com</FitText>

      <div className="a foot-social" style={place({ x: 113, y: 10063, w: 247, h: 28 }, { x: 26, y: 3143, w: 134, h: 15 })}>
        {SOCIALS.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {'path' in s && s.path && <path d={s.path} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />}
              {'fill' in s && s.fill && <path d={s.fill} fill="currentColor" />}
            </svg>
          </a>
        ))}
      </div>

      <a href="https://forms.gle/mnKUWEYsDHUgZy4J6" target="_blank" rel="noreferrer" className="a foot-btn franchise" style={place({ x: 1517, y: 9995, w: 207, h: 51 }, { x: 25, y: 3179, w: 104, h: 25 })} data-fsw="160" data-fsw-m="79">
        Become a Franchise
      </a>
      <a href={`${SITE_URL}/rental-enquiry`} target="_blank" rel="noreferrer" className="a foot-btn rental" style={place({ x: 1742, y: 9995, w: 164, h: 51 }, { x: 137, y: 3180, w: 82, h: 24 })} data-fsw="113" data-fsw-m="56">
        Rental Enquiry
      </a>

      {LEGAL.map((l) => (
        <Fragment key={l.href}>
          <FitText as="a" href={`${SITE_URL}${l.href}`} target="_blank" rel="noreferrer" fit={[...l.fit]} fitM={[...l.fitM]} className="foot-legal">
            {l.label}
          </FitText>
        </Fragment>
      ))}
      {SEPARATORS.map((s, i) => (
        <span key={i} className="a foot-sep" style={place(s.d, s.m)} />
      ))}
      <FitText fit={[677, 1387, 10168]} fitM={[60, 320, 3243]} className="foot-powered">
        Powered by Mdepot Retail Technologies Private Limited &amp; Managed by Haut Luxe Technologies Private Limited
      </FitText>
    </footer>
  )
}
