import type { Metadata } from 'next'

import { FAQSection, CTASection } from '@/modules/marketing'
import JsonLd from '@/shared/components/common/JsonLd'
import PageHeader from '@/shared/ui/layout/PageHeader'
import { faqCategories } from '@/modules/marketing/data/faq'
import { SITE, ASSETS, KEYWORDS, DOCTOR } from '@/config/constants'

export const metadata: Metadata = {
  title: '常見問題 | 痔瘡治療、術後照護與預約資訊',
  description:
    '整理患者最常詢問的痔瘡治療、術後照護、費用與預約問題，提供清楚解答，讓就醫前的準備更安心。',
  keywords: [
    ...KEYWORDS.primary.slice(0, 6),
    '痔瘡常見問題',
    '痔瘡就醫準備'
  ],
  authors: [{ name: DOCTOR.alternateName, url: DOCTOR.url }],
  alternates: {
    canonical: `${SITE.url}/faq`
  },
  openGraph: {
    title: '常見問題 | 痔瘡治療、術後照護與預約資訊',
    description:
      '整理患者最常詢問的痔瘡治療、術後照護、費用與預約問題，提供清楚解答，讓就醫前的準備更安心。',
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
    title: '常見問題 | 痔瘡治療、術後照護與預約資訊',
    description:
      '整理患者最常詢問的痔瘡治療、術後照護、費用與預約問題，提供清楚解答，讓就醫前的準備更安心。',
    images: [new URL(ASSETS.twitterImage, SITE.url).toString()]
  }
}

export default function FAQPage() {
  const breadcrumbItems = [
    { '@type': 'ListItem' as const, position: 1, name: '首頁', item: SITE.url },
    { '@type': 'ListItem' as const, position: 2, name: '常見問題', item: `${SITE.url}/faq` }
  ]

  const faqs = faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({
      '@type': 'Question' as const,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        name: faq.question,
        text: faq.answer
      }
    }))
  )

  return (
    <main className="bg-warm-50">
      <JsonLd
        type="BreadcrumbList"
        data={{
          '@type': 'BreadcrumbList',
          name: '常見問題',
          itemListElement: breadcrumbItems
        }}
      />
      <JsonLd
        type="FAQPage"
        data={{
          '@type': 'FAQPage',
          name: '痔瘡與肛門疾病常見問題',
          mainEntity: faqs
        }}
      />
      <PageHeader
        title="常見問題解答"
        description="我們彙整了診間最常被問到的各類疑問，包含診療流程、技術差異、保險理賠與術後恢復，幫助您在就醫前做好充分準備。"
        badge="FAQ"
        tone="brand"
      />
      <FAQSection />
      <CTASection />
    </main>
  )
}
