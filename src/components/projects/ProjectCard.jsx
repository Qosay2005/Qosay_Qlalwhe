import { useId, useState } from 'react'

function getProjectUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null

  try {
    const url = new URL(value.trim())
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password
      ? url.href
      : null
  } catch {
    return null
  }
}

export default function ProjectCard({ project, actionLabel, actionUrl }) {
  const headingId = useId()
  const [failedImage, setFailedImage] = useState(null)
  const { title, description, image, imageAlt, technologies = [] } = project
  const externalUrl = getProjectUrl(actionUrl)

  return (
    <article aria-labelledby={headingId} className="group flex min-w-0 flex-col overflow-hidden rounded-md border border-border bg-white [overflow-wrap:anywhere] transition-[transform,border-color,box-shadow] duration-400 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-sm hover:shadow-primary-dark/10 focus-within:border-primary motion-reduce:transform-none motion-reduce:transition-none">
      <div className="aspect-[16/10] shrink-0 overflow-hidden border-b border-border bg-surface">
        {image && failedImage !== image ? (
          <img src={image} alt={imageAlt ?? title} loading="lazy" decoding="async" width="640" height="400" onError={() => setFailedImage(image)} className="size-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none" />
        ) : (
          <div aria-hidden="true" className="flex size-full items-center justify-center font-mono text-xs tracking-wider text-text-secondary">PREVIEW UNAVAILABLE</div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <h4 id={headingId} className="font-heading text-xl leading-snug font-semibold text-text-primary">{title}</h4>
        <p className="text-sm leading-7 text-text-secondary">{description}</p>
        {technologies.length > 0 && (
          <ul aria-label="Technologies used" className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <li key={technology} className="max-w-full rounded-sm bg-primary-light/25 px-2.5 py-1 text-xs leading-5 text-primary-dark">{technology}</li>
            ))}
          </ul>
        )}
        {externalUrl && (
          <div className="mt-auto pt-2">
            <a href={externalUrl} target="_blank" rel="noopener noreferrer" aria-label={`${actionLabel} for ${title} (opens in a new tab)`} className="group/action inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-white px-4 text-sm font-semibold text-primary-dark transition-colors duration-300 hover:border-primary hover:bg-surface motion-reduce:transition-none">
              {actionLabel}
              <span aria-hidden="true" className="transition-transform duration-300 ease-out group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5 group-focus-visible/action:translate-x-0.5 group-focus-visible/action:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none">↗</span>
            </a>
          </div>
        )}
      </div>
    </article>
  )
}
