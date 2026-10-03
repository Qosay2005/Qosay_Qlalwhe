import RecognitionCard from '../components/recognition/RecognitionCard'
import { recognitions } from '../data/recognitions'
import Reveal from '../components/animations/Reveal'

export default function Recognition() {
  return (
    <section
      id="recognition"
      aria-labelledby="recognition-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 xl:px-8"
    >
      <Reveal as="header" className="mx-auto max-w-2xl text-center">
        <h2
          id="recognition-heading"
          className="font-heading text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl"
        >
          Recognition
        </h2>

        <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base">
          Moments I’m proud of — competitions, impact work, and community roles.
        </p>
      </Reveal>

      {recognitions.length > 0 ? (
        <div className="mt-9 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {recognitions.map((recognition, index) => (
            <Reveal key={recognition.id} delay={(index % 3) * 0.08} className="grid min-w-0">
              <RecognitionCard recognition={recognition} />
            </Reveal>
          ))}
        </div>
      ) : import.meta.env.DEV ? (
        <div className="mx-auto mt-9 max-w-2xl rounded-md border border-border bg-surface/50 px-6 py-10 text-center sm:mt-12">
          <p className="font-heading text-lg font-medium text-primary-dark">
            Recognition highlights are being curated.
          </p>

          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Development preview — add verified entries to display the gallery.
          </p>
        </div>
      ) : null}
    </section>
  )
}
