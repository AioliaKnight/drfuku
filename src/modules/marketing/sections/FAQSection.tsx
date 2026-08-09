'use client'

import { memo, useState } from "react"
import Link from "next/link"
import { HiChevronDown, HiOutlineQuestionMarkCircle, HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2"
import { motion, AnimatePresence } from "framer-motion"
import { useFAQState, type FAQCategory } from "@/shared/hooks/useFAQState"
import { CLINIC } from "@/config/constants"
import Container from "@/shared/ui/layout/Container"
import Section from "@/shared/ui/layout/Section"
import SectionBackdrop from "@/shared/ui/layout/SectionBackdrop"
import SectionHeader from "@/shared/ui/layout/SectionHeader"
import { sectionTones } from "@/shared/ui/layout/section-tones"
import { faqCategories } from "../data/faq"
import { fadeInUpAnimation, expandAnimation, staggerContainer } from "@/shared/animation"

// FAQ項目組件
const FAQItem = memo(({ faq, isOpen, onToggle }: {
  faq: { question: string; answer: string }
  isOpen: boolean
  onToggle: () => void
}) => {
  return (
    <motion.div
      {...fadeInUpAnimation}
      className="surface-card-interactive overflow-hidden rounded-2xl border border-neutral-200/60 transition-all hover:shadow-warm-md"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-brand-50/20 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.question}`}
      >
        <span className="flex items-center gap-3 text-lg font-bold text-neutral-900 leading-7 font-serif">
          <HiOutlineQuestionMarkCircle className="h-6 w-6 text-brand-600 shrink-0" />
          {faq.question}
        </span>
        <HiChevronDown
          className={`mt-1 h-5 w-5 text-neutral-500 transition-transform ${
            isOpen ? "rotate-180 text-brand-600" : ""
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
            <div className="border-t border-neutral-100 px-6 pb-6 pt-4 space-y-4">
              <p className="text-base leading-8 text-neutral-700 whitespace-pre-line">
                {faq.answer}
              </p>
              <div className="pt-2 border-t border-neutral-100/60 flex items-center justify-between text-xs text-neutral-500">
                <span>※ 門診專科評估以徐彥勳醫師現場視診為準</span>
                <Link
                  href={CLINIC.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-[#06C755] hover:underline"
                >
                  <HiOutlineChatBubbleBottomCenterText className="h-4 w-4" />
                  <span>專人 LINE 隱私詢問 ➔</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

FAQItem.displayName = "FAQItem"

// FAQ分類組件
const FAQCategoryBlock = memo(({ category }: { category: FAQCategory }) => {
  const { getFAQState } = useFAQState(category)

  return (
    <div role="region" aria-labelledby={`faq-category-${category.title}`} className="scroll-mt-24" id={`category-${category.title}`}>
      <div className="mb-8">
        <h3
          id={`faq-category-${category.title}`}
          className="text-2xl font-bold text-neutral-900 font-serif"
        >
          {category.title}
        </h3>
        <p className="mt-2 text-base leading-7 text-neutral-600">{category.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {category.keywords.map((keyword, index) => (
            <span
              key={index}
              className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800 ring-1 ring-brand-200/40 shadow-xs"
            >
              #{keyword}
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

FAQCategoryBlock.displayName = "FAQCategoryBlock"

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredCategories = selectedCategory
    ? faqCategories.filter((cat) => cat.title === selectedCategory)
    : faqCategories

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
              title="常見問題與媒體權威解答"
              description="我們整理了病患最常詢問的 6 大領域疑問，包含 LHP 微創技術、飲食保養、實支實付理賠與無痛大腸鏡，幫助您快速找到解答。"
              badge="FAQ & Knowledge"
            />
          </motion.div>

          {/* 分類快速篩選頁籤 */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-full px-4 py-2 text-xs md:text-sm font-bold transition-all ${
                selectedCategory === null
                  ? "bg-brand-600 text-white shadow-md"
                  : "bg-warm-100 text-neutral-600 hover:bg-brand-50 hover:text-brand-600"
              }`}
            >
              全部主題 ({faqCategories.reduce((acc, cat) => acc + cat.faqs.length, 0)})
            </button>
            {faqCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat.title)}
                className={`rounded-full px-4 py-2 text-xs md:text-sm font-bold transition-all ${
                  selectedCategory === cat.title
                    ? "bg-brand-600 text-white shadow-md"
                    : "bg-warm-100 text-neutral-600 hover:bg-brand-50 hover:text-brand-600"
                }`}
              >
                {cat.title} ({cat.faqs.length})
              </button>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mx-auto mt-16 max-w-5xl"
          >
            <div className="space-y-16">
              {filteredCategories.map((category, index) => (
                <motion.div
                  key={index}
                  {...fadeInUpAnimation}
                  viewport={{ once: true }}
                >
                  <FAQCategoryBlock category={category} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </div>
    </Section>
  )
}
