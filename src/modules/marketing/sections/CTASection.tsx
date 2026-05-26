'use client'

import { memo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2'
import { useScrollAnimation } from '@/shared/hooks/useAnimation'
import { getTransition } from '@/shared/animation'
import LineButton from '@/shared/components/common/LineButton'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import SectionBackdrop from '@/shared/ui/layout/SectionBackdrop'
import SectionHeader from '@/shared/ui/layout/SectionHeader'
import { sectionTones } from '@/shared/ui/layout/section-tones'

// 常量樣式定義
const STYLES = {
  section: sectionTones.brand,
  iconWrapper: 'flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-linear-to-br from-brand-500/20 to-brand-600/20',
  qrCodeWrapper: 'relative h-48 w-48 shrink-0',
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
  const { variants } = useScrollAnimation({ once: true })

  return (
    <Section className={STYLES.section}>
      <SectionBackdrop />

      <Container className="relative">
        <motion.div
          variants={variants.slideInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={getTransition(0.1)}
        >
          <SectionHeader
            title="別再忍，現在就開始改善"
            description="透過私密諮詢先判斷嚴重度，再安排合適的治療方向。不確定要不要看診，先問會更安心。"
            icon={<HiOutlineChatBubbleBottomCenterText className="h-7 w-7" />}
            badge="立即諮詢"
          />
        </motion.div>

        <motion.div
          variants={variants.slideInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={getTransition(0.4)}
          className="mt-14 md:mt-20"
        >
          <div className="surface-card mx-auto max-w-3xl overflow-hidden p-8 shadow-lg ring-2 ring-brand-100/80 md:p-12">
              <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-12">
                <div className={STYLES.contentWrapper}>
                  <h3 className="text-2xl font-bold text-neutral-900 md:text-3xl">
                    線上預約・專業評估
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
                        <span>初步症狀評估與就醫建議</span>
                    </li>
                    <li className="flex items-center gap-3 text-neutral-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#06C755]" />
                        <span>專人協助安排看診時間</span>
                    </li>
                  </ul>
                  <LineButton />
                </div>
                <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-brand-100 rounded-full blur-2xl opacity-50 transform scale-90 translate-y-4"></div>
                    <QRCode />
                </div>
              </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
