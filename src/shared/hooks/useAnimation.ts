'use client'

import { useRef } from 'react'
import { Variants, useInView } from 'framer-motion'

// 定義動畫變體的類型
export type AnimationVariants = Readonly<{
  slideInUp: Variants
  slideInDown: Variants
  slideInLeft: Variants
  slideInRight: Variants
  fadeIn: Variants
  stagger: Variants
  scaleIn: Variants
}>

// 定義基本過渡效果的類型
export type AnimationTransition = Readonly<{
  duration: number
  ease: string
  delay?: number
}>

// 定義過渡效果方法的類型
export type AnimationTransitions = Readonly<{
  default: AnimationTransition
  withDelay: (delay: number) => AnimationTransition
}>

// 定義返回值類型
export type ScrollAnimationReturn = Readonly<{
  ref: React.RefObject<HTMLElement | null>
  isInView: boolean
  variants: AnimationVariants
  transitions: AnimationTransitions
}>

// 定義默認變體
const defaultVariants: AnimationVariants = {
  slideInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  slideInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  stagger: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  },
  scaleIn: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  }
} as const

// 定義默認過渡效果
const defaultTransitions: AnimationTransitions = {
  default: {
    duration: 0.4,
    ease: 'easeOut'
  },
  withDelay: (delay: number) => ({
    duration: 0.4,
    ease: 'easeOut',
    delay
  })
} as const

export function useScrollAnimation({ once = true } = {}): ScrollAnimationReturn {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once })

  return Object.freeze({
    ref,
    isInView,
    variants: defaultVariants,
    transitions: defaultTransitions
  })
}
