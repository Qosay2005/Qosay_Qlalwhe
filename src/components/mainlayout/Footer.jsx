const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

// No profile URLs are currently available elsewhere in the portfolio.
const socialLinks = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/eng.aaup?stkn=MWU2NXF6YWQ4cWhraQ==' }, // TODO: Add the real Instagram profile URL.
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/972568673682' }, // TODO: Add the real WhatsApp URL.
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/qosay-qlalwhe?utm_source=share_via&utm_content=profile&utm_medium=member_android' }, // TODO: Add the real LinkedIn profile URL.
]

const availableSocialLinks = socialLinks.filter(({ href }) => href)

const linkClass = 'inline-flex min-h-11 w-fit items-center gap-2 rounded-sm text-sm leading-6 text-white/80 transition-colors duration-300 ease-out hover:text-primary-light focus-visible:text-primary-light focus-visible:outline-primary-light motion-reduce:transition-none'

function SocialIcon({ id }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      {id === 'instagram' && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
        </>
      )}
      {id === 'whatsapp' && (
        <>
          <path d="M20.5 11.7a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.7Z" />
          <path d="m8.2 7.2 1.3 2.6-1 1a9 9 0 0 0 4.7 4.1l1-1.2 2.6 1.2c-.2 1.7-1.4 2.2-2.7 1.9-3.9-1-6.6-3.6-7.4-6.5-.4-1.5.1-2.6 1.5-3.1Z" />
        </>
      )}
      {id === 'linkedin' && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="7.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
          <path d="M7.5 11v6.5M11.5 17.5V11m0 2.5a3 3 0 0 1 6 0v4" />
        </>
      )}
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
        <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 sm:gap-x-12 sm:py-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <a href="#home" aria-label="Qosay Qlalwhe — Back to home" className="flex w-fit flex-wrap items-center gap-2.5 rounded-sm font-heading text-xl leading-7 font-semibold text-white transition-colors duration-300 ease-out hover:text-primary-light focus-visible:text-primary-light focus-visible:outline-primary-light motion-reduce:transition-none">
              <span aria-hidden="true" className="inline-flex items-center gap-0.5 leading-none">
                <span className="font-mono text-sm font-normal text-primary-light">&lt;</span>
                <span className="-rotate-6 text-2xl">Q</span>
                <span className="font-mono text-sm font-normal text-primary-light">&gt;</span>
              </span>
              Qosay Qlalwhe
            </a>
            <p className="mt-3 text-sm leading-6 text-primary-light">Front-End Developer</p>
            <p className="mt-4 max-w-xs text-sm leading-7 text-primary-light">Building clean, responsive, and thoughtful digital experiences.</p>
          </div>

          <nav aria-label="Footer navigation" className="min-w-0">
            <h2 className="mb-3 font-mono text-xs leading-5 tracking-wider text-primary-light uppercase">Navigation</h2>
            <ul>
              {navLinks.map(({ id, label }) => (
                <li key={id}><a href={`#${id}`} className={linkClass}>{label}</a></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social links" className="min-w-0">
            <h2 className="mb-3 font-mono text-xs leading-5 tracking-wider text-primary-light uppercase">Connect</h2>
            {availableSocialLinks.length > 0 ? (
              <ul className="flex flex-wrap items-center gap-3">
                {availableSocialLinks.map(({ id, label, href }) => (
                  <li key={id}>
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} title={label} className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-[color,background-color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-primary-light/50 hover:bg-white/10 hover:text-primary-light focus-visible:border-primary-light focus-visible:text-primary-light focus-visible:outline-primary-light motion-reduce:transform-none motion-reduce:transition-none">
                      <SocialIcon id={id} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="max-w-xs text-sm leading-7 text-primary-light">
                For projects and collaborations, reach out through the <a href="#contact" className={`${linkClass} underline decoration-primary-light/40 underline-offset-4 hover:decoration-primary-light`}>contact form</a>.
              </p>
            )}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs leading-6 text-primary-light sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p>© {new Date().getFullYear()} Qosay Qlalwhe. All rights reserved.</p>
          <p>Built with React &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
