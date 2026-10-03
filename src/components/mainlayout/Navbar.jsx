import { useEffect, useRef, useState } from 'react'
import useScrollSpy from '../../hooks/useScrollSpy'
import {link_cv} from '../../sections/Hero'
const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const sectionIds = navLinks.map(({ id }) => id)
const buttonClass =
  'inline-flex min-h-11 items-center justify-center rounded-md px-3 xl:px-4 text-sm font-semibold transition-colors motion-reduce:transition-none'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const menuButton = useRef(null)
  const desktopNav = useRef(null)
  const linkRefs = useRef({})
  const [clickedSection, setClickedSection] = useState(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })
  const visibleSection = useScrollSpy(sectionIds)
  const activeSection = clickedSection || visibleSection

  useEffect(() => {
    let cancelled = false
    const measure = () => {
      const link = linkRefs.current[activeSection]
      if (!link || !desktopNav.current) return
      setIndicator({ left: link.offsetLeft, width: link.offsetWidth })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(desktopNav.current)
    Object.values(linkRefs.current).forEach((link) => observer.observe(link))
    document.fonts.ready.then(() => {
      if (!cancelled) measure()
    })
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [activeSection])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      setClickedSection(null)
    }

    const desktop = window.matchMedia('(min-width: 1100px)')

    const onResize = () => {
      if (desktop.matches) {
        setMenuOpen(false)
      }
    }

    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    desktop.addEventListener('change', onResize)

    return () => {
      window.removeEventListener('scroll', onScroll)
      desktop.removeEventListener('change', onResize)
    }
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    if (menuOpen) menuButton.current?.focus()
  }

  const selectSection = (id) => {
    setClickedSection(id)
    closeMenu()
  }

  const renderLinks = (mobile = false) =>
    navLinks.map(({ id, label }) => (
      <a
        key={id}
        href={`#${id}`}
        ref={mobile ? undefined : (element) => { linkRefs.current[id] = element }}
        aria-current={activeSection === id ? 'location' : undefined}
        onClick={() => selectSection(id)}
        className={`relative flex min-h-11 items-center text-sm font-medium transition-colors hover:text-primary-dark motion-reduce:transition-none ${
          mobile ? 'rounded-md px-3' : ''
        } ${
          activeSection === id
            ? `text-primary-dark ${mobile ? 'bg-surface' : ''}`
            : 'text-text-secondary'
        }`}
      >
        {label}
      </a>
    ))

  const renderActions = () => (
    <>
      <a
        href="#contact"
        onClick={() => selectSection('contact')}
        className={`${buttonClass} bg-primary-action text-white hover:bg-primary-dark`}
      >
        Hire Me
      </a>

      <a
        href={link_cv}
        target="_blank"
        rel="noopener noreferrer"
        onClick={closeMenu}
        aria-label="Resume (opens in a new tab)"
        className={`${buttonClass} border border-border bg-white text-primary-dark hover:border-primary hover:bg-surface`}
      >
        Resume
      </a>
    </>
  )

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 motion-reduce:transition-none ${
        scrolled
          ? 'border-border bg-white/95 backdrop-blur-sm'
          : 'border-transparent bg-background'
      }`}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          closeMenu()
          menuButton.current?.focus()
        }
      }}
    >
      <nav
        aria-label="Main navigation"
        className="relative mx-auto max-w-7xl px-4 sm:px-6 xl:px-8"
      >
        <div className="flex h-[72px] items-center justify-between gap-3 min-[1100px]:grid min-[1100px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          {/* Typographic developer signature */}
          <a
            href="#home"
            onClick={() => selectSection('home')}
            className="group flex min-h-11 w-fit shrink-0 items-center gap-2 sm:gap-2.5"
            aria-label="Qosay Qlalwhe — Home"
          >
            <span aria-hidden="true" className="flex items-center gap-0.5 leading-none">
              <span className="font-mono text-lg font-normal text-primary">&lt;</span>
              <span className="-rotate-6 font-heading text-3xl font-semibold text-primary-dark transition-colors group-hover:text-primary motion-reduce:transition-none sm:text-4xl">Q</span>
              <span className="font-mono text-lg font-normal text-primary">&gt;</span>
            </span>
            <span className="whitespace-nowrap font-heading text-base font-semibold tracking-tight text-primary-dark transition-colors group-hover:text-primary motion-reduce:transition-none sm:text-lg">
              Qosay Qlalwhe
            </span>
          </a>

          {/* Desktop Navigation */}
          <div ref={desktopNav} className="relative hidden items-center gap-3 min-[1100px]:flex xl:gap-5">
            {renderLinks()}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-0.5 rounded-full bg-primary transition-[transform,width] duration-300 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
            />
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center justify-self-end gap-2 min-[1100px]:flex">
            {renderActions()}
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButton}
            type="button"
            aria-label={
              menuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((previous) => !previous)}
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border text-primary-dark transition-colors hover:bg-surface min-[1100px]:hidden"
          >
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            >
              <path
                d={
                  menuOpen
                    ? 'M6 6l12 12M6 18L18 6'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          inert={!menuOpen}
          className={`absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-border bg-background p-4 transition-[opacity,visibility,transform] duration-150 motion-reduce:transition-none sm:px-6 min-[1100px]:hidden ${
            menuOpen
              ? 'visible translate-y-0 opacity-100'
              : 'invisible -translate-y-2 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1">
            {renderLinks(true)}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
            {renderActions()}
          </div>
        </div>
      </nav>
    </header>
  )
}