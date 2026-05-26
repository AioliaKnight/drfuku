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
    pain: '極低 (1-2分)',
    recovery: '1-3 天',
    feature: '無需切除、無大傷口',
    idealFor: '疼痛敏感、需快速復工者'
  },
  {
    method: 'LigaSure 微創',
    pain: '中低 (2-4分)',
    recovery: '3-7 天',
    feature: '組織凝集、出血量極少',
    idealFor: '中重度痔瘡、多發性痔瘡'
  },
  {
    method: '傳統切除',
    pain: '較高 (6-8分)',
    recovery: '2-4 週',
    feature: '徹底移除、適用廣',
    idealFor: '嚴重脫垂、結構複雜者'
  }
]

// 手術流程
const surgerySteps = [
  {
    title: '精準診斷評估',
    desc: '透過肛門鏡與高解析度指診，判定分級並確認是否合併肛裂或瘻管。',
    icon: <HiOutlineClipboardDocumentCheck className="h-6 w-6" />
  },
  {
    title: '客製化術前規劃',
    desc: '依據您的工作節奏與止痛需求，選擇最適合的手術路徑與麻醉方案。',
    icon: <HiOutlineQueueList className="h-6 w-6" />
  },
  {
    title: '專業微創手術',
    desc: '在門診手術室或醫院執行，強調止痛先行，過程安全、隱私且安靜。',
    icon: <HiOutlineSparkles className="h-6 w-6" />
  },
  {
    title: '數位化術後跟進',
    desc: '透過專屬 LINE 管道即時回饋恢復狀況，專人指導坐浴與用藥技巧。',
    icon: <HiOutlineChatBubbleBottomCenterText className="h-6 w-6" />
  }
]

// FAQ 數據
const faqs = [
  {
    q: '痔瘡手術需要住院嗎？',
    a: '微創技術如 LHP 與 LigaSure 大多屬於「當日手術」。術後觀察 1-2 小時確認穩定後即可返家，通常不需要長期住院。'
  },
  {
    q: '保險可以理賠嗎？',
    a: '大多數的「住院實支實付」與「手術險」都有涵蓋痔瘡手術。建議術前先與您的保險經紀人確認「門診手術」是否在保障範圍內。'
  },
  {
    q: '手術後多久可以恢復工作？',
    a: '雷射手術通常 1-2 天即可恢復文書工作；若工作需負重或久站，建議預留 5-7 天的休息時間，避免傷口壓力。'
  },
  {
    q: '手術會不會復發？',
    a: '手術能移除現有的病灶，但「預防復發」需靠生活習慣維持。我們會提供完整的衛教，降低未來新痔瘡生成的機率。'
  }
]

export default function HemorrhoidSurgeryPage() {
  return (
    <main className="bg-white">
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
      <Section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32" padding="none">
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-brand-50/80 via-white to-white" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[600px] w-full max-w-7xl bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.12),transparent_70%)]" />
        
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <motion-span className="mb-6 inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-bold tracking-widest text-brand-700 uppercase ring-1 ring-brand-200">
              Surgical Excellence
            </motion-span>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl [text-wrap:balance]">
              從傳統到雷射：<br />
              <span className="bg-linear-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                痔瘡微創技術全解析
              </span>
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-neutral-600 md:text-xl md:leading-9">
              擺脫腫、痛、出的輪迴。阿福醫師（徐彥勳）專精於 <span className="font-bold text-neutral-900">LHP 雷射</span>與 <span className="font-bold text-neutral-900">LigaSure 微創</span>手術，
              為您量身打造低疼痛、恢復快的個性化方案。
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <LineButton text="預約門診評估" analyticsData={{ text: 'surgery_hero_line', location: 'hero', destination: 'line' }} />
              <Link
                href="#comparison"
                className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'w-full sm:w-auto rounded-2xl')}
              >
                了解技術差異
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* 核心價值區塊 */}
      <Section className="bg-white py-12 md:py-20" padding="none">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: '專科背景', desc: '大腸直腸外科專科執照', icon: <HiOutlineShieldCheck className="h-6 w-6 text-brand-600" /> },
              { title: '極速恢復', desc: '多數手術可當日返家', icon: <HiOutlineClock className="h-6 w-6 text-brand-600" /> },
              { title: '疼痛管理', desc: '多模式止痛減輕恐懼', icon: <HiOutlineCheckBadge className="h-6 w-6 text-brand-600" /> },
              { title: '隱私保護', desc: '一對一獨立諮詢診間', icon: <HiOutlineLifebuoy className="h-6 w-6 text-brand-600" /> },
            ].map((item, idx) => (
              <div key={idx} className="surface-card p-6 flex flex-col items-center text-center gap-3 border-none ring-1 ring-neutral-100">
                <div className="h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center">{item.icon}</div>
                <h3 className="font-bold text-neutral-900">{item.title}</h3>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 技術對比表格 */}
      <Section id="comparison" className="bg-neutral-50/50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl">選擇最適合您的手術方式</h2>
            <p className="mt-4 text-neutral-600">沒有最好的技術，只有最適配您生活節奏的選擇</p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-neutral-200 bg-white shadow-xl">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="px-6 py-5 font-bold">技術項目</th>
                  <th className="px-6 py-5 font-bold">術後痛感</th>
                  <th className="px-6 py-5 font-bold">平均恢復期</th>
                  <th className="px-6 py-5 font-bold">核心優勢</th>
                  <th className="px-6 py-5 font-bold">建議對象</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {treatmentComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-brand-50/30 transition-colors">
                    <td className="px-6 py-6 font-bold text-neutral-900">{row.method}</td>
                    <td className="px-6 py-6 text-brand-600 font-medium">{row.pain}</td>
                    <td className="px-6 py-6 text-neutral-600">{row.recovery}</td>
                    <td className="px-6 py-6 text-neutral-600">{row.feature}</td>
                    <td className="px-6 py-6 text-neutral-900 font-medium">{row.idealFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-sm text-neutral-400 italic">
            * 實際恢復時間會因體質與痔瘡分級而有所差異，請以門診診斷為準。
          </p>
        </Container>
      </Section>

      {/* 治療流程 */}
      <Section className="bg-white">
        <Container>
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-bold text-neutral-900 leading-tight">
                標準化<br />診療流程
              </h2>
              <p className="mt-6 text-neutral-600 leading-relaxed">
                我們建立了一套從「初診評估」到「數位化術後跟進」的完整體系，確保每位患者都能在清楚掌握資訊的情況下完成治療。
              </p>
              <div className="mt-8 p-6 rounded-2xl bg-brand-50/50 ring-1 ring-brand-100">
                <h4 className="font-bold text-brand-700 mb-2">想了解您的情況？</h4>
                <p className="text-sm text-neutral-600 mb-4">您可以先用 LINE 向我們說明目前的腫痛或出血狀況。</p>
                <LineButton text="立即 LINE 初評" analyticsData={{ text: 'surgery_flow_line', location: 'process', destination: 'line' }} />
              </div>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {surgerySteps.map((step, idx) => (
                <div key={idx} className="relative p-6 rounded-2xl bg-white ring-1 ring-neutral-200 transition-all hover:ring-brand-200 hover:shadow-lg group">
                  <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="mb-4 text-brand-600 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ 區塊 */}
      <Section className="bg-neutral-900 text-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">痔瘡手術常見問題</h2>
                <p className="mt-4 text-neutral-400">解決您的術前焦慮，建立正確的治療觀點</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group rounded-2xl border border-white/10 bg-white/5 transition-all hover:bg-white/10">
                  <summary className="flex cursor-pointer items-center justify-between p-6 list-none font-bold text-lg focus:outline-hidden">
                    {faq.q}
                    <span className="transition-transform group-open:rotate-180">⌄</span>
                  </summary>
                  <div className="px-6 pb-6 text-neutral-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 底部 CTA */}
      <Section className="bg-white py-24">
        <Container>
          <div className="mx-auto max-w-4xl rounded-3xl bg-linear-to-br from-brand-600 to-brand-700 p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            {/* 背景裝飾 */}
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-400/20 blur-3xl" />
            
            <h2 className="text-3xl font-bold md:text-5xl">不只是手術，<br className="sm:hidden" />更是生活品質的重建</h2>
            <p className="mt-6 text-lg text-brand-50 opacity-90 md:text-xl">
              醫師的職責不只是解決生理病灶，更是協助您在最短時間內找回自信與舒適。
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <LineButton text="與醫師對話諮詢" variant="default" className="!bg-white !text-[#06C755] !ring-white hover:!bg-brand-50" />
              <Link
                href="/consultation"
                className="inline-flex h-12 items-center justify-center px-8 text-sm font-bold text-white ring-2 ring-white/30 rounded-2xl hover:bg-white/10 transition-all"
              >
                門診流程說明
              </Link>
            </div>
            <p className="mt-8 text-xs text-brand-200">
              ※本網站內容僅供醫療衛教參考，實際方案請務必親自諮詢專業醫師。
            </p>
          </div>
        </Container>
      </Section>
    </main>
  )
}

