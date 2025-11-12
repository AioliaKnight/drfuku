import { DataLayerEventWithTimestamp } from '@/types/gtm'

export function pushToDataLayer(event: DataLayerEventWithTimestamp) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(event)
  }
}
