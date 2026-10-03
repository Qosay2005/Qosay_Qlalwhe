import ClientProjectCard from '../components/projects/ClientProjectCard'
import TrainingProjectCard from '../components/projects/TrainingProjectCard'
import { clientProjects } from '../data/clientProjects'
import { trainingProjects } from '../data/trainingProjects'
import Reveal from '../components/animations/Reveal'

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 xl:px-8">
      <Reveal as="header" className="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
        <h2 id="projects-heading" className="font-heading text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">Projects</h2>
        <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base">A selection of real-world client work and projects I built while learning and improving my development skills.</p>
        {/* Remove this notice when all demo entries have been replaced. */}
        <p className="mt-3 font-mono text-xs leading-6 text-primary-dark">Demo preview — sample projects, images, and links for layout development.</p>
      </Reveal>

      <section aria-labelledby="client-projects-heading">
        <Reveal as="header" className="mb-6 max-w-2xl sm:mb-8">
          <h3 id="client-projects-heading" className="font-heading text-2xl font-semibold tracking-tight text-primary-dark">Client Projects</h3>
          <p className="mt-3 text-sm leading-7 text-text-secondary">Real-world projects built for clients with a focus on usability, performance, and responsive experiences.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clientProjects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 3) * 0.08} className="grid min-w-0">
              <ClientProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="training-projects-heading" className="mt-12 sm:mt-16">
        <Reveal as="header" className="mb-6 max-w-2xl sm:mb-8">
          <h3 id="training-projects-heading" className="font-heading text-2xl font-semibold tracking-tight text-primary-dark">Training Projects</h3>
          <p className="mt-3 text-sm leading-7 text-text-secondary">Projects I built while learning, practicing, and strengthening my front-end development skills.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trainingProjects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 3) * 0.08} className="grid min-w-0">
              <TrainingProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>
    </section>
  )
}
