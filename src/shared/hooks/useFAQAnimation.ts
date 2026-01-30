import { useRef } from 'react'
import { Variants, useInView, type Transition } from 'framer-motion'
import { baseTransition } from '@/shared/animation'

// 定義動畫變體的類型
export type FAQAnimationVariants = Readonly<{
  slideInUp: Variants
  stagger: Variants
}>

// 定義過渡效果的類型
export type FAQTransition = Transition

// 定義返回值類型
export type FAQAnimationReturn = Readonly<{
  ref: React.RefObject<null>
  isInView: boolean
  variants: FAQAnimationVariants
  transition: FAQTransition
}>

// 定義默認變體
const defaultVariants: FAQAnimationVariants = {
  slideInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  stagger: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }
} as const

// 定義默認過渡效果
const defaultTransition: FAQTransition = baseTransition

export function useFAQAnimation({ once = true } = {}): FAQAnimationReturn {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  return Object.freeze({
    ref,
    isInView,
    variants: defaultVariants,
    transition: defaultTransition
  })
}
