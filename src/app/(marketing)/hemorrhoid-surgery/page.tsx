import type { Metadata } from "next"
import Link from "next/link"
import {
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineLifebuoy,
  HiOutlineCheckBadge,
  HiOutlineQueueList,
  HiOutlineClipboardDocumentCheck,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineMapPin,
  HiOutlineDocumentCheck,
  HiOutlineQuestionMarkCircle
} from "react-icons/hi2"

import Section from "@/shared/ui/layout/Section"
import Container from "@/shared/ui/layout/Container"
import LineButton from "@/shared/components/common/LineButton"
import JsonLd from "@/shared/components/common/JsonLd"
import { SITE, ASSETS, KEYWORDS, DOCTOR, CLINIC } from "@/config/constants"
import { PRACTICE_LOCATIONS } from "@/config/site-content"
import { FAQPage } from "@/config/types"
import { cn } from "@/shared/lib/cn"
import { buttonVariants } from "@/shared/ui/primitives"

export const metadata: Metadata = {
  title: "20年臨床經驗微創痔瘡手術全攻略：LHP雷射與LigaSure技術解析 | 阿福醫師大腸直腸外科",
  description:
    "由20年臨床經驗大腸直腸外科專科醫師徐彥勳（阿福醫師）親自診置。深入解析 LHP 雷射痔瘡消融與 LigaSure 組織凝集儀微創手術，提供低疼痛管理、保險理賠指引與無痛日間手術評估。",
  keywords: [
    ...KEYWORDS.treatments,
    "20年臨床經驗",
    "痔瘡手術費用",
    "LHP雷射痔瘡",
    "LigaSure痔瘡手術",
    "痔瘡手術恢復期",
    "微創痔瘡推薦",
    "台中痔瘡微創",
    "台北痔瘡診所",
    "草屯痔瘡手術"
  ],
  authors: [{ name: DOCTOR.alternateName, url: DOCTOR.url }],
  alternates: {
    canonical: `${SITE.url}/hemorrhoid-surgery`
  },
  openGraph: {
    title: "20年臨床經驗微創痔瘡手術全攻略：LHP雷射與LigaSure技術解析 | 阿福醫師",
    description: "20年大腸直腸外科專科經驗。深入解析雷射與微創痔瘡手術，提供客製化止痛、保險理賠與日間微創處置。",
    type: "article",
    images: [{ url: new URL(ASSETS.ogImage, SITE.url).toString() }]
  }
}

// 治療方式詳細對比
const treatmentComparison = [
  {
    method: "LHP 雷射消融術",
    pain: "極低（微痛或微沉重感）",
    recovery: "約 1-3 天可正常工作",
    wound: "僅 0.2cm 微小針孔，無大切口",
    feature: "利用 1470nm 德國極細雷射光纖蒸發痔核，完美保留肛門括約肌與襯墊結構",
    idealFor: "1-3 級內痔、疼痛敏感、需極速復工、害怕傳統手術疼痛者"
  },
  {
    method: "LigaSure 微創組織凝集儀",
    pain: "中低疼痛（顯著優於傳統切除）",
    recovery: "約 3-7 天",
    wound: "熱凝集封合傷口，極微小切口",
    feature: "智慧型高頻電能高壓封合血管與組織，術中幾近零出血，熱損傷極低",
    idealFor: "3-4 級重度痔瘡、多發性混合痔、出血量大或贅皮較多者"
  },
  {
    method: "複合式微創手術 (LHP+LigaSure)",
    pain: "輕微至低疼痛",
    recovery: "約 2-5 天",
    wound: "客製化極小精細傷口",
    feature: "結合雷射消融深層內痔與組織凝集處理外痔贅皮，發揮雙重優勢",
    idealFor: "複雜型混合痔、內外痔同時嚴重發作之病患"
  },
  {
    method: "傳統痔瘡切除術",
    pain: "劇烈疼痛（需較長止痛期）",
    recovery: "約 2-4 週",
    wound: "較大開放性切口，需要每日坐浴",
    feature: "剪刀與電燒切除組織，技術成熟但組織創傷大",
    idealFor: "極度嚴重脫垂、傳統醫院住院患者"
  }
]

// 痔瘡自我檢測與症狀分級
const hemorrhoidGrades = [
  {
    grade: "第一級",
    symptom: "排便時無痛出血，血滴在便盆或擦拭時見血",
    desc: "痔瘡尚留在肛門內，通常無明顯痛感，是雷射消融黃金治療期。"
  },
  {
    grade: "第二級",
    symptom: "排便時痔瘡會脫出肛門外，便後會自動縮回",
    desc: "偶爾伴隨腫脹不適感，微創雷射或組織凝集處置效果極佳。"
  },
  {
    grade: "第三級",
    symptom: "排便或久站時痔瘡脫出，需用手推回才可復位",
    desc: "常引起異物感、搔癢與出血，建議儘早由專科醫師評估微創手術。"
  },
  {
    grade: "第四級",
    symptom: "痔瘡長期卡在肛門外無法推回，或推回後立刻脫出",
    desc: "易伴隨嚴重腫痛、血栓形成或黏膜潰瘍，需立即進行微創減壓切除。"
  }
]

// 手術流程
const surgerySteps = [
  {
    title: "1. 20年專科精準診斷",
    desc: "由徐彥勳醫師親自進行高解析度指診與肛門鏡檢查，精確判別痔瘡分級並排除肛裂或瘻管。",
    icon: <HiOutlineClipboardDocumentCheck className="h-7 w-7" />
  },
  {
    title: "2. 客製化低疼痛管理",
    desc: "評估個人疼痛耐受度，結合舒眠麻醉與長效預防性止痛處方，消除術中與術後恐懼。",
    icon: <HiOutlineQueueList className="h-7 w-7" />
  },
  {
    title: "3. 溫暖日間微創手術",
    desc: "在極具隱私的獨立診間環境執行，多數患者術後觀察 1-2 小時即可平穩返家休養。",
    icon: <HiOutlineSparkles className="h-7 w-7" />
  },
  {
    title: "4. 數位化 LINE 一對一關懷",
    desc: "提供專屬 LINE 官方帳號術後全程追蹤，專業團隊隨時解答飲食、坐浴與恢復疑問。",
    icon: <HiOutlineChatBubbleBottomCenterText className="h-7 w-7" />
  }
]

// 術後恢復時程
const recoveryTimeline = [
  {
    time: "術後 Day 1-2",
    title: "輕微腫脹與沉重感",
    desc: "可正常下床走動與輕便作息。依照醫囑進行溫水坐浴與定時服藥，避免久坐。"
  },
  {
    time: "術後 Day 3-5",
    title: "組織開始迅速修復",
    desc: "疼痛感顯著降低，多數上班族已可正常返工辦公，排便逐漸恢復順暢。"
  },
  {
    time: "術後 Day 7-14",
    title: "傷口幾乎完全癒合",
    desc: "返診由徐醫師確認傷口恢復良好，可恢復適度運動與日常社交生活。"
  }
]

// 擴充 FAQ 數據 (包含結構化數據)
const faqs = [
  {
    q: "微創痔瘡手術（LHP 雷射 / LigaSure）需要住院嗎？",
    a: "目前的微創技術如 LHP 雷射消融與 LigaSure 組織凝集儀多數屬於「日間門診手術」。在診所獨立休憩區觀察 1-2 小時確認狀態穩定後即可平穩返家，不需要住院，大幅降低對日常工作與家庭生活的影響。"
  },
  {
    q: "痔瘡手術的保險理賠如何申請？醫療險有給付嗎？",
    a: "多數保戶所投保的「實支實付醫療險」或「門診手術險」皆有涵蓋痔瘡處置項目。阿福醫師團隊會在術後為您開立載明手術名稱與醫療費用的正規醫療診斷證明書與收據，建議您術前先向您的保險業務員確認門診手術保單條款。"
  },
  {
    q: "雷射痔瘡手術（LHP）跟傳統痔瘡手術差在哪裡？會很痛嗎？",
    a: "傳統手術需剪開肛門黏膜大面積切除，術後劇痛且恢復期長達 2-4 週；而 LHP 雷射消融術僅透過約 0.2cm 的極微小針孔，以 1470nm 雷射光纖深入痔核內部蒸發血管組織，傷口極小、不破壞肛門括約肌，術後痛感極低，恢復速度快 3 倍以上。"
  },
  {
    q: "手術後多久可以回到職場工作？",
    a: "若進行 LHP 雷射消融手術，多數文書辦公族群在術後 1-2 天即可恢復上班；若為 LigaSure 微創手術或較複雜的混合痔，建議預留 3-5 天適度休養，避免前幾天過度粗重搬運或長途騎車。"
  },
  {
    q: "微創痔瘡手術後會不會復發？",
    a: "微創手術能精準處理現有的病灶血管叢。配合阿福醫師提供的術後腸道飲食衛教、補充足夠膳食纖維與維持良好排便習慣，長期滿意度極高，能有效預防新生痔瘡。"
  },
  {
    q: "在懷孕或使用減重藥物（瘦瘦針/猛健樂）時出現痔瘡怎麼辦？",
    a: "孕期與使用 GLP-1 減重藥物者容易因便秘或腹壓增加誘發急性痔瘡。阿福醫師具備豐富的跨領域臨床經驗，能提供包含保守藥物溫和調理、生活習慣指導或急性微創減壓評估，讓您安心度過治療期。"
  }
]

export default function HemorrhoidSurgeryPage() {
  const faqJsonLd: FAQPage = {
    "@type": "FAQPage",
    name: "痔瘡手術與微創技術常見問題 FAQ",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        name: faq.a,
        text: faq.a
      }
    }))
  }

  return (
    <main className="bg-warm-50">
      <JsonLd
        type="BreadcrumbList"
        data={{
          "@type": "BreadcrumbList",
          name: "痔瘡手術與微創技術解析",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "首頁", item: SITE.url },
            { "@type": "ListItem", position: 2, name: "痔瘡微創手術", item: `${SITE.url}/hemorrhoid-surgery` }
          ]
        }}
      />
      <JsonLd type="FAQPage" data={faqJsonLd} />

      {/* Hero Section */}
      <Section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32" padding="none">
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-brand-50/30 via-warm-50 to-warm-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[600px] w-full max-w-7xl bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.08),transparent_70%)]" />
        
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-100/60 px-4 py-1.5 text-xs font-bold tracking-wide text-brand-800 ring-1 ring-brand-200/50 md:text-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
              20年大腸直腸外科臨床經驗 ｜ 微創痔瘡專精
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl [text-wrap:balance] font-serif leading-tight">
              告別腫痛出血：<br />
              <span className="bg-linear-to-r from-brand-700 via-brand-600 to-brand-500 bg-clip-text text-transparent">
                LHP 雷射與微創痔瘡手術全解析
              </span>
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-neutral-600 md:text-xl md:leading-9 max-w-3xl mx-auto">
              由 <strong className="text-neutral-900 font-bold">阿福醫師（徐彥勳）</strong> 憑藉 <strong className="text-neutral-900 font-bold">20年臨床經驗</strong> 親自評估。
              精準導入 <span className="font-bold text-brand-700 underline decoration-care-300 underline-offset-8">德國 LHP 雷射消融</span> 與 <span className="font-bold text-brand-700 underline decoration-care-300 underline-offset-8">LigaSure 組織凝集儀</span>，
              打造低疼痛、無須長時間住院、高隱私的客製化康復方案。
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs md:text-sm text-neutral-600">
              <span className="rounded-lg bg-white px-3 py-1.5 shadow-xs ring-1 ring-neutral-200/60">📍 台中西屯顧家診所</span>
              <span className="rounded-lg bg-white px-3 py-1.5 shadow-xs ring-1 ring-neutral-200/60">📍 顧芳瑜泌尿科大安分院</span>
              <span className="rounded-lg bg-white px-3 py-1.5 shadow-xs ring-1 ring-neutral-200/60">📍 草屯佑民醫院</span>
              <span className="rounded-lg bg-white px-3 py-1.5 shadow-xs ring-1 ring-neutral-200/60">📍 秘境美學診所</span>
              <span className="rounded-lg bg-white px-3 py-1.5 shadow-xs ring-1 ring-neutral-200/60">📍 賦真妍整形醫美診所</span>
            </div>

            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <LineButton text="預約 1對1 LINE 評估" analyticsData={{ text: "surgery_hero_line", location: "hero", destination: "line" }} />
              <Link
                href="#comparison"
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full sm:w-auto rounded-2xl shadow-warm-md")}
              >
                比較手術方式與優勢
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5大核心專業保證 */}
      <Section className="bg-warm-50 py-12 md:py-16" padding="none">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { title: "20年專科資歷", desc: "大腸直腸外科專科執照", icon: <HiOutlineShieldCheck className="h-7 w-7 text-brand-600" /> },
              { title: "日間微創手術", desc: "觀察無虞當日即可返家", icon: <HiOutlineClock className="h-7 w-7 text-brand-600" /> },
              { title: "低疼痛 SOP", desc: "客製化麻醉與止痛管理", icon: <HiOutlineCheckBadge className="h-7 w-7 text-brand-600" /> },
              { title: "高度隱私維護", desc: "獨立診間與尊嚴照護", icon: <HiOutlineLifebuoy className="h-7 w-7 text-brand-600" /> },
              { title: "保險理賠協助", desc: "完整診斷書與收據開立", icon: <HiOutlineDocumentCheck className="h-7 w-7 text-brand-600" /> }
            ].map((item, idx) => (
              <div key={idx} className="surface-card p-6 flex flex-col items-center text-center gap-3 border-none ring-1 ring-neutral-200/30 transition-all hover:shadow-warm-md">
                <div className="h-12 w-12 rounded-2xl bg-brand-50 flex items-center justify-center shadow-warm-sm">{item.icon}</div>
                <h3 className="text-base font-bold text-neutral-900 font-serif">{item.title}</h3>
                <p className="text-xs leading-relaxed text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 痔瘡分級與自我檢測 */}
      <Section className="bg-white py-16 md:py-24">
        <Container>
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-md">Symptom Self-Check</span>
            <h2 className="mt-3 text-3xl font-bold text-neutral-900 md:text-5xl font-serif">您的痔瘡處於第幾級？</h2>
            <p className="mt-4 text-neutral-600 text-lg max-w-2xl mx-auto">了解症狀階段，掌握最佳微創黃金治療時機</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hemorrhoidGrades.map((item, idx) => (
              <div key={idx} className="rounded-3xl border border-neutral-200/60 bg-warm-50/40 p-8 flex flex-col justify-between hover:bg-white hover:shadow-warm-xl transition-all">
                <div>
                  <span className="inline-block rounded-lg bg-brand-700 px-3 py-1 text-xs font-bold text-white mb-4">
                    {item.grade}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 font-serif mb-3 leading-snug">{item.symptom}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600">{item.desc}</p>
                </div>
                <div className="mt-6 border-t border-neutral-200/50 pt-4 text-xs font-semibold text-brand-600">
                  {idx <= 1 ? "✓ 建議採取雷射消融微創治療" : "✓ 建議由專科醫師親診評估微創切除"}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 技術對比表格 */}
      <Section id="comparison" className="bg-care-50/40 py-16 md:py-24">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 md:text-5xl font-serif">微創與傳統手術方式對比</h2>
            <p className="mt-6 text-neutral-600 text-lg">根據您的生活節奏、疼痛耐受度與痔瘡嚴重度，選擇最適合的診療路徑</p>
          </div>

          <div className="overflow-x-auto rounded-[2rem] border border-neutral-200/50 bg-white shadow-warm-xl">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-brand-700 text-white">
                  <th className="px-6 py-5 font-bold font-serif">手術技術</th>
                  <th className="px-6 py-5 font-bold font-serif">術後痛感</th>
                  <th className="px-6 py-5 font-bold font-serif">平均恢復期</th>
                  <th className="px-6 py-5 font-bold font-serif">傷口特性</th>
                  <th className="px-6 py-5 font-bold font-serif">核心優勢</th>
                  <th className="px-6 py-5 font-bold font-serif">建議對象</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {treatmentComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-brand-50/20 transition-colors">
                    <td className="px-6 py-6 font-bold text-neutral-900 font-serif text-base">{row.method}</td>
                    <td className="px-6 py-6 text-brand-600 font-bold">{row.pain}</td>
                    <td className="px-6 py-6 text-neutral-700 font-semibold">{row.recovery}</td>
                    <td className="px-6 py-6 text-neutral-600">{row.wound}</td>
                    <td className="px-6 py-6 text-neutral-600 leading-relaxed max-w-xs">{row.feature}</td>
                    <td className="px-6 py-6 text-neutral-900 font-bold">{row.idealFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 text-center text-xs text-neutral-500 italic">
            ※ 實際恢復時間與感受會因個人體質、年齡與痔瘡分級而有所差異，請親至門診由徐彥勳醫師進行精密視診評估。
          </p>
        </Container>
      </Section>

      {/* 恢復時程 Roadmap */}
      <Section className="bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-md">Recovery Timeline</span>
              <h2 className="mt-3 text-3xl font-bold text-neutral-900 md:text-5xl font-serif">微創術後恢復時程</h2>
              <p className="mt-4 text-neutral-600 text-lg">清晰掌控復原步伐，安心回歸美好日常</p>
            </div>

            <div className="space-y-8">
              {recoveryTimeline.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-6 p-8 rounded-3xl bg-warm-50/60 ring-1 ring-neutral-200/40">
                  <div className="sm:w-1/4">
                    <span className="inline-block rounded-xl bg-brand-600 px-4 py-2 text-sm font-bold text-white shadow-xs">
                      {item.time}
                    </span>
                  </div>
                  <div className="sm:w-3/4">
                    <h3 className="text-xl font-bold text-neutral-900 font-serif mb-2">{item.title}</h3>
                    <p className="text-base text-neutral-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 治療流程 */}
      <Section className="bg-warm-50 py-16 md:py-24">
        <Container>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-24">
              <h2 className="text-3xl font-bold text-neutral-900 leading-tight md:text-5xl font-serif">
                精確且暖心的<br />診療體系
              </h2>
              <p className="mt-6 text-neutral-600 leading-loose text-base">
                阿福醫師建立了一套從「精準評估」到「數位化守護」的完整流程，確保您在掌握充分資訊、減少恐懼的情況下重拾健康。
              </p>
              <div className="mt-8 p-8 rounded-[2rem] bg-care-100/40 ring-1 ring-care-200/50">
                <h4 className="font-bold text-care-800 mb-3 text-xl font-serif">想了解您的痔瘡狀況？</h4>
                <p className="text-neutral-600 mb-6 text-sm leading-relaxed">您可以先透過加密 LINE 管道向專業團隊說明症狀，安排最適切的診療時段。</p>
                <LineButton text="立即 LINE 專人諮詢" analyticsData={{ text: "surgery_flow_line", location: "process", destination: "line" }} />
              </div>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {surgerySteps.map((step, idx) => (
                <div key={idx} className="surface-card-interactive relative p-8 flex flex-col group">
                  <div className="absolute -top-4 -left-4 h-10 w-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-bold text-base shadow-md">
                    {idx + 1}
                  </div>
                  <div className="mb-6 text-brand-600 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 font-serif">{step.title}</h3>
                  <p className="text-sm leading-loose text-neutral-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 門診據點導覽 */}
      <Section className="bg-white py-16 md:py-24">
        <Container>
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-md">Practice Locations</span>
            <h2 className="mt-3 text-3xl font-bold text-neutral-900 md:text-5xl font-serif">徐彥勳醫師 門診據點</h2>
            <p className="mt-4 text-neutral-600 text-lg max-w-2xl mx-auto">提供台中西屯、台北大安、草屯佑民醫院及特約美學診所之專業診療空間</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {PRACTICE_LOCATIONS.map((loc) => (
              <div key={loc.id} className="rounded-2xl border border-neutral-200/60 p-6 flex flex-col justify-between bg-warm-50/30 hover:bg-white hover:shadow-warm-lg transition-all">
                <div>
                  <span className="inline-block rounded-md bg-brand-100 text-brand-800 text-[11px] font-bold px-2 py-0.5 mb-3">
                    {loc.region}
                  </span>
                  <h3 className="font-bold text-neutral-900 text-base font-serif mb-2">{loc.name}</h3>
                  {loc.address && <p className="text-xs text-neutral-500 mb-3 flex items-start gap-1"><HiOutlineMapPin className="h-4 w-4 shrink-0 text-brand-600" />{loc.address}</p>}
                </div>
                {loc.mapUrl && (
                  <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-4 text-xs font-bold text-brand-600 hover:underline">
                    查看 Google 地圖 ➔
                  </a>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ 區塊 */}
      <Section className="bg-warm-50/60 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 md:text-5xl font-serif">常見問題 FAQ</h2>
              <p className="mt-4 text-neutral-600 text-lg">解答您的術前疑慮，建立正確衛教知識</p>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group rounded-[2rem] border border-neutral-200/60 bg-white transition-all hover:shadow-warm-lg overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-8 list-none font-bold text-xl text-neutral-900 focus:outline-hidden font-serif">
                    <span className="flex items-center gap-3">
                      <HiOutlineQuestionMarkCircle className="h-6 w-6 text-brand-600 shrink-0" />
                      {faq.q}
                    </span>
                    <span className="transition-transform group-open:rotate-180 text-brand-500">⌄</span>
                  </summary>
                  <div className="px-8 pb-8 text-neutral-600 leading-loose text-base border-t border-neutral-100/50 pt-6">
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
            <div className="absolute top-0 right-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-care-400/20 blur-3xl" />
            
            <h2 className="text-3xl font-bold md:text-6xl font-serif leading-tight">重建生活品質，<br className="sm:hidden" />從專業溫暖的評估開始</h2>
            <p className="mt-8 text-lg text-brand-50 opacity-90 md:text-2xl leading-relaxed max-w-3xl mx-auto">
              擁有 20 年大腸直腸外科臨床經驗的徐彥勳醫師團隊，陪伴您在尊嚴與低疼痛中重拾自在輕盈。
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link
                href={CLINIC.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-16 items-center justify-center gap-3 rounded-2xl bg-white px-10 text-lg font-bold text-[#06C755] shadow-xl hover:-translate-y-1 transition-all active:scale-[0.98]"
              >
                <HiOutlineChatBubbleBottomCenterText className="h-7 w-7" />
                <span>預約專科門診評估</span>
              </Link>
              <Link
                href="/consultation"
                className="inline-flex h-16 items-center justify-center px-10 text-lg font-bold text-white ring-2 ring-white/30 rounded-2xl hover:bg-white/10 transition-all"
              >
                門診據點與預約說明
              </Link>
            </div>
            <p className="mt-10 text-xs text-brand-200">
              ※ 本網站內容僅供醫療衛教參考，實際方案請務必親自諮詢專業醫師。
            </p>
          </div>
        </Container>
      </Section>
    </main>
  )
}
