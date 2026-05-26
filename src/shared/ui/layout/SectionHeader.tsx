import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

type SectionHeaderProps = {
  title: string
  description?: string
  icon?: ReactNode
  badge?: string
  align?: 'center' | 'left'
  className?: string
}

/** 行銷區塊共用標題（統一層級、間距、可讀性） */
export default function SectionHeader({
  title,
  description,
  icon,
  badge,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const isCenter = align === 'center'

  return (
    <header
      className={cn(
        'mb-12 md:mb-16',
        isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
        className
      )}
    >
      {badge ? (
        <p
          className={cn(
            'mb-3 text-sm font-medium tracking-wide text-brand-600',
            isCenter && 'mx-auto'
          )}
        >
          <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 ring-1 ring-brand-100/80">
            {badge}
          </span>
        </p>
      ) : null}
      {icon ? (
        <div
          className={cn('mb-5 flex', isCenter ? 'justify-center' : 'justify-start')}
          aria-hidden="true"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50/90 text-brand-600 ring-1 ring-brand-100/60 md:h-14 md:w-14">
            {icon}
          </div>
        </div>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl [text-wrap:balance]">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-4 text-base leading-7 text-neutral-600 md:text-lg md:leading-8 [text-wrap:balance]',
            isCenter && 'mx-auto max-w-2xl'
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  )
}
