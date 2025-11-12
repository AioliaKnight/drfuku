'use client'

import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { trackCtaClick } from '@/shared/lib/analytics'

// 型別定義
interface LineButtonProps {
  variant?: 'default' | 'floating'
  className?: string
  text?: string
  analyticsData?: {
    text: string
    location: string
    destination: string
    type?: string
    category?: string
    position?: string
    variant?: string
  }
}

// 樣式定義
const STYLES = {
  default: {
    button: 'group inline-flex items-center gap-2 rounded-xl bg-[#06C755] px-6 py-3 text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0.5',
    icon: 'h-5 w-5 transition-transform group-hover:scale-110',
    text: 'text-base font-medium md:text-lg',
    hoverEffect: 'absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100'
  },
  floating: {
    button: 'group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#06C755] shadow-lg ring-4 ring-white/10 transition-all hover:-translate-y-1 hover:shadow-xl active:translate-y-0.5 sm:h-16 sm:w-16',
    icon: 'h-8 w-8 transition-transform group-hover:scale-110 sm:h-9 sm:w-9',
    text: 'sr-only',
    hoverEffect: 'absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100'
  }
} as const

// LINE 按鈕組件
const LineButton = memo(function LineButton({
  variant = 'default',
  className = '',
  text = 'LINE諮詢服務',
  analyticsData
}: LineButtonProps) {
  const styles = STYLES[variant]

  const handleClick = () => {
    if (analyticsData) {
      trackCtaClick(analyticsData)
    }
  }

  return (
    <Link
      href="https://line.me/ti/p/~@772pable"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${styles.button} ${className}`}
      aria-label={text}
    >
      <div className={styles.hoverEffect} aria-hidden="true" />
      <Image
        src="/line-icon.svg"
        alt=""
        width={24}
        height={24}
        className={styles.icon}
        priority
        unoptimized
      />
      <span className={styles.text}>{text}</span>
    </Link>
  )
})

export default LineButton
