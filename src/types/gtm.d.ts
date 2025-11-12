declare global {
  interface Window {
    dataLayer?: DataLayerEventWithTimestamp[]
  }
}

// Event Types
export type EventType = 'pageview' | 'blog_view' | 'scroll' | 'ctaclick' | 'conversion' | 'timing' | 'custom_event'

// Data Types
export interface PageData {
  title: string
  description: string
  url: string
  keywords?: readonly string[]
  categorizedKeywords?: Record<string, readonly string[]>
}

export interface BlogData {
  title: string
  description: string
  excerpt: string
  url: string
  keywords?: readonly string[] | undefined
  categorizedKeywords?: Record<string, readonly string[]> | undefined
  readingTime?: number | undefined
  wordCount?: number | undefined
}

export interface CTAData {
  text: string
  location: string
  destination: string
  type?: string | undefined
  category?: string | undefined
  position?: string | undefined
  variant?: string | undefined
}

export interface ConversionData {
  type: string
  value?: number
  location: string
  category?: string
  label?: string
  currency?: string
  items?: Array<{
    id: string
    name: string
    category?: string
    price?: number
    quantity?: number
  }>
}

export interface ScrollData {
  depth: number
  direction: 'up' | 'down'
  location: string
  milestones?: number[]
  maxDepth?: number
  timing?: number
}

export interface TimingData {
  category: string
  variable: string
  value: number
  label?: string
  page?: string
  type?: string
}

// Event Interfaces
export interface PageViewEvent {
  event: 'pageview'
  page: PageData
  performance?: PerformanceMetrics
}

export interface BlogViewEvent {
  event: 'blog_view'
  blog: BlogData
  performance?: PerformanceMetrics
}

export interface CtaClickEvent {
  event: 'ctaclick'
  cta: CTAData
}

export interface ConversionEvent {
  event: 'conversion'
  conversion: ConversionData
}

export interface ScrollEvent {
  event: 'scroll'
  scroll: {
    depth: number
    direction: 'up' | 'down'
    location?: string | undefined
    milestones?: number[] | undefined
    maxDepth?: number | undefined
    timing?: number | undefined
    unit?: 'percent' | 'pixel' | undefined
  }
}

export interface TimingEvent {
  event: 'timing'
  timing: {
    name: string
    value: number
    category?: string
    label?: string
  }
}

// Custom Event Interface
export interface CustomEvent {
  event: 'custom_event'
  eventAction: string
  eventCategory: string | undefined
  eventLabel: string | undefined
  eventValue: number | undefined
  [key: string]: string | number | boolean | readonly string[] | undefined
}

// Union Type for all events
export type DataLayerEvent =
  | PageViewEvent
  | BlogViewEvent
  | CtaClickEvent
  | ConversionEvent
  | ScrollEvent
  | TimingEvent
  | CustomEvent

// Type with timestamp and common fields
export type DataLayerEventWithTimestamp = DataLayerEvent & {
  timestamp: number
  userId?: string | undefined
  sessionId?: string | undefined
  clientId?: string | undefined
  environment?: string | undefined
  version?: string | undefined
  debug?: boolean | undefined
  site?: string | undefined
  keywords?: readonly string[] | undefined
}

// Export all types
export type {
  EventType,
  PageData,
  BlogData,
  CTAData,
  ConversionData,
  ScrollData,
  TimingData,
  PageViewEvent,
  BlogViewEvent,
  CtaClickEvent,
  ConversionEvent,
  ScrollEvent,
  TimingEvent,
  CustomEvent
}
