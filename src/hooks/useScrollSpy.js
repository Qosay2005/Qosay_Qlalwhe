import { useEffect, useState } from 'react'

export default function useScrollSpy(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
      let current = sectionIds[0]
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset + 1) current = section.id
      }
      // Short final sections may never reach the top activation line.
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections.at(-1)?.id || current
      }
      setActiveSection(current)
    }
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('hashchange', scheduleUpdate)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('hashchange', scheduleUpdate)
    }
  }, [sectionIds])

  return activeSection
}
