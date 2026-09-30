export default function TechCard({ technology, decorative = false }) {
  const { name, icon, category, wide } = technology

  return (
    <button
      type="button"
      tabIndex={decorative ? -1 : 0}
      aria-label={`${name} — ${category}`}
      className="tech-card block h-22 w-30 shrink-0 cursor-default rounded-md sm:h-25 sm:w-35"
      onMouseDown={decorative ? (event) => event.preventDefault() : undefined}
    >
      <span className="tech-card-inner relative block size-full rounded-md">
        <span className="tech-card-front absolute inset-0 flex items-center justify-center rounded-md border border-border bg-white">
          <img src={icon} alt="" width="48" height="48" className={`h-10 object-contain sm:h-12 ${wide ? 'w-16 sm:w-18' : 'w-10 sm:w-12'}`} />
        </span>
        <span className="tech-card-back absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-md border border-primary-light bg-surface px-2" aria-hidden="true">
          <span className="font-heading text-sm font-semibold text-primary-dark sm:text-base">{name}</span>
          <span className="font-mono text-[9px] text-text-secondary sm:text-[10px]">{category}</span>
        </span>
      </span>
    </button>
  )
}
