import { useId } from 'react'

export default function ExperienceCard({ experience }) {
  const headingId = useId()
  const { role, organization, period, type, summary, highlights = [], skills = [] } = experience

  return (
    <article aria-labelledby={headingId} className="min-w-0 rounded-md border border-border bg-white p-5 text-left [overflow-wrap:anywhere] transition-colors duration-300 ease-out hover:border-primary-light motion-reduce:transition-none sm:p-7">
      <p className="font-mono text-[10px] font-medium tracking-wider text-primary-action uppercase sm:text-xs">{type}</p>
      <h3 id={headingId} className="mt-3 font-heading text-xl leading-snug font-semibold text-primary-dark sm:text-2xl">{role}</h3>
      <p className="mt-3 text-sm font-medium leading-6 text-text-primary">{organization}</p>
      <p className="mt-2 font-mono text-xs leading-6 text-text-secondary">{period}</p>

      <p className="mt-5 text-sm leading-7 text-text-secondary">{summary}</p>
      {highlights.length > 0 && (
        <ul className="mt-4 list-disc space-y-2 pl-4 text-sm leading-6 text-text-secondary marker:text-primary">
          {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
      )}
      {skills.length > 0 && (
        <ul aria-label="Skills" className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
          {skills.map((skill) => (
            <li key={skill} className="max-w-full rounded-sm bg-primary-light/25 px-2.5 py-1 text-xs leading-5 text-primary-dark">{skill}</li>
          ))}
        </ul>
      )}
    </article>
  )
}
