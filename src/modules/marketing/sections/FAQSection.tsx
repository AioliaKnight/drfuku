'use client'

import { memo } from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import { motion, AnimatePresence } from 'framer-motion'
import { useFAQState, type FAQCategory } from '@/shared/hooks/useFAQState'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import SectionBackdrop from '@/shared/ui/layout/SectionBackdrop'
import SectionHeader from '@/shared/ui/layout/SectionHeader'
import { sectionTones } from '@/shared/ui/layout/section-tones'
import { faqCategories } from '../data/faq'
import { fadeInUpAnimation, expandAnimation, staggerContainer } from '@/shared/animation'

// FAQ項目組件
const FAQItem = memo(({ faq, isOpen, onToggle }: {
  faq: { question: string; answer: string }
  isOpen: boolean
  onToggle: () => void
}) => {
  return (
    <motion.div
      {...fadeInUpAnimation}
      className="surface-card-interactive overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-neutral-50/80 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.question}`}
      >
        <span className="text-lg font-semibold text-neutral-900 leading-7">
          {faq.question}
        </span>
        <HiChevronDown
          className={`mt-1 h-5 w-5 text-neutral-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            {...expandAnimation}
            id={`faq-answer-${faq.question}`}
            role="region"
            aria-labelledby={`faq-question-${faq.question}`}
          >
            <div className="border-t border-neutral-100/80 px-6 pb-6 pt-4">
              <p className="text-base leading-7 text-neutral-700 whitespace-pre-line">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

FAQItem.displayName = 'FAQItem'

// FAQ分類組件
const FAQCategory = memo(({ category }: { category: FAQCategory }) => {
  const { getFAQState } = useFAQState(category)

  return (
    <div role="region" aria-labelledby={`faq-category-${category.title}`}>
      <div className="mb-8">
        <h3
          id={`faq-category-${category.title}`}
          className="text-2xl font-semibold text-neutral-900"
        >
          {category.title}
        </h3>
        <p className="mt-2 text-base leading-7 text-neutral-600">{category.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {category.keywords.map((keyword, index) => (
            <span
              key={index}
              className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-white/70 shadow-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {category.faqs.map((faq, index) => {
          const { isOpen, onToggle } = getFAQState(index)
          return (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={isOpen}
              onToggle={onToggle}
            />
          )
        })}
      </div>
    </div>
  )
})

FAQCategory.displayName = 'FAQCategory'

export default function FAQSection() {
  return (
    <Section
      id="faq"
      aria-label="常見問題區塊"
      className={sectionTones.white}
    >
      <SectionBackdrop />

      <div className="relative">
        <Container>
          <motion.div {...fadeInUpAnimation} viewport={{ once: true }}>
            <SectionHeader
              title="常見問題"
              description="我們整理了病患最常詢問的問題，希望能幫助您更了解診療相關資訊。如有其他問題，歡迎直接諮詢。"
              badge="FAQ"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mx-auto mt-16 max-w-5xl"
          >
            <div className="space-y-16">
              {faqCategories.map((category, index) => (
                <motion.div
                  key={index}
                {...fadeInUpAnimation}
                  viewport={{ once: true }}
                >
                  <FAQCategory category={category} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </div>
    </Section>
  )
}
