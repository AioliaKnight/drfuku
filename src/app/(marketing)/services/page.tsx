import type { Metadata } from 'next'

import { ServicesSection } from '@/modules/marketing'

export const metadata: Metadata = {
  title: '診療服務 | 微創痔瘡治療與大腸直腸照護',
  description:
    '了解徐彥勳醫師提供的痔瘡微創手術、肛門疾病治療與術後照護服務，從評估到復原皆由專業團隊完整陪伴。',
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


