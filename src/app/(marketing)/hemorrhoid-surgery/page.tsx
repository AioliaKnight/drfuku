import type { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineLifebuoy,
  HiOutlineCheckBadge,
  HiOutlineQueueList,
  HiOutlineClipboardDocumentCheck,
  HiOutlineChatBubbleBottomCenterText
} from 'react-icons/hi2'

import Section from '@/shared/ui/layout/Section'
import Container from '@/shared/ui/layout/Container'
import LineButton from '@/shared/components/common/LineButton'
import JsonLd from '@/shared/components/common/JsonLd'
import { SITE, ASSETS, KEYWORDS, DOCTOR, CLINIC } from '@/config/constants'
import { cn } from '@/shared/lib/cn'
import { buttonVariants } from '@/shared/ui/primitives'

export const metadata: Metadata = {
  title: '痔瘡手術全攻略：LHP雷射與微創技術解析 | 阿福醫師大腸直腸外科',
  description:
    '深入解析 LHP 雷射痔瘡消融與 LigaSure 微創手術。由大腸直腸外科專科醫師徐彥勳提供專業評估、止痛管理與術後照護 SOP，助您找回自在生活。',
  keywords: [
    ...KEYWORDS.treatments,
    '痔瘡手術費用',
    'LHP雷射痔瘡',
    'LigaSure痔瘡手術',
    '痔瘡手術恢復期',
    '微創痔瘡推薦'
  ],
  authors: [{ name: DOCTOR.alternateName, url: DOCTOR.url }],
  alternates: {
    canonical: `${SITE.url}/hemorrhoid-surgery`
  },
  openGraph: {
    title: '痔瘡手術全攻略：LHP雷射與微創技術解析 | 阿福醫師',
    description: '深入解析雷射與微創痔瘡手術，提供專業評估與止痛照護建議。',
    type: 'article',
    images: [{ url: new URL(ASSETS.ogImage, SITE.url).toString() }]
  }
}

// 治療方式對比
const treatmentComparison = [
  {
    method: 'LHP 雷射消融',
    pain: '疼痛感輕微',
    recovery: '約 1-3 天',
    feature: '無需切除組織、保留肛門襯墊',
    idealFor: '疼痛敏感、需極速復工者'
  },
  {
    method: 'LigaSure 微創',
    pain: '中低疼痛',
    recovery: '約 3-7 天',
    feature: '能量凝集血管、術中幾乎無血',
    idealFor: '中重度痔瘡、多發性痔瘡'
  },
  {
    method: '傳統切除',
    pain: '痛感較明顯',
    recovery: '約 2-4 週',
    feature: '徹底移除病灶、技術最成熟',
    idealFor: '嚴重脫垂、結構極其複雜者'
  }
]

// 手術流程
const surgerySteps = [
  {
    title: '精準診斷評估',
    desc: '透過高解析度指診與肛門鏡，精確判定痔瘡分級，並排除肛裂或瘻管等併發症。',
    icon: <HiOutlineClipboardDocumentCheck className="h-7 w-7" />
  },
  {
    title: '客製化止痛規劃',
    desc: '依據您的疼痛耐受度與生活節奏，由醫師與麻醉團隊量身打造最適配的減痛方案。',
    icon: <HiOutlineQueueList className="h-7 w-7" />
  },
  {
    title: '溫暖微創處置',
    desc: '在強調隱私與尊嚴的環境下執行，運用先進能量儀器，追求微創傷口與高品質癒合。',
    icon: <HiOutlineSparkles className="h-7 w-7" />
  },
  {
    title: '全方位術後守護',
    desc: '透過專屬數位頻道即時追蹤恢復進度，提供個人化坐浴、飲食與居家照護指導。',
    icon: <HiOutlineChatBubbleBottomCenterText className="h-7 w-7" />
  }
]

// FAQ 數據
const faqs = [
  {
    q: '痔瘡手術需要住院嗎？',
    a: '目前的微創技術如 LHP 與 LigaSure 多數屬於「日間手術」。在診間或手術室觀察 1-2 小時確認狀態穩定後即可返家，通常不需住院。'
  },
  {
    q: '保險理賠的範圍包含哪些？',
    a: '大多數「住院實支實付」或「手術險」都有涵蓋痔瘡項目。建議術前先與保險服務人員確認「門診微創手術」是否在您的保單保障範圍內。'
  },
  {
    q: '手術後多久可以恢復工作？',
    a: '雷射消融手術通常 1-2 天即可恢復辦公室工作；若工作需負重或長途開車，建議預留 5-7 天休息，讓組織獲得理想修復。'
  },
  {
    q: '微創手術後的復發率高嗎？',
    a: '手術能有效處理現有病灶。配合正確的排便習慣與纖維攝取，微創手術的長期滿意度極高。我們會提供完整衛教以預防新生痔瘡。'
  }
]

export default function HemorrhoidSurgeryPage() {
  return (
    <main className="bg-warm-50">
      <JsonLd
        type="BreadcrumbList"
        data={{
          '@type': 'BreadcrumbList',
          name: '痔瘡手術與技術',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: '首頁', item: SITE.url },
            { '@type': 'ListItem', position: 2, name: '痔瘡手術', item: `${SITE.url}/hemorrhoid-surgery` }
          ]
        }}
      />

      {/* Hero Section */}
      <Section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32" padding="none">
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-brand-50/30 via-warm-50 to-warm-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[600px] w-full max-w-7xl bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.08),transparent_70%)]" />
        
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-lg bg-care-50 px-3 py-1 text-xs font-bold tracking-widest text-care-600 uppercase ring-1 ring-care-100/50 md:text-sm">
              Surgical Excellence & Compassion
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl [text-wrap:balance] font-serif leading-tight">
              從傳統到雷射：<br />
              <span className="bg-linear-to-r from-brand-700 via-brand-600 to-brand-500 bg-clip-text text-transparent">
                痔瘡微創技術全解析
              </span>
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-neutral-600 md:text-xl md:leading-9 max-w-2xl mx-auto">
              擺脫腫、痛、出的輪迴。阿福醫師（徐彥勳）運用先進 <span className="font-bold text-neutral-900 underline decoration-care-200 underline-offset-8">LHP 雷射</span>與 <span className="font-bold text-neutral-900 underline decoration-care-200 underline-offset-8">LigaSure 微創</span>技術，
              為您量身打造低疼痛、快速恢復的個性化方案。
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <LineButton text="預約專業評估" analyticsData={{ text: 'surgery_hero_line', location: 'hero', destination: 'line' }} />
              <Link
                href="#comparison"
                className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'w-full sm:w-auto rounded-2xl shadow-warm-md')}
              >
                了解技術差異
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* 核心價值區塊 */}
      <Section className="bg-warm-50 py-12 md:py-20" padding="none">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: '專科背景', desc: '大腸直腸外科專科執照', icon: <HiOutlineShieldCheck className="h-7 w-7 text-brand-600" /> },
              { title: '理想恢復', desc: '多數手術可當日返家', icon: <HiOutlineClock className="h-7 w-7 text-brand-600" /> },
              { title: '專業止痛', desc: '完善管理流程減輕恐懼', icon: <HiOutlineCheckBadge className="h-7 w-7 text-brand-600" /> },
              { title: '隱私保護', desc: '一對一獨立諮詢診間', icon: <HiOutlineLifebuoy className="h-7 w-7 text-brand-600" /> },
            ].map((item, idx) => (
              <div key={idx} className="surface-card p-8 flex flex-col items-center text-center gap-4 border-none ring-1 ring-neutral-200/30">
                <div className="h-14 w-14 rounded-2xl bg-brand-50 flex items-center justify-center shadow-warm-sm">{item.icon}</div>
                <h3 className="text-lg font-bold text-neutral-900 font-serif">{item.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 技術對比表格 */}
      <Section id="comparison" className="bg-care-50/40">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 md:text-5xl font-serif">選擇適合您的手術方式</h2>
            <p className="mt-6 text-neutral-600 text-lg">根據您的生活節奏與疼痛敏感度，選擇最理想的治療路徑</p>
          </div>

          <div className="overflow-x-auto rounded-[2rem] border border-neutral-200/50 bg-white shadow-warm-xl">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-brand-700 text-white">
                  <th className="px-8 py-6 font-bold font-serif">技術項目</th>
                  <th className="px-8 py-6 font-bold font-serif">術後痛感</th>
                  <th className="px-8 py-6 font-bold font-serif">平均恢復期</th>
                  <th className="px-8 py-6 font-bold font-serif">核心優勢</th>
                  <th className="px-8 py-6 font-bold font-serif">建議對象</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {treatmentComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-brand-50/20 transition-colors">
                    <td className="px-8 py-8 font-bold text-neutral-900 font-serif text-lg">{row.method}</td>
                    <td className="px-8 py-8 text-brand-600 font-semibold">{row.pain}</td>
                    <td className="px-8 py-8 text-neutral-600">{row.recovery}</td>
                    <td className="px-8 py-8 text-neutral-600 leading-relaxed">{row.feature}</td>
                    <td className="px-8 py-8 text-neutral-900 font-bold">{row.idealFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 text-center text-sm text-neutral-400 italic">
            ※ 實際恢復時間會因個人體質、年齡與痔瘡分級而有所差異，請以門診診斷為準。
          </p>
        </Container>
      </Section>

      {/* 治療流程 */}
      <Section className="bg-warm-50">
        <Container>
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-24">
              <h2 className="text-3xl font-bold text-neutral-900 leading-tight md:text-5xl font-serif">
                精確且暖心的<br />診療體系
              </h2>
              <p className="mt-8 text-neutral-600 leading-loose text-lg">
                我們建立了一套從「精準評估」到「數位化守護」的完整流程，確保您在掌握資訊、減少焦慮的情況下重拾健康。
              </p>
              <div className="mt-10 p-8 rounded-[2rem] bg-care-100/30 ring-1 ring-care-200/50">
                <h4 className="font-bold text-care-700 mb-3 text-xl font-serif">想了解您的情況？</h4>
                <p className="text-neutral-600 mb-6 leading-relaxed">您可以先透過 LINE 向我們說明目前的腫痛或出血狀況。</p>
                <LineButton text="立即 LINE 諮詢" analyticsData={{ text: 'surgery_flow_line', location: 'process', destination: 'line' }} />
              </div>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-10">
              {surgerySteps.map((step, idx) => (
                <div key={idx} className="surface-card-interactive relative p-10 flex flex-col group">
                  <div className="absolute -top-5 -left-5 h-12 w-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    {idx + 1}
                  </div>
                  <div className="mb-6 text-brand-600 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 font-serif">{step.title}</h3>
                  <p className="text-base leading-loose text-neutral-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ 區塊 */}
      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 md:text-5xl font-serif">常見問題 FAQ</h2>
                <p className="mt-6 text-neutral-600 text-lg">解決您的術前焦慮，建立正確的治療觀點</p>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group rounded-[2rem] border border-neutral-200/60 bg-warm-50/50 transition-all hover:bg-white hover:shadow-warm-lg overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-8 list-none font-bold text-xl text-neutral-900 focus:outline-hidden font-serif">
                    {faq.q}
                    <span className="transition-transform group-open:rotate-180 text-brand-500">⌄</span>
                  </summary>
                  <div className="px-8 pb-8 text-neutral-600 leading-loose text-lg border-t border-neutral-100/50 pt-6">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 底部 CTA */}
      <Section className="bg-warm-50 py-24">
        <Container>
          <div className="mx-auto max-w-5xl rounded-[3rem] bg-linear-to-br from-brand-700 to-brand-600 p-10 md:p-20 text-center text-white shadow-warm-xl relative overflow-hidden">
            {/* 背景裝飾 */}
            <div className="absolute top-0 right-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-care-400/20 blur-3xl" />
            
            <h2 className="text-3xl font-bold md:text-6xl font-serif leading-tight">不只是手術，<br className="sm:hidden" />更是生活品質的重建</h2>
            <p className="mt-8 text-lg text-brand-50 opacity-90 md:text-2xl leading-relaxed max-w-3xl mx-auto">
              醫師的職責不只是解決生理病灶，更是協助您在理想時間內找回自信與舒適。
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link
                href={CLINIC.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-16 items-center justify-center gap-3 rounded-2xl bg-white px-10 text-lg font-bold text-[#06C755] shadow-xl hover:-translate-y-1 transition-all active:scale-[0.98]"
              >
                <HiOutlineChatBubbleBottomCenterText className="h-7 w-7" />
                <span>預約專科評估</span>
              </Link>
              <Link
                href="/consultation"
                className="inline-flex h-16 items-center justify-center px-10 text-lg font-bold text-white ring-2 ring-white/30 rounded-2xl hover:bg-white/10 transition-all"
              >
                門診流程說明
              </Link>
            </div>
            <p className="mt-10 text-sm text-brand-200">
              ※ 本網站內容僅供醫療衛教參考，實際方案請務必親自諮詢專業醫師。
            </p>
          </div>
        </Container>
      </Section>
    </main>
  )
}

