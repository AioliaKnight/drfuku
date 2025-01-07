'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'

// 擴展 Window 介面以包含 gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, params: object) => void
  }
}

// 常數配置
const CONFIG = {
  delays: {
    tooltip: {
      show: 1500,
      hide: 5000
    },
    animation: {
      duration: 2,
      repeatDelay: 3
    }
  },
  breakpoints: {
    mobile: 640
  },
  thresholds: {
    mobile: 200,
    desktop: 300
  },
  links: {
    line: 'https://line.me/ti/p/~@772pable'
  }
} as const

// 動畫配置
const variants: Record<string, Variants> = {
  container: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 }
  },
  tooltip: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
  },
  notification: {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, -3, 3, -3, 0]
    }
  }
}

// 動畫過渡配置
const transitions = {
  container: { type: "spring", stiffness: 260, damping: 20 },
  tooltip: { duration: 0.2 },
  notification: {
    duration: CONFIG.delays.animation.duration,
    repeat: Infinity,
    repeatDelay: CONFIG.delays.animation.repeatDelay
  }
}

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const tooltipTimersRef = useRef<{ show?: NodeJS.Timeout; hide?: NodeJS.Timeout }>({})

  // 檢測裝置類型
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${CONFIG.breakpoints.mobile}px)`)
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches)
    }

    // 初始檢查
    handleChange(mediaQuery)
    
    // 監聽變更
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // 處理滾動事件 - 使用節流優化
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const threshold = isMobile ? CONFIG.thresholds.mobile : CONFIG.thresholds.desktop
    
    // 根據裝置調整顯示時機
    const shouldShow = scrollY > threshold && scrollY + windowHeight < documentHeight - 100
    
    if (shouldShow !== isVisible) {
      setIsVisible(shouldShow)
    }
  }, [isMobile, isVisible])

  // 使用 IntersectionObserver 優化滾動監聽
  useEffect(() => {
    const options = {
      threshold: [0, 0.5, 1.0]
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          handleScroll()
        }
      })
    }, options)

    // 建立一個虛擬元素來追蹤滾動
    const sentinel = document.createElement('div')
    Object.assign(sentinel.style, {
      height: '1px',
      width: '1px',
      position: 'fixed',
      top: '0',
      left: '0',
      pointerEvents: 'none',
      opacity: '0'
    })
    document.body.appendChild(sentinel)

    observer.observe(sentinel)
    return () => {
      observer.disconnect()
      sentinel.remove()
    }
  }, [handleScroll])

  // 處理提示文字的顯示/隱藏
  useEffect(() => {
    const clearTimers = () => {
      Object.values(tooltipTimersRef.current).forEach(timer => {
        if (timer) clearTimeout(timer)
      })
    }

    if (isVisible) {
      clearTimers()

      tooltipTimersRef.current.show = setTimeout(() => {
        setShowTooltip(true)
      }, CONFIG.delays.tooltip.show)

      tooltipTimersRef.current.hide = setTimeout(() => {
        setShowTooltip(false)
      }, CONFIG.delays.tooltip.show + CONFIG.delays.tooltip.hide)
    }

    return clearTimers
  }, [isVisible])

  // 處理 GA 追蹤
  const handleAnalytics = useCallback(() => {
    try {
      if (window.gtag) {
        window.gtag('event', 'click', {
          event_category: 'CTA',
          event_label: 'Floating LINE Button',
          transport_type: 'beacon'
        })
      }
    } catch (error) {
      console.error('GA tracking error:', error)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={variants.container}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transitions.container}
          className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8"
        >
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                variants={variants.tooltip}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transitions.tooltip}
                className="absolute -top-20 right-0 sm:-top-24 md:-right-3"
              >
                <div className="relative w-max rounded-2xl bg-white px-4 py-3 text-center shadow-lg ring-1 ring-neutral-100">
                  <p className="whitespace-nowrap text-sm font-medium text-neutral-600 sm:text-base">
                    專業醫師為您解答
                  </p>
                  <p className="mt-0.5 whitespace-nowrap text-xs text-neutral-500 sm:text-sm">
                    全程保密・安心諮詢
                  </p>
                  <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-white ring-1 ring-neutral-100 ring-inset" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Link
            href={CONFIG.links.line}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleAnalytics}
            className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#06C755] shadow-lg ring-4 ring-white/10 transition-all hover:-translate-y-1 hover:shadow-xl active:translate-y-0.5 sm:h-16 sm:w-16"
          >
            <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative z-10 flex h-8 w-8 items-center justify-center sm:h-9 sm:w-9">
              <Image
                src="/line-icon.svg"
                alt="LINE諮詢服務"
                width={isMobile ? 24 : 28}
                height={isMobile ? 24 : 28}
                className="transition-transform group-hover:scale-110"
                priority
              />
            </div>

            {/* 提示動畫 */}
            <motion.div
              variants={variants.notification}
              animate="animate"
              transition={transitions.notification}
              className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-rose-500 shadow-sm ring-4 ring-rose-400/20 sm:h-3.5 sm:w-3.5"
            />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 