'use client'

import { motion } from 'framer-motion'
import {
  HiOutlineHeart
} from 'react-icons/hi2'
import { useScrollAnimation, type AnimationVariants, type AnimationTransitions } from '@/shared/hooks/useAnimation'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import { memo } from 'react'
import { services, type Service } from '../data/services'

const ServiceCard = memo(function ServiceCard({
  service,
  index,
  isInView,
  variants,
  transitions
}: {
  service: Service
  index: number
  isInView: boolean
  variants: AnimationVariants
  transitions: AnimationTransitions
}) {
  return (
    <motion.div
      variants={variants.fadeIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={transitions.withDelay(index * 0.1)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
      className={`group relative overflow-hidden rounded-2xl p-6 shadow-sm ring-1 transition-all hover:shadow-lg ${
        service.highlight
          ? 'bg-gradient-to-br from-brand-50 to-white ring-brand-100 hover:ring-brand-200'
          : 'bg-white ring-neutral-100 hover:ring-neutral-200'
      }`}
    >
      {service.highlight && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center rounded-full bg-brand-600 px-2 py-1 text-xs font-medium text-white">
            熱門
          </span>
        </div>
      )}

      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
        service.highlight
          ? 'bg-brand-100 text-brand-600'
          : 'bg-neutral-100 text-neutral-600'
      } transition-colors group-hover:scale-110`}>
        {service.icon}
      </div>

      <h3 className="mb-3 text-xl font-bold text-neutral-900 group-hover:text-brand-600">
        {service.title}
      </h3>

      <p className="mb-4 text-base leading-7 text-neutral-600">
        {service.description}
      </p>

      <ul className="space-y-2">
        {service.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center gap-2 text-sm leading-6 text-neutral-600">
            <span className={`h-1.5 w-1.5 rounded-full ${
              service.highlight ? 'bg-brand-600' : 'bg-neutral-400'
            }`} />
            {feature}
          </li>
        ))}
      </ul>

      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-50/50 to-transparent opacity-0"
        initial={false}
        whileHover={{ opacity: service.highlight ? 0 : 1 }}
      />
    </motion.div>
  )
})

export default function ServicesSection() {
  const { ref, isInView, variants, transitions } = useScrollAnimation()

  return (
    <Section
      ref={ref}
      id="services"
      aria-label="診療服務"
      className="overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white"
    >
      {/* 背景裝飾 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-brand-50/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-neutral-50/60 blur-3xl" />
      </div>

      <Container className="relative">
        {/* 標題區塊 */}
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <motion.div
            variants={variants.scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={transitions.default}
            className="mb-6 flex justify-center"
          >
            <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/20">
              <HiOutlineHeart className="h-6 w-6 md:h-8 md:w-8 text-brand-600" />
            </div>
          </motion.div>

          <motion.div
            variants={variants.fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={transitions.withDelay(0.2)}
          >
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              專業診療服務
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-7 text-neutral-600 [text-wrap:balance] md:text-lg md:leading-8">
              從保守療法到微創手術，所有療程皆由醫師親自評估與執行，
              配合術前規劃與術後照護，確保每一步都清楚且安心。
            </p>
          </motion.div>
        </div>

        {/* 服務卡片網格 */}
        <div className="mt-10 md:mt-20">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                index={index}
                isInView={isInView}
                variants={variants}
                transitions={transitions}
              />
            ))}
          </div>
        </div>

        {/* 診所特色 */}
        <motion.div
          variants={variants.fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={transitions.withDelay(1)}
          className="mt-12 md:mt-24"
        >
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-br from-brand-50 to-white p-6 shadow-sm ring-1 ring-brand-100 sm:p-8">
            <h3 className="mb-6 text-center text-2xl font-semibold tracking-tight text-neutral-900">
              診所特色服務
            </h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-brand-600">多點門診服務</h4>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li>• 禾馨台中安和、內湖民權婦幼診所主治醫師</li>
                  <li>• 佑民醫院（草屯）大腸直腸外科主治醫師</li>
                  <li>• 賦真妍診所特約痔瘡專科門診</li>
                  <li>• 秘境美學診所特約痔瘡專科門診</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-brand-600">專業醫療保障</h4>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li>• 中西醫雙學位專業背景</li>
                  <li>• 15年以上豐富臨床經驗</li>
                  <li>• 5000+ 成功治療案例</li>
                  <li>• 98% 患者滿意度評價</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
