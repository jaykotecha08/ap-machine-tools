import { NavLink } from 'react-router-dom'
import { House, Grid2x2, Building2, ShieldCheck, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

const tabs: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/', label: 'Home', icon: House },
  { to: '/products', label: 'Products', icon: Grid2x2 },
  { to: '/about', label: 'About', icon: Building2 },
  { to: '/quality', label: 'Quality', icon: ShieldCheck },
  { to: '/contact', label: 'Contact', icon: Phone },
]

/**
 * Native-app style bottom navigation. Mobile and tablet only; on desktop the
 * header nav takes over.
 */
export function TabBar() {
  return (
    <nav
      aria-label="Bottom navigation"
      className="surface-glass fixed inset-x-0 bottom-0 z-50 border-t border-steel-200/80 safe-bottom lg:hidden"
    >
      <ul className="mx-auto flex h-[var(--tabbar-h)] max-w-lg items-stretch">
        {tabs.map(({ to, label, icon: Icon }) => (
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
                      'grid h-8 w-12 place-items-center rounded-full transition-all duration-300 ease-[var(--ease-out-expo)]',
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
