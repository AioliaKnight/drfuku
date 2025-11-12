import type { Metadata } from 'next'

import { FAQSection } from '@/modules/marketing'

export const metadata: Metadata = {
  title: '常見問題 | 痔瘡治療、術後照護與預約資訊',
  description:
    '整理患者最常詢問的痔瘡治療、術後照護、費用與預約問題，提供清楚解答，讓就醫前的準備更安心。',
  alternates: {
    canonical: '/faq'
  }
}

export default function FAQPage() {
  return (
    <main className="bg-white">
      <FAQSection />
    </main>
  )
}


