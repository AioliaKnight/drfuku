import type { Metadata } from 'next'

import { AboutSection } from '@/modules/marketing'
import JsonLd from '@/shared/components/common/JsonLd'
import { SITE, ASSETS, KEYWORDS, DOCTOR } from '@/config/constants'

export const metadata: Metadata = {
  title: '關於阿福醫師（徐彥勳）| 大腸直腸外科徐彥勳',
  description:
    '認識大腸直腸外科專科醫師徐彥勳（阿福醫師）的專業背景與臨床經驗，了解中西醫雙專業、微創技術與貼心照護如何陪伴病患重拾健康。',
  keywords: [
    ...KEYWORDS.primary.slice(0, 6),
    ...KEYWORDS.clinic.slice(0, 4),
    '大腸直腸外科醫師',
    '痔瘡專科醫師'
  ],
  authors: [{ name: DOCTOR.alternateName, url: DOCTOR.url }],
  alternates: {
    canonical: `${SITE.url}/about`
  },
  openGraph: {
    title: '關於阿福醫師（徐彥勳）| 大腸直腸外科徐彥勳',
    description:
      '認識大腸直腸外科專科醫師徐彥勳（阿福醫師）的專業背景與臨床經驗，了解中西醫雙專業、微創技術與貼心照護如何陪伴病患重拾健康。',
    type: 'profile',
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
    title: '關於阿福醫師（徐彥勳）| 大腸直腸外科徐彥勳',
    description:
      '認識大腸直腸外科專科醫師徐彥勳（阿福醫師）的專業背景與臨床經驗，了解中西醫雙專業、微創技術與貼心照護如何陪伴病患重拾健康。',
    images: [new URL(ASSETS.twitterImage, SITE.url).toString()]
  }
}

export default function AboutPage() {
  const breadcrumbItems = [
    { '@type': 'ListItem' as const, position: 1, name: '首頁', item: SITE.url },
    { '@type': 'ListItem' as const, position: 2, name: '關於醫師', item: `${SITE.url}/about` }
  ]

  return (
    <main className="bg-white">
      <JsonLd
        type="BreadcrumbList"
        data={{
          '@type': 'BreadcrumbList',
          name: '關於醫師',
          itemListElement: breadcrumbItems
        }}
      />
      <AboutSection />
    </main>
  )
}


