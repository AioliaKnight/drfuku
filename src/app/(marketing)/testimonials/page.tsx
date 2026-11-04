import type { Metadata } from 'next'

import { TestimonialsSection, CTASection } from '@/modules/marketing'
import JsonLd from '@/shared/components/common/JsonLd'
import PageHeader from '@/shared/ui/layout/PageHeader'
import { SITE, KEYWORDS } from '@/config/constants'
import { createPageMetadata } from '@/shared/lib/page-metadata'

export const metadata: Metadata = createPageMetadata({
  title: '病患回饋 | 真實診療心得分享',
  description:
    '閱讀病患對大腸直腸外科專科醫師徐彥勳（阿福醫師）的真實治療心得，了解微創技術、術後照護與貼心團隊如何協助不同族群恢復健康。',
  path: '/testimonials/',
  keywords: [
    ...KEYWORDS.treatments.slice(0, 6),
    '病患心得',
    '痔瘡手術評價'
  ],
})

export default function TestimonialsPage() {
  const breadcrumbItems = [
    { '@type': 'ListItem' as const, position: 1, name: '首頁', item: `${SITE.url}/` },
    { '@type': 'ListItem' as const, position: 2, name: '病患回饋', item: `${SITE.url}/testimonials/` }
  ]

  return (
    <main className="bg-warm-50">
      <JsonLd
        type="BreadcrumbList"
        data={{
          '@type': 'BreadcrumbList',
          name: '病患回饋',
          itemListElement: breadcrumbItems
        }}
      />
      <PageHeader
        title="真實的健康與喜悅"
        description="每一個回饋背後都是一段重拾舒適生活的故事。我們珍視每位患者的信任，並致力於提供優質的醫療專業與關懷。"
        badge="Testimonials"
        tone="warm"
      />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}
