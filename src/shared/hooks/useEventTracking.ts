import { useCallback } from 'react'
import { trackEvent as trackGTMEvent } from '@/shared/lib/analytics'

// 定義事件類別
export type EventCategory =
  | 'engagement'
  | 'navigation'
  | 'consultation'
  | 'testimonials'
  | 'faq'
  | 'social'
  | 'form'
  | 'blog'
  | '預防保健'
  | '治療方法'
  | '術後照護'
  | '飲食保健'
  | '疾病衛教'
  | '疾病警訊'
  | '居家照護'
  | '特殊照護'
  | '疾病治療'
  | '中醫治療'

// 定義事件動作
export type EventAction =
  | 'click'
  | 'view'
  | 'scroll'
  | 'toggle'
  | 'submit'
  | 'success'
  | 'error'
  | 'custom'

// 基礎事件數據結構
interface BaseEventData {
  category: EventCategory
  label?: string
  value?: number
  location?: string
  position?: string
  variant?: string
  timestamp?: number
}

// GTM 事件數據結構
interface GTMEventData extends BaseEventData {
  eventAction?: string
  eventCategory?: EventCategory
  eventLabel?: string
  eventValue?: number
  [key: string]: string | number | boolean | undefined
}

// 通用事件追蹤函數類型
type TrackEventFunction = (
  action: string,
  data?: Partial<GTMEventData>
) => void

// 特定事件追蹤函數類型
interface EventTrackingActions {
  trackClick: (element: string, data?: Partial<GTMEventData>) => void
  trackView: (element: string, data?: Partial<GTMEventData>) => void
  trackScroll: (depth: number, data?: Partial<GTMEventData>) => void
  trackToggle: (element: string, state: boolean, data?: Partial<GTMEventData>) => void
  trackFormSubmit: (formName: string, data?: Partial<GTMEventData>) => void
  trackError: (error: string, data?: Partial<GTMEventData>) => void
}

export function useEventTracking(): { trackEvent: TrackEventFunction } & EventTrackingActions {
  // 基礎事件追蹤
  const trackEvent = useCallback<TrackEventFunction>((action, data) => {
    const eventData: GTMEventData = {
      category: (data?.category || data?.eventCategory || 'engagement') as EventCategory,
      label: data?.label || data?.eventLabel || '',
      value: data?.value ?? data?.eventValue ?? 0,
      timestamp: Date.now(),
      ...data
    }
    trackGTMEvent(action, eventData)
  }, [])

  // 點擊事件追蹤
  const trackClick = useCallback(
    (element: string, data?: Partial<GTMEventData>) => {
      trackEvent('click', {
        ...data,
        category: 'engagement',
        label: element,
        eventAction: 'click'
      })
    },
    [trackEvent]
  )

  // 瀏覽事件追蹤
  const trackView = useCallback(
    (element: string, data?: Partial<GTMEventData>) => {
      trackEvent('view', {
        ...data,
        category: 'engagement',
        label: element,
        eventAction: 'view'
      })
    },
    [trackEvent]
  )

  // 滾動事件追蹤
  const trackScroll = useCallback(
    (depth: number, data?: Partial<GTMEventData>) => {
      trackEvent('scroll', {
        ...data,
        category: 'engagement',
        value: depth,
        eventAction: 'scroll'
      })
    },
    [trackEvent]
  )

  // 切換事件追蹤
  const trackToggle = useCallback(
    (element: string, state: boolean, data?: Partial<GTMEventData>) => {
      trackEvent('toggle', {
        ...data,
        category: 'engagement',
        label: element,
        value: state ? 1 : 0,
        eventAction: 'toggle'
      })
    },
    [trackEvent]
  )

  // 表單提交事件追蹤
  const trackFormSubmit = useCallback(
    (formName: string, data?: Partial<GTMEventData>) => {
      trackEvent('form_submit', {
        ...data,
        category: 'form',
        label: formName,
        eventAction: 'submit'
      })
    },
    [trackEvent]
  )

  // 錯誤事件追蹤
  const trackError = useCallback(
    (error: string, data?: Partial<GTMEventData>) => {
      trackEvent('error', {
        ...data,
        category: 'engagement',
        label: error,
        eventAction: 'error'
      })
    },
    [trackEvent]
  )

  return {
    trackEvent,
    trackClick,
    trackView,
    trackScroll,
    trackToggle,
    trackFormSubmit,
    trackError
  }
}
