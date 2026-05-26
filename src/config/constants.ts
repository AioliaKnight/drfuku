// 網站基本信息
export const SITE = {
  name: '阿福醫師-大腸直腸外科徐彥勳',
  shortName: '阿福醫師',
  description: '大腸直腸外科專科醫師徐彥勳（阿福醫師）主持，專精痔瘡微創手術、大腸直腸與肛門疾病診療。提供專業痔瘡治療建議與保健資訊，台北、台中地區推薦的大腸直腸外科醫師。',
  url: 'https://drfuku.com',
  locale: 'zh_TW',
  themeColor: '#0ea5e9'
} as const

// 醫師信息
export const DOCTOR = {
  name: '徐彥勳',
  givenName: '彥勳',
  familyName: '徐',
  title: '大腸直腸外科醫師',
  alternateName: '阿福醫師（徐彥勳醫師）',
  description: '大腸直腸外科專科醫師，專精痔瘡微創手術與大腸直腸疾病診療。擁有豐富臨床經驗，致力於提供病患安心舒適的診療體驗。',
  image: 'https://drfuku.com/doctor-profile3.jpg',
  url: 'https://drfuku.com/about',
  sameAs: [
    'https://drfuku.com',
    'https://line.me/ti/p/~@772pable',
  ],
} as const

// 診所信息
export const CLINIC = {
  name: '大腸直腸外科徐彥勳',
  alternateName: ['阿福醫師', '徐彥勳醫師', '徐醫師', '痔瘡醫生'],
  logo: 'https://drfuku.com/logo.png',
  telephone: '+886-2-2712-0589',
  address: {
    streetAddress: '中山北路二段',
    addressLocality: '台北市',
    addressRegion: '中山區',
    postalCode: '104',
    addressCountry: 'TW',
  },
  areaServed: ['台北市', '新北市', '台中市', '彰化縣', '南投縣'],
  lineUrl: 'https://line.me/ti/p/~@772pable',
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

// 環境變數驗證（僅在 client-side runtime 警告，避免 build 時大量輸出）
function getEnvVar(key: string, fallback: string = ''): string {
  const value = process.env[key]
  if (!value && !fallback && typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    console.warn(`[ENV] 缺少環境變數: ${key}`)
  }
  return value || fallback
}

// 環境變量
export const ENV = {
  gtmId: getEnvVar('NEXT_PUBLIC_GTM_ID'),
  environment: getEnvVar('NODE_ENV', 'development'),
  version: getEnvVar('NEXT_PUBLIC_VERSION', '1.0.0'),
  googleSiteVerification: getEnvVar('NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION'),
  fbDomainVerification: getEnvVar('NEXT_PUBLIC_FB_DOMAIN_VERIFICATION'),
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
    '阿福醫師',
    '徐彥勳醫師',
    '大腸直腸外科徐彥勳',
    '大腸直腸外科醫師',

    // 地理位置
    '台北痔瘡',
    '新北痔瘡',
    '台北痔瘡推薦',
    '新北痔瘡推薦',
    '台北大腸直腸外科',
    '中山區痔瘡',
    '痔瘡門診',
    '肛門科',
    '大腸直腸外科門診',
    '台北痔瘡診所',
    '台中痔瘡診所',
    '大腸直腸外科推薦',
    '肛門疾病門診',
    '直腸外科',
    '肛腸科'
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
    '嚴重痔瘡',
    '痔瘡出血原因',
    '痔瘡分級',
    '內痔外痔差別',
    '肛門腫塊',
    '肛門搔癢',
    '排便疼痛',
    '直腸出血',
    '肛門不適',
    '肛門脫垂',
    '血栓痔瘡',
    '急性痔瘡'
  ],

  // 治療方式
  treatments: [
    '痔瘡手術方式',
    '微創痔瘡',
    '無痛痔瘡手術',
    '痔瘡雷射手術',
    '痔瘡結紮手術',
    '痔瘡藥物治療',
    '痔瘡口服藥',
    '痔瘡藥膏',
    '痔瘡術後照護',
    '痔瘡手術恢復',
    '痔瘡手術推薦',
    '痔瘡手術費用',
    '痔瘡治療方法',
    '痔瘡治療推薦',
    '痔瘡開刀',
    '痔瘡手術恢復期',
    '痔瘡手術後護理',
    '痔瘡結紮',
    '橡皮圈結紮',
    '雷射痔瘡',
    '微創痔瘡手術費用'
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
    '痔瘡運動建議',
    '久坐痔瘡',
    '便祕痔瘡',
    '排便習慣調整',
    '痔瘡復發預防'
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
    '大腸鏡檢查',
    '痔瘡權威醫師',
    '痔瘡專科醫師',
    '大腸直腸外科專科',
    '肛門直腸科',
    '肛門疾病診療'
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
    '痔瘡治療經驗',
    '痔瘡健保',
    '痔瘡自費',
    '痔瘡要看哪一科',
    '痔瘡手術風險',
    '痔瘡手術疼痛',
    '痔瘡恢復時間',
    '痔瘡就醫流程',
    '痔瘡諮詢'
  ]
} as const

// 資源路徑
export const ASSETS = {
  logo: '/logo.png',
  ogImage: '/opengraph-image',
  twitterImage: '/twitter-image',
  doctorPhoto: '/doctor-profile3.jpg',
  favicon: {
    ico: '/favicon.ico',
    png16: '/favicon-16x16.png',
    png32: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png'
  }
} as const
