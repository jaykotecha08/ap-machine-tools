import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'
import site from '../content/site'
import { Logo } from './Logo'
import { Button } from './Button'
import { cn } from '../lib/cn'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Utility bar — desktop only, keeps contact one glance away. */}
      <div className="hidden bg-steel-950 text-steel-300 lg:block">
        <div className="container-page flex h-10 items-center justify-between text-[0.8rem]">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
            {site.company.city}, {site.company.state} — est. {site.company.established}
          </span>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
              {site.contact.email}
            </a>
            <a
              href={`tel:${site.contact.phoneDial}`}
              className="inline-flex items-center gap-2 font-semibold text-white"
            >
              <Phone className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
              {site.contact.phone}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'surface-glass border-b border-steel-200/70 shadow-[0_1px_20px_-8px_rgba(10,14,22,0.25)]'
            : 'bg-white lg:bg-transparent',
        )}
      >
        <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link to="/" aria-label={`${site.company.shortName} — home`}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                    isActive
                      ? 'text-brand-700'
                      : 'text-steel-600 hover:bg-steel-100 hover:text-steel-900',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-600" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Wrapped rather than given `hidden sm:inline-flex`: the Button's own
                `inline-flex` would win the display conflict at mobile widths. */}
            <span className="hidden sm:block">
              <Button to="/contact">Request a quote</Button>
            </span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-full border border-steel-200 text-steel-800 transition-colors hover:bg-steel-100 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — full-height sheet, app-style. */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            'absolute inset-0 bg-steel-950/50 transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          className={cn(
            'absolute inset-x-0 top-0 safe-top bg-white pt-[calc(var(--header-h)+0.5rem)] pb-8 shadow-lift-lg transition-transform duration-400 ease-[var(--ease-out-expo)]',
            open ? 'translate-y-0' : '-translate-y-full',
          )}
        >
          <nav className="container-page flex flex-col" aria-label="Mobile">
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between border-b border-steel-100 py-4 font-display text-2xl',
                    isActive ? 'text-brand-600' : 'text-steel-900',
                  )
                }
              >
                {item.label}
                <span className="text-eyebrow text-steel-300">
                  {String(site.nav.indexOf(item) + 1).padStart(2, '0')}
                </span>
              </NavLink>
            ))}
            <div className="mt-6 grid gap-3">
              <Button href={`tel:${site.contact.phoneDial}`} size="lg">
                <Phone className="h-4 w-4" /> {site.contact.phone}
              </Button>
              <Button href={`mailto:${site.contact.email}`} variant="outline" size="lg">
                <Mail className="h-4 w-4" /> Email us
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
