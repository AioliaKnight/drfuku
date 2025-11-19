'use client'

import { memo } from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import { motion, AnimatePresence } from 'framer-motion'
import { useFAQState, type FAQCategory } from '@/shared/hooks/useFAQState'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import { faqCategories } from '../data/faq'

// 動畫配置
const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  expand: {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.2 }
  },
  stagger: {
    transition: { staggerChildren: 0.2 }
  }
} as const

// FAQ項目組件
const FAQItem = memo(({ faq, isOpen, onToggle }: {
  faq: { question: string; answer: string }
  isOpen: boolean
  onToggle: () => void
}) => {
  return (
    <motion.div
      {...animations.fadeInUp}
      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-100"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.question}`}
      >
        <span className="text-base font-medium text-neutral-900">
          {faq.question}
        </span>
        <HiChevronDown
          className={`h-5 w-5 text-neutral-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            {...animations.expand}
            id={`faq-answer-${faq.question}`}
            role="region"
            aria-labelledby={`faq-question-${faq.question}`}
          >
            <div className="border-t border-neutral-100 px-6 pb-6 pt-4">
              {faq.answer.split('\n').map((line, index) => (
                <p
                  key={index}
                  className="text-sm leading-relaxed text-neutral-600"
                >
                  {line}
                </p>
              ))}
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
          className="text-xl font-bold text-neutral-900"
        >
          {category.title}
        </h3>
        <p className="mt-2 text-base text-neutral-600">{category.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {category.keywords.map((keyword, index) => (
            <span
              key={index}
              className="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-600"
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
      className="overflow-hidden bg-neutral-50/50"
    >
      {/* 背景裝飾 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-50/40 to-transparent blur-3xl" />
      </div>

      <div className="relative">
        <Container>
          <motion.div
            {...animations.fadeInUp}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl space-y-4 text-center"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              常見問題
            </h2>
            <p className="text-base leading-7 text-neutral-600 sm:text-lg">
              我們整理了病患最常詢問的問題，希望能幫助您更了解診療相關資訊。
              如有其他問題，歡迎直接諮詢。
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            {...animations.stagger}
            className="mx-auto mt-16 max-w-4xl"
          >
            <div className="space-y-16">
              {faqCategories.map((category, index) => (
                <motion.div
                  key={index}
                  {...animations.fadeInUp}
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
