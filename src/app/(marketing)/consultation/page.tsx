import type { Metadata } from 'next'

import { CTASection, ClinicGridSection } from '@/modules/marketing'
import JsonLd from '@/shared/components/common/JsonLd'
import PageHeader from '@/shared/ui/layout/PageHeader'
import { SITE, KEYWORDS } from '@/config/constants'
import { createPageMetadata } from '@/shared/lib/page-metadata'

export const metadata: Metadata = createPageMetadata({
  title: '預約諮詢 | LINE 專人即時協助',
  description:
    '透過加密的 LINE 專人諮詢快速取得醫師建議、安排診療時程，從術前評估到術後追蹤皆有專業團隊陪伴。',
  path: '/consultation/',
  keywords: [
    ...KEYWORDS.treatments.slice(0, 6),
    ...KEYWORDS.primary.slice(0, 4),
    '痔瘡諮詢',
    '醫師預約'
  ],
})

export default function ConsultationPage() {
  const breadcrumbItems = [
    { '@type': 'ListItem' as const, position: 1, name: '首頁', item: `${SITE.url}/` },
    { '@type': 'ListItem' as const, position: 2, name: '預約諮詢', item: `${SITE.url}/consultation/` }
  ]

  return (
    <main className="bg-warm-50">
      <JsonLd
        type="BreadcrumbList"
        data={{
          '@type': 'BreadcrumbList',
          name: '預約諮詢',
          itemListElement: breadcrumbItems
        }}
      />
      <PageHeader
        title="預約門診與專業諮詢"
        description="我們提供便捷、保密的 LINE 諮詢管道，協助您初步評估症狀並安排最適合的診療時段。"
        badge="Consultation"
        tone="care"
      />
      <CTASection />
      <ClinicGridSection />
    </main>
  )
}
