import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ChevronRight,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Gauge,
  Factory,
  ArrowRight,
} from 'lucide-react'
import site from '../content/site'
import products, { productBySlug } from '../content/products'
import { Section } from '../components/Section'
import { StoreProductCard } from '../components/StoreProductCard'
import { CtaBand } from '../components/CtaBand'
import { Button } from '../components/Button'
import NotFound from './NotFound'
import { useQuote } from '../lib/quote'
import { cn } from '../lib/cn'

const assurances = [
  { icon: ShieldCheck, text: 'Inspected at each process under SQC systems' },
  { icon: Gauge, text: '100% performance tested per Indian Standards' },
  { icon: Factory, text: 'Manufactured at our own Rajkot works' },
]

export default function ProductDetail() {
  const { slug = '' } = useParams()
  const product = productBySlug(slug)
  const { add, has } = useQuote()
  const [qty, setQty] = useState(1)

  if (!product) return <NotFound />

  const category = site.categories.find((c) => c.slug === product.categorySlug)
  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, 4)
  const inQuote = has(product.slug)

  const specs = [
    { k: 'Model', v: product.name },
    { k: 'Range', v: product.categoryName },
    { k: 'Type', v: product.type },
    ...(product.capacity ? [{ k: 'Rated capacity', v: product.capacity }] : []),
    { k: 'Brand', v: 'Ravi / A.P.' },
    { k: 'Made in', v: `${site.company.city}, ${site.company.state}` },
  ]

  return (
    <div style={{ ['--accent' as string]: product.accent }}>
      <div className="bg-dawn">
        <div className="container-page pt-6 pb-14 sm:pt-8 sm:pb-20">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-steel-500">
            <Link to="/store" className="hover:text-steel-900">Store</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <Link to={`/store?category=${product.categorySlug}`} className="hover:text-steel-900">
              {product.categoryName}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium text-steel-900">{product.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="self-start overflow-hidden rounded-xl2 border border-steel-200 bg-plinth shadow-lift">
              <img
                src={product.image}
                alt={product.name}
                width={235}
                height={157}
                className="aspect-3/2 w-full object-cover"
              />
            </div>

            <div>
              <span className="accent-chip inline-block rounded-full border px-3 py-1 text-xs font-semibold">
                {product.categoryName}
              </span>

              <h1 className="mt-4 text-4xl leading-[1.05] text-steel-900 sm:text-5xl">
                {product.name}
              </h1>

              {product.capacity && (
                <p className="mt-4 inline-flex items-baseline gap-2 rounded-xl bg-steel-900 px-4 py-2 font-mono text-white">
                  <span className="text-2xl font-medium">{product.capacity}</span>
                  <span className="text-xs opacity-70">rated capacity</span>
                </p>
              )}

              <p className="mt-5 text-base leading-relaxed text-steel-600">{product.blurb}</p>

              {/* No published price, so the page collects a quote request. */}
              <div className="mt-8 rounded-xl2 border border-steel-200 bg-white p-5 shadow-lift">
                <p className="text-sm text-steel-500">
                  Price on request — quoted to your quantity and specification.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex h-12 items-center rounded-full border border-steel-200">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="grid h-12 w-12 place-items-center rounded-l-full text-steel-600 transition-colors hover:bg-steel-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span
                      className="w-12 text-center font-mono text-base font-medium"
                      aria-live="polite"
                      aria-label={`Quantity ${qty}`}
                    >
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.min(999, q + 1))}
                      aria-label="Increase quantity"
                      className="grid h-12 w-12 place-items-center rounded-r-full text-steel-600 transition-colors hover:bg-steel-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => add(product.slug, qty)}
                    className={cn(
                      'inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all duration-200 active:scale-[0.97] sm:flex-none',
                      inQuote
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-brand-600 text-white shadow-[0_8px_24px_-8px_rgba(221,28,17,0.6)] hover:bg-brand-700',
                    )}
                  >
                    {inQuote ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" /> In your quote — add more
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" aria-hidden="true" /> Add to quote
                      </>
                    )}
                  </button>
                </div>

                {inQuote && (
                  <Link
                    to="/quote"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
                  >
                    Review quote request
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>

              <ul className="mt-6 space-y-2.5">
                {assurances.map(({ icon: I, text }) => (
                  <li key={text} className="flex items-center gap-2.5 text-sm text-steel-600">
                    <I className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Section className="bg-white">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="text-2xl text-steel-900">Specification</h2>
            <div className="rule-brand mt-4" />
            <dl className="mt-6 divide-y divide-steel-200 overflow-hidden rounded-xl2 border border-steel-200">
              {specs.map((s) => (
                <div key={s.k} className="flex justify-between gap-4 bg-white px-5 py-3.5">
                  <dt className="text-sm text-steel-500">{s.k}</dt>
                  <dd className="text-sm font-semibold text-steel-900">{s.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-steel-400">
              Dimensions, weight and lift height are confirmed on quotation — they are
              not published in the current catalogue.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-steel-900">Typical applications</h2>
            <div className="rule-brand mt-4" />
            <div className="mt-6 flex flex-wrap gap-2">
              {product.applications.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-steel-200 bg-steel-50 px-3.5 py-1.5 text-sm text-steel-700"
                >
                  {a}
                </span>
              ))}
            </div>
            {category && (
              <p className="mt-6 text-sm leading-relaxed text-steel-600">{category.blurb}</p>
            )}
            <Button to={`/store?category=${product.categorySlug}`} variant="outline" className="mt-6">
              See the whole {product.categoryName} range
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="bg-mist">
          <h2 className="text-2xl text-steel-900 sm:text-3xl">Others in this range</h2>
          <div className="rule-brand mt-4" />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((p) => (
              <StoreProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </div>
  )
}
