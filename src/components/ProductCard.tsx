import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { ProductCategory } from '../content/types'

export function ProductCard({ category }: { category: ProductCategory }) {
  const count = category.variants.length
  return (
    <Link
      to={`/products#${category.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl2 border border-steel-200 bg-white shadow-lift transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-steel-300 hover:shadow-lift-lg"
    >
      <div className="relative aspect-3/2 overflow-hidden bg-studio">
        <img
          src={category.image}
          alt={category.name}
          width={235}
          height={157}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
        />
        {/* Grounds the warm studio photograph against the cool steel UI. */}
        <span
          className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-steel-950/25 to-transparent"
          aria-hidden="true"
        />
        <span className="absolute top-3 left-3 rounded-full bg-steel-950/85 px-2.5 py-1 font-mono text-[0.65rem] font-medium text-white">
          {count} {count === 1 ? 'model' : 'models'}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl text-steel-900">{category.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-steel-500">
          {category.blurb}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          View range
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  )
}
