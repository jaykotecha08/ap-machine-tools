import { NavLink } from 'react-router-dom'
import { House, Grid2x2, ShoppingBag, Building2, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useQuote } from '../lib/quote'
import { cn } from '../lib/cn'

const tabs: { to: string; label: string; icon: LucideIcon; badge?: boolean }[] = [
  { to: '/', label: 'Home', icon: House },
  { to: '/store', label: 'Store', icon: Grid2x2 },
  { to: '/quote', label: 'Quote', icon: ShoppingBag, badge: true },
  { to: '/about', label: 'About', icon: Building2 },
  { to: '/contact', label: 'Contact', icon: Phone },
]

/**
 * Native-app style bottom navigation. Mobile and tablet only; on desktop the
 * header nav takes over.
 */
export function TabBar() {
  const { count } = useQuote()

  return (
    <nav
      aria-label="Bottom navigation"
      className="surface-glass fixed inset-x-0 bottom-0 z-50 border-t border-steel-200/80 safe-bottom lg:hidden"
    >
      <ul className="mx-auto flex h-[var(--tabbar-h)] max-w-lg items-stretch">
        {tabs.map(({ to, label, icon: Icon, badge }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'group flex h-full flex-col items-center justify-center gap-1 transition-colors',
                  isActive ? 'text-brand-600' : 'text-steel-500',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'relative grid h-8 w-12 place-items-center rounded-full transition-all duration-300 ease-[var(--ease-out-expo)]',
                      isActive ? 'bg-brand-50' : 'bg-transparent',
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-[1.15rem] w-[1.15rem] transition-transform duration-300',
                        isActive && 'scale-110',
                      )}
                      strokeWidth={isActive ? 2.4 : 1.9}
                      aria-hidden="true"
                    />
                    {badge && count > 0 && (
                      <span className="absolute top-0 right-2 grid min-w-4.5 place-items-center rounded-full bg-brand-600 px-1 font-mono text-[0.6rem] leading-4.5 font-medium text-white">
                        {count > 99 ? '99+' : count}
                      </span>
                    )}
                  </span>
                  <span className="text-[0.65rem] font-semibold tracking-tight">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
