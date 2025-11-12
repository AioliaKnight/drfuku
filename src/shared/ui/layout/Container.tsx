import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

import { cn } from '@/shared/lib/cn'

type ContainerProps = HTMLAttributes<HTMLDivElement>

const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('mx-auto w-full max-w-7xl px-6 md:px-8', className)}
      {...props}
    />
  )
})

export default Container

