'use client'

import { memo } from 'react'
import { HiChevronDown } from 'react-icons/hi2'
import { motion, AnimatePresence } from 'framer-motion'
import { useFAQState, type FAQCategory } from '@/shared/hooks/useFAQState'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'

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

// FAQ分類和內容
const faqCategories = [
  {
    title: '就醫須知',
    description: '了解看診流程、費用和注意事項，讓您就醫更安心。',
    keywords: ['看診流程', '醫療費用', '健保給付', '自費項目', '掛號方式', '看診時間'],
    faqs: [
      {
        question: '初診需要準備哪些文件？',
        answer: '初次就診請攜帶：\n1. 健保卡\n2. 身分證件\n3. 過去的相關檢查報告（如果有）\n4. 正在服用的藥物清單（如果有）'
      },
      {
        question: '看診大約需要多少時間？',
        answer: '一般門診約15-20分鐘，但會依個案情況調整。\n如果是初診或需要進行特殊檢查，可能需要30-45分鐘。\n建議預留充足時間，以確保完整的診療品質。'
      },
      {
        question: '是否需要事先預約？',
        answer: '建議事先預約，可以：\n1. 透過LINE官方帳號預約\n2. 電話預約\n3. 現場掛號\n預約可以減少您的等候時間，也能讓我們更好地安排診療時間。'
      },
      {
        question: '診所接受哪些支付方式？',
        answer: '我們接受：\n1. 現金\n2. 信用卡\n3. 行動支付（LINE Pay、街口支付）\n4. 健保卡（健保給付項目）'
      },
      {
        question: '如何預約手術時間？',
        answer: '手術預約流程：\n1. 門診評估確認手術需求\n2. 與醫師討論手術方案\n3. 安排術前檢查\n4. 確認手術時間\n5. 術前衛教說明\n我們會依據您的情況和需求，安排最適合的手術時間。'
      }
    ]
  },
  {
    title: '治療相關',
    description: '了解各種治療方式、術後照護和恢復過程。',
    keywords: ['微創手術', '術後照護', '恢復時間', '治療方式', '手術風險', '止痛方式'],
    faqs: [
      {
        question: '痔瘡有哪些治療方式？',
        answer: '痔瘡的治療方式包括：\n1. 保守治療：藥物、生活習慣調整\n2. 微創治療：橡膠圈結紮、紅外線療法\n3. 手術治療：PPH手術、傳統切除手術\n醫師會根據您的症狀和痔瘡程度，建議最適合的治療方式。'
      },
      {
        question: '微創手術的優點是什麼？',
        answer: '微創手術的優點包括：\n1. 傷口小，疼痛感較輕\n2. 恢復時間短\n3. 出血量少\n4. 感染風險低\n5. 術後併發症少\n6. 可以較快恢復正常生活'
      },
      {
        question: '手術後多久可以恢復正常生活？',
        answer: '恢復時間因人而異，一般而言：\n1. 微創手術：3-5天可恢復基本生活\n2. 傳統手術：7-14天需要休養\n完全恢復約需2-4週，期間需要：\n- 保持傷口清潔\n- 適當運動\n- 調整飲食習慣\n- 避免久坐'
      },
      {
        question: '術後需要注意哪些事項？',
        answer: '術後注意事項：\n1. 傷口護理和清潔\n2. 適當的溫和運動\n3. 飲食調整（高纖、多喝水）\n4. 避免久坐和重物搬運\n5. 定期回診追蹤\n6. 如有異常及時就醫'
      },
      {
        question: '手術有什麼風險嗎？',
        answer: '任何手術都有風險，但在專業醫療團隊的照護下，風險都在可控範圍內。\n可能的風險包括：\n1. 出血\n2. 感染\n3. 暫時性排便不適\n4. 傷口癒合時間差異\n我們會詳細評估您的情況，並採取適當的預防措施。'
      }
    ]
  },
  {
    title: '預防保健',
    description: '學習日常預防方法，培養健康的生活習慣。',
    keywords: ['生活習慣', '飲食建議', '運動方式', '預防方法', '保健知識', '復發預防'],
    faqs: [
      {
        question: '如何預防痔瘡？',
        answer: '預防痔瘡的方法：\n1. 保持規律排便習慣\n2. 飲食均衡，多攝取纖維\n3. 適量運動\n4. 避免久坐\n5. 保持良好的如廁習慣\n6. 維持適當體重'
      },
      {
        question: '哪些運動有助於預防痔瘡？',
        answer: '建議的運動包括：\n1. 散步\n2. 游泳\n3. 瑜珈\n4. 輕度有氧運動\n5. 核心肌群訓練\n注意：運動強度要適中，避免過度劇烈運動。'
      },
      {
        question: '飲食上要注意什麼？',
        answer: '健康的飲食建議：\n1. 多攝取高纖維食物：蔬菜、水果、全穀物\n2. 充足的水分攝取\n3. 避免過於辛辣刺激的食物\n4. 限制酒精攝取\n5. 均衡的營養攝取\n6. 規律的進食時間'
      },
      {
        question: '工作時要如何預防痔瘡？',
        answer: '工作預防建議：\n1. 每小時起身活動5-10分鐘\n2. 使用合適的座椅\n3. 保持正確坐姿\n4. 適時做簡單的伸展運動\n5. 注意飲水量\n6. 不要憋尿或延遲如廁'
      },
      {
        question: '痔瘡容易復發嗎？如何預防復發？',
        answer: '預防復發的關鍵：\n1. 維持良好的生活習慣\n2. 定期進行健康檢查\n3. 注意早期症狀\n4. 持續保持正確的飲食習慣\n5. 適度運動\n6. 避免誘發因素（如久坐、便秘）'
      }
    ]
  }
]

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
