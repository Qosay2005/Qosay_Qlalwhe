import { useState, useSyncExternalStore } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const elements = { div: motion.div, header: motion.header, p: motion.p, h1: motion.h1 }
const viewport = { once: true, amount: 0.15 }
const ease = [0.22, 1, 0.36, 1]

function subscribeToDesktop(callback) {
  const media = window.matchMedia('(min-width: 1024px)')
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

function isDesktop() {
  return window.matchMedia('(min-width: 1024px)').matches
}

export default function Reveal({
  as = 'div', direction = 'up', delay = 0, duration = 0.6, distance = 32,
  entrance = false, className = '', children, ...props
}) {
  const reducedMotion = useReducedMotion()
  const desktop = useSyncExternalStore(subscribeToDesktop, isDesktop, () => false)
  const [focused, setFocused] = useState(false)
  const Element = elements[as] || elements.div
  // Match the timeline's desktop breakpoint; narrow screens use upward movement.
  const horizontal = direction === 'left' || direction === 'right'
  const revealDirection = horizontal && !desktop ? 'up' : direction
  // Horizontal movement must fit the existing 24px desktop page gutters.
  const horizontalDistance = Math.min(distance, 24)
  const variants = {
    hidden: {
      opacity: 0,
      x: revealDirection === 'left' ? -horizontalDistance : revealDirection === 'right' ? horizontalDistance : 0,
      y: revealDirection === 'up' ? distance : 0,
    },
    visible: { opacity: 1, x: 0, y: 0 },
  }
  const immediate = reducedMotion || focused

  return (
    <Element
      {...props}
      className={`reveal ${className}`.trim()}
      initial={reducedMotion ? false : 'hidden'}
      animate={entrance || immediate ? 'visible' : undefined}
      whileInView={entrance || immediate ? undefined : 'visible'}
      viewport={viewport}
      variants={variants}
      transition={{ type: 'tween', duration: immediate ? 0 : duration, delay: immediate ? 0 : delay, ease }}
      // Keyboard users should never land on an invisible link or form control.
      onFocusCapture={() => setFocused(true)}
    >
      {children}
    </Element>
  )
}
