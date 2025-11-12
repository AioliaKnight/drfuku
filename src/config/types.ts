// 結構化數據類型
export type JsonLdType = 'WebSite' | 'MedicalClinic' | 'Person' | 'MedicalWebPage'

// Schema.org 通用類型
export type Thing = {
  '@type': string
  name: string
  description?: string
  url?: string
}

// 搜索動作類型
export type SearchAction = Thing & {
  '@type': 'SearchAction'
  target: string
  'query-input': string
}

// 郵政地址類型
export type PostalAddress = Thing & {
  '@type': 'PostalAddress'
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
}

// 城市類型
export type City = Thing & {
  '@type': 'City'
}

// 醫療程序類型
export type MedicalProcedure = Thing & {
  '@type': 'MedicalProcedure'
}

// 醫療治療類型
export type MedicalTherapy = Thing & {
  '@type': 'MedicalTherapy'
}

// 醫療狀況類型
export type MedicalCondition = Thing & {
  '@type': 'MedicalCondition'
  alternateName?: readonly string[]
  possibleTreatment?: MedicalTherapy[]
}

// 網站類型
export type WebSite = Thing & {
  '@type': 'WebSite'
  potentialAction?: SearchAction
}

// 醫療診所類型
export type MedicalClinic = Thing & {
  '@type': 'MedicalClinic'
  alternateName?: readonly string[]
  logo?: string
  telephone?: string
  address?: PostalAddress
  areaServed?: City[]
  availableService?: MedicalProcedure[]
}

// 人物類型
export type Person = Thing & {
  '@type': 'Person'
  givenName?: string
  familyName?: string
  alternateName?: string
  jobTitle?: string
  image?: string
}

// 醫療網頁類型
export type MedicalWebPage = Thing & {
  '@type': 'MedicalWebPage'
  about?: MedicalCondition
}

// 結構化數據類型映射
export type StructuredDataTypeMap = {
  WebSite: WebSite
  MedicalClinic: MedicalClinic
  Person: Person
  MedicalWebPage: MedicalWebPage
}

// 結構化數據類型
export type StructuredData = {
  type: JsonLdType
  data: StructuredDataTypeMap[JsonLdType]
}

// 字體配置類型
export type FontConfig = {
  weight: string[]
  subsets: string[]
  display: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
  variable: string
  preload: boolean
  fallback: string[]
  adjustFontFallback: boolean
}

// 環境配置類型
export type Environment = 'development' | 'production' | 'test'

// 服務項目類型
export type Service = {
  name: string
  description: string
}

// 地址類型
export type Address = {
  street: string
  district: string
  city: string
  postalCode: string
  country: string
}

// 治療方案類型
export type Treatment = {
  name: string
  description: string
}

// 資源路徑類型
export type Assets = {
  logo: string
  ogImage: string
  doctorPhoto: string
  favicon: {
    ico: string
    png16: string
    png32: string
    apple: string
  }
}

// 網站配置類型
export type SiteConfig = {
  name: string
  shortName: string
  description: string
  url: string
  locale: string
  themeColor: string
}

// 醫師信息類型
export type DoctorInfo = {
  name: string
  givenName: string
  familyName: string
  title: string
  alternateName: string
  description: string
  image: string
  url: string
}

// 診所信息類型
export type ClinicInfo = {
  name: string
  alternateName: string[]
  logo: string
  telephone: string
  address: Address
  areaServed: string[]
  services: Service[]
}

// 疾病信息類型
export type DiseaseInfo = {
  name: string
  alternateName: string[]
  description: string
  treatments: Treatment[]
}

// 環境變量類型
export type EnvConfig = {
  gtmId: string
  environment: Environment
  version: string
  googleSiteVerification: string
  fbDomainVerification: string
  isDevelopment: boolean
  isProduction: boolean
}

// 關鍵字類型
export type Keywords = {
  primary: string[]
  symptoms: string[]
  treatments: string[]
  prevention: string[]
  clinic: string[]
  concerns: string[]
}
