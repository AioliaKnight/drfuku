'use client'

import { useRef, memo, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  HiChevronRight,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineMapPin,
  HiOutlineChatBubbleOvalLeft
} from 'react-icons/hi2'
import { baseTransition, getTransition } from '@/shared/animation'
import { buttonVariants } from '@/shared/ui/primitives'
import { cn } from '@/shared/lib/cn'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import { DOCTOR_COPY, toTelHref } from '@/config/site-content'
import { CLINIC } from '@/config/constants'
import { sectionTones } from '@/shared/ui/layout/section-tones'
import { features, locations } from '../data/hero'

// 動畫變體
const animationVariants = {
  bounce: {
    hidden: { opacity: 0, y: 15 },
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
    visible: { transition: { staggerChildren: 0.08 } }
  }
} as const

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
      variants={animationVariants.bounce}
      className="flex items-center gap-3 bg-white/50 backdrop-blur-xs px-4 py-2.5 rounded-2xl ring-1 ring-neutral-200/50 shadow-xs"
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={STYLES.featureIcon}>
        {icon}
      </div>
      <span className="text-sm font-bold text-neutral-800 md:text-base">{text}</span>
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
        variants={animationVariants.bounce}
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
      variants={animationVariants.bounce}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
    >
      {content}
    </motion.a>
  )
})

function HiOutlinePhone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const backgroundStyle = useMemo(() => ({ opacity }), [opacity])

  const handleServicesClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.querySelector('#services')
    if (element) {
      const headerHeight = 64 // h-16
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
      className={`min-h-[calc(100dvh-4rem)] overflow-hidden ${sectionTones.hero}`}
    >
      {/* 動態背景 */}
      <motion.div
        style={backgroundStyle}
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-50/50 via-white to-brand-100/30"
      />

      <Container id="main-content" className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-12 md:py-24">
        <div className="surface-card mx-auto w-full max-w-5xl space-y-8 p-6 text-center shadow-xl ring-1 ring-neutral-200/50 backdrop-blur-md md:space-y-10 md:p-16">
          {/* 主標題區塊 */}
          <div className="relative">
            <motion.div
              variants={animationVariants.slideInUp}
              initial="hidden"
              animate="visible"
              transition={{ ...baseTransition, duration: 0.6 }}
              className="relative"
            >
              <span className="mb-6 inline-block rounded-full bg-brand-600/10 px-4 py-1.5 text-xs font-bold tracking-widest text-brand-700 uppercase ring-1 ring-brand-600/20 md:text-sm">
                Colorectal Specialist
              </span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 [text-wrap:balance] sm:text-5xl md:text-6xl lg:text-7xl">
                {DOCTOR_COPY.heroTitle}
                <br className="hidden sm:inline" />
                <span className="relative inline-block mt-2 sm:mt-0">
                  <span className="relative z-10 bg-linear-to-r from-brand-700 via-brand-600 to-brand-500 bg-clip-text text-transparent">
                    {DOCTOR_COPY.heroHighlight}
                  </span>
                  <motion.span
                    variants={animationVariants.scaleIn}
                    initial="hidden"
                    animate="visible"
                    transition={getTransition(0.3)}
                    className="absolute -inset-x-2 -inset-y-1 -z-10 block rounded-xl bg-brand-50 sm:-inset-x-4"
                  />
                </span>
                <br className="hidden sm:inline" />
                <span className="block mt-2 sm:inline sm:mt-0">{DOCTOR_COPY.heroSubtitle}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 md:mt-8 md:text-xl md:leading-8">
                大腸直腸外科專科醫師徐彥勳（阿福醫師）提供
                <span className="font-bold text-neutral-900"> LHP 雷射痔瘡消融</span>與 
                <span className="font-bold text-neutral-900"> LigaSure 微創手術</span>。
                致力於極致止痛與快速恢復，助您找回自在生活。
              </p>
            </motion.div>
          </div>

          {/* 特色列表 */}
          <motion.div
            variants={animationVariants.stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-3 md:gap-6"
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
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="#services"
              className={cn(
                buttonVariants({ variant: 'primaryGradient', size: 'lg' }),
                'group w-full sm:w-auto gap-2 overflow-hidden rounded-2xl shadow-lg shadow-brand-600/20 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] transition-all'
              )}
              onClick={handleServicesClick}
            >
              <span className="relative z-10 font-bold">了解診療服務</span>
              <HiChevronRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={CLINIC.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-base font-bold text-[#06C755] shadow-sm ring-1 ring-neutral-200 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-[#06C755]/30 active:scale-[0.98]"
            >
              <HiOutlineChatBubbleOvalLeft className="h-6 w-6" />
              <span>立即 LINE 諮詢</span>
            </Link>
          </motion.div>
        </div>

        {/* 診所位置 */}
        <motion.div
          variants={animationVariants.slideInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={getTransition(1.2)}
          className="mt-12 md:mt-20"
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center justify-between px-2">
              <div className="flex items-center gap-2.5 text-neutral-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
                  <HiOutlineMapPin className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">門診據點</h2>
              </div>
              <span className="text-xs font-medium text-neutral-400">目前提供北中兩地服務</span>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
