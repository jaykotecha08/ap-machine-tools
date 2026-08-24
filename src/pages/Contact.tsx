import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CircleCheck, MessageCircle } from 'lucide-react'
import site from '../content/site'
import { PageHeader } from '../components/PageHeader'
import { Section } from '../components/Section'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'

const field =
  'h-12 w-full rounded-xl border border-steel-200 bg-white px-4 text-sm text-steel-900 placeholder:text-steel-400 focus:border-steel-500 focus:outline-none transition-colors'

export default function Contact() {
  const [sent, setSent] = useState(false)

  /**
   * Preview build: there is no backend yet, so the form composes a mail draft.
   * When the CMS/API lands, swap this for a POST to the enquiry endpoint.
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const body = [
      `Name: ${data.get('name')}`,
      `Company: ${data.get('company') || '—'}`,
      `Phone: ${data.get('phone')}`,
      `Product interest: ${data.get('product')}`,
      '',
      String(data.get('message') ?? ''),
    ].join('\n')

    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      `Enquiry — ${data.get('product')}`,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const details = [
    {
      icon: Phone,
      label: 'Phone',
      value: site.contact.phone,
      href: `tel:${site.contact.phoneDial}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: site.contact.email,
      href: `mailto:${site.contact.email}`,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Message us',
      href: `https://wa.me/${site.contact.whatsapp}`,
    },
    {
      icon: MapPin,
      label: 'Works & office',
      value: `${site.contact.addressLines.join(', ')}, ${site.contact.pincode}`,
      href: site.contact.mapsUrl,
    },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s talk about your load"
        lead="Send the capacity, the vehicle or the drawing. We will come back with the right model and a price."
      />

      <Section className="bg-steel-50">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          {/* Details */}
          <Reveal className="space-y-4">
            {details.map(({ icon: I, label, value, href }) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="flex items-start gap-4 rounded-xl2 border border-steel-200 bg-white p-5 shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:border-steel-300"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <I className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="text-eyebrow block text-steel-400">{label}</span>
                  <span className="mt-1 block text-sm font-semibold break-words text-steel-900">
                    {value}
                  </span>
                </span>
              </a>
            ))}

            <div className="rounded-xl2 border border-steel-200 bg-white p-5 shadow-lift">
              <span className="inline-flex items-center gap-2 text-eyebrow text-steel-400">
                <Clock className="h-4 w-4" aria-hidden="true" /> Working hours
              </span>
              <ul className="mt-3 space-y-1.5 text-sm text-steel-700">
                {site.contact.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span className="font-medium">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Enquiry form */}
          <Reveal delay={100}>
            <div className="rounded-xl2 border border-steel-200 bg-white p-6 shadow-lift sm:p-8">
              <h2 className="text-2xl text-steel-900">Request a quote</h2>
              <p className="mt-2 text-sm text-steel-500">
                Fields marked * are required.
              </p>

              {sent ? (
                <div className="mt-8 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                  <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">
                      Your email draft is ready.
                    </p>
                    <p className="mt-1 text-sm text-emerald-800">
                      We have opened your mail app with the enquiry filled in. If nothing
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
                      Send another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5">
                      <span className="text-sm font-medium text-steel-700">Name *</span>
                      <input name="name" required className={field} placeholder="Your name" />
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-sm font-medium text-steel-700">Company</span>
                      <input name="company" className={field} placeholder="Company name" />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5">
                      <span className="text-sm font-medium text-steel-700">Phone *</span>
                      <input
                        name="phone"
                        required
                        type="tel"
                        inputMode="tel"
                        className={field}
                        placeholder="Mobile number"
                      />
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-sm font-medium text-steel-700">
                        Product interest *
                      </span>
                      <select name="product" required defaultValue="" className={field}>
                        <option value="" disabled>
                          Select a range
                        </option>
                        {site.categories.map((c) => (
                          <option key={c.slug} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                        <option value="Custom / tailor-made">Custom / tailor-made</option>
                      </select>
                    </label>
                  </div>

                  <label className="grid gap-1.5">
                    <span className="text-sm font-medium text-steel-700">
                      Requirement *
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full rounded-xl border border-steel-200 bg-white p-4 text-sm text-steel-900 transition-colors placeholder:text-steel-400 focus:border-steel-500 focus:outline-none"
                      placeholder="Capacity needed, vehicle or application, quantity…"
                    />
                  </label>

                  <Button type="submit" size="lg" className="mt-2 w-full sm:w-auto">
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send enquiry
                  </Button>

                  <p className="text-xs text-steel-400">
                    Preview build — this form opens your mail app. A server-side enquiry
                    endpoint will replace it when the CMS goes live.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Map */}
      <section aria-label="Location map" className="border-t border-steel-200">
        <iframe
          title={`Map to ${site.company.legalName}`}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            site.contact.mapsEmbedQuery,
          )}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[22rem] w-full border-0 grayscale-[0.35] sm:h-[26rem]"
        />
      </section>
    </>
  )
}
