// 結構化數據類型
export type JsonLdType =
  | 'WebSite'
  | 'MedicalClinic'
  | 'Person'
  | 'Physician'
  | 'MedicalWebPage'
  | 'Organization'
  | 'BreadcrumbList'
  | 'FAQPage'
  | 'Article'
  | 'ItemList'

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
  inLanguage?: string
  publisher?: {
    '@type': string
    name: string
    url: string
  }
}

// 圖片物件類型（Google 要求 publisher.logo 使用）
export type ImageObject = {
  '@type': 'ImageObject'
  url: string
  width?: number
  height?: number
}

// 聯絡點類型
export type ContactPoint = {
  '@type': 'ContactPoint'
  telephone: string
  contactType: string
  availableLanguage?: string[]
}

// 地理座標類型
export type GeoCoordinates = {
  '@type': 'GeoCoordinates'
  latitude: number
  longitude: number
}

// 醫療診所類型
export type MedicalClinic = Thing & {
  '@type': 'MedicalClinic'
  alternateName?: readonly string[]
  logo?: string | ImageObject
  telephone?: string
  address?: PostalAddress
  geo?: GeoCoordinates
  areaServed?: City[]
  availableService?: MedicalProcedure[]
  medicalSpecialty?: string
  priceRange?: string
  currenciesAccepted?: string
  paymentAccepted?: string
  isAcceptingNewPatients?: boolean
  contactPoint?: ContactPoint
}

// 人物類型
export type Person = Thing & {
  '@type': 'Person' | 'Physician'
  givenName?: string
  familyName?: string
  alternateName?: string
  jobTitle?: string
  image?: string
  sameAs?: readonly string[]
  medicalSpecialty?: string
  hasCredential?: Array<{
    '@type': 'EducationalOccupationalCredential'
    credentialCategory: string
    name: string
  }>
  worksFor?:
    | {
        '@type': string
        name: string
        url?: string
        telephone?: string
        address?: {
          '@type': string
          streetAddress?: string
          addressLocality?: string
          addressCountry?: string
        }
      }
    | Array<{
        '@type': string
        name: string
        url?: string
        telephone?: string
        address?: {
          '@type': string
          streetAddress?: string
          addressLocality?: string
          addressCountry?: string
        }
      }>
}

// 醫療網頁類型
export type MedicalWebPage = Thing & {
  '@type': 'MedicalWebPage'
  about?: MedicalCondition
  lastReviewed?: string
  medicalAudience?: {
    '@type': 'MedicalAudience'
    audienceType: string
  }
}

export type ListItem = Thing & {
  '@type': 'ListItem'
  position: number
  item: string
}

export type BreadcrumbList = Thing & {
  '@type': 'BreadcrumbList'
  itemListElement: ListItem[]
}

export type Organization = Thing & {
  '@type': 'Organization'
  logo?: string | ImageObject
  telephone?: string
  address?: PostalAddress
  contactPoint?: ContactPoint
}

// FAQPage 類型
export type Answer = Thing & {
  '@type': 'Answer'
  text: string
}

export type Question = Thing & {
  '@type': 'Question'
  acceptedAnswer: Answer
}

export type FAQPage = Thing & {
  '@type': 'FAQPage'
  mainEntity: Question[]
}

// 文章類型
export type Article = Thing & {
  '@type': 'Article'
  headline: string
  description?: string
  image?: string | string[]
  datePublished?: string
  dateModified?: string
  articleSection?: string
  articleTag?: string[]
  inLanguage?: string
  wordCount?: number
  author?: Person | { '@type': string; name: string; jobTitle?: string; image?: string; url?: string; medicalSpecialty?: string }
  publisher?: MedicalClinic | { '@type': string; name: string; logo?: ImageObject; telephone?: string; url?: string }
  mainEntityOfPage?: string | { '@type': string; '@id': string }
  isPartOf?: { '@type': string; name: string; url: string }
}

// ItemList 類型
export type ItemList = Thing & {
  '@type': 'ItemList'
  numberOfItems?: number
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    url: string
  }>
}

// 結構化數據類型映射
export type StructuredDataTypeMap = {
  WebSite: WebSite
  MedicalClinic: MedicalClinic
  Person: Person
  Physician: Person
  MedicalWebPage: MedicalWebPage
  Organization: Organization
  BreadcrumbList: BreadcrumbList
  FAQPage: FAQPage
  Article: Article
  ItemList: ItemList
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
  twitterImage: string
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
  address?: Address
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
