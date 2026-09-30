import { useId, useState } from 'react'

function getPostUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null

  try {
    const url = new URL(value.trim())
    return ['https:', 'http:'].includes(url.protocol) && url.hostname && !url.username && !url.password
      ? url.href
      : null
  } catch {
    return null
  }
}

function RecognitionImage({ image, imageAlt, title }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="aspect-[16/10] shrink-0 overflow-hidden rounded-sm border border-border bg-surface">
      {image && !failed ? (
        <img
          src={image}
          alt={imageAlt || title}
          loading="lazy"
          decoding="async"
          width="640"
          height="400"
          onError={() => setFailed(true)}
          className="size-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-3 bg-primary-light/10 text-primary-dark">
          <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-8 text-primary">
            <rect x="4" y="5" width="24" height="22" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="m5 24 7-7 5 5 4-4 6 6" />
          </svg>
          <span className="font-mono text-[10px] tracking-wider">EVENT IMAGE UNAVAILABLE</span>
        </div>
      )}
    </div>
  )
}

export default function RecognitionCard({ recognition }) {
  const headingId = useId()
  const { title, category, date, image, imageAlt, description, skills, postUrl } = recognition
  const displayDate = typeof date === 'string' ? date.trim() : date
  const imageSource = typeof image === 'string' ? image.trim() : undefined
  const altText = typeof imageAlt === 'string' ? imageAlt.trim() : undefined
  const visibleSkills = Array.isArray(skills)
    ? [...new Set(skills.filter((skill) => typeof skill === 'string').map((skill) => skill.trim()).filter(Boolean))]
    : []
  const externalUrl = getPostUrl(postUrl)

  return (
    <article aria-labelledby={headingId} className="group flex min-w-0 flex-col gap-5 rounded-md border border-border bg-white p-5 [overflow-wrap:anywhere] transition-[transform,border-color,box-shadow] duration-400 ease-out hover:-translate-y-1 hover:border-primary-light hover:shadow-sm hover:shadow-primary-dark/10 focus-within:border-primary-light motion-reduce:transform-none motion-reduce:transition-none sm:p-6">
      <header>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 font-mono text-[10px] leading-5 sm:text-xs">
          <p className="font-medium tracking-wider text-primary-action uppercase">{category}</p>
          {displayDate ? <p className="text-text-secondary">{displayDate}</p> : null}
        </div>
        <h3 id={headingId} className="mt-3 font-heading text-xl leading-snug font-semibold text-primary-dark sm:text-2xl">{title}</h3>
      </header>

      <RecognitionImage key={imageSource || 'missing'} image={imageSource} imageAlt={altText} title={title} />
      <p className="text-sm leading-7 text-text-secondary">{description}</p>

      {visibleSkills.length > 0 && (
        <ul aria-label="Skills demonstrated" className="flex flex-wrap gap-2">
          {visibleSkills.map((skill) => (
            <li key={skill} className="max-w-full rounded-sm bg-primary-light/25 px-2.5 py-1 text-xs leading-5 text-primary-dark">{skill}</li>
          ))}
        </ul>
      )}

      {externalUrl && (
        <a href={externalUrl} target="_blank" rel="noopener noreferrer" aria-label={`View post about ${title} (opens in a new tab)`} className="group/post mt-auto inline-flex min-h-11 w-fit items-center gap-2 rounded-sm text-sm font-semibold text-primary-dark decoration-primary-light underline-offset-4 transition-colors duration-300 hover:text-primary-action hover:underline focus-visible:underline motion-reduce:transition-none">
          View Post
          <span aria-hidden="true" className="transition-transform duration-300 ease-out group-hover/post:translate-x-0.5 group-focus-visible/post:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none">↗</span>
        </a>
      )}
    </article>
  )
}
