'use client'

import { useRef, memo, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  HiChevronRight,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineMapPin
} from 'react-icons/hi2'
import { baseTransition, getTransition } from '@/shared/animation'
import { buttonVariants } from '@/shared/ui/primitives'
import { cn } from '@/shared/lib/cn'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import { features, locations } from '../data/hero'
import { CLINIC } from '@/config/constants'

// 動畫變體
const animationVariants = {
  bounce: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }
  },
  scaleIn: {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 25 } }
  },
  slideInUp: {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 25 } }
  },
  stagger: {
    visible: { transition: { staggerChildren: 0.05 } }
  }
} as const

// 使用 memo 優化靜態內容
// features, achievements, locations 已經移至 data/hero.tsx

// 常量樣式定義
const STYLES = {
  featureIcon: 'flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-4 ring-brand-50/50 md:h-12 md:w-12',
  locationCard: 'group flex items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-0.5 hover:shadow-md'
} as const

// 使用 memo 優化重複渲染的組件
const Feature = memo(function Feature({ icon, text }: typeof features[number]) {
  return (
    <motion.div
      variants={animationVariants.bounce}
      className="flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={STYLES.featureIcon}>
        {icon}
      </div>
      <span className="text-sm font-medium md:text-base">{text}</span>
    </motion.div>
  )
})

const Location = memo(function Location({ name, address, link }: typeof locations[number]) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={STYLES.locationCard}
      variants={animationVariants.bounce}
      whileHover={{ y: -2, transition: { type: 'spring', stiffness: 300 } }}
      whileTap={{ scale: 0.98 }}
    >
      <div>
        <h3 className="font-medium text-neutral-900 group-hover:text-brand-600">
          {name}
        </h3>
        <p className="text-sm text-neutral-600">{address}</p>
      </div>
      <HiOutlineArrowTopRightOnSquare className="h-5 w-5 text-neutral-400 transition-colors group-hover:text-brand-600" />
    </motion.a>
  )
})

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const backgroundStyle = useMemo(() => ({ opacity }), [opacity])

  const handleServicesClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <Section
      ref={containerRef}
      aria-label="首頁主視覺"
      padding="none"
      className="min-h-[calc(100dvh-4rem)] overflow-hidden bg-linear-to-b from-brand-50/50 via-white to-neutral-100/60"
    >
      {/* 無障礙跳過導航 */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-brand-600 focus:rounded-md focus:shadow-lg"
      >
        跳到主要內容
      </a>

      {/* 動態背景 - 使用 CSS 漸層替代多層背景 */}
      <motion.div
        style={backgroundStyle}
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-50/30 via-transparent to-brand-100/30"
      />

      <Container id="main-content" className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-16 md:py-28">
        <div className="mx-auto max-w-5xl space-y-10 rounded-3xl bg-white/75 p-8 text-center shadow-xl ring-1 ring-white/70 backdrop-blur md:p-12">
          {/* 主標題區塊 */}
          <div className="relative mb-8">
            <motion.div
              variants={animationVariants.slideInUp}
              initial="hidden"
              animate="visible"
              transition={baseTransition}
              className="relative"
            >
              <span className="mb-4 inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600 ring-1 ring-brand-100 md:text-base">
                大腸直腸外科專科
              </span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 [text-wrap:balance] sm:text-5xl md:text-6xl md:font-bold">
                阿福醫師
                <br className="hidden sm:inline" />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-linear-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                    大腸直腸外科徐彥勳
                  </span>
                  <motion.span
                    variants={animationVariants.scaleIn}
                    initial="hidden"
                    animate="visible"
                    transition={getTransition(0.2)}
                    className="absolute -inset-1 -z-10 block rounded-lg bg-brand-50"
                  />
                </span>
                <br className="hidden sm:inline" />
                微創痔瘡・專科醫療
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-7 text-neutral-600 md:text-xl md:leading-8">
                大腸直腸外科專科醫師徐彥勳（阿福醫師）擁有中西醫雙專業與十五年以上臨床經驗，
                以微創技術與貼心照護協助您在最短時間內找回自在生活。
              </p>
            </motion.div>
          </div>

          {/* 特色列表 */}
          <motion.div
            variants={animationVariants.stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-6 text-neutral-700"
          >
            {features.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </motion.div>

          {/* 行動按鈕 */}
          <motion.div
            variants={animationVariants.slideInUp}
            initial="hidden"
            animate="visible"
            transition={getTransition(0.8)}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="#services"
              className={cn(
                buttonVariants({ variant: 'primaryGradient', size: 'md' }),
                'group gap-2 overflow-hidden rounded-full shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0.5'
              )}
              onClick={handleServicesClick}
            >
              <span className="relative z-10">了解診療服務</span>
              <HiChevronRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-linear-to-r from-brand-700 to-brand-600 opacity-0 transition-all group-hover:opacity-100" />
            </Link>
            <Link
              href={CLINIC.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-medium text-brand-600 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-hidden focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 active:translate-y-0.5 md:text-lg"
            >
              <span>立即諮詢・隱私保密</span>
              <HiOutlineArrowTopRightOnSquare className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </div>

        {/* 診所位置 */}
        <motion.div
          variants={animationVariants.slideInUp}
          initial="hidden"
          animate="visible"
          transition={getTransition(1.2)}
          className="mt-12 md:mt-16"
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-2 text-neutral-900">
              <HiOutlineMapPin className="h-6 w-6" />
              <h2 className="text-xl font-bold">診所位置</h2>
            </div>
            <div className="grid gap-4">
              {locations.map((location, index) => (
                <Location key={index} {...location} />
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
