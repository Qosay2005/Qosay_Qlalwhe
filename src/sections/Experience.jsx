import ExperienceCard from '../components/experience/ExperienceCard'
import { experiences } from '../data/experiences'
import Reveal from '../components/animations/Reveal'

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 xl:px-8">
      <Reveal className="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
        <h2 id="experience-heading" className="font-heading text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">My Experience</h2>
        <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base">A journey through teaching, technology, and continuous growth.</p>
      </Reveal>

      <ol aria-label="Experience, newest to oldest">
        {experiences.map((experience, index) => {
          const onRight = index % 2 === 0

          return (
            <li key={`${experience.role}-${experience.organization}-${experience.period}`} className="relative pl-8 pb-10 last:pb-0 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:pl-0 lg:pb-12">
              {/* Each segment reaches the next node, regardless of card height. */}
              {index < experiences.length - 1 && (
                <span aria-hidden="true" className="absolute top-8 -bottom-8 left-2 w-px -translate-x-1/2 bg-border lg:left-1/2" />
              )}
              <span aria-hidden="true" className={`absolute top-8 left-2 h-px w-6 bg-border lg:left-1/2 lg:w-8 ${onRight ? '' : 'lg:-translate-x-full'}`} />
              <span aria-hidden="true" className="absolute top-8 left-2 z-10 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-white ring-4 ring-primary-light/25 lg:left-1/2" />
              <Reveal direction={onRight ? 'right' : 'left'} className={`min-w-0 ${onRight ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
                <ExperienceCard experience={experience} />
              </Reveal>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
