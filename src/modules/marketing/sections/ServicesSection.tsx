'use client'

import { motion, type Transition } from 'framer-motion'
import LineButton from '@/shared/components/common/LineButton'
import Link from 'next/link'
import { buttonVariants } from '@/shared/ui/primitives'
import { cn } from '@/shared/lib/cn'
import {
  HiOutlineHeart
} from 'react-icons/hi2'
import { useScrollAnimation, type AnimationVariants } from '@/shared/hooks/useAnimation'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import SectionBackdrop from '@/shared/ui/layout/SectionBackdrop'
import SectionHeader from '@/shared/ui/layout/SectionHeader'
import { sectionTones } from '@/shared/ui/layout/section-tones'
import { memo } from 'react'
import { DOCTOR_CURRENT_POSITIONS } from '@/config/site-content'
import { services, type Service } from '../data/services'
import { getTransition } from '@/shared/animation'

const ServiceCard = memo(function ServiceCard({
  service,
  index,
  isInView,
  variants,
  getCardTransition
}: {
  service: Service
  index: number
  isInView: boolean
  variants: AnimationVariants
  getCardTransition: (delay: number) => Transition
}) {
  return (
    <motion.div
      variants={variants.fadeIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={getCardTransition(index * 0.1)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'surface-card-interactive relative overflow-hidden p-6',
        service.highlight && 'ring-brand-200/70 bg-brand-50/30'
      )}
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
          ? 'bg-brand-100/80 text-brand-600'
          : 'bg-neutral-100/80 text-neutral-600'
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
          <li key={featureIndex} className="flex items-start gap-2 text-sm leading-6 text-neutral-600">
            <span className={`h-1.5 w-1.5 rounded-full ${
              service.highlight ? 'bg-brand-600' : 'bg-neutral-400'
            }`} />
            {feature}
          </li>
        ))}
      </ul>

      <motion.div
        className="absolute inset-0 rounded-2xl bg-linear-to-br from-brand-50/50 to-transparent opacity-0"
        initial={false}
        whileHover={{ opacity: service.highlight ? 0 : 1 }}
      />
    </motion.div>
  )
})

export default function ServicesSection() {
  const { ref, isInView, variants } = useScrollAnimation()
  const getCardTransition = (delay: number) => getTransition(delay)

  return (
    <Section
      ref={ref}
      id="services"
      aria-label="診療服務"
      className={cn('overflow-hidden', sectionTones.muted)}
    >
      <SectionBackdrop />

      <Container className="relative">
        <motion.div
          variants={variants.fadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={getTransition(0.1)}
        >
          <SectionHeader
            title="專業診療服務"
            description="從保守療法到微創手術，所有療程皆由醫師親自評估與執行，配合術前規劃與術後照護，確保每一步都清楚且安心。"
            icon={<HiOutlineHeart className="h-7 w-7" />}
            badge="診療項目"
          />
        </motion.div>

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
                getCardTransition={getCardTransition}
              />
            ))}
          </div>
        </div>

        {/* 診所特色 */}
        <motion.div
          variants={variants.fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={getTransition(1)}
          className="mt-12 md:mt-24"
        >
          <div className="surface-card mx-auto max-w-4xl p-6 sm:p-8">
            <h3 className="mb-6 text-center text-2xl font-semibold tracking-tight text-neutral-900">
              診所特色服務
            </h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-brand-600">多點門診服務</h4>
                <ul className="space-y-2 text-sm text-neutral-600">
                  {DOCTOR_CURRENT_POSITIONS.map((position) => (
                    <li key={position}>• {position}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-brand-600">專業醫療保障</h4>
                <ul className="space-y-2 text-sm text-neutral-600">
                  <li>• <strong>中西醫雙學位</strong>：結合西醫解剖精準度與中醫整體調理，提供更全面的照護建議。</li>
                  <li>• <strong>十五年臨床積累</strong>：歷經醫學中心專科訓練，專精複雜性瘻管與重度痔瘡治療。</li>
                  <li>• <strong>低疼痛管理 SOP</strong>：從麻醉方式選擇到術後預防性止痛，建立完善的疼痛管理流程。</li>
                  <li>• <strong>數位化術後追蹤</strong>：透過 LINE 官方帳號提供一對一恢復諮詢，確保返家照護無死角。</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-neutral-100 pt-8 text-center">
              <p className="text-sm leading-relaxed text-neutral-500">
                我們理解每一位患者的擔憂。除了技術的精進，阿福醫師團隊更重視「就醫的尊嚴」與「隱私的保護」，<br className="hidden md:block" />
                從診間評估到術後回診，陪您在溫暖且專業的氛圍中重拾舒適生活。
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={variants.slideInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={getTransition(1.2)}
          className="mt-10 flex flex-col items-center gap-4 md:mt-16 md:flex-row md:justify-center"
        >
          <LineButton
            text="預約專業評估"
            analyticsData={{ text: 'services_cta', location: 'services', destination: 'line' }}
          />
          <Link
            href="/consultation"
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'lg' }),
              'rounded-full px-6'
            )}
          >
            了解諮詢流程
          </Link>
        </motion.div>
      </Container>
    </Section>
  )
}
