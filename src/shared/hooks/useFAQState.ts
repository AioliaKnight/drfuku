import { useState, useCallback } from 'react'
import { useFAQAnimation } from './useFAQAnimation'
import { useEventTracking } from './useEventTracking'

// FAQ 狀態介面
export interface FAQState {
  isOpen: boolean
  onToggle: () => void
  isAnimating?: boolean
}

// FAQ 項目介面
export interface FAQ {
  question: string
  answer: string
  keywords?: string[]
}

// FAQ 分類介面
export interface FAQCategory {
  title: string
  description: string
  keywords: string[]
  faqs: FAQ[]
}

// FAQ 追蹤數據介面
interface FAQTrackingData {
  category: string
  question: string
  action: 'open' | 'close'
  position: number
  totalFAQs: number
}

export function useFAQState(category: FAQCategory) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const { trackToggle } = useEventTracking()
  const { variants, transition } = useFAQAnimation({ once: true })

  // 處理 FAQ 切換
  const handleToggle = useCallback((index: number) => {
    if (isAnimating) return

    setIsAnimating(true)
    const isOpening = openIndex !== index
    const faq = category.faqs[index]

    if (faq) {
      const trackingData: FAQTrackingData = {
        category: category.title,
        question: faq.question,
        action: isOpening ? 'open' : 'close',
        position: index + 1,
        totalFAQs: category.faqs.length
      }

      trackToggle(faq.question, isOpening, {
        category: 'faq',
        label: `${trackingData.action}_faq`,
        value: trackingData.position,
        location: category.title,
        position: `${trackingData.position}/${trackingData.totalFAQs}`
      })
    }

    setOpenIndex(openIndex === index ? null : index)

    // 動畫完成後重置狀態
    setTimeout(() => {
      setIsAnimating(false)
    }, transition.duration * 1000)
  }, [category.title, category.faqs, openIndex, isAnimating, transition.duration, trackToggle])

  // 獲取 FAQ 狀態
  const getFAQState = useCallback((index: number): FAQState => ({
    isOpen: openIndex === index,
    isAnimating,
    onToggle: () => handleToggle(index)
  }), [handleToggle, openIndex, isAnimating])

  return {
    variants,
    transition,
    getFAQState,
    isAnimating
  } as const
}
