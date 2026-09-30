import { useState } from 'react'

function ServiceIcon({ name }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 96 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-20 w-24 text-primary-dark">
      {name === 'devices' && (
        <>
          <rect x="8" y="10" width="60" height="42" rx="3" className="fill-surface" />
          <path d="M8 42h60M32 52v12m-12 0h28" />
          <rect x="51" y="28" width="26" height="38" rx="3" className="fill-background stroke-primary" />
          <rect x="69" y="40" width="18" height="30" rx="3" className="fill-white" />
          <path d="M75 64h6" className="stroke-primary" />
        </>
      )}
      {name === 'browser' && (
        <>
          <rect x="9" y="12" width="78" height="56" rx="4" className="fill-surface" />
          <path d="M9 26h78" />
          <path d="M17 19h1m6 0h1m6 0h1" className="stroke-primary" />
          <path d="m34 37-10 10 10 10m28-20 10 10-10 10m-9-24-10 28" className="stroke-primary" />
        </>
      )}
      {name === 'logic' && (
        <>
          <path d="M39 41c-5-3-8-8-8-14a17 17 0 0 1 34 0c0 6-3 11-8 14l-2 7H41l-2-7Z" className="fill-surface" />
          <path d="M42 54h12m-10 6h8M21 11l5 4m44 0 5-4M17 29h7m48 0h7" className="stroke-primary" />
          <path d="m44 22-5 5 5 5m8-10 5 5-5 5M48 60v10H22m26 0h26" />
          <circle cx="18" cy="70" r="4" className="fill-primary-light stroke-primary" />
          <circle cx="78" cy="70" r="4" className="fill-primary-light stroke-primary" />
        </>
      )}
    </svg>
  )
}

export default function ServiceCard({ service }) {
  const [flipped, setFlipped] = useState(false)
  const { id, title, description, icon } = service
  const faceClass = 'col-start-1 row-start-1 flex min-w-0 flex-col items-center justify-center rounded-md border px-6 py-8 [backface-visibility:hidden] sm:px-8'

  return (
    <article className="min-w-0">
      <h3 id={`${id}-title`} className="sr-only">{title}</h3>
      <p id={`${id}-description`} className="sr-only">{description}</p>
      <button
        type="button"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        aria-pressed={flipped}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') setFlipped(true)
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') setFlipped(false)
        }}
        onFocus={(event) => {
          if (event.currentTarget.matches(':focus-visible')) setFlipped(true)
        }}
        onBlur={() => setFlipped(false)}
        onClick={() => setFlipped((previous) => !previous)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setFlipped(false)
        }}
        className="block h-full w-full cursor-pointer rounded-md text-center [perspective:1200px]"
      >
        {/* Both grid faces contribute height, so longer text never clips. */}
        <span aria-hidden="true" className={`grid min-h-80 h-full rounded-md transition-transform duration-650 ease-[cubic-bezier(0.22,0.61,0.36,1)] [transform-style:preserve-3d] motion-reduce:transition-none ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
          <span className={`${faceClass} gap-8 border-border bg-white`}>
            <ServiceIcon name={icon} />
            <span className="max-w-60 font-heading text-xl leading-snug font-semibold text-primary-dark sm:text-2xl">{title}</span>
          </span>
          <span className={`${faceClass} gap-4 border-primary-light bg-surface [transform:rotateY(180deg)]`}>
            <span className="max-w-64 font-heading text-xl leading-snug font-semibold text-primary-dark sm:text-2xl">{title}</span>
            <span className="max-w-sm text-sm leading-7 text-text-secondary">{description}</span>
          </span>
        </span>
      </button>
    </article>
  )
}

