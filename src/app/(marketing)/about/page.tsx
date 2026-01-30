import type { Metadata } from 'next'

import { AboutSection } from '@/modules/marketing'
import { SITE, ASSETS } from '@/config/constants'

export const metadata: Metadata = {
  title: '關於阿福醫師（徐彥勳）| 大腸直腸外科徐彥勳',
  description:
    '認識大腸直腸外科專科醫師徐彥勳（阿福醫師）的專業背景與臨床經驗，了解中西醫雙專業、微創技術與貼心照護如何陪伴病患重拾健康。',
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
  return (
    <main className="bg-white">
      <AboutSection />
    </main>
  )
}


