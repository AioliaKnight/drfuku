import type { Metadata } from 'next'

import { ServicesSection } from '@/modules/marketing'

export const metadata: Metadata = {
  title: '診療服務 | 微創痔瘡治療與大腸直腸照護',
  description:
    '了解大腸直腸外科專科醫師徐彥勳（阿福醫師）提供的痔瘡微創手術、肛門與大腸直腸疾病治療及術後照護服務，從評估到復原皆由專業團隊完整陪伴。',
  alternates: {
    canonical: '/services'
  }
}

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <ServicesSection />
    </main>
  )
}


