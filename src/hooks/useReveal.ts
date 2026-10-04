import { useEffect, type RefObject } from 'react'

export function useReveal(rootRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px' },
    )
    root.querySelectorAll('.rv').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rootRef])
}
