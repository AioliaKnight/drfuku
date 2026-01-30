import type { Metadata } from 'next'

import Section from '@/shared/ui/layout/Section'
import Container from '@/shared/ui/layout/Container'
import LineButton from '@/shared/components/common/LineButton'
import JsonLd from '@/shared/components/common/JsonLd'
import { SITE, ASSETS, KEYWORDS, DOCTOR } from '@/config/constants'

export const metadata: Metadata = {
  title: '痔瘡手術與就醫情境解析 | 阿福醫師大腸直腸外科',
  description:
    '以臨床觀點說明痔瘡常見情境、急性處置、自我檢查與就醫判斷，協助你理解治療選擇與下一步安排。',
  keywords: [
    ...KEYWORDS.treatments.slice(0, 6),
    ...KEYWORDS.symptoms.slice(0, 6),
    '痔瘡就醫情境',
    '痔瘡手術流程'
  ],
  authors: [{ name: DOCTOR.alternateName, url: DOCTOR.url }],
  alternates: {
    canonical: `${SITE.url}/hemorrhoid-surgery`
  },
  openGraph: {
    title: '痔瘡手術與就醫情境解析 | 阿福醫師大腸直腸外科',
    description:
      '以臨床觀點說明痔瘡常見情境、急性處置、自我檢查與就醫判斷，協助你理解治療選擇與下一步安排。',
    type: 'article',
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
    title: '痔瘡手術與就醫情境解析 | 阿福醫師大腸直腸外科',
    description:
      '以臨床觀點說明痔瘡常見情境、急性處置、自我檢查與就醫判斷，協助你理解治療選擇與下一步安排。',
    images: [new URL(ASSETS.twitterImage, SITE.url).toString()]
  }
}

const patientScenarios = [
  {
    title: '「只是偶爾流血」',
    text: '一開始只有出血、沒有痛，常讓人拖著不處理。這其實是內痔常見表現，建議先安排評估。'
  },
  {
    title: '「腫到坐不住」',
    text: '突然腫痛、多坐一分鐘都痛，常見是急性外痔或血栓痔。時間點很關鍵，越拖越難受。'
  },
  {
    title: '「每次都推回去」',
    text: '排便後脫垂需要手推回，代表已影響生活與工作，通常不是單純小問題。'
  },
  {
    title: '「看很多醫生還是反覆」',
    text: '反覆發作多與生活型態與處置策略未對應有關，需要重新評估路徑。'
  }
]

const patientNeeds = [
  {
    title: '想先確定「是不是痔瘡」',
    text: '先釐清出血型態、腫塊位置與伴隨症狀，必要時安排檢查，避免把其他疾病誤當痔瘡。'
  },
  {
    title: '怕痛、怕麻醉、怕恢復慢',
    text: '疼痛與恢復時間不是固定值，會依工作與生活節奏，選擇較合適的處置方式。'
  },
  {
    title: '擔心復發或反覆發作',
    text: '復發與生活型態高度相關，會清楚說明哪些習慣沒調整就容易再發作。'
  },
  {
    title: '在意隱私、不想被家人知道',
    text: '這是常見顧慮，所有諮詢與治療流程都會尊重隱私。'
  }
]

const hemorrhoidTypes = [
  {
    title: '內痔',
    text: '多以無痛性出血為主，嚴重時會脫垂。常見猶豫點是「沒痛需不需要看」。'
  },
  {
    title: '外痔',
    text: '多與疼痛、腫脹有關，血栓時會突然劇痛。常見情境是坐立難安。'
  },
  {
    title: '混合痔',
    text: '內外痔同時存在，症狀較複雜。常見困擾是反覆發作與清潔不易。'
  }
]

const commonCauses = [
  '長期便祕或排便用力',
  '久坐、久站或工作習慣不良',
  '懷孕、生產造成骨盆與靜脈壓力增加',
  '飲食纖維不足、水分攝取不足',
  '長期腹瀉或排便時間過長'
]

const commonSymptoms = [
  '排便出血（鮮紅色為主）',
  '肛門腫脹或摸到腫塊',
  '肛門脫垂（排便後掉出、需手推回）',
  '疼痛、搔癢或分泌物增加',
  '肛門潮濕感或黏液分泌'
]

const acuteCareSignals = [
  '突然劇痛、腫塊變硬或紫黑',
  '腫塊持續腫大，走路或坐下都會痛',
  '出血量明顯增加或持續滴血',
  '發燒、劇烈疼痛合併明顯不適'
]

const gradingNotes = [
  '第一級：出血為主，無脫垂（多數人以為「還好」而拖延）',
  '第二級：脫垂但可自行縮回（開始影響日常）',
  '第三級：需手推回（明顯影響工作與生活）',
  '第四級：無法推回或合併嵌頓（需盡快就醫）'
]

const conservativeCare = [
  '規律排便與足量水分（避免硬撐與久蹲）',
  '高纖飲食與適度運動（降低反覆發作）',
  '溫水坐浴與局部用藥（緩解急性不適）',
  '避免久坐、久用力（減少血管壓力）'
]

const selfCheckItems = [
  '這 24-48 小時內突然腫痛、坐立不安',
  '腫塊變硬、碰到就痛，連走路都影響',
  '排便後出血明顯增加或持續滴血',
  '痛感加劇到影響睡眠或工作',
  '腫塊無法推回，或反覆脫垂'
]

const surgicalIndications = [
  '反覆出血、脫垂或疼痛，影響生活品質與工作節奏',
  '保守治療效果有限，症狀仍持續或惡化',
  '合併血栓、嵌頓或反覆急性發作',
  '肛門周圍問題合併，需要一併處理'
]

const treatmentPrinciples = [
  {
    title: '以症狀為主，不以「等級」硬套',
    description:
      '評估重點是實際的痛與影響，不是單看分級。只要日常被打亂，就應該被認真處理。'
  },
  {
    title: '能保守就保守，但不拖延',
    description:
      '能用藥物、生活調整先穩定，就先從保守開始；但該手術時會說清楚，不讓你拖著受苦。'
  },
  {
    title: '微創是手段，不是口號',
    description:
      '重點是安全與恢復。適合微創就採微創，不適合就不硬做。'
  }
]

const surgerySteps = [
  { title: '門診評估', text: '完整了解症狀、檢查肛門狀況並評估適合的治療方向。' },
  { title: '術前規劃', text: '依作息與身體狀況安排術前準備與檢查。' },
  { title: '手術與處置', text: '選擇最適合的方式，過程重視安全與止痛控制。' },
  { title: '術後照護', text: '提供清楚的飲食與清潔建議，讓恢復過程更穩定。' }
]

const recoveryNotes = [
  '前 3-7 天以傷口舒適、排便順暢為重點',
  '多補充水分與纖維，避免排便用力',
  '避免久坐與提重物，降低腫脹',
  '若出現持續性大量出血、發燒或劇痛，請立即回診'
]

const surgeryOptions = [
  {
    title: '微創處理',
    text: '適合需要快速恢復或疼痛敏感的族群，但仍需評估痔瘡型態與嚴重度。'
  },
  {
    title: '傳統切除',
    text: '對嚴重脫垂或混合痔仍是穩定有效的處置方式，重點是安全與效果。'
  },
  {
    title: '複合式手術',
    text: '必要時合併不同方式，目標是一次處理到位並降低再發機率。'
  }
]

const preventionHabits = [
  '避免久坐，工作中固定起身（長期久坐是常見誘因）',
  '飲食以高纖＋足量水分為基礎（減少硬便）',
  '排便不要久忍，也不要用力過度（避免血管壓力）',
  '避免辛辣與過量酒精刺激（降低黏膜刺激）'
]

const myths = [
  {
    title: '只要不痛就不用管',
    text: '許多內痔不會痛，但出血與脫垂可能慢慢惡化。'
  },
  {
    title: '開刀一定很痛',
    text: '疼痛程度與處置方式、照護、體質都有關，並非一概而論。'
  },
  {
    title: '手術一定會復發',
    text: '手術後的生活習慣才是關鍵，復發不是必然。'
  }
]

const clinicalFlow = [
  {
    step: '第一步：評估與分流',
    text: '先判斷是內痔、外痔或混合痔，再確認是否需要急性處置或安排後續治療。'
  },
  {
    step: '第二步：選擇治療路徑',
    text: '說明保守、微創或手術的利弊，讓你知道決策理由與風險。'
  },
  {
    step: '第三步：術前準備',
    text: '包含檢查、用藥安排與作息調整，確保治療安全。'
  },
  {
    step: '第四步：術後追蹤',
    text: '追蹤疼痛、排便與生活影響，確保恢復品質穩定。'
  }
]

const eeatHighlights = [
  {
    title: '專科背景',
    text: '大腸直腸外科專科背景，並長期處理痔瘡與肛門疾病。'
  },
  {
    title: '臨床判斷經驗',
    text: '評估重視「症狀對生活的影響」，不只看分級數字。'
  },
  {
    title: '透明溝通',
    text: '能保守就保守，但該手術會說清楚，讓你知道原因與期待。'
  },
  {
    title: '術後照護完整',
    text: '提供可執行的照護方式，不只叫你「回去休息」。'
  }
]

const funnelSteps = [
  {
    title: '先自我判斷',
    text: '用急性痔瘡自我檢查與症狀清單，先確認嚴重程度。'
  },
  {
    title: '取得初步建議',
    text: 'LINE 先問，協助判斷該不該直接門診或急性處理。'
  },
  {
    title: '門診評估',
    text: '到診所由醫師評估，確定治療路徑。'
  },
  {
    title: '治療與追蹤',
    text: '保守、微創或手術都能做到位，術後追蹤才是關鍵。'
  }
]

const hemorrhoidFaqs = [
  {
    question: '痔瘡出血一定是痔瘡嗎？',
    answer: '不一定。痔瘡常見出血是鮮紅色且多在排便後，但仍需排除其他疾病，特別是長期反覆或合併腹痛、體重下降時。'
  },
  {
    question: '一定要開刀才能好嗎？',
    answer: '多數患者可先以保守治療與生活調整改善，只有在反覆出血、嚴重脫垂或急性血栓時才需要進一步手術評估。'
  },
  {
    question: '急性血栓痔瘡需要立刻處理嗎？',
    answer: '若出現劇痛、腫塊變硬或紫黑，建議儘快就醫評估，越早處理越能減少不適。'
  },
  {
    question: '手術後一定會復發嗎？',
    answer: '不是必然。復發風險與生活型態、排便習慣有關，術後照護與習慣調整是關鍵。'
  },
  {
    question: '痔瘡跟便祕有關嗎？',
    answer: '關係密切。長期便祕與排便用力會增加肛門血管壓力，是常見誘因之一。'
  },
  {
    question: '術後多久能恢復正常作息？',
    answer: '恢復時間因手術方式與個人狀況而異，醫師會依症狀與工作型態給出更合適的建議。'
  }
]

const quickNav = [
  { label: '情境與需求', href: '#scenarios' },
  { label: '痔瘡類型', href: '#types' },
  { label: '成因與症狀', href: '#causes' },
  { label: '急性警訊', href: '#acute-signs' },
  { label: '分級與判斷', href: '#grading' },
  { label: '保守處置', href: '#conservative' },
  { label: '用藥知識', href: '#medication' },
  { label: '手術評估', href: '#surgery-eval' },
  { label: '手術流程', href: '#surgery-process' },
  { label: 'FAQ', href: '#faq' }
]

const medicationGuidance = [
  {
    title: '口服藥（止痛與消炎）',
    description:
      '常見為止痛或消炎藥物，用於控制急性疼痛與腫脹。需依症狀程度與既有疾病調整。'
  },
  {
    title: '口服軟便劑',
    description:
      '目的在降低排便用力與避免惡化。適合便祕或排便用力族群，需搭配水分與纖維。'
  },
  {
    title: '外用藥膏（止痛或消腫）',
    description:
      '外用藥可緩解局部疼痛、搔癢或腫脹，但僅是症狀處理，需搭配生活調整。'
  },
  {
    title: '塞劑／局部用藥',
    description:
      '針對內痔或發炎黏膜使用，改善局部不適。使用方式與天數需依醫囑。'
  }
]

const medicationNotes = [
  '短期使用為主，避免長期自行使用含類固醇藥膏',
  '有慢性病、懷孕或正在服用其他藥物者，需先評估交互作用',
  '若症狀持續或反覆，應回診評估是否需要更進一步治療',
  '用藥同時需配合生活型態調整，效果才會穩定'
]

export default function HemorrhoidSurgeryPage() {
  const breadcrumbItems = [
    { '@type': 'ListItem' as const, position: 1, name: '首頁', item: SITE.url },
    { '@type': 'ListItem' as const, position: 2, name: '痔瘡手術', item: `${SITE.url}/hemorrhoid-surgery` }
  ]

  const faqStructuredData = hemorrhoidFaqs.map((faq) => ({
    '@type': 'Question' as const,
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer' as const,
      name: faq.question,
      text: faq.answer
    }
  }))

  return (
    <main className="bg-white">
      <JsonLd
        type="BreadcrumbList"
        data={{
          '@type': 'BreadcrumbList',
          name: '痔瘡手術',
          itemListElement: breadcrumbItems
        }}
      />
      <JsonLd
        type="FAQPage"
        data={{
          '@type': 'FAQPage',
          name: '痔瘡手術與就醫情境 FAQ',
          mainEntity: faqStructuredData
        }}
      />
      <Section className="overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-neutral-50/80" padding="comfortable">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
              痔瘡這件事，如何判斷與安排處理
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-700 md:text-xl">
              阿福醫師徐彥勳的臨床觀點整理。如果正在流血、腫痛或反覆發作，建議先別硬撐。
              本頁整理常見情境、判斷方向與就醫安排，協助理解下一步該怎麼做。
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <LineButton text="LINE 直接諮詢" analyticsData={{ text: 'hemorrhoid_surgery_cta', location: 'hero', destination: 'line' }} />
              <a
                href="#acute-hemorrhoid"
                className="rounded-xl border border-neutral-200 bg-white px-6 py-3 text-base font-medium text-neutral-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                先看急性痔瘡自我檢查
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {quickNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-medium text-neutral-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="scenarios" className="bg-white">
        <Container>
          <div className="mx-auto max-w-5xl rounded-3xl bg-white/85 p-8 shadow-lg ring-1 ring-white/70 backdrop-blur">
            <h2 className="text-2xl font-semibold text-neutral-900">你可能正在經歷的情境</h2>
            <p className="mt-3 text-base leading-7 text-neutral-600">
              門診最常聽到的幾種說法。看看有沒有一個符合現況，先確認「是否需要就醫」。
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {patientScenarios.map((item) => (
                <div key={item.title} className="rounded-2xl bg-neutral-50/70 p-4">
                  <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2">
            {patientNeeds.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white/85 p-8 shadow-lg ring-1 ring-white/70 backdrop-blur">
                <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-neutral-100/80 bg-white/80 p-5 text-sm text-neutral-600">
            這些顧慮都很常見。重點是先把「症狀嚴重度」與「生活影響」釐清，才能選對處置方向。
          </div>
        </Container>
      </Section>

      <Section id="types" className="bg-gradient-to-b from-white to-neutral-50/80">
        <Container>
          <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
            {hemorrhoidTypes.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white/85 p-6 shadow-md ring-1 ring-white/70 backdrop-blur">
                <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="causes" className="bg-white">
        <Container>
          <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-white/85 p-8 shadow-lg ring-1 ring-white/70 backdrop-blur">
              <h2 className="text-2xl font-semibold text-neutral-900">常見成因（門診常見）</h2>
            <p className="mt-3 text-base leading-7 text-neutral-600">
              如果你有久坐、便祕或排便用力的習慣，症狀反覆的機率會更高。
            </p>
              <ul className="mt-5 space-y-3 text-base text-neutral-700">
                {commonCauses.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-white/85 p-8 shadow-lg ring-1 ring-white/70 backdrop-blur">
              <h2 className="text-2xl font-semibold text-neutral-900">你可能會出現的症狀</h2>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                如果出現「出血＋脫垂」或「疼痛＋腫塊」，通常需要更積極的處置評估。
              </p>
              <ul className="mt-5 space-y-3 text-base text-neutral-700">
                {commonSymptoms.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="acute-signs" className="bg-white">
        <Container>
          <div className="mx-auto max-w-5xl rounded-3xl bg-white/90 p-8 shadow-xl ring-1 ring-white/70 backdrop-blur">
            <h2 className="text-2xl font-semibold text-neutral-900">急性痔瘡時，什麼情況要快點處理</h2>
            <p className="mt-3 text-base leading-7 text-neutral-600">
              急性痔瘡的關鍵在「時間」。以下狀況建議儘快就醫評估。
            </p>
            <ul className="mt-5 space-y-3 text-base text-neutral-700">
              {acuteCareSignals.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section id="grading" className="bg-gradient-to-b from-neutral-50/80 to-white">
        <Container>
          <div className="mx-auto max-w-5xl rounded-3xl bg-white/90 p-8 shadow-xl ring-1 ring-white/70 backdrop-blur">
            <h2 className="text-2xl font-semibold text-neutral-900">痔瘡分級（簡單版本）</h2>
            <p className="mt-3 text-base leading-7 text-neutral-600">
              分級是參考，不是唯一標準。重視的是困擾程度與生活影響。
            </p>
            <p className="mt-3 text-base leading-7 text-neutral-600">
              如果已經影響工作、睡眠或排便節奏，通常不建議繼續觀察。
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {gradingNotes.map((item) => (
                <div key={item} className="rounded-2xl bg-neutral-50/70 p-4 text-sm text-neutral-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="conservative" className="bg-white">
        <Container>
          <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-white/85 p-8 shadow-lg ring-1 ring-white/70 backdrop-blur">
              <h2 className="text-2xl font-semibold text-neutral-900">保守與生活調整</h2>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                不是每個人都需要手術，但保守治療一定要做到位。
              </p>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                若已嘗試一段時間仍反覆出血或脫垂，建議進一步門診評估。
              </p>
              <ul className="mt-5 space-y-3 text-base text-neutral-700">
                {conservativeCare.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-white/85 p-8 shadow-lg ring-1 ring-white/70 backdrop-blur">
              <h2 className="text-2xl font-semibold text-neutral-900">手術方式的選擇方向</h2>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                不是「一定要開刀」，而是看你的症狀對生活影響與復發頻率。
              </p>
              <div className="mt-5 space-y-4">
                {surgeryOptions.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-neutral-50/70 p-4">
                    <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="medication" className="bg-gradient-to-b from-white to-neutral-50/80">
        <Container>
          <div className="mx-auto max-w-5xl rounded-3xl bg-white/90 p-8 shadow-xl ring-1 ring-white/70 backdrop-blur">
            <h2 className="text-2xl font-semibold text-neutral-900">痔瘡用藥的專業知識</h2>
            <p className="mt-3 text-base leading-7 text-neutral-600">
              用藥可協助緩解疼痛與腫脹，但無法取代整體評估。以下為常見用藥類型與重點提醒。
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {medicationGuidance.map((item) => (
                <div key={item.title} className="rounded-2xl bg-neutral-50/70 p-5">
                  <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-neutral-100/80 bg-white/80 p-5">
              <h3 className="text-base font-semibold text-neutral-900">用藥提醒</h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                {medicationNotes.map((note) => (
                  <li key={note} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-b from-white to-neutral-50/80">
        <Container>
          <div className="mx-auto max-w-5xl rounded-3xl bg-white/90 p-8 shadow-xl ring-1 ring-white/70 backdrop-blur">
            <h2 className="text-2xl font-semibold text-neutral-900">評估與安排流程</h2>
            <p className="mt-3 text-base leading-7 text-neutral-600">
              目標是讓你知道「為什麼做這個決定」，而不是只聽到結論。
            </p>
            <div className="mt-6 space-y-4">
              {clinicalFlow.map((flow, index) => (
                <div key={flow.step} className="flex items-start gap-4 rounded-2xl bg-neutral-50/70 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900">{flow.step}</h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-600">{flow.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="surgery-eval" className="bg-white">
        <Container>
          <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-white/85 p-8 shadow-lg ring-1 ring-white/70 backdrop-blur">
              <h2 className="text-2xl font-semibold text-neutral-900">哪些情況會建議手術</h2>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                不會用「一定要開刀」嚇你，但也不會叫你一直忍。這些狀況會認真評估手術：
              </p>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                若已影響工作、睡眠或需要頻繁回診處理，通常會建議更積極的治療方案。
              </p>
              <ul className="mt-5 space-y-3 text-base text-neutral-700">
                {surgicalIndications.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-white/85 p-8 shadow-lg ring-1 ring-white/70 backdrop-blur">
              <h2 className="text-2xl font-semibold text-neutral-900">治療原則</h2>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                目標是安全、可恢復、且能改善生活品質。
              </p>
              <div className="mt-6 space-y-4">
                {treatmentPrinciples.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-neutral-50/70 p-4">
                    <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="funnel" className="bg-gradient-to-b from-white to-neutral-50/80">
        <Container>
          <div className="mx-auto max-w-5xl rounded-3xl bg-white/90 p-8 shadow-xl ring-1 ring-white/70 backdrop-blur">
            <h2 className="text-2xl font-semibold text-neutral-900">就醫流程漏斗（建議路徑）</h2>
            <p className="mt-3 text-base leading-7 text-neutral-600">
              依症狀嚴重度與急迫性分流，讓每一步都有明確方向。
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {funnelSteps.map((step, index) => (
                <div key={step.title} className="rounded-2xl bg-neutral-50/70 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <h3 className="text-base font-semibold text-neutral-900">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{step.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <LineButton text="先用 LINE 說明狀況" analyticsData={{ text: 'hemorrhoid_surgery_cta_mid', location: 'funnel', destination: 'line' }} />
              <a
                href="#acute-hemorrhoid"
                className="rounded-xl border border-neutral-200 bg-white px-6 py-3 text-base font-medium text-neutral-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                回到急性檢查
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-gradient-to-b from-white to-neutral-50/80">
        <Container>
          <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-white/85 p-8 shadow-lg ring-1 ring-white/70 backdrop-blur">
              <h2 className="text-2xl font-semibold text-neutral-900">避免復發的重點</h2>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                這是降低再發與減少回診的關鍵。
              </p>
              <ul className="mt-5 space-y-3 text-base text-neutral-700">
                {preventionHabits.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-white/85 p-8 shadow-lg ring-1 ring-white/70 backdrop-blur">
              <h2 className="text-2xl font-semibold text-neutral-900">常見迷思</h2>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                釐清迷思有助於做出正確決策，避免拖延或過度焦慮。
              </p>
              <div className="mt-5 space-y-4">
                {myths.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-neutral-50/70 p-4">
                    <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-5xl rounded-3xl bg-white/85 p-8 shadow-lg ring-1 ring-white/70 backdrop-blur">
            <h2 className="text-2xl font-semibold text-neutral-900">這個頁面為什麼值得你信任</h2>
            <p className="mt-3 text-base leading-7 text-neutral-600">
              目的不是讓你害怕，而是提供清楚的判斷依據與可行做法。
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {eeatHighlights.map((item) => (
                <div key={item.title} className="rounded-2xl bg-neutral-50/70 p-4">
                  <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="acute-hemorrhoid" className="bg-gradient-to-b from-neutral-50/80 to-white">
        <Container>
          <div className="mx-auto max-w-4xl rounded-3xl bg-white/90 p-8 shadow-xl ring-1 ring-white/70 backdrop-blur">
            <h2 className="text-2xl font-semibold text-neutral-900">急性痔瘡專區：先自我檢查</h2>
            <p className="mt-3 text-base leading-7 text-neutral-700">
              急性痔瘡常見於突然腫痛，很多人會被痛到坐立難安。以下是門診常用的快速判斷點。
            </p>
            <p className="mt-3 text-base leading-7 text-neutral-700">
              若符合多項情況，通常不建議僅靠止痛藥或外用藥自行處理。
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {selfCheckItems.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-neutral-50/70 p-4 text-sm text-neutral-700">
                  <span className="mt-1 h-3 w-3 rounded-full border border-brand-500 bg-white" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-neutral-500">
              若痛感快速加劇、腫塊變硬或出血量明顯增加，請直接就醫評估，避免延誤處理時機。
            </p>
          </div>
        </Container>
      </Section>

      <Section id="surgery-options" className="bg-white">
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold text-neutral-900">手術方式與選擇原則</h2>
            <p className="mt-3 text-base leading-7 text-neutral-600">
              會依症狀、組織狀態與恢復需求，選擇較合適的處理方式。重點不是名詞，而是能否舒服、安全地好起來。
            </p>
            <p className="mt-3 text-base leading-7 text-neutral-600">
              若主要困擾是反覆脫垂或出血，治療目標會放在「穩定與避免復發」。
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {['微創處理', '精準止痛', '術後照護'].map((title) => (
                <div key={title} className="rounded-2xl bg-white/85 p-6 shadow-md ring-1 ring-white/70 backdrop-blur">
                  <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    疼痛控制與恢復品質放在第一位，選擇合適的方式，不勉強、不硬做。
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="surgery-process" className="bg-gradient-to-b from-white to-neutral-50/80">
        <Container>
          <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-white/85 p-8 shadow-lg ring-1 ring-white/70 backdrop-blur">
              <h2 className="text-2xl font-semibold text-neutral-900">手術流程安排</h2>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                清楚的流程能降低焦慮，也能讓你知道每一步的目的。
              </p>
              <div className="mt-5 space-y-4">
                {surgerySteps.map((step, index) => (
                  <div key={step.title} className="flex items-start gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-neutral-900">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-neutral-600">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white/85 p-8 shadow-lg ring-1 ring-white/70 backdrop-blur">
              <h2 className="text-2xl font-semibold text-neutral-900">術後照護重點</h2>
              <p className="mt-3 text-base leading-7 text-neutral-600">
                照護做得好，復原會快，疼痛也會更可控。
              </p>
              <ul className="mt-5 space-y-3 text-base text-neutral-700">
                {recoveryNotes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="faq" className="bg-white">
        <Container>
          <div className="mx-auto max-w-5xl rounded-3xl bg-white/85 p-8 shadow-lg ring-1 ring-white/70 backdrop-blur">
            <h2 className="text-2xl font-semibold text-neutral-900">常見問題 FAQ</h2>
            <p className="mt-3 text-base leading-7 text-neutral-600">
              以門診常見問題整理，協助理解判斷與就醫方向。
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              若問題與症狀影響日常，建議直接諮詢以獲得適合的處置方式。
            </p>
            <div className="mt-6 space-y-3">
              {hemorrhoidFaqs.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl bg-neutral-50/70 shadow-sm ring-1 ring-white/70 transition hover:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 [&::-webkit-details-marker]:hidden">
                    <span className="text-base font-semibold text-neutral-900">{item.question}</span>
                    <span className="mt-1 text-xs text-neutral-400 transition group-open:rotate-180">⌄</span>
                  </summary>
                  <div className="border-t border-neutral-100/80 px-6 pb-6 pt-4">
                    <p className="text-sm leading-6 text-neutral-600">{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-semibold text-neutral-900">最後想說的話</h2>
            <p className="mt-4 text-base leading-7 text-neutral-700">
              痔瘡這件事很難啟齒，但你不需要一個人撐著。只要願意開口，會以實際可行的方式一起找到解法。
            </p>
            <div className="mt-6 flex justify-center">
              <LineButton text="諮詢阿福醫師" analyticsData={{ text: 'hemorrhoid_surgery_cta_end', location: 'end', destination: 'line' }} />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
