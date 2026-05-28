import type { Metadata } from 'next'
import nextDynamic from 'next/dynamic'

import { 
  HeroSection as Hero, 
  AboutSection, 
  ServicesSection, 
  HemorrhoidAssessment, 
  ClinicGridSection,
  CTASection 
} from '@/modules/marketing'
import JsonLd from '@/shared/components/common/JsonLd'
import SectionSkeleton from '@/shared/ui/layout/SectionSkeleton'
import Container from '@/shared/ui/layout/Container'
import Section from '@/shared/ui/layout/Section'
import SectionHeader from '@/shared/ui/layout/SectionHeader'
import { HiOutlineMagnifyingGlassCircle, HiOutlineShieldCheck, HiOutlineUserGroup, HiOutlineHeart } from 'react-icons/hi2'
import { SITE } from '@/config/constants'
import { faqCategories } from '@/modules/marketing/data/faq'
import { createPageMetadata } from '@/shared/lib/page-metadata'

/** 延後載入區塊 */
const BlogSection = nextDynamic(
  () => import('@/modules/marketing').then((m) => ({ default: m.BlogSection })),
  { loading: () => <SectionSkeleton minHeight="24rem" label="載入衛教文章" /> }
)

const TestimonialsSection = nextDynamic(
  () => import('@/modules/marketing').then((m) => ({ default: m.TestimonialsSection })),
  { loading: () => <SectionSkeleton minHeight="20rem" label="載入病患評價" /> }
)

const FAQSection = nextDynamic(
  () => import('@/modules/marketing').then((m) => ({ default: m.FAQSection })),
  { loading: () => <SectionSkeleton minHeight="24rem" label="載入常見問題" /> }
)

export const dynamic = 'force-static'
export const revalidate = false

export const metadata: Metadata = createPageMetadata({
  title: '阿福醫師-大腸直腸外科徐彥勳 | 台北台中大腸直腸外科・痔瘡治療',
  description:
    '大腸直腸外科專科醫師徐彥勳（阿福醫師）專精痔瘡微創手術（LHP、LigaSure）、肛門與大腸直腸疾病診療。提供台北、台中及南投多點服務，重視病患隱私與精準止痛管理。',
  path: '/',
  keywords: [
    '痔瘡醫生推薦',
    '台北痔瘡診所',
    '台中痔瘡推薦',
    '微創痔瘡手術',
    'LHP雷射痔瘡',
    '大腸直腸外科徐彥勳',
    '阿福醫師',
    '猛健樂副作用便秘'
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
    <main className="relative overflow-x-hidden bg-warm-50">
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
      
      {/* 核心理念簡述 - 增加架構權威感 */}
      <Section className="bg-white py-12 md:py-24" padding="none">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {[
              { 
                title: '中西醫整合思維', 
                desc: '結合西醫微創手術的精準與中醫氣血調理的長效。', 
                icon: <HiOutlineShieldCheck className="h-8 w-8 text-brand-600" /> 
              },
              { 
                title: '隱私保護優先', 
                desc: '獨立診間諮詢與加密數位追蹤，給予病患最高程度的尊重。', 
                icon: <HiOutlineUserGroup className="h-8 w-8 text-brand-600" /> 
              },
              { 
                title: '以人為本的止痛', 
                desc: '標準化疼痛管理 SOP，大幅降低手術後的不適感與焦慮。', 
                icon: <HiOutlineHeart className="h-8 w-8 text-brand-600" /> 
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-5">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-brand-50 flex items-center justify-center shadow-warm-sm">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 font-serif mb-2">{item.title}</h3>
                  <p className="text-base text-neutral-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <AboutSection />
      <ServicesSection />
      
      {/* 互動診斷區塊 - 維持動能 */}
      <Section className="bg-care-50/30">
        <Container>
          <SectionHeader
            title="痔瘡症狀自我評估"
            description="不確定自己的狀況是否嚴重？透過快速檢測初步了解您的分級與適合的處理建議。"
            icon={<HiOutlineMagnifyingGlassCircle className="h-8 w-8 text-brand-600" />}
            badge="快速評估"
          />
          <div className="mt-16">
            <HemorrhoidAssessment />
          </div>
        </Container>
      </Section>

      <BlogSection />
      <TestimonialsSection />
      <FAQSection />

      {/* 診所據點網格 - 強化在地 SEO */}
      <ClinicGridSection />

      <CTASection />
    </main>
  )
}
