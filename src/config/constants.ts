// 網站基本信息
export const SITE = {
  name: '阿福醫師-大腸直腸外科徐彥勳',
  shortName: '阿福醫師',
  description: '專精 LHP 雷射痔瘡微創手術與 LigaSure 組織凝集儀手術。阿福醫師（徐彥勳）提供台北、台中地區專業的痔瘡治療、大腸直腸疾病診療與術後全程追蹤，致力於低疼痛管理與快速恢復。',
  url: 'https://drfuku.com',
  locale: 'zh_TW',
  themeColor: '#0ea5e9'
} as const

// 醫師信息
export const DOCTOR = {
  name: '徐彥勳',
  givenName: '彥勳',
  familyName: '徐',
  alternateName: '阿福醫師',
  title: '大腸直腸外科主任 / 主治醫師',
  specialty: '大腸直腸外科、微創痔瘡手術',
  description: '大腸直腸外科專科醫師徐彥勳（阿福醫師）致力於推廣「低疼痛管理、微創復原」的診療理念。',
  image: 'https://drfuku.com/doctor-profile3.jpg',
  url: 'https://drfuku.com/about',
  sameAs: [
    'https://drfuku.com',
    'https://line.me/ti/p/~@772pable',
    'https://drbird.tw/doctor/yenhsunhsu'
  ],
} as const

// 診所信息
export const CLINIC = {
  name: '台中西屯顧家診所 / 顧芳瑜泌尿科診所',
  alternateName: ['台中西屯顧家診所', '顧芳瑜泌尿科診所'],
  logo: 'https://drfuku.com/logo.png',
  telephone: '04-2310-8588',
  address: {
    streetAddress: '大隆路185號',
    addressLocality: '西屯區',
    addressRegion: '台中市',
    postalCode: '407',
    addressCountry: 'TW'
  },
  lineId: '@772pable',
  lineUrl: 'https://line.me/ti/p/~@772pable',
  areaServed: ['台中市', '台北市', '南投縣'],
  services: [
    { name: '微創痔瘡手術', description: 'LHP雷射與LigaSure手術' },
    { name: '大腸鏡檢查', description: '專業無痛大腸鏡' }
  ]
} as const

// 疾病與症狀關鍵字
export const DISEASE = {
  name: '痔瘡',
  alternateName: ['內痔', '外痔', '混合痔'],
  description: '痔瘡是肛門部位常見的疾病，主要由於肛門粘膜下靜脈叢發生擴張及血液淤滯所致。',
  symptoms: ['便血', '肛門腫痛', '脫垂', '搔癢'],
  treatments: [
    { name: 'LHP雷射痔瘡手術', description: '微創低疼痛' },
    { name: 'LigaSure組織凝集儀', description: '快速恢復' }
  ]
} as const

// 環境變量
export const ENV = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  fbDomainVerification: process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION || '',
  environment: (process.env.NODE_ENV as any) || 'development',
  version: '1.0.0',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const

// 關鍵字
export const KEYWORDS = {
  primary: ['痔瘡', '大腸直腸外科', '微創手術', '徐彥勳', '阿福醫師', '痔瘡醫師推薦', '台北痔瘡', '台中痔瘡'],
  symptoms: [
    '痔瘡出血',
    '肛門痛',
    '大便有血',
    '痔瘡腫大',
    '肛門肉球',
    '肛門癢',
    '急性痔瘡',
    '血便原因',
    '肛門瘻管',
    '肛裂症狀'
  ],

  // 治療方式
  treatments: [
    'LHP雷射痔瘡',
    'LigaSure組織凝集儀',
    '雷射消融手術',
    '痔瘡手術方式',
    '微創痔瘡',
    '無痛痔瘡手術',
    '痔瘡雷射手術',
    '痔瘡結紮手術',
    '舒眠大腸鏡',
    '痔瘡藥膏',
    '溫水坐浴'
  ],

  // 地區
  locations: ['台北', '台中', '南投', '草屯', '西屯', '大安', '中山', '內湖', '板橋', '三重'],
  
  // 新增缺失欄位與高轉化長尾字
  prevention: ['預防痔瘡', '高纖飲食', '多喝水', '定時排便', '益生菌痔瘡'],
  clinic: ['台中痔瘡推薦', '台北痔瘡診所', '西屯大腸直腸外科', '大安區痔瘡醫師'],
  concerns: [
    '痔瘡會好嗎', 
    '痔瘡手術費用', 
    '痔瘡保險理賠', 
    '痔瘡恢復期', 
    'LHP雷射費用', 
    '痔瘡手術會痛嗎',
    '痔瘡看哪科'
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
