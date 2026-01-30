import type { Metadata } from 'next'

import { FAQSection } from '@/modules/marketing'
import JsonLd from '@/shared/components/common/JsonLd'
import { faqCategories } from '@/modules/marketing/data/faq'

export const metadata: Metadata = {
  title: '常見問題 | 痔瘡治療、術後照護與預約資訊',
  description:
    '整理患者最常詢問的痔瘡治療、術後照護、費用與預約問題，提供清楚解答，讓就醫前的準備更安心。',
  alternates: {
    canonical: '/faq'
  }
}

export default function FAQPage() {
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
    <main className="bg-white">
      <JsonLd
        type="FAQPage"
        data={{
          '@type': 'FAQPage',
          name: '痔瘡與肛門疾病常見問題',
          mainEntity: faqs
        }}
      />
      <FAQSection />
    </main>
  )
}


