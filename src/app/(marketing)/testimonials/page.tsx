import type { Metadata } from 'next'

import { TestimonialsSection } from '@/modules/marketing'

export const metadata: Metadata = {
  title: '病患回饋 | 真實診療心得分享',
  description:
    '閱讀病患對大腸直腸外科專科醫師徐彥勳（阿福醫師）的真實治療心得，了解微創技術、術後照護與貼心團隊如何協助不同族群恢復健康。',
  alternates: {
    canonical: '/testimonials'
  }
}

export default function TestimonialsPage() {
  return (
    <main className="bg-white">
      <TestimonialsSection />
    </main>
  )
}


