'use client'

import { useRef, memo, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  HiChevronRight,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineMapPin,
  HiOutlineChatBubbleOvalLeft,
  HiOutlinePhone
} from 'react-icons/hi2'
import { 
  getTransition, 
  springBounceAnimation, 
  springScaleInAnimation, 
  springSlideInUpAnimation, 
  staggerContainer 
} from '@/shared/animation'
import { buttonVariants } from '@/shared/ui/primitives'
import { cn } from '@/shared/lib/cn'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import { DOCTOR_COPY, toTelHref } from '@/config/site-content'
import { CLINIC, ASSETS } from '@/config/constants'
import { sectionTones } from '@/shared/ui/layout/section-tones'
import { features, locations } from '../data/hero'

// 常量樣式定義
const STYLES = {
  featureIcon:
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100/60 md:h-12 md:w-12',
  locationCard:
    'surface-card-interactive group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 md:p-6',
} as const

// 使用 memo 優化重複渲染的組件
const Feature = memo(function Feature({ icon, text }: typeof features[number]) {
  return (
    <motion.div
      variants={springBounceAnimation}
      className="flex items-center gap-3 bg-white/40 backdrop-blur-xs px-4 py-2 rounded-xl ring-1 ring-neutral-200/30 shadow-xs transition-all hover:bg-white/60"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100/40">
        {icon}
      </div>
      <span className="text-sm font-medium text-neutral-800">{text}</span>
    </motion.div>
  )
})

const Location = memo(function Location({
  name,
  address,
  telephone,
  serviceAreaNote,
  link,
}: typeof locations[number]) {
  const isExternalLink = Boolean(link)
  const content = (
    <>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-neutral-900 group-hover:text-brand-600 transition-colors">
            {name}
          </h3>
          {isExternalLink && (
            <HiOutlineArrowTopRightOnSquare className="h-4 w-4 text-neutral-400 transition-colors group-hover:text-brand-600" />
          )}
        </div>
        
        {address ? (
          <div className="flex items-start gap-1.5 text-sm text-neutral-600">
            <HiOutlineMapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
            <span className="line-clamp-1 sm:line-clamp-none">{address}</span>
          </div>
        ) : (
          <p className="text-sm text-neutral-500 italic">門診資訊請洽 LINE 諮詢</p>
        )}

        <div className="flex flex-wrap items-center gap-4 pt-1">
          {telephone && (
            <a
              href={toTelHref(telephone)}
              className="flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 hover:underline decoration-brand-200"
              onClick={(e) => e.stopPropagation()}
            >
              <HiOutlinePhone className="h-4 w-4" />
              {telephone}
            </a>
          )}
          {serviceAreaNote && (
            <span className="text-[11px] font-medium text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded-md">
              {serviceAreaNote.split('，')[0]}
            </span>
          )}
        </div>
      </div>
      
      <div className="hidden sm:block">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-all group-hover:bg-brand-600 group-hover:text-white">
          <HiChevronRight className="h-5 w-5" />
        </div>
      </div>
    </>
  )

  const cardClassName = cn(
    STYLES.locationCard,
    "hover:ring-brand-200/50"
  )

  if (!isExternalLink) {
    return (
      <motion.div
        className={cardClassName}
        variants={springBounceAnimation}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.99 }}
        role="group"
        aria-label={name}
      >
        {content}
      </motion.div>
    )
  }

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClassName}
      variants={springBounceAnimation}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
    >
      {content}
    </motion.a>
  )
})

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  const handleServicesClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.querySelector('#services')
    if (element) {
      const headerHeight = 64
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  return (
    <Section
      ref={containerRef}
      aria-label="首頁主視覺"
      padding="none"
      className={`relative min-h-[calc(100dvh-var(--header-height))] md:min-h-[calc(100dvh-var(--header-height-md))] overflow-hidden ${sectionTones.hero}`}
    >
      {/* 裝飾背景元件 - 更柔和且富有溫度的光暈 */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[10%] -left-[5%] h-[60%] w-[60%] rounded-full bg-brand-100/20 blur-[120px] opacity-70" />
        <div className="absolute top-[20%] -right-[10%] h-[70%] w-[70%] rounded-full bg-care-100/30 blur-[100px] opacity-50" />
        <div className="absolute bottom-[0%] left-[20%] h-[40%] w-[40%] rounded-full bg-warm-100/40 blur-[80px] opacity-40" />
      </div>

      <Container id="main-content" className="relative z-10">
        <div className="flex min-h-[calc(100dvh-var(--header-height))] md:min-h-[calc(100dvh-var(--header-height-md))] flex-col items-center justify-between gap-12 pt-8 pb-20 md:flex-row md:pt-0 md:pb-0">
          
          {/* 左側：文字內容 - 強化溫度與同理心 */}
          <div className="flex w-full flex-col items-center text-center md:w-3/5 md:items-start md:text-left">
            <motion.div
              variants={springSlideInUpAnimation}
              initial="hidden"
              animate="visible"
              className="space-y-10 md:space-y-12"
            >
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-lg bg-care-50 px-3 py-1 text-xs font-bold tracking-widest text-care-600 uppercase ring-1 ring-care-100/50 md:text-sm">
                  <span className="flex h-2 w-2 rounded-full bg-care-500 animate-pulse" />
                  Compassionate Colorectal Specialist
                </span>
                <h1 className="text-4xl font-bold tracking-tight text-neutral-900 leading-snug sm:text-5xl lg:text-6xl xl:text-7xl">
                  <span className="font-serif italic text-brand-700">{DOCTOR_COPY.heroTitle}</span>
                  <br />
                  <span className="bg-linear-to-r from-brand-700 via-brand-600 to-brand-500 bg-clip-text text-transparent font-serif">
                    {DOCTOR_COPY.heroHighlight}
                  </span>
                </h1>
                <h2 className="text-lg font-semibold tracking-wide text-neutral-600 sm:text-xl lg:text-2xl">
                  {DOCTOR_COPY.heroSubtitle}
                </h2>
              </div>

              <p className="max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg lg:text-xl lg:leading-9">
                大腸直腸外科專科醫師徐彥勳（阿福醫師）致力於
                <span className="mx-1 font-bold text-neutral-900 underline decoration-care-200 underline-offset-8">溫暖診療</span>與 
                <span className="mx-1 font-bold text-neutral-900 underline decoration-care-200 underline-offset-8">專業止痛</span>。
                運用先進微創技術，陪您在安心與尊嚴中找回健康生活。
              </p>

              {/* 特色列表 - 更精簡 */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center gap-3 md:justify-start lg:gap-4"
              >
                {features.map((feature, index) => (
                  <Feature key={index} {...feature} />
                ))}
              </motion.div>

              {/* 行動按鈕 - 樣式精煉 */}
              <div className="flex flex-col items-center gap-5 pt-4 sm:flex-row md:justify-start">
                <Link
                  href="#services"
                  className={cn(
                    buttonVariants({ variant: 'primaryGradient', size: 'lg' }),
                    'group w-full sm:w-auto min-w-[200px] gap-2 rounded-2xl shadow-lg shadow-brand-600/10 hover:-translate-y-1 active:scale-[0.98] py-4'
                  )}
                  onClick={handleServicesClick}
                >
                  <span className="font-bold">了解診療服務</span>
                  <HiChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={CLINIC.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full sm:w-auto min-w-[200px] items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-base font-bold text-[#06C755] shadow-md ring-1 ring-neutral-200 transition-all hover:-translate-y-1 hover:ring-[#06C755]/30 active:scale-[0.98]"
                >
                  <HiOutlineChatBubbleOvalLeft className="h-6 w-6" />
                  <span>立即 LINE 諮詢</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* 右側：醫師形象照 - 裝飾更簡約 */}
          <div className="relative w-full md:w-2/5 lg:w-[480px]">
            <motion.div
              variants={springScaleInAnimation}
              initial="hidden"
              animate="visible"
              className="relative aspect-[4/5] w-full md:aspect-[3/4]"
            >
              {/* 背景裝飾形狀 - 更柔和 */}
              <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden">
                <div className="absolute -bottom-8 left-1/2 h-[115%] w-[115%] -translate-x-1/2 rounded-[3.5rem] bg-linear-to-br from-brand-500 to-brand-300 rotate-6 opacity-[0.08] blur-xl" />
                <div className="absolute -bottom-4 left-1/2 h-[105%] w-[105%] -translate-x-1/2 rounded-[3rem] bg-brand-50/50 rotate-2 ring-1 ring-brand-100/30" />
              </div>
              
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-neutral-200/20">
                <Image
                  src={ASSETS.doctorPhoto}
                  alt={`${DOCTOR_COPY.displayName} - 大腸直腸外科專科醫師`}
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
                {/* 漸層遮罩 */}
                <div className="absolute inset-0 bg-linear-to-t from-neutral-900/10 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* 底部：門診據點導覽 - 更多留白 */}
        <motion.div
          variants={springSlideInUpAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={getTransition(1.2)}
          className="mt-20 md:mt-32 lg:mt-48"
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center justify-between px-2">
              <div className="flex items-center gap-3 text-neutral-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-600/20">
                  <HiOutlineMapPin className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">門診據點</h2>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                <span className="text-sm font-medium text-neutral-500">台北 · 台中 · 南投 · 草屯</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
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
