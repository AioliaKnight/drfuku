'use client'

import Image from 'next/image'
import Link from 'next/link'
import { memo, type ReactElement } from 'react'
import { motion, type Transition } from 'framer-motion'
import {
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineClipboardDocument,
  HiOutlineUserCircle,
} from 'react-icons/hi2'

import {
  DOCTOR_COPY,
  DOCTOR_PROFILE_SECTIONS,
  type DoctorProfileSection,
  type DoctorProfileSectionIcon,
} from '@/config/site-content'
import { ASSETS } from '@/config/constants'
import LineButton from '@/shared/components/common/LineButton'
import { baseTransition, getTransition } from '@/shared/animation'
import { useScrollAnimation, type AnimationVariants as AnimationVariantsType } from '@/shared/hooks/useAnimation'
import { cn } from '@/shared/lib/cn'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import SectionBackdrop from '@/shared/ui/layout/SectionBackdrop'
import SectionHeader from '@/shared/ui/layout/SectionHeader'
import { sectionTones } from '@/shared/ui/layout/section-tones'
import { buttonVariants } from '@/shared/ui/primitives'

const SECTION_ICONS: Record<DoctorProfileSectionIcon, ReactElement> = {
  current: <HiOutlineUserCircle className="h-6 w-6 text-brand-600" aria-hidden="true" />,
  education: <HiOutlineAcademicCap className="h-6 w-6 text-brand-600" aria-hidden="true" />,
  experience: <HiOutlineBriefcase className="h-6 w-6 text-brand-600" aria-hidden="true" />,
  specialties: <HiOutlineClipboardDocument className="h-6 w-6 text-brand-600" aria-hidden="true" />,
}

interface ExperienceCardProps {
  category: DoctorProfileSection
  index: number
  isInView: boolean
  variants: AnimationVariantsType
  getTransition: (delay: number) => Transition
}

const ExperienceCard = memo<ExperienceCardProps>(function ExperienceCard({
  category,
  index,
  isInView,
  variants,
  getTransition,
}) {
  return (
    <motion.div
      variants={variants.fadeIn}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={getTransition(index * 0.1)}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className="surface-card-interactive p-6"
      role="article"
      aria-labelledby={`category-${category.id}`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50/80 backdrop-blur-xs"
          aria-hidden="true"
        >
          {SECTION_ICONS[category.icon]}
        </div>
        <h3 id={`category-${category.id}`} className="text-xl font-bold text-neutral-900">
          {category.title}
        </h3>
      </div>
      <ul className="space-y-3" role="list">
        {category.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-base text-neutral-600 md:text-lg">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
})

export default function AboutSection() {
  const { ref, isInView, variants } = useScrollAnimation()
  const getCardTransition = (delay: number): Transition => getTransition(delay)

  return (
    <Section
      ref={ref}
      id="about"
      aria-label="關於阿福醫師"
      className={cn('overflow-hidden', sectionTones.white)}
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
            title={DOCTOR_COPY.headline}
            description={DOCTOR_COPY.summary}
            icon={<HiOutlineUserCircle className="h-7 w-7 text-brand-600" />}
            badge="專業醫師介紹"
            className="mb-20"
          />
        </motion.div>

        <div className="mt-16 flex flex-col items-center gap-16 md:mt-24 md:flex-row md:items-start lg:gap-24">
          <motion.div
            variants={variants.slideInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={baseTransition}
            className="w-full space-y-12 md:w-1/2 lg:w-2/5"
          >
            <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-[3rem] shadow-warm-xl transition-all hover:-translate-y-1">
              <div
                className="absolute -right-6 -top-6 h-full w-full rounded-[3rem] bg-care-50/50"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-6 -left-6 h-full w-full rounded-[3rem] bg-linear-to-br from-brand-100/40 to-care-100/30"
                aria-hidden="true"
              />
              <div className="relative min-h-[400px] h-full w-full overflow-hidden rounded-[3rem] ring-1 ring-neutral-200/20">
                <Image
                  src={ASSETS.doctorPhoto}
                  alt={`${DOCTOR_COPY.displayName} - 大腸直腸外科專科醫師`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, 500px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-neutral-900/10 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div
                className="absolute -right-4 -top-4 h-full w-full rounded-2xl bg-linear-to-br from-neutral-50 to-white/80"
                aria-hidden="true"
              />
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src="/徐彥勳醫師-直外科學會醫師證書.webp"
                  alt="徐彥勳醫師 大腸直腸外科學會專科醫師證書"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  loading="lazy"
                  className="object-contain object-center p-4 transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={variants.slideInRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={baseTransition}
            className="w-full space-y-8 md:w-1/2 lg:w-3/5"
          >
            <p className="mb-8 text-base leading-7 text-neutral-600 md:text-lg md:leading-8">
              {DOCTOR_COPY.bio}
            </p>

            {DOCTOR_PROFILE_SECTIONS.map((category, index) => (
              <ExperienceCard
                key={category.id}
                category={category}
                index={index}
                isInView={isInView}
                variants={variants}
                getTransition={getCardTransition}
              />
            ))}

            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <LineButton
                text="預約醫師評估"
                analyticsData={{ text: 'about_cta', location: 'about', destination: 'line' }}
              />
              <Link
                href="/services"
                className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'rounded-full px-6')}
              >
                了解診療服務
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
