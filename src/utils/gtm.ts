// GTM 事件類型定義
type GTMEventType = 
  | 'pageview'
  | 'customEvent'
  | 'click'
  | 'scroll'
  | 'form_submit'
  | 'button_click'
  | 'link_click'
  | 'social_interaction'
  | 'error'
  | 'timing'

// GTM 事件介面
interface GTMEvent {
  event: GTMEventType
  page?: string
  eventAction?: string
  eventCategory?: string
  eventLabel?: string
  eventValue?: number
  eventTiming?: number
  eventError?: string
  eventSuccess?: boolean
  [key: string]: unknown
}

// 擴展 Window 介面
declare global {
  interface Window {
    dataLayer: GTMEvent[]
    gtag?: (command: string, action: string, params: object) => void
  }
}

// GTM ID 配置
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

// 檢查 GTM 是否可用
const isGTMAvailable = () => {
  return typeof window !== 'undefined' && 
         window.dataLayer !== undefined && 
         GTM_ID !== undefined
}

// 推送事件到 dataLayer
const pushToDataLayer = (event: GTMEvent) => {
  if (isGTMAvailable()) {
    window.dataLayer.push(event)
    if (process.env.NODE_ENV === 'development') {
      console.log('[GTM Event]:', event)
    }
  }
}

// 頁面瀏覽追蹤
export const pageview = (url: string) => {
  pushToDataLayer({
    event: 'pageview',
    page: url,
  })
}

// 自定義事件追蹤
export const event = ({ 
  action, 
  category, 
  label, 
  value 
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  pushToDataLayer({
    event: 'customEvent',
    eventAction: action,
    eventCategory: category,
    eventLabel: label,
    eventValue: value,
  })
}

// 按鈕點擊追蹤
export const trackButtonClick = ({
  buttonName,
  buttonId,
  buttonText
}: {
  buttonName: string
  buttonId?: string
  buttonText?: string
}) => {
  pushToDataLayer({
    event: 'button_click',
    eventCategory: 'Button',
    eventAction: 'click',
    eventLabel: buttonName,
    buttonId,
    buttonText
  })
}

// 連結點擊追蹤
export const trackLinkClick = ({
  linkUrl,
  linkText,
  isExternal = false
}: {
  linkUrl: string
  linkText?: string
  isExternal?: boolean
}) => {
  pushToDataLayer({
    event: 'link_click',
    eventCategory: 'Link',
    eventAction: 'click',
    eventLabel: linkUrl,
    linkText,
    isExternal
  })
}

// 社群互動追蹤
export const trackSocialInteraction = ({
  network,
  action,
  target
}: {
  network: string
  action: string
  target?: string
}) => {
  pushToDataLayer({
    event: 'social_interaction',
    eventCategory: 'Social',
    eventAction: action,
    eventLabel: network,
    socialTarget: target
  })
}

// 錯誤追蹤
export const trackError = ({
  errorMessage,
  errorCode,
  errorType = 'Error'
}: {
  errorMessage: string
  errorCode?: string | number
  errorType?: string
}) => {
  pushToDataLayer({
    event: 'error',
    eventCategory: 'Error',
    eventAction: errorType,
    eventLabel: errorMessage,
    eventError: errorMessage,
    errorCode
  })
}

// 效能追蹤
export const trackTiming = ({
  category,
  variable,
  value,
  label
}: {
  category: string
  variable: string
  value: number
  label?: string
}) => {
  pushToDataLayer({
    event: 'timing',
    eventCategory: category,
    eventAction: variable,
    eventTiming: value,
    eventLabel: label
  })
}

// 表單提交追蹤
export const trackFormSubmit = ({
  formName,
  formId,
  success = true,
  errorMessage
}: {
  formName: string
  formId?: string
  success?: boolean
  errorMessage?: string
}) => {
  pushToDataLayer({
    event: 'form_submit',
    eventCategory: 'Form',
    eventAction: 'submit',
    eventLabel: formName,
    formId,
    eventSuccess: success,
    eventError: errorMessage
  })
}

// 滾動追蹤
export const trackScroll = ({
  depth,
  timing
}: {
  depth: number
  timing: number
}) => {
  pushToDataLayer({
    event: 'scroll',
    eventCategory: 'Scroll',
    eventAction: 'depth',
    eventValue: depth,
    eventTiming: timing
  })
} 