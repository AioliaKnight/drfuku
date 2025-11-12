'use client'

import { memo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2'
import { useScrollAnimation } from '@/shared/hooks/useAnimation'
import LineButton from '@/shared/components/common/LineButton'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'

// 常量樣式定義
const STYLES = {
  section: 'relative overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-neutral-50',
  iconWrapper: 'flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/20',
  qrCodeWrapper: 'relative h-48 w-48 flex-shrink-0',
  contentWrapper: 'space-y-4 text-center md:text-left',
  title: 'mb-3 text-xl font-semibold text-neutral-900 md:text-2xl md:tracking-tight',
  description: 'mb-6 text-base leading-7 text-neutral-600 md:text-lg md:leading-8',
  button: 'group relative inline-flex items-center justify-center gap-2 rounded-full bg-[#06C755] px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0.5 md:text-lg',
  buttonIcon: 'relative z-10 transition-transform group-hover:scale-110',
  buttonText: 'relative z-10',
  buttonHoverEffect: 'absolute inset-0 rounded-full bg-black/10 opacity-0 transition-opacity group-hover:opacity-100'
} as const

// QR Code 組件
const QRCode = memo(function QRCode() {
  return (
    <div className={STYLES.qrCodeWrapper}>
      <Image
        src="/line-qr.png"
        alt="LINE QR Code"
        fill
        className="object-contain"
      />
    </div>
  )
})

// 主要組件
export default function CTASection() {
  const { variants, transitions } = useScrollAnimation({ once: true })

  return (
    <Section className={STYLES.section}>
      {/* 背景裝飾 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[300px] w-[300px] rounded-full bg-brand-50/40 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-brand-50/30 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <motion.div
            variants={variants.scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={transitions.default}
            className="mb-6 flex justify-center"
          >
            <div className={STYLES.iconWrapper}>
              <HiOutlineChatBubbleBottomCenterText className="h-6 w-6 md:h-8 md:w-8 text-brand-600" />
            </div>
          </motion.div>
          <motion.div
            variants={variants.slideInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={transitions.withDelay(0.2)}
          >
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              安心預約諮詢
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-7 text-neutral-600 [text-wrap:balance] md:text-lg md:leading-8">
              您的健康與隱私，都是我們最關心的事。
              如果您正在困擾著相關疾病問題，
              歡迎透過保密的諮詢管道與我們聯繫，
              讓專業的醫療團隊為您提供協助。
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={variants.slideInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={transitions.withDelay(0.4)}
          className="mt-14 md:mt-20"
        >
          <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-brand-600 to-brand-500 p-[1px] shadow-2xl">
            <div className="rounded-[1.25rem] bg-white p-6 md:p-10">
              <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12">
                <QRCode />
                <div className={STYLES.contentWrapper}>
                  <h3 className={STYLES.title}>
                    安全預約諮詢
                  </h3>
                  <p className={STYLES.description}>
                    透過加密的 LINE 一對一諮詢，
                    立即獲得專業建議、術前評估與預約協助，
                    全程由專人跟進，保障隱私零壓力。
                  </p>
                  <LineButton />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
