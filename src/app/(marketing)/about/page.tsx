import type { Metadata } from 'next'

import { AboutSection } from '@/modules/marketing'
import JsonLd from '@/shared/components/common/JsonLd'
import PageHeader from '@/shared/ui/layout/PageHeader'
import { SITE, DOCTOR_COPY } from '@/config/constants'
import { createPageMetadata } from '@/shared/lib/page-metadata'

export const metadata: Metadata = createPageMetadata({
  title: '關於阿福醫師（徐彥勳）| 大腸直腸外科專科醫師',
  description:
    '認識大腸直腸外科專科醫師徐彥勳（阿福醫師）的專業背景與臨床經驗，了解中西醫雙專業、微創技術與貼心照護如何陪伴病患重拾健康。',
  path: '/about',
  keywords: ['大腸直腸外科醫師', '痔瘡專科醫師', '徐彥勳醫師', '阿福醫師'],
  openGraphType: 'profile',
})

export default function AboutPage() {
  const breadcrumbItems = [
    { '@type': 'ListItem' as const, position: 1, name: '首頁', item: SITE.url },
    { '@type': 'ListItem' as const, position: 2, name: '關於醫師', item: `${SITE.url}/about` },
  ]

  return (
    <main className="bg-white">
      <JsonLd
        type="BreadcrumbList"
        data={{
          '@type': 'BreadcrumbList',
          name: '關於醫師',
          itemListElement: breadcrumbItems,
        }}
      />
      <PageHeader
        title="專業大腸直腸外科診療"
        description="中西醫雙專業背景，結合微創手術技術，致力於提供每一位患者高品質、高隱私且極致止痛的溫暖照護。"
        badge="About Physician"
        tone="warm"
      />
      <AboutSection />
    </main>
  )
}
