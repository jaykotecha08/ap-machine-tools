import { Link } from 'react-router-dom'
import { Plus, Check } from 'lucide-react'
import type { Product } from '../content/types'
import { useQuote } from '../lib/quote'
import { cn } from '../lib/cn'

export function StoreProductCard({ product }: { product: Product }) {
  const { add, has } = useQuote()
  const inQuote = has(product.slug)

  return (
    <article
      style={{ ['--accent' as string]: product.accent }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl2 border border-steel-200 bg-white shadow-lift transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-lift-lg"
    >
      <span className="accent-bar h-1 w-full" aria-hidden="true" />

      {/* Only six catalogue photographs exist, one per range, so many models
          share an image. Capacity is the real differentiator when choosing a
          jack, so it leads the card and each one reads distinctly. */}
      <Link to={`/store/${product.slug}`} className="block">
        <div className="relative aspect-16/10 overflow-hidden bg-plinth">
          <img
            src={product.image}
            alt={product.name}
            width={235}
            height={157}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
          <span
            className="absolute inset-0 bg-linear-to-t from-steel-950/75 via-steel-950/10 to-transparent"
            aria-hidden="true"
          />
          <span className="absolute bottom-2 left-3 flex items-baseline gap-1.5 text-white sm:bottom-3 sm:left-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {product.capacity ? (
              <>
                <span className="font-display text-2xl leading-none font-bold sm:text-3xl">
                  {product.capacity.replace(' T', '')}
                </span>
                <span className="font-mono text-xs opacity-80">tonne</span>
              </>
            ) : (
              <span className="font-display text-sm leading-none font-bold sm:text-lg">
                {product.type}
              </span>
            )}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <span className="accent-chip w-fit rounded-full border px-2 py-0.5 text-[0.62rem] font-semibold sm:px-2.5 sm:py-1 sm:text-[0.68rem]">
          {product.categoryName}
        </span>

        <h3 className="mt-2 text-[0.95rem] leading-snug text-steel-900 sm:mt-3 sm:text-lg">
          <Link to={`/store/${product.slug}`} className="hover:text-brand-600">
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {product.name}
          </Link>
        </h3>

        <p className="mt-1 text-xs text-steel-500 sm:text-sm">{product.type}</p>

        {/* Stacks on the narrow two-up mobile column, sits inline once there
            is room. No price: the source catalogue publishes none, so the
            store collects quote requests instead of taking payment. */}
        <div className="mt-auto flex flex-col items-stretch gap-2 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-5">
          <span className="text-xs font-semibold text-steel-600 sm:text-sm">
            Price on request
          </span>
          <button
            type="button"
            onClick={() => add(product.slug)}
            aria-label={`Add ${product.name} to quote request`}
            className={cn(
              'relative z-10 inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-all duration-200 active:scale-95 sm:h-10 sm:w-auto sm:px-4 sm:text-sm',
              inQuote
                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                : 'bg-steel-900 text-white hover:bg-brand-600',
            )}
          >
            {inQuote ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" /> Added
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" aria-hidden="true" /> Quote
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
