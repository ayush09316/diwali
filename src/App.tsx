import { useRef } from 'react'
import { useDesignCanvas } from './hooks/useDesignCanvas'
import { useReveal } from './hooks/useReveal'
import { Glows, Intro } from './components/Hero'
import { BeforeAfterSection } from './components/Transformation'
import { Videos } from './components/Videos'
import { Upgrades } from './components/Upgrades'
import { Steps } from './components/Steps'
import { WhyVisit } from './components/WhyVisit'
import { Inspiration } from './components/Inspiration'
import { Stores } from './components/Stores'
import { Footer } from './components/Footer'

export default function App() {
  const stageRef = useRef<HTMLElement>(null)
  useDesignCanvas(stageRef)
  useReveal(stageRef)

  return (
    <main className="stage" ref={stageRef}>
      <h1 className="sr-only">Diwali Makeover Fest — Give your home a Diwali makeover with wallpaper, wall panels and wooden flooring</h1>
      <Glows />
      <Intro />
      <BeforeAfterSection />
      <Videos />
      <Upgrades />
      <Steps />
      <WhyVisit />
      <Inspiration />
      <Stores />
      <Footer />
    </main>
  )
}
