import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'light',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'text-eyebrow mb-3',
            tone === 'dark' ? 'text-brand-400' : 'text-brand-600',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'text-3xl leading-[1.08] sm:text-4xl lg:text-5xl',
          tone === 'dark' ? 'text-white' : 'text-steel-900',
        )}
      >
        {title}
      </h2>
      <div className={cn('rule-brand mt-5', align === 'center' && 'mx-auto')} />
      {lead && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed sm:text-lg',
            tone === 'dark' ? 'text-steel-300' : 'text-steel-500',
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  )
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={cn('py-16 sm:py-20 lg:py-28', className)}>
      <div className="container-page">{children}</div>
    </section>
  )
}
