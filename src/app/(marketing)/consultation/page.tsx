import type { Metadata } from 'next'

import { CTASection } from '@/modules/marketing'
import { SITE, ASSETS } from '@/config/constants'

export const metadata: Metadata = {
  title: '預約諮詢 | LINE 專人即時協助',
  description:
    '透過加密的 LINE 專人諮詢快速取得醫師建議、安排診療時程，從術前評估到術後追蹤皆有專業團隊陪伴。',
  alternates: {
    canonical: `${SITE.url}/consultation`
  },
  openGraph: {
    title: '預約諮詢 | LINE 專人即時協助',
    description:
      '透過加密的 LINE 專人諮詢快速取得醫師建議、安排診療時程，從術前評估到術後追蹤皆有專業團隊陪伴。',
    type: 'website',
    images: [
      {
        url: new URL(ASSETS.ogImage, SITE.url).toString(),
        width: 1200,
        height: 630,
        alt: SITE.name
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '預約諮詢 | LINE 專人即時協助',
    description:
      '透過加密的 LINE 專人諮詢快速取得醫師建議、安排診療時程，從術前評估到術後追蹤皆有專業團隊陪伴。',
    images: [new URL(ASSETS.twitterImage, SITE.url).toString()]
  }
}

export default function ConsultationPage() {
  return (
    <main className="bg-white">
      <CTASection />
    </main>
  )
}


