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
    title: '痔瘡微創治療',
    description: '採用最新微創技術，提供安全、有效、恢復快速的痔瘡治療方案',
    features: [
      '傷口小、疼痛少',
      '恢復期短、併發症低',
      '個人化治療計畫',
      '術後專業照護'
    ],
    highlight: true
  },
  {
    icon: <HiOutlineShieldCheck className="h-8 w-8" />,
    title: '肛門裂隙治療',
    description: '針對急性與慢性肛門裂隙，提供保守治療與手術治療的完整方案',
    features: [
      '詳細病情評估',
      '多元治療選擇',
      '疼痛管理專業',
      '預防復發指導'
    ]
  },
  {
    icon: <HiOutlineSparkles className="h-8 w-8" />,
    title: '肛門廔管治療',
    description: '運用精準的手術技術治療肛門廔管，有效降低復發率',
    features: [
      '精準診斷定位',
      '微創手術技術',
      '降低復發風險',
      '功能保護優先'
    ]
  },
  {
    icon: <HiOutlineUserGroup className="h-8 w-8" />,
    title: '大腸直腸疾病',
    description: '全方位的大腸直腸疾病診療，從預防到治療的完整醫療服務',
    features: [
      '完整健康檢查',
      '早期診斷篩檢',
      '個別化治療',
      '長期追蹤管理'
    ]
  },
  {
    icon: <HiOutlineClock className="h-8 w-8" />,
    title: '術前評估諮詢',
    description: '詳細的術前評估與諮詢，確保每位患者都能獲得最適合的治療方案',
    features: [
      '全面健康評估',
      '風險評估分析',
      '治療選項說明',
      '個人化建議'
    ]
  },
  {
    icon: <HiOutlineAcademicCap className="h-8 w-8" />,
    title: '術後照護追蹤',
    description: '專業的術後照護與長期追蹤，確保患者獲得最佳的治療效果',
    features: [
      '一對一照護指導',
      '定期追蹤檢查',
      '復原進度監控',
      '24小時諮詢服務'
    ]
  }
]

