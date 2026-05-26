import type { Metadata } from 'next'

import { ServicesSection } from '@/modules/marketing'
import JsonLd from '@/shared/components/common/JsonLd'
import PageHeader from '@/shared/ui/layout/PageHeader'
import { SITE, ASSETS, KEYWORDS, DOCTOR } from '@/config/constants'

export const metadata: Metadata = {
  title: '診療服務 | 微創痔瘡治療與大腸直腸照護',
  description:
    '了解大腸直腸外科專科醫師徐彥勳（阿福醫師）提供的痔瘡微創手術、肛門與大腸直腸疾病治療及術後照護服務，從評估到復原皆由專業團隊完整陪伴。',
  keywords: [
    ...KEYWORDS.treatments.slice(0, 8),
    '痔瘡微創手術',
    '肛門疾病治療'
  ],
  authors: [{ name: DOCTOR.alternateName, url: DOCTOR.url }],
  alternates: {
    canonical: `${SITE.url}/services`
  },
  openGraph: {
    title: '診療服務 | 微創痔瘡治療與大腸直腸照護',
    description:
      '了解大腸直腸外科專科醫師徐彥勳（阿福醫師）提供的痔瘡微創手術、肛門與大腸直腸疾病治療及術後照護服務，從評估到復原皆由專業團隊完整陪伴。',
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
    title: '診療服務 | 微創痔瘡治療與大腸直腸照護',
    description:
      '了解大腸直腸外科專科醫師徐彥勳（阿福醫師）提供的痔瘡微創手術、肛門與大腸直腸疾病治療及術後照護服務，從評估到復原皆由專業團隊完整陪伴。',
    images: [new URL(ASSETS.twitterImage, SITE.url).toString()]
  }
}

export default function ServicesPage() {
  const breadcrumbItems = [
    { '@type': 'ListItem' as const, position: 1, name: '首頁', item: SITE.url },
    { '@type': 'ListItem' as const, position: 2, name: '診療服務', item: `${SITE.url}/services` }
  ]

  return (
    <main className="bg-white">
      <JsonLd
        type="BreadcrumbList"
        data={{
          '@type': 'BreadcrumbList',
          name: '診療服務',
          itemListElement: breadcrumbItems
        }}
      />
      <PageHeader
        title="全方位大腸直腸健康方案"
        description="從極致止痛的痔瘡微創手術到精準的大腸鏡檢查，我們結合尖端技術與人性化照護，為您的腸道健康保駕護航。"
        badge="Our Services"
        tone="brand"
      />
      <ServicesSection />
    </main>
  )
}


