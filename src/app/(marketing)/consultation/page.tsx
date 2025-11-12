import type { Metadata } from 'next'

import { CTASection } from '@/modules/marketing'

export const metadata: Metadata = {
  title: '預約諮詢 | LINE 專人即時協助',
  description:
    '透過加密的 LINE 專人諮詢快速取得醫師建議、安排診療時程，從術前評估到術後追蹤皆有專業團隊陪伴。',
  alternates: {
    canonical: '/consultation'
  }
}

export default function ConsultationPage() {
  return (
    <main className="bg-white">
      <CTASection />
    </main>
  )
}


