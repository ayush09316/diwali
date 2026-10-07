import { useEffect, useSyncExternalStore, type RefObject } from 'react'

export const DESKTOP_WIDTH = 2064
export const MOBILE_WIDTH = 402
export const DESKTOP_QUERY = '(min-width: 768px)'

const ctx = document.createElement('canvas').getContext('2d')!

function setFont(el: HTMLElement) {
  const cs = getComputedStyle(el)
  const family = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim()
  ctx.font = `${cs.fontStyle} ${cs.fontWeight} 100px "${family}"`
}

const inkWidth = (m: TextMetrics) => m.actualBoundingBoxLeft + m.actualBoundingBoxRight

function fitText(el: HTMLElement, spec: string) {
  const [x0, x1, top] = spec.split(' ').map(Number)
  setFont(el)
  const m = ctx.measureText(el.textContent!.trim())
  const ref = el.dataset.ref ? ctx.measureText(el.dataset.ref) : m
  const fs = ((x1 - x0) / inkWidth(ref)) * 100
  const k = fs / 100
  const ascent = m.fontBoundingBoxAscent * k
  const descent = m.fontBoundingBoxDescent * k
  const baseline = (fs - (ascent + descent)) / 2 + ascent
  el.style.fontSize = `${fs}px`
  el.style.left = `${x0 + m.actualBoundingBoxLeft * k}px`
  el.style.top = `${top - baseline + m.actualBoundingBoxAscent * k}px`
}

function fitSize(el: HTMLElement, width: string) {
  setFont(el)
  const m = ctx.measureText(el.dataset.fst || el.textContent!.trim())
  el.style.fontSize = `${(Number(width) / inkWidth(m)) * 100}px`
}

export function useDesignCanvas(stageRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const desktop = window.matchMedia(DESKTOP_QUERY)

    const layout = () => {
      const isDesktop = desktop.matches
      const width = document.documentElement.clientWidth
      stage.style.zoom = String(isDesktop ? Math.min(width / DESKTOP_WIDTH, 1.25) : width / MOBILE_WIDTH)
      stage.querySelectorAll<HTMLElement>('[data-fit],[data-fit-m],[data-fsw],[data-fsw-m]').forEach((el) => {
        if (el.offsetParent === null && getComputedStyle(el).position !== 'fixed') return
        const fit = !isDesktop && el.dataset.fitM ? el.dataset.fitM : el.dataset.fit
        if (fit) return fitText(el, fit)
        const fsw = !isDesktop && el.dataset.fswM ? el.dataset.fswM : el.dataset.fsw
        if (fsw) fitSize(el, fsw)
      })
    }

    layout()
    document.fonts?.ready.then(layout)
    window.addEventListener('resize', layout)
    window.addEventListener('relayout', layout)
    desktop.addEventListener('change', layout)
    return () => {
      window.removeEventListener('resize', layout)
      window.removeEventListener('relayout', layout)
      desktop.removeEventListener('change', layout)
    }
  }, [stageRef])
}

const desktopQuery = window.matchMedia(DESKTOP_QUERY)
const subscribe = (onChange: () => void) => {
  desktopQuery.addEventListener('change', onChange)
  return () => desktopQuery.removeEventListener('change', onChange)
}

export function useIsDesktop() {
  return useSyncExternalStore(subscribe, () => desktopQuery.matches)
}
