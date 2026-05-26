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
        <HiStar key={index} className="h-4 w-4 md:h-5 md:w-5 text-care-500" aria-hidden="true" />
      ) : (
        <HiOutlineStar key={index} className="h-4 w-4 md:h-5 md:w-5 text-care-200" aria-hidden="true" />
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
      transition={{ ...baseTransition, duration: 0.6, delay: index * 0.1 }}
      className="surface-card-interactive group h-full p-8 md:p-10"
      role="article"
      aria-label={`${testimonial.author}的治療心得`}
    >
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-5">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-care-100/50 transition-transform group-hover:scale-105">
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
              <h3 className="text-lg font-bold text-neutral-900 font-serif">
                {testimonial.author}
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-care-600 bg-care-50 px-2.5 py-1 rounded-full ring-1 ring-care-100/50">
                {testimonial.age}
              </span>
            </div>
            <p className="text-xs font-medium text-neutral-400 mt-1">{testimonial.title}</p>
            <div className="mt-2">
              <RatingStars rating={testimonial.rating} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <p className="text-lg text-neutral-700 leading-loose italic font-serif">
            「{testimonial.content.main}」
          </p>
        </div>
        
        <div className="pt-6 border-t border-neutral-100/50">
            <h4 className="mb-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">治療特色</h4>
            <div className="flex flex-wrap gap-2.5">
                {testimonial.content.pros.map((pro, i) => (
                <span
                    key={i}
                    className="rounded-xl bg-warm-50 px-3 py-1.5 text-xs font-medium text-brand-700 ring-1 ring-neutral-200/30 group-hover:bg-white group-hover:ring-brand-100 transition-all shadow-warm-sm"
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
      className={sectionTones.care}
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
            title="真摯的復原故事"
            description="聽聽其他病患的真實分享，了解我們如何與您並肩同行，重拾健康生活。"
            icon={<HiOutlineChatBubbleLeftRight className="h-7 w-7 text-brand-600" aria-hidden="true" />}
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
