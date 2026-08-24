import { cn } from '../lib/cn'

/**
 * Redrawn from the original A.P. Machine Tools mark: the angular red "A"
 * chevron with the crossbar, set against the wordmark.
 */
export function Logo({
  tone = 'dark',
  className,
  compact = false,
}: {
  tone?: 'dark' | 'light'
  className?: string
  compact?: boolean
}) {
  const text = tone === 'light' ? 'text-white' : 'text-steel-900'
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
      >
        <rect width="64" height="64" rx="14" className="fill-brand-600" />
        <path d="M19 47 L32 15 L45 47 L36.5 47 L32 34 L27.5 47 Z" fill="white" />
        <rect x="23.5" y="38.5" width="17" height="4.5" className="fill-brand-600" />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-display text-xl font-bold tracking-tight whitespace-nowrap sm:text-2xl',
              text,
            )}
           
          >
            A.P. Machine Tools
          </span>
          <span
            className={cn(
              'text-eyebrow mt-1 text-[0.6rem]',
              tone === 'light' ? 'text-steel-400' : 'text-steel-400',
            )}
          >
            Ravi &amp; A.P. — Rajkot
          </span>
        </span>
      )}
    </span>
  )
}
