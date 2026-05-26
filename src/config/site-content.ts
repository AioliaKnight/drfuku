/**
 * 網站內容單一來源（Single Source of Truth）
 * 醫師簡介、門診據點、專長等全站共用資料集中於此。
 */

export const DOCTOR_COPY = {
  displayName: '阿福醫師（徐彥勳）',
  headline: '認識阿福醫師（徐彥勳）',
  heroTitle: '阿福醫師',
  heroHighlight: '大腸直腸外科徐彥勳',
  heroSubtitle: '微創痔瘡・專科醫療',
  summary:
    '擁有中西醫雙學位與 15 年臨床經驗，徐醫師善於結合微創技術與貼心照護，針對每位病患的生活型態與需求，提供客製化治療與完整術後追蹤。',
  bio:
    '累積多年的臨床經驗，深知每位病患的困擾與期待。秉持以病患為中心的服務理念，提供專業且溫暖的醫療照護，讓您在就醫過程中感受到安心與信賴。持續精進醫療技術，致力於提供最優質的診療服務。',
  footerBlurb:
    '專精於大腸直腸疾病診療，致力於提供專業且溫暖的醫療服務。於多處門診服務，為您打造安心的就醫體驗。',
  yearsOfExperience: 15,
} as const

/** 現任職務 */
export const DOCTOR_CURRENT_POSITIONS = [
  '台中西屯顧家泌尿科診所大腸直腸外科主任',
  '顧芳瑜泌尿科大安分院大腸直腸外科主治醫師',
  '禾馨醫療內湖民權婦幼診所大腸直腸外科主治醫師',
  '草屯佑民醫院大腸直腸外科主治醫師',
  '秘境美學診所特約痔瘡專科醫師',
  '賦真妍特約痔瘡專科醫師',
] as const

/** 學歷 */
export const DOCTOR_EDUCATION = ['中國醫藥大學中西醫雙學士'] as const

/** 學經歷與專科資格 */
export const DOCTOR_EXPERIENCE = [
  '大腸直腸外科專科醫師（直專醫字第324號）',
  '外科專科醫師（外專醫字第006107號）',
  '中華民國醫師高等考試及格',
  '中華民國大腸直腸外科醫學會專科醫師',
  '台灣外科醫學會專科醫師',
  '中華民國醫師公會聯合會會員',
  '彰化基督教醫院外科部住院醫師',
  '彰化基督教醫院大腸直腸外科研究醫師',
] as const

/** 主治項目 */
export const DOCTOR_SPECIALTIES = [
  '微創痔瘡手術（包含雷射痔瘡手術、組織凝集儀痔瘡手術、冷凝刀痔瘡手術等）',
  '微創肛門手術',
  '肛門膿瘍、肛門瘻管',
  '肛門濕疹（菜花）治療',
  '肛周疾患（肛裂、肛門搔癢）',
  '肛門皮膚疾患',
  '發炎性腸道疾病',
  '腸躁症、便秘',
] as const

export type DoctorProfileSectionIcon = 'current' | 'education' | 'experience' | 'specialties'

export type DoctorProfileSection = {
  id: string
  title: string
  icon: DoctorProfileSectionIcon
  items: readonly string[]
}

/** 關於頁／首頁醫師區塊的結構化段落 */
export const DOCTOR_PROFILE_SECTIONS: readonly DoctorProfileSection[] = [
  { id: 'current', title: '現任', icon: 'current', items: DOCTOR_CURRENT_POSITIONS },
  { id: 'education', title: '學歷', icon: 'education', items: DOCTOR_EDUCATION },
  { id: 'experience', title: '學經歷', icon: 'experience', items: DOCTOR_EXPERIENCE },
  { id: 'specialties', title: '主治項目', icon: 'specialties', items: DOCTOR_SPECIALTIES },
] as const

export type PracticeLocationRole = 'director' | 'attending' | 'contract'

export type PracticeLocation = {
  id: string
  name: string
  address?: string
  telephone?: string
  mapUrl?: string
  /** 服務範圍說明（選填，用於首頁／頁尾） */
  serviceAreaNote?: string
  role: PracticeLocationRole
  /** 服務地區（SEO / 結構化資料） */
  region: '台北市' | '台中市' | '南投縣'
}

const ROLE_LABELS: Record<PracticeLocationRole, string> = {
  director: '主任醫師',
  attending: '主治醫師',
  contract: '特約痔瘡專科門診',
}

export function getPracticeRoleLabel(role: PracticeLocationRole): string {
  return ROLE_LABELS[role]
}

/** 門診／執業據點（全站唯一來源） */
export const PRACTICE_LOCATIONS: readonly PracticeLocation[] = [
  {
    id: 'gujia-taichung',
    name: '台中西屯顧家泌尿科診所',
    address: '407台中市西屯區大隆路185號',
    telephone: '04-2310-8588',
    mapUrl: 'https://share.google/Sy15rgJv13xJdHkgx',
    serviceAreaNote:
      '鄰近台中七期，服務大台中、彰化、南投地區，提供泌尿及大腸直腸相關問題的隱密舒適就診空間。',
    role: 'director',
    region: '台中市',
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
    id: 'gu-urology-daan',
    name: '顧芳瑜泌尿科診所 大安分院',
    address: '106臺北市大安區信義路三段192-1號4樓',
    mapUrl: 'https://maps.app.goo.gl/1FsNbydSNMxLC9ci8',
    role: 'attending',
    region: '台北市',
  },
  {
    id: 'youmin-caotun',
    name: '佑民醫院（草屯）',
    address: '南投縣草屯鎮太平路一段200號',
    mapUrl: 'https://maps.app.goo.gl/X4S4WEJbC8msm4qr6',
    role: 'attending',
    region: '南投縣',
  },
  {
    id: 'fuzhenyan',
    name: '賦真妍診所',
    role: 'contract',
    region: '台北市',
  },
  {
    id: 'mijing',
    name: '秘境美學診所',
    role: 'contract',
    region: '台北市',
  },
] as const

/** 首頁「診所位置」：有地址或地圖的據點優先，其餘仍顯示 */
export const HERO_PRACTICE_LOCATIONS = PRACTICE_LOCATIONS.filter(
  (loc) => loc.id !== 'fuzhenyan' && loc.id !== 'mijing'
)

/** 結構化資料：服務地區 */
export const SERVICE_AREAS = ['台北市', '新北市', '台中市', '彰化縣', '南投縣'] as const

/** 將市話轉為 tel: 連結（例：04-2310-8588 → tel:+886423108588） */
export function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('0')) {
    return `tel:+886${digits.slice(1)}`
  }
  return `tel:+${digits}`
}

/** 專科資格（JSON-LD hasCredential） */
export const DOCTOR_CREDENTIALS = [
  '中華民國大腸直腸外科專科醫師',
  '台灣外科醫學會專科醫師',
  '中國醫藥大學中西醫雙學士',
] as const
