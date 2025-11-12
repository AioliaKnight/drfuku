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
  default: 'py-24 sm:py-28 md:py-32',
  comfortable: 'py-32 sm:py-36 md:py-40',
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



