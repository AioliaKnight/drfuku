import type { Metadata } from 'next'
import nextDynamic from 'next/dynamic'

import { HeroSection as Hero, AboutSection, ServicesSection } from '@/modules/marketing'
import JsonLd from '@/shared/components/common/JsonLd'
import SectionSkeleton from '@/shared/ui/layout/SectionSkeleton'
import { SITE } from '@/config/constants'
import { faqCategories } from '@/modules/marketing/data/faq'
import { createPageMetadata } from '@/shared/lib/page-metadata'

/** 首屏以下區塊：動態載入以降低初始 JS */
const BlogSection = nextDynamic(
  () => import('@/modules/marketing').then((m) => ({ default: m.BlogSection })),
  { loading: () => <SectionSkeleton minHeight="20rem" label="載入衛教文章" /> }
)

const TestimonialsSection = nextDynamic(
  () => import('@/modules/marketing').then((m) => ({ default: m.TestimonialsSection })),
  { loading: () => <SectionSkeleton minHeight="18rem" label="載入病患評價" /> }
)

const FAQSection = nextDynamic(
  () => import('@/modules/marketing').then((m) => ({ default: m.FAQSection })),
  { loading: () => <SectionSkeleton minHeight="22rem" label="載入常見問題" /> }
)

const CTASection = nextDynamic(
  () => import('@/modules/marketing').then((m) => ({ default: m.CTASection })),
  { loading: () => <SectionSkeleton minHeight="12rem" label="載入諮詢區塊" /> }
)

export const dynamic = 'force-static'
export const revalidate = false

export const metadata: Metadata = createPageMetadata({
  title: '阿福醫師-大腸直腸外科徐彥勳 | 台北台中大腸直腸外科・痔瘡治療',
  description:
    '大腸直腸外科專科醫師徐彥勳（阿福醫師）專精痔瘡微創手術、肛門與大腸直腸疾病診療，在台北、台中、南投提供專業診療服務。採用先進微創技術，重視隱私與術後照護。',
  path: '/',
  keywords: [
    '痔瘡醫生推薦',
    '台北痔瘡診所',
    '台中痔瘡醫院',
    '微創痔瘡手術',
    '大腸直腸外科徐彥勳',
    '阿福醫師',
  ],
})

export default function Home() {
  const breadcrumbItems = [
    { '@type': 'ListItem' as const, position: 1, name: '首頁', item: SITE.url },
  ]

  const faqs = faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({
      '@type': 'Question' as const,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        name: faq.question,
        text: faq.answer,
      },
    }))
  )

  return (
    <main className="relative overflow-x-hidden bg-white">
      <JsonLd
        type="BreadcrumbList"
        data={{
          '@type': 'BreadcrumbList',
          name: '首頁',
          itemListElement: breadcrumbItems,
        }}
      />
      {faqs.length > 0 && (
        <JsonLd
          type="FAQPage"
          data={{
            '@type': 'FAQPage',
            name: '痔瘡與肛門疾病常見問題',
            mainEntity: faqs,
          }}
        />
      )}

      <Hero />
      <AboutSection />
      <ServicesSection />
      <BlogSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  )
}
