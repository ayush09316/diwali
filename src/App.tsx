import { useRef } from 'react'
import { useDesignCanvas } from './hooks/useDesignCanvas'
import { useReveal } from './hooks/useReveal'
import { Glows, Intro } from './components/Hero'
import { Videos } from './components/Videos'
import { Makeover } from './components/Makeover'
import { Explore } from './components/Explore'
import { Steps } from './components/Steps'
import { FeatureCaptions, StepCaptions } from './components/Captions'
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
      <FeatureCaptions />
      <Makeover />
      <Videos />
      <Explore />
      <Steps />
      <StepCaptions />
      <WhyVisit />
      <Inspiration />
      <Stores />
      <Footer />
    </main>
  )
}
