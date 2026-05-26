/**
 * 網站內容單一來源（Single Source of Truth）
 * 醫師簡介、門診據點、專長等全站共用資料集中於此。
 */

export const DOCTOR_COPY = {
  displayName: '阿福醫師（徐彥勳）',
  headline: '認識阿福醫師（徐彥勳）',
  heroTitle: '阿福醫師',
  heroHighlight: '大腸直腸外科徐彥勳',
  heroSubtitle: '專精微創痔瘡與肛門疾病治療',
  yearsOfExperience: 10,
  bio: '身為大腸直腸外科專科醫師，我深知肛門疾患往往帶給病患極大的生理痛苦與心理負擔。因此，我始終堅持「止痛先行、溫暖診療」的理念。身為中西醫雙學士，我不僅精進於德國 LHP 雷射消融與 LigaSure 等先進微創技術，更重視從整體的體質與生活習慣出發，為每位患者量身打造兼具精準度與人文關懷的治療方案，陪您在安心與尊嚴中找回原本自在、輕盈的生活。',
  summary: '擁有完整大腸直腸外科專科訓練與豐富臨床經驗，專精於各類肛門疾病微創手術，提供台北、台中、草屯地區專業醫療服務。',
  footerBlurb: '大腸直腸外科專科醫師徐彥勳（阿福醫師），專精各類痔瘡微創手術與肛門疾患，致力於提供高品質、高隱私且專業的微創診療服務。',
}

export type DoctorProfileSectionIcon = 'current' | 'education' | 'experience' | 'specialties'

export interface DoctorProfileSection {
  id: string
  title: string
  icon: DoctorProfileSectionIcon
  items: string[]
}

export const DOCTOR_PROFILE_SECTIONS: DoctorProfileSection[] = [
  {
    id: 'current-roles',
    title: '現任職務',
    icon: 'current',
    items: [
      '台中西屯顧家診所 大腸直腸外科主任',
      '顧芳瑜泌尿科診所 (大安分院) 大腸直腸外科主治醫師',
      '禾馨醫療 (內湖民權婦幼) 大腸直腸外科主治醫師',
      '南投草屯佑民醫院 大腸直腸外科主治醫師',
      '秘境美學診所 特約痔瘡專科醫師',
      '賦真妍整形醫美診所 特約痔瘡專科醫師'
    ],
  },
  {
    id: 'credentials',
    title: '專業資歷',
    icon: 'experience',
    items: [
      '大腸直腸外科專科醫師 (直專醫字第324號)',
      '外科專科醫師 (外專醫字第006107號)',
      '草屯佑民醫院大腸直腸外科主治醫師',
      '彰化基督教醫院大腸直腸外科研究醫師',
      '彰化基督教醫院外科部住院醫師',
      '中華民國大腸直腸外科醫學會專科醫師',
      '台灣外科醫學會專科醫師',
      '中華民國醫師公會聯合會會員',
      '中華民國醫師高等考試及格'
    ],
  },
  {
    id: 'specialties',
    title: '主治項目',
    icon: 'specialties',
    items: [
      '微創痔瘡手術（雷射 LHP、組織凝集儀 LigaSure、冷凝刀等）',
      '微創肛門手術、肛門膿瘍、肛門瘻管',
      '肛門濕疹（尖端濕疣/菜花）治療',
      '肛周疾患（肛裂、肛門搔癢、皮膚疾患）',
      '發炎性腸道疾病、腸躁症、功能性便秘'
    ],
  },
  {
    id: 'education',
    title: '學歷背景',
    icon: 'education',
    items: ['中國醫藥大學 中西醫雙學士'],
  },
]

export type PracticeLocationRole = 'director' | 'attending' | 'specialist'

export const getPracticeRoleLabel = (role: PracticeLocationRole): string => {
  switch (role) {
    case 'director':
      return '主任醫師'
    case 'attending':
      return '主治醫師'
    case 'specialist':
      return '特約專科醫師'
    default:
      return '主治醫師'
  }
}

export type PracticeLocation = {
  id: string
  name: string
  address?: string
  telephone?: string
  mapUrl?: string
  websiteUrl?: string
  /** 服務範圍說明（選填，用於首頁／頁尾） */
  serviceAreaNote?: string
  role: PracticeLocationRole
  /** 服務地區（SEO / 結構化資料） */
  region: '台北市' | '台中市' | '南投縣'
}

export const PRACTICE_LOCATIONS: PracticeLocation[] = [
  {
    id: 'gujia-taichung',
    name: '台中西屯顧家泌尿科診所',
    address: '407台中市西屯區大隆路185號',
    telephone: '04-2310-8588',
    mapUrl: 'https://maps.app.goo.gl/cJ9YozSLjiapbtHFA',
    websiteUrl: 'https://drbird.tw/doctor/yenhsunhsu',
    serviceAreaNote:
      '服務大台中、彰化、南投地區，提供隱密舒適的大腸直腸外科就診空間。',
    role: 'director',
    region: '台中市',
  },
  {
    id: 'gu-urology-daan',
    name: '顧芳瑜泌尿科診所 大安分院',
    address: '106臺北市大安區信義路三段192-1號4樓',
    mapUrl: 'https://maps.app.goo.gl/1FsNbydSNMxLC9ci8',
    websiteUrl: 'https://drbird.tw/doctor/yenhsunhsu',
    role: 'attending',
    region: '台北市',
  },
  {
    id: 'hesin-neihu',
    name: '禾馨內湖民權婦幼診所',
    address: '台北市內湖區民權東路六段42號',
    mapUrl: 'https://maps.app.goo.gl/KfcLKTevaovLt8r97',
    role: 'attending',
    region: '台北市',
  },
  {
    id: 'youmin-caotun',
    name: '草屯佑民醫院',
    address: '542南投縣草屯鎮和平街6號',
    mapUrl: 'https://maps.app.goo.gl/7g3GvQpYhP7q9a7y9',
    role: 'attending',
    region: '南投縣',
  },
  {
    id: 'secret-clinic',
    name: '秘境美學診所',
    address: '104台北市中山區南京東路二段157號9樓',
    mapUrl: 'https://maps.app.goo.gl/yJ6W6m8Z9m8Z9m8Z9',
    role: 'specialist',
    region: '台北市',
  },
  {
    id: 'fujenyen',
    name: '賦真妍整形醫美診所',
    address: '104台北市中山區八德路二段319號',
    mapUrl: 'https://maps.app.goo.gl/fujenyen-map',
    role: 'specialist',
    region: '台北市',
  },
]

/** 首頁顯示的診所據點 */
export const HERO_PRACTICE_LOCATIONS = PRACTICE_LOCATIONS.slice(0, 4)

/** 醫師現任職務（簡化版） */
export const DOCTOR_CURRENT_POSITIONS = [
  '台中西屯顧家診所 大腸直腸外科主任',
  '顧芳瑜泌尿科診所 大安分院 主治醫師',
  '禾馨醫療 內湖民權婦幼 主治醫師',
  '南投草屯佑民醫院 主治醫師'
]

export const SERVICE_AREAS = ['台北市', '新北市', '台中市', '彰化縣', '南投縣'] as const

/** 格式化電話連結 */
export const toTelHref = (tel: string) => {
  const digits = tel.replace(/\D/g, '')
  if (digits.startsWith('0')) {
    return `tel:+886${digits.slice(1)}`
  }
  return `tel:+${digits}`
}

/** 專科資格（JSON-LD hasCredential） */
export const DOCTOR_CREDENTIALS = [
  '大腸直腸外科專科醫師 (直專醫字第324號)',
  '外科專科醫師 (外專醫字第006107號)',
  '草屯佑民醫院大腸直腸外科主治醫師',
  '彰化基督教醫院大腸直腸外科研究醫師',
  '彰化基督教醫院外科部住院醫師',
  '中華民國大腸直腸外科醫學會專科醫師',
  '台灣外科醫學會專科醫師',
  '中華民國醫師公會聯合會會員',
  '中華民國醫師高等考試及格',
  '中國醫藥大學中西醫雙學士',
] as const
