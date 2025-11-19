'use client'

import { memo } from 'react'
import { HiOutlineStar, HiStar, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/shared/hooks/useAnimation'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
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
  variants: any
}) => {
  return (
    <motion.div
      variants={variants.fadeIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group h-full rounded-2xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-lg"
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
  const { ref, isInView, variants, transitions } = useScrollAnimation()

  return (
    <Section
      ref={ref}
      id="testimonials"
      role="region"
      aria-label="病患心得分享"
      className="overflow-hidden bg-gradient-to-b from-white via-neutral-50/30 to-white"
    >
      {/* 裝飾背景 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-brand-50/40 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-neutral-100/40 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <motion.div
            variants={variants.scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={transitions.default}
            className="mb-6 flex justify-center"
          >
            <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/20">
              <HiOutlineChatBubbleLeftRight className="h-6 w-6 md:h-8 md:w-8 text-brand-600" aria-hidden="true" />
            </div>
          </motion.div>
          <motion.div
            variants={variants.fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={transitions.withDelay(0.2)}
          >
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
              病患心得分享
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-7 text-neutral-600 [text-wrap:balance] md:text-lg md:leading-8">
              聽聽其他病患的真實故事，了解我們如何透過專業與細心的照護，協助他們重拾健康生活。
            </p>
          </motion.div>
        </div>

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
