/** 行銷區塊背景色階（首頁交替節奏） */
export const sectionTones = {
  white: 'bg-white',
  muted: 'bg-neutral-50',
  brand: 'bg-linear-to-b from-brand-50/50 via-white to-white',
  hero: 'bg-linear-to-b from-brand-50/80 via-white to-neutral-50',
} as const

export type SectionTone = keyof typeof sectionTones
