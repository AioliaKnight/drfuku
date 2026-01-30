import { forwardRef } from 'react'
import type { ElementType } from 'react'

import { cn } from '@/shared/lib/cn'

type SectionPadding = 'none' | 'compact' | 'default' | 'comfortable'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType
  padding?: SectionPadding
}

const paddingMap: Record<SectionPadding, string> = {
  none: '',
  compact: 'py-16 md:py-20',
  default: 'py-28 sm:py-32 md:py-36',
  comfortable: 'py-36 sm:py-40 md:py-44',
}

const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { as: Component = 'section', className, padding = 'default', ...props },
  ref
) {
  return (
    <Component
      ref={ref as never}
      className={cn('relative', paddingMap[padding], className)}
      {...props}
    />
  )
})

export default Section



