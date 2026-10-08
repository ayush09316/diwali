import { SITE_URL } from '../stores'
import { Events, track } from '../analytics'

// Slim version of the main-site header: logo on the left, call button on the right
export function Navbar() {
  return (
    <>
    <header className="navbar">
      <a href={SITE_URL} target="_blank" rel="noreferrer" aria-label="MaterialDepot home">
        <img src="https://materialdepotimages.materialdepot.com/application_image/md-logo-new-yellow-full.svg" alt="MaterialDepot" width={256} height={66} className="navbar-logo" />
      </a>
      <a href="tel:+918121523945" className="navbar-call" aria-label="Call MaterialDepot" onClick={() => track(Events.callClick, { position: 'navbar' })}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
        </svg>
      </a>
    </header>
    <div className="navbar-spacer" />
    </>
  )
}
