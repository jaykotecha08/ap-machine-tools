import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Search, X, ArrowRight } from 'lucide-react'
import site from '../content/site'
import { PageHeader } from '../components/PageHeader'
import { Section } from '../components/Section'
import { CtaBand } from '../components/CtaBand'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { cn } from '../lib/cn'

export default function Products() {
  const { hash } = useLocation()
  const [active, setActive] = useState<string>('all')
  const [query, setQuery] = useState('')

  // Deep links from the footer / product cards land on a category.
  useEffect(() => {
    const slug = hash.replace('#', '')
    if (slug && site.categories.some((c) => c.slug === slug)) {
      setActive(slug)
      requestAnimationFrame(() =>
        document.getElementById('catalogue')?.scrollIntoView({ block: 'start' }),
      )
    }
  }, [hash])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return site.categories
      .filter((c) => active === 'all' || c.slug === active)
      .map((c) => ({
        ...c,
        variants: q
          ? c.variants.filter((v) => v.name.toLowerCase().includes(q))
          : c.variants,
      }))
      .filter((c) => (q ? c.variants.length > 0 : true))
  }, [active, query])

  const totalModels = site.categories.reduce((n, c) => n + c.variants.length, 0)

  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="Products"
        lead={`${totalModels} models across ${site.categories.length} ranges — Ravi brand jacks, garage tools, hydraulic and mechanical jacks, car jacks and machinery.`}
      />

      {/* Sticky filter rail — behaves like an app segmented control on mobile. */}
      <div
        id="catalogue"
        className="surface-glass sticky top-[var(--header-h)] z-30 border-b border-steel-200"
      >
        <div className="container-page py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Scrolls as a segmented control on touch; wraps once there is room. */}
            <div className="snap-rail -mx-1 flex min-w-0 flex-1 gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-x-visible lg:pb-0">
              {[{ slug: 'all', name: 'All ranges' }, ...site.categories].map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setActive(c.slug)}
                  className={cn(
                    'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95',
                    active === c.slug
                      ? 'bg-steel-900 text-white shadow-lift'
                      : 'bg-steel-100 text-steel-600 hover:bg-steel-200',
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <label className="relative shrink-0 lg:w-72">
              <span className="sr-only">Search models</span>
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-steel-400"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by model or tonnage…"
                className="h-11 w-full rounded-full border border-steel-200 bg-white pr-10 pl-10 text-sm text-steel-900 placeholder:text-steel-400 focus:border-steel-400 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-steel-400 hover:text-steel-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
          </div>
        </div>
      </div>

      <Section className="bg-steel-50">
        {visible.length === 0 && (
          <p className="py-16 text-center text-steel-500">
            No models match “{query}”. Try a tonnage such as “60” or a name such as
            “trolly”.
          </p>
        )}

        <div className="space-y-14">
          {visible.map((c) => (
            <article key={c.slug} id={c.slug} className="scroll-mt-40">
              <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-12">
                <div>
                  <div className="overflow-hidden rounded-xl2 border border-steel-200 bg-studio shadow-lift">
                    <img
                      src={c.image}
                      alt={c.name}
                      width={235}
                      height={157}
                      loading="lazy"
                      className="aspect-3/2 w-full object-cover"
                    />
                  </div>
                  <h2 className="mt-6 text-2xl text-steel-900 sm:text-3xl">{c.name}</h2>
                  <div className="rule-brand mt-4" />
                  <p className="mt-4 text-sm leading-relaxed text-steel-500">{c.blurb}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.applications.map((a) => (
                      <span
                        key={a}
                        className="rounded-full border border-steel-200 bg-white px-3 py-1 text-xs font-medium text-steel-600"
                      >
                        {a}
                      </span>
                    ))}
                  </div>

                  <Button to="/contact" variant="outline" className="mt-6">
                    Enquire about {c.name}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>

                <div>
                  <p className="text-eyebrow mb-4 text-steel-400">
                    {c.variants.length} {c.variants.length === 1 ? 'model' : 'models'}
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                    {c.variants.map((v) => (
                      <li
                        key={v.name}
                        className="flex items-center justify-between gap-3 rounded-xl border border-steel-200 bg-white px-4 py-3 transition-colors hover:border-steel-400"
                      >
                        <span className="text-sm font-medium text-steel-800">
                          {v.name}
                        </span>
                        {v.capacity && (
                          <span className="shrink-0 rounded-md bg-steel-900 px-2 py-0.5 font-mono text-[0.7rem] text-white">
                            {v.capacity}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
