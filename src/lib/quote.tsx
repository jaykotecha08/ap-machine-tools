import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { productBySlug } from '../content/products'
import type { Product } from '../content/types'

/**
 * The quote basket.
 *
 * This is a request-for-quote store, not a checkout: the source catalogue
 * publishes no prices, so inventing them would be dishonest. Customers build a
 * list of models and quantities and send it as one enquiry. When the database
 * supplies real pricing, set `Product.price` and the totals below start
 * rendering — no other change is needed.
 */

const STORAGE_KEY = 'apmt.quote.v1'

export interface QuoteLine {
  slug: string
  qty: number
}

export interface QuoteItem extends QuoteLine {
  product: Product
}

interface QuoteApi {
  lines: QuoteLine[]
  items: QuoteItem[]
  count: number
  add: (slug: string, qty?: number) => void
  setQty: (slug: string, qty: number) => void
  remove: (slug: string) => void
  clear: () => void
  has: (slug: string) => boolean
}

const QuoteContext = createContext<QuoteApi | null>(null)

function read(): QuoteLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // Drop anything that no longer matches a real product, so a catalogue
    // change cannot leave a basket referencing a missing model.
    return parsed
      .filter(
        (l): l is QuoteLine =>
          typeof l === 'object' &&
          l !== null &&
          typeof (l as QuoteLine).slug === 'string' &&
          Number.isFinite((l as QuoteLine).qty),
      )
      .map((l) => ({ slug: l.slug, qty: Math.max(1, Math.min(999, Math.round(l.qty))) }))
      .filter((l) => productBySlug(l.slug))
  } catch {
    // Private mode, disabled storage, corrupt JSON — an empty basket is fine.
    return []
  }
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<QuoteLine[]>([])

  // Hydrate after mount so server-less prerendering and private mode both work.
  useEffect(() => setLines(read()), [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* storage unavailable — the basket still works for this session */
    }
  }, [lines])

  const add = useCallback((slug: string, qty = 1) => {
    if (!productBySlug(slug)) return
    setLines((prev) => {
      const found = prev.find((l) => l.slug === slug)
      if (!found) return [...prev, { slug, qty: Math.max(1, qty) }]
      return prev.map((l) =>
        l.slug === slug ? { ...l, qty: Math.min(999, l.qty + qty) } : l,
      )
    })
  }, [])

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(999, qty) } : l)),
    )
  }, [])

  const remove = useCallback(
    (slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
    [],
  )

  const clear = useCallback(() => setLines([]), [])

  const value = useMemo<QuoteApi>(() => {
    const items = lines.flatMap<QuoteItem>((l) => {
      const product = productBySlug(l.slug)
      return product ? [{ ...l, product }] : []
    })
    return {
      lines,
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      add,
      setQty,
      remove,
      clear,
      has: (slug: string) => lines.some((l) => l.slug === slug),
    }
  }, [lines, add, setQty, remove, clear])

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}

export function useQuote(): QuoteApi {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote must be used inside <QuoteProvider>')
  return ctx
}

/** Renders a price once the database supplies one. Unused until then. */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}
