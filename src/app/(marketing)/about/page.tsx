import type { Metadata } from 'next'

import { AboutSection } from '@/modules/marketing'

export const metadata: Metadata = {
  title: '關於徐彥勳醫師 | 徐彥勳大腸直腸外科',
  description:
    '認識徐彥勳醫師的專業背景與臨床經驗，了解中西醫雙專業、微創技術與貼心照護如何陪伴病患重拾健康。',
  alternates: {
    canonical: '/about'
  }
}

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutSection />
    </main>
  )
}


