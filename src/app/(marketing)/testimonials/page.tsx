import type { Metadata } from 'next'

import { TestimonialsSection } from '@/modules/marketing'
import JsonLd from '@/shared/components/common/JsonLd'
import { SITE, ASSETS, KEYWORDS, DOCTOR } from '@/config/constants'

export const metadata: Metadata = {
  title: '病患回饋 | 真實診療心得分享',
  description:
    '閱讀病患對大腸直腸外科專科醫師徐彥勳（阿福醫師）的真實治療心得，了解微創技術、術後照護與貼心團隊如何協助不同族群恢復健康。',
  keywords: [
    ...KEYWORDS.clinic.slice(0, 6),
    ...KEYWORDS.concerns.slice(0, 4),
    '病患心得',
    '痔瘡手術評價'
  ],
  authors: [{ name: DOCTOR.alternateName, url: DOCTOR.url }],
  alternates: {
    canonical: `${SITE.url}/testimonials`
  },
  openGraph: {
    title: '病患回饋 | 真實診療心得分享',
    description:
      '閱讀病患對大腸直腸外科專科醫師徐彥勳（阿福醫師）的真實治療心得，了解微創技術、術後照護與貼心團隊如何協助不同族群恢復健康。',
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
    title: '病患回饋 | 真實診療心得分享',
    description:
      '閱讀病患對大腸直腸外科專科醫師徐彥勳（阿福醫師）的真實治療心得，了解微創技術、術後照護與貼心團隊如何協助不同族群恢復健康。',
    images: [new URL(ASSETS.twitterImage, SITE.url).toString()]
  }
}

export default function TestimonialsPage() {
  const breadcrumbItems = [
    { '@type': 'ListItem' as const, position: 1, name: '首頁', item: SITE.url },
    { '@type': 'ListItem' as const, position: 2, name: '病患回饋', item: `${SITE.url}/testimonials` }
  ]

  return (
    <main className="bg-white">
      <JsonLd
        type="BreadcrumbList"
        data={{
          '@type': 'BreadcrumbList',
          name: '病患回饋',
          itemListElement: breadcrumbItems
        }}
      />
      <TestimonialsSection />
    </main>
  )
}


