'use client'

import { motion } from 'framer-motion'
import Container from './Container'
import { fadeInUpAnimation } from '@/shared/animation'
import { cn } from '@/shared/lib/cn'

interface PageHeaderProps {
  title: string
  description?: string
  badge?: string
  className?: string
  tone?: 'brand' | 'warm' | 'care' | 'white'
}

const toneStyles = {
  brand: 'bg-linear-to-b from-brand-50/80 via-white to-white',
  warm: 'bg-linear-to-b from-warm-50/80 via-white to-white',
  care: 'bg-linear-to-b from-care-50/80 via-white to-white',
  white: 'bg-white',
}

export default function PageHeader({
  title,
  description,
  badge,
  className,
  tone = 'brand',
}: PageHeaderProps) {
  return (
    <section className={cn('relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24', toneStyles[tone], className)}>
      {/* 背景裝飾 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-7xl bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.08),transparent_70%)]" />
      
      <Container>
        <motion.div
          {...fadeInUpAnimation}
          className="mx-auto max-w-4xl text-center"
        >
          {badge && (
            <span className="mb-6 inline-block rounded-full bg-white/80 px-4 py-1.5 text-[10px] font-bold tracking-widest text-brand-700 uppercase ring-1 ring-neutral-200/50 shadow-sm backdrop-blur-md">
              {badge}
            </span>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl [text-wrap:balance]">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl md:leading-9">
              {description}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
