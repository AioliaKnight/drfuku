// 網站基本信息
export const SITE = {
  name: '痔瘡醫生 徐彥勳大腸直腸外科',
  shortName: '痔瘡醫生',
  description: '專業痔瘡診療與保健資訊，提供完整的痔瘡治療建議和預防方法。由徐彥勳醫師主持的專業醫療資訊平台，專精於痔瘡微創手術、肛門疾病治療。台北、新北地區推薦的痔瘡專科醫師。',
  url: 'https://hsucliniccare.com',
  locale: 'zh_TW',
  themeColor: '#0ea5e9'
} as const

// 醫師信息
export const DOCTOR = {
  name: '徐彥勳',
  givenName: '彥勳',
  familyName: '徐',
  title: '大腸直腸外科醫師',
  alternateName: '徐彥勳醫師',
  description: '專精於痔瘡微創手術、大腸直腸疾病診療的專業醫師。擁有豐富的臨床經驗，致力於提供病患安心舒適的診療體驗。',
  image: 'https://hsucliniccare.com/doctor-photo.jpg',
  url: 'https://hsucliniccare.com/about'
} as const

// 診所信息
export const CLINIC = {
  name: '徐彥勳大腸直腸外科',
  alternateName: ['痔瘡醫生', '徐彥勳醫師', '徐醫師'],
  logo: 'https://hsucliniccare.com/logo.png',
  telephone: '+886-2-2712-0589',
  address: {
    street: '南京東路三段219號5樓',
    district: '中山區',
    city: '台北市',
    postalCode: '104',
    country: 'TW'
  },
  areaServed: ['台北市', '新北市'],
  services: [
    {
      name: '痔瘡微創手術',
      description: '採用先進的微創技術，降低手術疼痛，加速恢復。'
    },
    {
      name: '大腸鏡檢查',
      description: '使用高解析度內視鏡，進行精確的腸道檢查。'
    }
  ]
} as const

// 疾病信息
export const DISEASE = {
  name: '痔瘡',
  alternateName: ['內痔', '外痔', '混合痔'],
  description: '痔瘡是發生在肛門部位的血管叢體異常腫脹，可能造成出血、疼痛等症狀。',
  treatments: [
    {
      name: '微創手術治療',
      description: '透過先進的微創技術，降低手術疼痛，加速恢復。'
    },
    {
      name: '保守治療',
      description: '包含藥物治療、生活習慣調整等非手術方式。'
    }
  ]
} as const

// 環境變量
export const ENV = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
  environment: process.env.NODE_ENV || 'development',
  version: process.env.NEXT_PUBLIC_VERSION || '1.0.0',
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  fbDomainVerification: process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION || '',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
} as const

// 關鍵字
export const KEYWORDS = {
  // 主要關鍵字
  primary: [
    // 核心關鍵字
    '痔瘡',
    '痔瘡醫生',
    '痔瘡診所',
    '痔瘡治療',
    '痔瘡手術',
    '微創痔瘡手術',

    // 醫師相關
    '徐彥勳醫師',
    '痔瘡 徐彥勳',
    '徐彥勳大腸直腸外科',
    '大腸直腸外科醫師',

    // 地理位置
    '台北痔瘡',
    '新北痔瘡',
    '台北痔瘡推薦',
    '新北痔瘡推薦',
    '台北大腸直腸外科',
    '中山區痔瘡',
    '南京東路診所'
  ],

  // 症狀相關
  symptoms: [
    '痔瘡出血',
    '痔瘡疼痛',
    '痔瘡腫脹',
    '肛門出血',
    '便血',
    '肛門疼痛',
    '肛門腫脹',
    '內痔',
    '外痔',
    '混合痔',
    '痔瘡症狀',
    '嚴重痔瘡'
  ],

  // 治療方式
  treatments: [
    '痔瘡手術方式',
    '微創痔瘡',
    '無痛痔瘡手術',
    '痔瘡雷射手術',
    '痔瘡結紮手術',
    '痔瘡藥物治療',
    '痔瘡術後照護',
    '痔瘡手術恢復',
    '痔瘡手術推薦',
    '痔瘡手術費用',
    '痔瘡治療方法',
    '痔瘡治療推薦'
  ],

  // 預防保健
  prevention: [
    '痔瘡預防',
    '痔瘡保健',
    '痔瘡飲食',
    '如何預防痔瘡',
    '痔瘡日常照護',
    '痔瘡生活習慣',
    '痔瘡飲食建議',
    '痔瘡運動建議'
  ],

  // 診所特色
  clinic: [
    '痔瘡專科',
    '痔瘡權威',
    '痔瘡醫療中心',
    '痔瘡門診',
    '大腸直腸外科診所',
    '痔瘡評價',
    '痔瘡醫生推薦',
    '痔瘡手術評價',
    '痔瘡醫療設備',
    '大腸鏡檢查'
  ],

  // 病患關注
  concerns: [
    '痔瘡手術安全',
    '痔瘡手術風險',
    '痔瘡治療效果',
    '痔瘡手術時間',
    '痔瘡費用',
    '痔瘡門診時間',
    '痔瘡就醫經驗',
    '痔瘡術後恢復',
    '痔瘡醫療品質',
    '痔瘡治療經驗'
  ]
} as const

// 資源路徑
export const ASSETS = {
  logo: '/logo.png',
  ogImage: '/og-image.jpg',
  doctorPhoto: '/doctor-photo.jpg',
  favicon: {
    ico: '/favicon.ico',
    png16: '/favicon-16x16.png',
    png32: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png'
  }
} as const
