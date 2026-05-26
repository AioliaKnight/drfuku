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
  compact: 'py-14 md:py-20',
  default: 'py-20 md:py-28',
  comfortable: 'py-28 md:py-36',
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



