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
  'inline-flex items-center justify-center rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-600',
  primaryGradient:
    'relative overflow-hidden bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-700 hover:to-brand-600 focus-visible:ring-brand-600',
  secondary:
    'border border-brand-600 text-brand-600 hover:bg-brand-50 focus-visible:ring-brand-600 focus-visible:ring-offset-2',
  muted: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus-visible:ring-neutral-400'
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

