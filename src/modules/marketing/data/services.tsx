import {
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineMagnifyingGlassCircle,
  HiOutlineHandThumbUp
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
    title: '肛門裂隙 (肛裂) 治療',
    description: '針對急慢性肛裂導致的劇烈排便疼痛與出血，提供藥物調節、肉毒桿菌素注射或微創擴約肌放鬆術。',
    features: [
      '精確判定急慢性成因與癒合機率',
      '無痛化診間處置與專業止痛建議',
      '肉毒桿菌素注射減少括約肌痙攣',
      '有效預防復發與長期的便祕管理'
    ]
  },
  {
    icon: <HiOutlineSparkles className="h-8 w-8" />,
    title: '肛門廔管保留括約肌手術',
    description: '運用高階診斷與微創技術，在徹底清除廔管發炎組織的同時，最大限度保護排便控制功能。',
    features: [
      '保留括約肌功能技術 (LIFT/VAAFT)',
      '減少術後感染與長期併發症',
      '大幅降低復發風險與縮短換藥期',
      '精準定位廔管走徑與內口位置'
    ]
  },
  {
    icon: <HiOutlineMagnifyingGlassCircle className="h-8 w-8" />,
    title: '大腸鏡檢查與息肉處置',
    description: '提供無痛大腸鏡評估諮詢、息肉切除後追蹤建議，並針對腸道發炎性疾病提供長期健康管理。',
    features: [
      '低焦慮的大腸鏡前中後專業諮詢',
      '息肉切除後定期監測與病理判讀',
      '腸躁症 (IBS) 與功能性排便障礙診斷',
      '完整的大腸直腸癌預防醫學規劃'
    ]
  },
  {
    icon: <HiOutlineHandThumbUp className="h-8 w-8" />,
    title: '藏毛竇 (Pilonidal Cyst) 處置',
    description: '針對尾椎部位反覆發炎腫痛的藏毛竇，提供微創清創或皮瓣轉移手術，降低術後復發率。',
    features: [
      '精準移除感染源與毛髮組織',
      '個人化傷口癒合方案規劃',
      '術後換藥指導與預防復發衛教',
      '針對運動族群的特殊照護建議'
    ]
  },
  {
    icon: <HiOutlineAcademicCap className="h-8 w-8" />,
    title: '數位化術後恢復追蹤',
    description: '結合線上諮詢與專業衛教 SOP，確保病患在返家後的恢復過程中都能獲得即時且專業的醫學指導。',
    features: [
      '一對一 LINE 官方專人恢復追蹤',
      '客製化高纖飲食與排便習慣衛教',
      '突發狀況 (出血、腫脹) 快速評估',
      '詳盡的居家坐浴與傷口照護 SOP'
    ]
  }
]
