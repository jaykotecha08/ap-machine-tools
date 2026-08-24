import type { Capability } from '../content/types'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { cn } from '../lib/cn'

export function CapabilityGrid({
  items,
  tone = 'light',
}: {
  items: Capability[]
  tone?: 'light' | 'dark'
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <Reveal
          key={item.title}
          delay={i * 70}
          as="article"
          className={cn(
            'rounded-xl2 border p-6 transition-colors duration-300',
            tone === 'dark'
              ? 'border-white/10 bg-white/[0.04] hover:border-white/20'
              : 'border-steel-200 bg-white shadow-lift hover:border-steel-300',
          )}
        >
          <span
            className={cn(
              'grid h-11 w-11 place-items-center rounded-xl',
              tone === 'dark' ? 'bg-brand-600/15 text-brand-400' : 'bg-brand-50 text-brand-600',
            )}
          >
            <Icon name={item.icon} className="h-5 w-5" />
          </span>
          <h3
            className={cn(
              'mt-5 text-lg',
              tone === 'dark' ? 'text-white' : 'text-steel-900',
            )}
          >
            {item.title}
          </h3>
          <p
            className={cn(
              'mt-2 text-sm leading-relaxed',
              tone === 'dark' ? 'text-steel-400' : 'text-steel-500',
            )}
          >
            {item.body}
          </p>
        </Reveal>
      ))}
    </div>
  )
}
