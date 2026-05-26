import {
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlineAcademicCap
} from 'react-icons/hi2'

export interface Service {
  icon: React.ReactElement
  title: string
  description: string
  features: string[]
  highlight?: boolean
}

export const services: Service[] = [
  {
    icon: <HiOutlineHeart className="h-8 w-8" />,
    title: '痔瘡微創手術 (LHP/LigaSure)',
    description: '專精 LHP 雷射痔瘡消融與組織凝集儀 (LigaSure) 微創技術，提供極低疼痛、出血量少且恢復快速的治療方案。',
    features: [
      '微創雷射技術 (LHP) 無需大面積切除',
      '組織凝集儀 LigaSure 減少熱損傷與疼痛',
      '術後不需長期住院，當日或隔日可返家',
      '量身打造最適合的手術方案'
    ],
    highlight: true
  },
  {
    icon: <HiOutlineShieldCheck className="h-8 w-8" />,
    title: '肛門裂隙與疼痛治療',
    description: '針對急性與慢性肛門裂隙，提供藥物、溫水坐浴及微創擴約肌處置，快速緩解疼痛。',
    features: [
      '精確判定急慢性成因',
      '無痛化門診處置建議',
      '專業術後傷口護理指導',
      '有效預防復發與便祕管理'
    ]
  },
  {
    icon: <HiOutlineSparkles className="h-8 w-8" />,
    title: '肛門廔管精準手術',
    description: '運用高階診斷與微創保留肌肉技術，在徹底清除廔管的同時，最大限度保護排便功能。',
    features: [
      '保留括約肌功能技術',
      '減少術後感染與併發症',
      '大幅降低復發風險',
      '精準定位廔管走徑'
    ]
  },
  {
    icon: <HiOutlineUserGroup className="h-8 w-8" />,
    title: '大腸癌篩檢與腸道健康',
    description: '提供無痛大腸鏡評估諮詢、息肉處置建議及腸道發炎性疾病的長期管理與健康追蹤。',
    features: [
      '大腸鏡檢查前中後專業諮詢',
      '息肉切除後定期追蹤策略',
      '腸躁症與功能性排便障礙診斷',
      '完整大腸直腸預防醫學規劃'
    ]
  },
  {
    icon: <HiOutlineClock className="h-8 w-8" />,
    title: '術前麻醉與風險評估',
    description: '由專科醫師親自詳細評估心肺功能與用藥史，確保手術過程的極致安全與病患安心感。',
    features: [
      '詳盡的既有疾病風險管理',
      '針對焦慮病患的精準鎮靜建議',
      '個人化止痛方案預先規劃',
      '術前準備與作息優化建議'
    ]
  },
  {
    icon: <HiOutlineAcademicCap className="h-8 w-8" />,
    title: '數位化術後恢復追蹤',
    description: '結合線上諮詢與專業衛教，確保病患在返家後的恢復過程中都能獲得即時的指導。',
    features: [
      '一對一 LINE 官方專人追蹤',
      '客製化飲食與排便衛教',
      '突發狀況快速評估分流',
      '詳盡的居家傷口照護 SOP'
    ]
  }
]
