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
    description: '專精 LHP 雷射痔瘡消融與組織凝集儀 (LigaSure) 微創技術，針對內外痔嚴重度量身打造低疼痛、恢復快速的治療計劃。',
    features: [
      '微創雷射技術 (LHP) 無需大面積切除，有效保留肛門功能',
      '組織凝集儀 LigaSure 精準封合血管，大幅降低術後腫脹與痛感',
      '日間手術 (Day Surgery) 流程，多數病患當日即可返家',
      '客製化止痛 SOP 結合預防性給藥，縮短術後恢復期'
    ],
    highlight: true
  },
  {
    icon: <HiOutlineShieldCheck className="h-8 w-8" />,
    title: '肛門裂隙與瘻管精準治療',
    description: '針對肛裂劇痛與複雜性瘻管，運用高階門診微創技術與括約肌保留手術，解決反覆感染與腫痛困擾。',
    features: [
      '保留括約肌功能技術 (LIFT/VAAFT) 降低失禁與復發風險',
      '精確判定急慢性成因，提供無痛化診間處置與專業衛教',
      '肉毒桿菌素注射輔助治療，有效緩解肛門括約肌痙攣',
      '針對瘻管內口精準定位，大幅提升手術成功率與癒合品質'
    ]
  },
  {
    icon: <HiOutlineMagnifyingGlassCircle className="h-8 w-8" />,
    title: '無痛舒眠大腸鏡檢查',
    description: '提供醫學中心等級的無痛大腸鏡篩檢，由專業麻醉團隊全程守護，在舒適睡眠中完成癌症預防與息肉處置。',
    features: [
      '專業舒眠麻醉團隊全程監測，確保檢查過程平穩安全',
      '高解析度窄頻顯像技術 (NBI)，不遺漏任何微小早期病灶',
      '息肉切除與檢查當日完成，免去二次麻醉與檢查的繁瑣',
      '個人化清腸衛教與術後報告詳解，落實預防醫學價值'
    ]
  },
  {
    icon: <HiOutlineAcademicCap className="h-8 w-8" />,
    title: '數位化術後恢復追蹤',
    description: '結合線上諮詢與專業衛教 SOP，確保病患在返家後的恢復過程中都能獲得即時且專業的醫學指導。',
    features: [
      '一對一 LINE 官方專人恢復追蹤，即時解答術後疑慮',
      '客製化高纖飲食與排便習慣衛教，預防痔瘡再次發生',
      '術後突發狀況 (如出血、腫脹) 遠端初步評估與分流',
      '詳盡的居家坐浴與傷口照護數位化指引，提高遵從度'
    ]
  },
  {
    icon: <HiOutlineHandThumbUp className="h-8 w-8" />,
    title: '藏毛竇 (Pilonidal Cyst) 處置',
    description: '針對薦椎部位反覆發炎的藏毛竇問題，提供微創切除與傷口皮瓣轉移手術，降低術後復發率。',
    features: [
      '精準移除感染竇道組織',
      '優化傷口縫合技術減少張力',
      '門診手術不需住院',
      '提供長期局部衛生指導'
    ]
  }
]
