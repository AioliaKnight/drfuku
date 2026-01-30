import type { Metadata } from 'next'

import { TestimonialsSection } from '@/modules/marketing'
import { SITE, ASSETS } from '@/config/constants'

export const metadata: Metadata = {
  title: '病患回饋 | 真實診療心得分享',
  description:
    '閱讀病患對大腸直腸外科專科醫師徐彥勳（阿福醫師）的真實治療心得，了解微創技術、術後照護與貼心團隊如何協助不同族群恢復健康。',
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
  return (
    <main className="bg-white">
      <TestimonialsSection />
    </main>
  )
}


