import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'ghost' | 'outline' | 'light'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-[0.97] whitespace-nowrap'

const sizes = {
  md: 'h-11 px-6',
  lg: 'h-13 px-7 text-base',
} as const

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-[0_8px_24px_-8px_rgba(216,22,22,0.6)] hover:bg-brand-700 hover:shadow-[0_12px_32px_-8px_rgba(216,22,22,0.7)]',
  outline:
    'border border-steel-300 text-steel-800 hover:border-steel-900 hover:bg-white',
  ghost: 'text-steel-700 hover:bg-steel-100',
  light: 'bg-white text-steel-900 hover:bg-steel-100 shadow-lift',
}

interface Props {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: Variant
  size?: keyof typeof sizes
  className?: string
  type?: 'button' | 'submit'
  ariaLabel?: string
}

export function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ariaLabel,
}: Props) {
  const classes = cn(base, sizes[size], variants[variant], className)

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }
  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
