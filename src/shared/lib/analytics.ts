import type { DataLayerEvent, DataLayerEventWithTimestamp } from '@/types/gtm'
import { keywords } from './keywords'

// 通用配置
const config = {
  debug: process.env.NODE_ENV === 'development',
  version: '1.0.0',
  environment: process.env.NODE_ENV,
  site: '痔瘡醫生 徐彥勳大腸直腸專科',
  keywords: keywords.getPrimary()
}

// 基礎事件推送函數
export function pushEvent<T extends DataLayerEvent>(event: T): void {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    const eventWithTimestamp: DataLayerEventWithTimestamp = {
      ...event,
      timestamp: new Date().getTime(),
      clientId: getClientId() || undefined,
      sessionId: getSessionId() || undefined,
      userId: getUserId(),
      environment: config.environment || undefined,
      version: config.version || undefined,
      debug: config.debug || undefined,
      site: config.site || undefined,
      keywords: config.keywords as readonly string[] | undefined
    }

    // 在開發環境中使用 logger
    if (config.debug) {
      console.log('[GTM Event]:', eventWithTimestamp)
    }

    window.dataLayer.push(eventWithTimestamp)
  }
}

// 獲取或生成 Client ID
function getClientId(): string {
  if (typeof window === 'undefined') return ''

  const storageKey = 'gtm_client_id'
  let clientId = localStorage.getItem(storageKey)

  if (!clientId) {
    clientId = `client_${Math.random().toString(36).substring(2)}_${Date.now()}`
    localStorage.setItem(storageKey, clientId)
  }

  return clientId
}

// 獲取或生成 Session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return ''

  const storageKey = 'gtm_session_id'
  let sessionId = sessionStorage.getItem(storageKey)

  if (!sessionId) {
    sessionId = `session_${Math.random().toString(36).substring(2)}_${Date.now()}`
    sessionStorage.setItem(storageKey, sessionId)
  }

  return sessionId
}

// 獲取 User ID（如果有的話）
function getUserId(): string | undefined {
  return undefined
}

// 頁面瀏覽事件
export function trackPageView({
  title,
  description,
  url,
  keywords = [],
  categorizedKeywords = {}
}: {
  title: string
  description: string
  url?: string
  keywords?: readonly string[]
  categorizedKeywords?: Record<string, readonly string[]>
}): void {
  pushEvent({
    event: 'pageview',
    page: {
      title,
      description,
      url: url || (typeof window !== 'undefined' ? window.location.href : ''),
      keywords,
      categorizedKeywords
    },
    performance: getPerformanceMetrics()
  })
}

// 部落格文章瀏覽事件
export function trackBlogView({
  title,
  description,
  excerpt = '',
  url,
  blogKeywords = [],
  categorizedKeywords = {},
  readingTime,
  wordCount
}: {
  title: string
  description: string
  excerpt?: string
  url?: string
  blogKeywords?: readonly string[]
  categorizedKeywords?: Record<string, readonly string[]>
  readingTime?: number
  wordCount?: number
}): void {
  pushEvent({
    event: 'blog_view',
    blog: {
      title,
      description,
      readingTime,
      wordCount,
      excerpt: excerpt || description,
      url: url || (typeof window !== 'undefined' ? window.location.href : ''),
      keywords: blogKeywords,
      categorizedKeywords
    },
    performance: getPerformanceMetrics()
  })
}

// CTA 點擊追蹤
export function trackCtaClick({
  text,
  location,
  destination,
  type,
  category,
  position,
  variant
}: {
  text: string
  location: string
  destination: string
  type?: string
  category?: string
  position?: string
  variant?: string
}): void {
  pushEvent({
    event: 'ctaclick',
    cta: {
      text,
      location,
      destination,
      type,
      category,
      position,
      variant
    }
  })
}

// 滾動追蹤
export function trackScroll(
  depth: number,
  direction: 'up' | 'down',
  unit: 'percent' | 'pixel' = 'percent',
  milestones?: number[],
  maxDepth?: number,
  timing?: number
): void {
  pushEvent({
    event: 'scroll',
    scroll: {
      depth,
      direction,
      unit,
      location: typeof window !== 'undefined' ? window.location.pathname : undefined,
      milestones: milestones || undefined,
      maxDepth: maxDepth || undefined,
      timing: timing || undefined
    }
  })
}

// 獲取效能指標
function getPerformanceMetrics() {
  if (typeof window === 'undefined' || !window.performance) return null

  const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  const paint = window.performance.getEntriesByType('paint')
  const firstPaint = paint.find(entry => entry.name === 'first-paint')
  const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint')

  return {
    navigationStart: navigation?.startTime || 0,
    responseStart: navigation?.responseStart || 0,
    responseEnd: navigation?.responseEnd || 0,
    domInteractive: navigation?.domInteractive || 0,
    domComplete: navigation?.domComplete || 0,
    loadEventStart: navigation?.loadEventStart || 0,
    loadEventEnd: navigation?.loadEventEnd || 0,
    firstPaint: firstPaint?.startTime || 0,
    firstContentfulPaint: firstContentfulPaint?.startTime || 0,
    type: navigation?.type || '',
    redirectCount: navigation?.redirectCount || 0
  }
}

// 通用事件追蹤
interface EventData {
  category?: string
  label?: string
  value?: number
  [key: string]: string | number | boolean | undefined
}

export function trackEvent(
  action: string,
  {
    category,
    label,
    value,
    ...customData
  }: EventData
): void {
  pushEvent({
    event: 'custom_event',
    eventAction: action,
    eventCategory: category,
    eventLabel: label,
    eventValue: value,
    ...customData
  })
}

export const trackCustomEvent = ({
  eventAction,
  eventCategory = '',
  eventLabel = '',
  eventValue,
  ...customData
}: {
  eventAction: string
  eventCategory?: string
  eventLabel?: string
  eventValue?: number
  [key: string]: string | number | boolean | readonly string[] | undefined
}) => {
  pushEvent({
    event: 'custom_event',
    eventAction,
    eventCategory,
    eventLabel,
    eventValue,
    ...customData
  })
}
