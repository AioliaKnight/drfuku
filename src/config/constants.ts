// 網站基本信息
export const SITE = {
  name: '阿福醫師-大腸直腸外科徐彥勳',
  shortName: '阿福醫師',
  description: '專精 LHP 雷射痔瘡微創手術與 LigaSure 組織凝集儀手術。阿福醫師（徐彥勳）提供台北、台中地區專業的痔瘡治療、大腸直腸疾病診療與術後全程追蹤，致力於極致止痛與快速恢復。',
  url: 'https://drfuku.com',
  locale: 'zh_TW',
  themeColor: '#0ea5e9'
} as const

// 醫師信息
export const DOCTOR = {
  name: '徐彥勳',
  alternateName: '阿福醫師',
  title: '大腸直腸外科主任 / 主治醫師',
  specialty: '大腸直腸外科、微創痔瘡手術',
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
  telephone: '04-2310-8588',
  address: '407台中市西屯區大隆路185號',
  lineId: '@772pable',
  lineUrl: 'https://line.me/ti/p/~@772pable',
} as const

// 疾病與症狀關鍵字
export const DISEASE = {
  name: '痔瘡',
  symptoms: ['便血', '肛門腫痛', '脫垂', '搔癢'],
} as const

// 環境變量
export const ENV = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
  gaId: process.env.NEXT_PUBLIC_GA_ID || '',
} as const

// 關鍵字
export const KEYWORDS = {
  primary: ['痔瘡', '大腸直腸外科', '微創手術', '徐彥勳', '阿福醫師'],
  symptoms: [
    '痔瘡出血',
    '肛門痛',
    '大便有血',
    '痔瘡腫大',
    '肛門肉球',
    '肛門癢',
    '急性痔瘡'
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
    '痔瘡藥膏',
    '溫水坐浴'
  ],

  // 地區
  locations: ['台北', '台中', '南投', '草屯', '西屯', '大安', '中山', '內湖']
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
