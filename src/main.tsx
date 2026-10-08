import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './App.css'
import { asset } from './utils'

// The canvas is resized after load, so a restored scroll position lands in the wrong place
// (and briefly shows the floating Book button); always start a load at the top instead.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

// page backgrounds come from the same image host as everything else
document.documentElement.style.setProperty('--bg-desktop', `url(${asset('bg-desktop.jpg')})`)
document.documentElement.style.setProperty('--bg-mobile', `url(${asset('bg-mobile.jpg')})`)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
