import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/shared/lib/cn'

type ButtonVariant = 'primary' | 'primaryGradient' | 'secondary' | 'muted'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

const baseClasses =
  'inline-flex items-center justify-center rounded-full font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60'

const variantClasses: Record<ButtonVariant | 'care', string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-warm-md hover:shadow-warm-lg',
  primaryGradient:
    'relative overflow-hidden bg-linear-to-r from-brand-600 to-brand-500 text-white hover:opacity-90 shadow-warm-lg hover:shadow-warm-xl',
  secondary:
    'border border-brand-200 bg-white/80 text-brand-700 hover:bg-brand-50 shadow-warm-sm hover:shadow-warm-md',
  muted: 'bg-warm-100 text-neutral-600 hover:bg-warm-200 shadow-warm-sm',
  care: 'bg-care-100 text-care-600 hover:bg-care-200 shadow-warm-md hover:shadow-warm-lg'
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}

export function buttonVariants({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string | undefined
} = {}) {
  return cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className
  )
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', fullWidth = false, className, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={buttonVariants({ variant, size, fullWidth, className })}
      {...props}
    />
  )
})

export default Button

