import site from './site'
import type { Product } from './types'

/**
 * The store catalogue, derived from the category variants in `site.ts` rather
 * than duplicated. Every product here traces back to a model published on the
 * current apmachinetools.net catalogue — nothing is invented.
 *
 * Per-product photography does not exist yet, so each product inherits its
 * category image. Add `image` overrides here once real photos arrive.
 */

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/["”“]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Reads the build type off the model name; falls back to the category. */
function typeOf(name: string, categoryName: string): string {
  const n = name.toLowerCase()
  if (n.includes('double screw')) return 'Double screw jack'
  if (n.includes('hydraulic cylinder') || n.includes('cylinders')) return 'Hydraulic cylinder'
  if (n.includes('hydraulic')) return 'Hydraulic jack'
  if (n.includes('trolly') || n.includes('trolley')) return 'Trolley'
  if (n.includes('stand') || n.includes('board')) return 'Stand'
  if (n.includes('table')) return 'Table'
  if (n.includes('accessories')) return 'Accessories'
  if (n.includes('chasis') || n.includes('chesis')) return 'Chassis jack'
  if (n.includes('jack')) return 'Screw jack'
  return categoryName
}

function describe(name: string, categoryName: string, capacity?: string): string {
  return capacity
    ? `${name} — a ${capacity.replace(' T', ' tonne')} unit from the ${categoryName} range, built and performance tested at our Rajkot works.`
    : `${name} from the ${categoryName} range, built and performance tested at our Rajkot works.`
}

export const products: Product[] = site.categories.flatMap((category) =>
  category.variants.map((variant) => ({
    slug: `${category.slug}-${slugify(variant.name)}`,
    name: variant.name,
    categorySlug: category.slug,
    categoryName: category.name,
    accent: category.accent,
    image: category.image,
    capacity: variant.capacity,
    type: typeOf(variant.name, category.name),
    applications: category.applications,
    blurb: describe(variant.name, category.name, variant.capacity),
  })),
)

export function productBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

/** Numeric tonnage parsed from `capacity`, for sorting. Undefined sorts last. */
export function tonnage(product: Product): number | undefined {
  const m = product.capacity?.match(/(\d+)/)
  return m ? Number(m[1]) : undefined
}

export default products
