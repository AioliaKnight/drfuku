import type { Metadata } from 'next'

import { CTASection } from '@/modules/marketing'
import JsonLd from '@/shared/components/common/JsonLd'
import { SITE, ASSETS, KEYWORDS, DOCTOR } from '@/config/constants'

export const metadata: Metadata = {
  title: '預約諮詢 | LINE 專人即時協助',
  description:
    '透過加密的 LINE 專人諮詢快速取得醫師建議、安排診療時程，從術前評估到術後追蹤皆有專業團隊陪伴。',
  keywords: [
    ...KEYWORDS.concerns.slice(0, 6),
    ...KEYWORDS.primary.slice(0, 4),
    '痔瘡諮詢',
    '醫師預約'
  ],
  authors: [{ name: DOCTOR.alternateName, url: DOCTOR.url }],
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
  const breadcrumbItems = [
    { '@type': 'ListItem' as const, position: 1, name: '首頁', item: SITE.url },
    { '@type': 'ListItem' as const, position: 2, name: '預約諮詢', item: `${SITE.url}/consultation` }
  ]

  return (
    <main className="bg-white">
      <JsonLd
        type="BreadcrumbList"
        data={{
          '@type': 'BreadcrumbList',
          name: '預約諮詢',
          itemListElement: breadcrumbItems
        }}
      />
      <CTASection />
    </main>
  )
}


