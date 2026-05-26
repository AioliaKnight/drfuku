import { cn } from '@/shared/lib/cn'

type SectionBackdropProps = {
  className?: string
  /** 較低調的背景光暈（預設 true） */
  subtle?: boolean
}

/** 區塊背景裝飾（統一強度，避免各區塊視覺過雜） */
export default function SectionBackdrop({ className, subtle = true }: SectionBackdropProps) {
  const opacity = subtle ? 'opacity-60' : 'opacity-100'

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', opacity, className)}
      aria-hidden="true"
    >
      <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-brand-100/50 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-neutral-100/80 blur-3xl" />
    </div>
  )
}
