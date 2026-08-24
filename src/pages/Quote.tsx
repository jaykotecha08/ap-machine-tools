import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, Send, CircleCheck, ShoppingBag, ArrowRight } from 'lucide-react'
import site from '../content/site'
import { PageHeader } from '../components/PageHeader'
import { Section } from '../components/Section'
import { Button } from '../components/Button'
import { useQuote } from '../lib/quote'

const field =
  'h-12 w-full rounded-xl border border-steel-200 bg-white px-4 text-sm text-steel-900 placeholder:text-steel-400 focus:border-steel-500 focus:outline-none transition-colors'

export default function Quote() {
  const { items, count, setQty, remove, clear } = useQuote()
  const [sent, setSent] = useState(false)

  /**
   * Preview build: no enquiry endpoint exists yet, so the basket is composed
   * into a mail draft. Swap this for a POST when the backend lands — the
   * basket contents are already a clean list of model names and quantities.
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const lines = items.map(
      (i) => `- ${i.product.name} (${i.product.categoryName})  ×${i.qty}`,
    )
    const body = [
      `Name: ${data.get('name')}`,
      `Company: ${data.get('company') || '—'}`,
      `Phone: ${data.get('phone')}`,
      `City: ${data.get('city') || '—'}`,
      '',
      `Quote request — ${count} unit${count === 1 ? '' : 's'} across ${items.length} model${items.length === 1 ? '' : 's'}:`,
      ...lines,
      '',
      `Notes: ${data.get('message') || '—'}`,
    ].join('\n')

    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      `Quote request — ${items.length} model${items.length === 1 ? '' : 's'}`,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="Quote request"
        title="Your quote request"
        lead="Add the models and quantities you need, then send the list in one message. We price to your quantity and specification."
      />

      <Section className="bg-mist">
        {items.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-xl2 border border-steel-200 bg-white p-10 text-center shadow-lift">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-steel-100 text-steel-400">
              <ShoppingBag className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl text-steel-900">Nothing here yet</h2>
            <p className="mt-2 text-sm text-steel-500">
              Browse the catalogue and add the models you are interested in. Your list
              is kept on this device until you send it.
            </p>
            <Button to="/store" className="mt-6">
              Browse the store
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
            {/* Basket lines */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-steel-500">
                  <span className="font-semibold text-steel-900">{items.length}</span>{' '}
                  {items.length === 1 ? 'model' : 'models'},{' '}
                  <span className="font-semibold text-steel-900">{count}</span>{' '}
                  {count === 1 ? 'unit' : 'units'}
                </p>
                <button
                  type="button"
                  onClick={clear}
                  className="text-sm font-medium text-steel-500 underline hover:text-brand-600"
                >
                  Clear all
                </button>
              </div>

              <ul className="space-y-3">
                {items.map(({ product, qty }) => (
                  <li
                    key={product.slug}
                    style={{ ['--accent' as string]: product.accent }}
                    className="flex gap-4 rounded-xl2 border border-steel-200 bg-white p-3 shadow-lift sm:p-4"
                  >
                    <Link
                      to={`/store/${product.slug}`}
                      className="shrink-0 self-start overflow-hidden rounded-xl bg-plinth"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        width={235}
                        height={157}
                        loading="lazy"
                        className="h-20 w-28 object-cover sm:h-24 sm:w-36"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="accent-chip w-fit rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold">
                        {product.categoryName}
                      </span>
                      <Link
                        to={`/store/${product.slug}`}
                        className="mt-1.5 text-base font-semibold text-steel-900 hover:text-brand-600"
                      >
                        {product.name}
                      </Link>
                      <span className="text-xs text-steel-500">{product.type}</span>

                      <div className="mt-auto flex items-center gap-2 pt-3">
                        <div className="flex h-9 items-center rounded-full border border-steel-200">
                          <button
                            type="button"
                            onClick={() => setQty(product.slug, qty - 1)}
                            aria-label={`Decrease quantity of ${product.name}`}
                            className="grid h-9 w-9 place-items-center rounded-l-full text-steel-600 hover:bg-steel-100"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-9 text-center font-mono text-sm">{qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(product.slug, qty + 1)}
                            aria-label={`Increase quantity of ${product.name}`}
                            className="grid h-9 w-9 place-items-center rounded-r-full text-steel-600 hover:bg-steel-100"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(product.slug)}
                          aria-label={`Remove ${product.name} from quote`}
                          className="grid h-9 w-9 place-items-center rounded-full text-steel-400 transition-colors hover:bg-brand-50 hover:text-brand-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact details */}
            <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
              <div className="rounded-xl2 border border-steel-200 bg-white p-6 shadow-lift">
                <h2 className="text-xl text-steel-900">Where should we send the quote?</h2>

                {sent ? (
                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                    <CircleCheck
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold text-emerald-900">
                        Your email draft is ready.
                      </p>
                      <p className="mt-1 text-sm text-emerald-800">
                        We opened your mail app with the full model list. If nothing
                        opened, write to{' '}
                        <a className="underline" href={`mailto:${site.contact.email}`}>
                          {site.contact.email}
                        </a>
                        .
                      </p>
                      <button
                        type="button"
                        onClick={() => setSent(false)}
                        className="mt-3 text-sm font-semibold text-emerald-900 underline"
                      >
                        Edit the request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
                    <label className="grid gap-1.5">
                      <span className="text-sm font-medium text-steel-700">Name *</span>
                      <input name="name" required className={field} placeholder="Your name" />
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-sm font-medium text-steel-700">Company</span>
                      <input name="company" className={field} placeholder="Company name" />
                    </label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="grid gap-1.5">
                        <span className="text-sm font-medium text-steel-700">Phone *</span>
                        <input
                          name="phone"
                          required
                          type="tel"
                          inputMode="tel"
                          className={field}
                          placeholder="Mobile"
                        />
                      </label>
                      <label className="grid gap-1.5">
                        <span className="text-sm font-medium text-steel-700">City</span>
                        <input name="city" className={field} placeholder="City" />
                      </label>
                    </div>
                    <label className="grid gap-1.5">
                      <span className="text-sm font-medium text-steel-700">Notes</span>
                      <textarea
                        name="message"
                        rows={3}
                        className="w-full rounded-xl border border-steel-200 bg-white p-4 text-sm text-steel-900 transition-colors placeholder:text-steel-400 focus:border-steel-500 focus:outline-none"
                        placeholder="Delivery location, timeline, special requirements…"
                      />
                    </label>

                    <Button type="submit" size="lg" className="mt-2 w-full">
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send quote request
                    </Button>

                    <p className="text-xs text-steel-400">
                      Preview build — this opens your mail app with the list filled in.
                      A server-side endpoint will replace it when the CMS goes live.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </Section>
    </>
  )
}
