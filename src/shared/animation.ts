import type { Transition, Variants } from 'framer-motion'

export const baseTransition: Transition = {
  duration: 0.4,
  ease: [0.16, 1, 0.3, 1]
}

export const getTransition = (delay = 0): Transition => (
  delay ? { ...baseTransition, delay } : baseTransition
)

export const fadeInUpAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: baseTransition
} as const

export const expandAnimation = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.2 }
} as const

export const staggerAnimation: Variants = {
  transition: { staggerChildren: 0.2 }
}
