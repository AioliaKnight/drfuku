/** 行銷區塊背景色階（首頁交替節奏） */
export const sectionTones = {
  white: 'bg-warm-50',
  muted: 'bg-neutral-100/50',
  brand: 'bg-linear-to-b from-brand-50/50 via-warm-50 to-warm-50',
  hero: 'bg-linear-to-b from-brand-50/30 via-warm-50 to-neutral-100/40',
  care: 'bg-care-50',
} as const

export type SectionTone = keyof typeof sectionTones
