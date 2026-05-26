import type { Transition, Variants } from 'framer-motion'

/**
 * 修正抖動：使用更平滑的 cubic-bezier 曲線與適當的時長
 */
export const baseTransition: Transition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] // Ease-out expo
}

export const getTransition = (delay = 0): Transition => (
  delay ? { ...baseTransition, delay } : baseTransition
)

/**
 * 漸入動畫：修正 y 軸位移量，避免過大導致的視覺抖動
 */
export const fadeInUpAnimation = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: baseTransition
} as const

/**
 * 卡片懸浮：更有溫度的縮放與陰影回饋
 */
export const warmHoverAnimation = {
  whileHover: { 
    y: -5, 
    scale: 1.01,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  whileTap: { scale: 0.98 }
}

/**
 * 內容展開：修正 height: 'auto' 可能導致的排版閃爍
 */
export const expandAnimation = {
  initial: { height: 0, opacity: 0 },
  animate: { 
    height: 'auto', 
    opacity: 1,
    transition: { 
      height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.25, delay: 0.1 }
    }
  },
  exit: { 
    height: 0, 
    opacity: 0,
    transition: { 
      height: { duration: 0.3, ease: "easeInOut" },
      opacity: { duration: 0.2 }
    }
  }
} as const

export const staggerAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}
