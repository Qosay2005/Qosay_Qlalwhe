import { useState } from 'react'
import TechCard from '../components/tech/TechCard'
import { technologies } from '../data/technologies'

function MarqueeRow({ reverse = false, decorative = false }) {
  // Bring keyboard-focused cards into view without resetting the CSS animation.
  const revealFocusedCard = (event) => {
    if (!event.target.matches('.tech-card:focus-visible')) return
    const row = event.currentTarget
    const track = row.firstElementChild
    const cardBounds = event.target.getBoundingClientRect()
    const rowBounds = row.getBoundingClientRect()
    const previousOffset = Number(track.dataset.focusOffset || 0)
    const offset = previousOffset + rowBounds.left + rowBounds.width / 2 - cardBounds.left - cardBounds.width / 2
    track.dataset.focusOffset = offset
    track.style.translate = `${offset}px 0`
  }

  return (
    <div
      className="tech-marquee overflow-hidden py-2"
      aria-hidden={decorative || undefined}
      onFocus={revealFocusedCard}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return
        const track = event.currentTarget.firstElementChild
        track.style.translate = ''
        delete track.dataset.focusOffset
        event.currentTarget.scrollLeft = 0
      }}
    >
      <div className={`tech-track flex w-max ${reverse ? 'tech-track-right' : ''}`}>
        {[false, true].map((duplicate) => (
          <div key={String(duplicate)} aria-hidden={duplicate || undefined} className={`tech-set flex shrink-0 gap-4 pr-4 sm:gap-5 sm:pr-5 ${duplicate ? 'tech-duplicate' : ''}`}>
            {technologies.map((technology) => (
              <TechCard key={technology.name} technology={technology} decorative={decorative || duplicate} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  const [paused, setPaused] = useState(false)

  return (
    <section id="tech-stack" aria-labelledby="tech-stack-heading" className="overflow-hidden py-16 sm:py-20" data-tech-paused={paused}>
      <div className="mx-auto mb-9 max-w-2xl px-4 text-center sm:mb-12 sm:px-6">
        <h2 id="tech-stack-heading" className="font-heading text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">My Tech Stack &amp; Tools</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
          Technologies and tools I use to build modern, performant, and maintainable digital experiences.
        </p>
        <button type="button" aria-pressed={paused} onClick={() => setPaused((previous) => !previous)} className="tech-motion-control mt-4 min-h-11 rounded-md px-3 font-mono text-xs text-primary-dark hover:bg-surface">
          {paused ? 'Resume motion' : 'Pause motion'}
        </button>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <MarqueeRow reverse />
        <MarqueeRow decorative />
      </div>
    </section>
  )
}
