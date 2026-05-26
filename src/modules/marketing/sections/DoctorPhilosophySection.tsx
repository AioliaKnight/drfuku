'use client'

import { motion } from 'framer-motion'
import { HiOutlineLightBulb, HiOutlineChatBubbleBottomCenterText, HiOutlineShieldCheck } from 'react-icons/hi2'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import { getTransition } from '@/shared/animation'

const philosophyItems = [
  {
    icon: <HiOutlineLightBulb className="h-7 w-7 text-brand-600" />,
    title: '中西醫整合的精準思維',
    desc: '身為中西醫雙學士，我不僅專注於西醫解剖層面的手術精準度，更重視從中醫整體觀出發，調整病患的「腸道環境」。我們不只是割除病灶，更要陪您從體質層面預防復發。'
  },
  {
    icon: <HiOutlineChatBubbleBottomCenterText className="h-7 w-7 text-brand-600" />,
    title: '有溫度的溝通與診療',
    desc: '醫療不應只是冰冷的診斷，而是一場關於健康的對話。我們強調「止痛先行」，從諮詢時就細心解說，消除您對痔瘡手術的恐懼，確保您在放鬆且受尊重的狀態下接受治療。'
  },
  {
    icon: <HiOutlineShieldCheck className="h-7 w-7 text-brand-600" />,
    title: '守護隱私與病患尊嚴',
    desc: '肛門疾患常讓病患感到尷尬，這往往是延誤就醫的主因。我們建立了獨立的諮詢診間與數位化隱私追蹤系統，將「保護隱私」視為專業的第一防線。'
  }
]

export default function DoctorPhilosophySection() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
            <span className="inline-block rounded-lg bg-care-50 px-3 py-1 text-xs font-bold tracking-widest text-care-600 uppercase ring-1 ring-care-100/50 mb-4">
              Our Philosophy
            </span>
            <h2 className="text-3xl font-bold text-neutral-900 leading-tight md:text-5xl font-serif">
              溫暖微創<br />重塑健康生活
            </h2>
            <p className="mt-8 text-neutral-600 leading-loose text-lg">
              阿福醫師（徐彥勳）致力於讓醫療回歸「人」的本質。我們不只追求技術的卓越，更追求治療過程中的那份安心與自在。
            </p>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {philosophyItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={getTransition(idx * 0.1)}
                className="surface-card p-10 flex flex-col group border-none ring-1 ring-neutral-200/40"
              >
                <div className="mb-6 h-14 w-14 rounded-2xl bg-brand-50 flex items-center justify-center shadow-warm-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4 font-serif">{item.title}</h3>
                <p className="text-base leading-loose text-neutral-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
