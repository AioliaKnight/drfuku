import {
  HiOutlineHeart,
  HiOutlineShieldCheck,
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
    description: '專精 LHP 雷射痔瘡消融與組織凝集儀 (LigaSure) 微創技術，並提供「複合式手術」方案，針對內外痔嚴重度量身打造低疼痛、恢復快速的治療計劃。',
    features: [
      '微創雷射技術 (LHP) 無需大面積切除，保留肛門功能',
      '組織凝集儀 LigaSure 減少熱損傷，大幅降低術後痛感',
      '日間手術 (Day Surgery) 流程，多數病患當日即可返家',
      '客製化止痛 SOP，縮短 50% 以上的術後恢復期'
    ],
    highlight: true
  },
  {
    icon: <HiOutlineShieldCheck className="h-8 w-8" />,
    title: '肛門裂隙與瘻管精準治療',
    description: '針對肛裂劇痛與複雜性瘻管，運用高階門診微創技術與括約肌保留手術，解決反覆感染與腫痛困擾。',
    features: [
      '保留括約肌功能技術 (LIFT/VAAFT) 降低失禁風險',
      '精確判定急慢性成因，提供無痛化診間處置',
      '肉毒桿菌素注射輔助治療，緩解括約肌痙攣',
      '針對瘻管內口精準定位，大幅降低術後復發率'
    ]
  },
  {
    icon: <HiOutlineMagnifyingGlassCircle className="h-8 w-8" />,
    title: '無痛舒眠大腸鏡檢查',
    description: '提供醫學中心等級的無痛大腸鏡篩檢，由專業麻醉團隊全程守護，在舒適睡眠中完成癌症預防與息肉處置。',
    features: [
      '專業舒眠麻醉團隊，全程生理監測保障安全',
      '高解析度窄頻顯像技術 (NBI)，細微病灶不遺漏',
      '息肉切除當日完成，免去二次檢查的繁瑣',
      '個人化清腸衛教指引，提升檢查精準度與舒適感'
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
