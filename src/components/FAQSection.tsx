'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineQuestionMarkCircle, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs = [
    {
      question: '痔瘡手術費用多少？健保有給付嗎？',
      answer: '健保有給付痔瘡手術，掛號費約150元，部分負擔約200-300元。若選擇自費微創手術，費用約15,000-45,000元不等，視嚴重程度而定。我們提供分期付款方案，也可使用醫療保險給付。建議先來門診評估，我們會提供詳細的費用說明。'
    },
    {
      question: '台北、台中哪裡有推薦的痔瘡醫生？',
      answer: '本診所在台北內湖、台中西屯都設有門診，徐醫師為台灣痔瘡治療權威醫師之一，擁有中華民國外科及大腸直腸外科雙專科醫師資格。採用先進微創技術，已成功治療超過5,000位病患，手術成功率高達98%，深受病患信賴。'
    },
    {
      question: '痔瘡手術後要住院嗎？恢復期多久？',
      answer: '採用最新微創技術，手術只需約30分鐘，當天即可返家休息，不需住院。大多數患者3-4天就能正常工作，7-10天可恢復日常生活。我們會提供完整的術後照護指南，包括傷口護理、飲食建議等，協助您快速康復。'
    },
    {
      question: '痔瘡手術會很痛嗎？有後遺症風險嗎？',
      answer: '我們採用先進的微創技術和舒眠麻醉，手術過程完全無痛。術後疼痛程度輕微，可透過口服止痛藥緩解。後遺症風險極低，術後復發率低於5%。選擇有經驗的專科醫師，並遵醫囑照護，即可大幅降低風險。'
    },
    {
      question: '痔瘡嚴重程度分級？哪種情況需要開刀？',
      answer: '痔瘡依嚴重程度分為四級：第一級輕微出血，第二級排便時脫出、會自行回縮，第三級需用手推回，第四級無法推回。一般來說，第三、四級建議手術治療。但具體要不要開刀，需要專業醫師評估，包括症狀、病患年齡、身體狀況等因素。'
    },
    {
      question: '有健保卡就可以看診嗎？需要準備什麼？',
      answer: '是的，只要帶健保卡即可掛號看診。為了更準確診斷，建議看診前不要使用局部藥物。初診病患我們會詳細了解病史，進行專業評估後，提供最適合的治療方案。若當天需要處置，也會事先說明注意事項。'
    },
    {
      question: '痔瘡術後如何預防復發？',
      answer: '預防復發的關鍵在於良好的生活習慣：1. 均衡飲食，多攝取高纖維食物 2. 養成規律排便習慣 3. 適量運動，促進血液循環 4. 避免久坐、熬夜 5. 保持肛門部位清潔。我們會提供完整的保健指導，協助您預防復發。'
    },
    {
      question: '痔瘡手術有哪些方式？差異在哪？',
      answer: '目前主要有傳統手術和微創手術兩大類。傳統手術傷口較大、恢復期長；微創手術如PPH、TST等，具有傷口小、恢復快、疼痛少等優點。本診所採用最新微創技術，能大幅減少術後不適，讓您更快恢復正常生活。'
    },
    {
      question: '痔瘡和大腸癌有關嗎？要做大腸鏡檢查嗎？',
      answer: '雖然痔瘡與大腸癌無直接關係，但某些症狀（如出血）可能與大腸癌相似。為了謹慎起見，我們會根據您的年齡、症狀和風險因素，評估是否需要進行大腸鏡檢查，以排除其他疾病可能。'
    }
  ]

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50/50 to-white" />
      <div className="absolute inset-0 bg-pattern opacity-[0.015]" />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* 標題區塊 */}
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-center"
            >
              <div className="relative flex h-12 w-12 md:h-16 md:w-16 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/20 blur-xl" />
                <div className="relative rounded-full bg-gradient-to-br from-brand-500/30 to-brand-600/30 p-3 md:p-4">
                  <HiOutlineQuestionMarkCircle className="h-6 w-6 md:h-8 md:w-8 text-brand-600" />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
                常見問題解答
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-600 [text-wrap:balance] md:text-lg">
                我們知道您可能有許多疑問，
                以下整理了常見問題的詳細解答，
                希望能幫助您更了解治療過程。
                如有其他問題，也歡迎隨時諮詢我們。
              </p>
            </motion.div>
          </div>

          {/* 問答列表 */}
          <div className="mt-12 md:mt-16 space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="rounded-2xl bg-white shadow-sm ring-1 ring-neutral-100/50 transition-all hover:shadow-md"
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="flex w-full items-start justify-between p-6 text-left transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-base font-medium text-neutral-900 hover:text-brand-600 md:text-lg">
                    {faq.question}
                  </span>
                  <span className="ml-6 flex h-7 items-center">
                    <svg
                      className={`h-6 w-6 text-neutral-400 transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                {openIndex === index && (
                  <div className="border-t border-neutral-100/50 bg-gradient-to-br from-white to-neutral-50/80 p-6">
                    <p className="text-base leading-relaxed text-neutral-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 諮詢提示 */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mt-12 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 to-brand-50/50 p-6 shadow-sm ring-1 ring-brand-100/50 md:mt-16 md:p-8"
          >
            <div className="relative flex flex-col items-center gap-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100/50">
                <HiOutlineChatBubbleLeftRight className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <p className="text-base leading-relaxed text-neutral-600 [text-wrap:balance] md:text-lg">
                  還有其他問題想諮詢嗎？
                  歡迎透過 LINE 與我們聯繫，
                  專業醫師團隊將為您提供詳細的解答。
                </p>
              </div>
              <div className="mt-2">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-medium text-brand-600 shadow-sm ring-1 ring-neutral-100/50 transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 md:text-lg"
                >
                  <span>立即諮詢</span>
                  <HiOutlineChatBubbleLeftRight className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  )
} 