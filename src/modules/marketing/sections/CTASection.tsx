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
              現在就開始，找回自在生活
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-7 text-neutral-600 [text-wrap:balance] md:text-lg md:leading-8">
              別讓隱疾成為生活的負擔。我們提供絕對保密的諮詢管道，
              由專業團隊為您解答疑惑，協助您邁出治療的第一步。
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
          <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-brand-500 to-brand-600 p-[2px] shadow-2xl">
            <div className="rounded-[1.4rem] bg-white p-8 md:p-12">
              <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-12">
                <div className={STYLES.contentWrapper}>
                  <h3 className="text-2xl font-bold text-neutral-900 md:text-3xl">
                    線上預約・專業諮詢
                  </h3>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    加入官方 LINE 帳號，即刻享有：
                  </p>
                  <ul className="text-left space-y-3 my-6 pl-2">
                    <li className="flex items-center gap-3 text-neutral-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#06C755]" />
                        <span>一對一私密諮詢，保障隱私</span>
                    </li>
                    <li className="flex items-center gap-3 text-neutral-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#06C755]" />
                        <span>專業術前評估與建議</span>
                    </li>
                    <li className="flex items-center gap-3 text-neutral-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#06C755]" />
                        <span>專人協助安排看診時間</span>
                    </li>
                  </ul>
                  <LineButton />
                </div>
                <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-brand-100 rounded-full blur-2xl opacity-50 transform scale-90 translate-y-4"></div>
                    <QRCode />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
