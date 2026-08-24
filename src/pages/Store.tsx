import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import site from '../content/site'
import products, { tonnage } from '../content/products'
import { PageHeader } from '../components/PageHeader'
import { Section } from '../components/Section'
import { StoreProductCard } from '../components/StoreProductCard'
import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'
import { cn } from '../lib/cn'

type Sort = 'featured' | 'capacity-asc' | 'capacity-desc' | 'name'

const sorts: { value: Sort; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'capacity-asc', label: 'Capacity: low to high' },
  { value: 'capacity-desc', label: 'Capacity: high to low' },
  { value: 'name', label: 'Name A–Z' },
]

export default function Store() {
  // Category and search live in the URL so a filtered view is shareable.
  const [params, setParams] = useSearchParams()
  const category = params.get('category') ?? 'all'
  const query = params.get('q') ?? ''
  const [sort, setSort] = useState<Sort>('featured')
  const [draft, setDraft] = useState(query)

  useEffect(() => setDraft(query), [query])

  function update(next: { category?: string; q?: string }) {
    const p = new URLSearchParams(params)
    for (const [k, v] of Object.entries(next)) {
      if (!v || v === 'all' || v === '') p.delete(k)
      else p.set(k, v)
    }
    setParams(p, { replace: true })
  }

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = products.filter((p) => {
      if (category !== 'all' && p.categorySlug !== category) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        (p.capacity?.toLowerCase().includes(q) ?? false)
      )
    })

    const byTonnage = (dir: 1 | -1) => (a: typeof list[number], b: typeof list[number]) => {
      const ta = tonnage(a)
      const tb = tonnage(b)
      // Models without a published tonnage always sort last, either direction.
      if (ta === undefined && tb === undefined) return a.name.localeCompare(b.name)
      if (ta === undefined) return 1
      if (tb === undefined) return -1
      return (ta - tb) * dir
    }

    if (sort === 'capacity-asc') return [...list].sort(byTonnage(1))
    if (sort === 'capacity-desc') return [...list].sort(byTonnage(-1))
    if (sort === 'name') return [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [category, query, sort])

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const p of products) map.set(p.categorySlug, (map.get(p.categorySlug) ?? 0) + 1)
    return map
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Online store"
        title="Browse the full catalogue"
        lead={`All ${products.length} models across ${site.categories.length} ranges. Build a quote request and send it in one go — we price to your quantity and specification.`}
      />

      {/* Sticky control bar — a segmented control on touch, a toolbar on desktop. */}
      <div className="surface-glass sticky top-[var(--header-h)] z-30 border-b border-steel-200">
        <div className="container-page py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="snap-rail -mx-1 flex min-w-0 flex-1 gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-x-visible lg:pb-0">
              <button
                type="button"
                onClick={() => update({ category: 'all' })}
                className={cn(
                  'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95',
                  category === 'all'
                    ? 'bg-steel-900 text-white shadow-lift'
                    : 'bg-steel-100 text-steel-600 hover:bg-steel-200',
                )}
              >
                All <span className="opacity-60">{products.length}</span>
              </button>
              {site.categories.map((c) => {
                const on = category === c.slug
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => update({ category: c.slug })}
                    style={
                      on
                        ? { background: c.accent, color: 'white' }
                        : { ['--accent' as string]: c.accent }
                    }
                    className={cn(
                      'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95',
                      on ? 'shadow-lift' : 'accent-chip border',
                    )}
                  >
                    {c.name} <span className="opacity-60">{counts.get(c.slug)}</span>
                  </button>
                )
              })}
            </div>

            <div className="flex shrink-0 gap-2">
              <label className="relative min-w-0 flex-1 lg:w-64 lg:flex-none">
                <span className="sr-only">Search products</span>
                <Search
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-steel-400"
                  aria-hidden="true"
                />
                <input
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value)
                    update({ q: e.target.value })
                  }}
                  placeholder="Search model or tonnage…"
                  className="h-11 w-full rounded-full border border-steel-200 bg-white pr-10 pl-10 text-sm text-steel-900 placeholder:text-steel-400 focus:border-steel-400 focus:outline-none"
                />
                {draft && (
                  <button
                    type="button"
                    onClick={() => {
                      setDraft('')
                      update({ q: '' })
                    }}
                    aria-label="Clear search"
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-steel-400 hover:text-steel-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </label>

              <label className="relative shrink-0">
                <span className="sr-only">Sort products</span>
                <SlidersHorizontal
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-steel-400"
                  aria-hidden="true"
                />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="h-11 w-[3.25rem] appearance-none rounded-full border border-steel-200 bg-white pr-2 pl-10 text-sm font-medium text-steel-800 focus:border-steel-400 focus:outline-none sm:w-auto sm:pr-4"
                >
                  {sorts.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>

      <Section className="bg-mist">
        <p className="mb-6 text-sm text-steel-500">
          Showing <span className="font-semibold text-steel-900">{visible.length}</span> of{' '}
          {products.length} models
          {category !== 'all' &&
            ` in ${site.categories.find((c) => c.slug === category)?.name}`}
          {query && ` matching “${query}”`}
        </p>

        {visible.length === 0 ? (
          <div className="rounded-xl2 border border-steel-200 bg-white py-16 text-center">
            <p className="text-steel-600">
              No models match that search. Try a tonnage such as “60”, or a name such
              as “trolly”.
            </p>
            <button
              type="button"
              onClick={() => update({ q: '', category: 'all' })}
              className="mt-4 text-sm font-semibold text-brand-600 underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i, 8) * 45} className="h-full">
                <StoreProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      <CtaBand />
    </>
  )
}
