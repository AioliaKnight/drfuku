'use client'

import { memo } from 'react'
import { HiOutlineStar, HiStar, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useScrollAnimation, type AnimationVariants } from '@/shared/hooks/useAnimation'
import { baseTransition, getTransition } from '@/shared/animation'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import SectionBackdrop from '@/shared/ui/layout/SectionBackdrop'
import SectionHeader from '@/shared/ui/layout/SectionHeader'
import { sectionTones } from '@/shared/ui/layout/section-tones'
import { testimonials } from '../data/testimonials'

// 優化RatingStars組件
const RatingStars = memo(({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1" role="img" aria-label={`${rating}顆星評價`}>
    {[...Array(5)].map((_, index) => (
      index < rating ? (
        <HiStar key={index} className="h-4 w-4 md:h-5 md:w-5 text-amber-400" aria-hidden="true" />
      ) : (
        <HiOutlineStar key={index} className="h-4 w-4 md:h-5 md:w-5 text-amber-400" aria-hidden="true" />
      )
    ))}
  </div>
))

RatingStars.displayName = 'RatingStars'

// 優化TestimonialCard組件
const TestimonialCard = memo(({ testimonial, index, isInView, variants }: {
  testimonial: typeof testimonials[0],
  index: number,
  isInView: boolean,
  variants: AnimationVariants
}) => {
  return (
    <motion.div
      variants={variants.fadeIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ ...baseTransition, duration: 0.5, delay: index * 0.1 }}
      className="surface-card-interactive group h-full p-6 md:p-8"
      role="article"
      aria-label={`${testimonial.author}的治療心得`}
    >
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 md:h-14 md:w-14 overflow-hidden rounded-full ring-2 ring-brand-50 transition-transform group-hover:scale-105">
            <Image
              src={testimonial.avatar}
              alt={testimonial.author}
              fill
              sizes="56px"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base md:text-lg font-medium text-neutral-900">
                {testimonial.author}
              </h3>
              <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                {testimonial.age}
              </span>
            </div>
            <p className="text-sm text-neutral-500 mt-0.5">{testimonial.title}</p>
            <div className="mt-1">
              <RatingStars rating={testimonial.rating} />
            </div>
          </div>
        </div>
        <span className="ml-0 md:ml-auto rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-600 font-medium">
          {testimonial.date}
        </span>
      </div>

      <div className="space-y-4">
        <p className="text-base text-neutral-700 leading-relaxed">
          {testimonial.content.main}
        </p>
        <div className="pt-4 border-t border-neutral-50">
            <h4 className="mb-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">治療特色</h4>
            <div className="flex flex-wrap gap-2">
                {testimonial.content.pros.map((pro, i) => (
                <span
                    key={i}
                    className="rounded-md bg-neutral-50 px-2 py-1 text-xs text-neutral-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors"
                >
                    #{pro}
                </span>
                ))}
            </div>
        </div>
      </div>
    </motion.div>
  )
})

TestimonialCard.displayName = 'TestimonialCard'

export default function TestimonialsSection() {
  const { ref, isInView, variants } = useScrollAnimation()

  return (
    <Section
      ref={ref}
      id="testimonials"
      role="region"
      aria-label="病患心得分享"
      className={sectionTones.muted}
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
            title="病患心得分享"
            description="聽聽其他病患的真實故事，了解我們如何透過專業與細心的照護，協助他們重拾健康生活。"
            icon={<HiOutlineChatBubbleLeftRight className="h-7 w-7" aria-hidden="true" />}
            badge="真實回饋"
          />
        </motion.div>

        <div className="mt-12 md:mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
                <TestimonialCard
                    key={index}
                    testimonial={testimonial}
                    index={index}
                    isInView={isInView}
                    variants={variants}
                />
            ))}
        </div>
      </Container>
    </Section>
  )
}
