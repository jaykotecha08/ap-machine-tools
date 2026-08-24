import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import site from '../content/site'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="bg-steel-950 text-steel-400">
      <div className="bg-grid">
        <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              {site.company.tagline}. Designing, manufacturing and marketing hydraulic
              jacks, mechanical screw jacks and garage tools under the{' '}
              <span className="text-white">Ravi</span> and{' '}
              <span className="text-white">A.P.</span> brands.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-eyebrow mb-4 text-white">Navigate</h3>
            <ul className="space-y-2.5 text-sm">
              {site.nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="transition-colors hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Product categories">
            <h3 className="text-eyebrow mb-4 text-white">Products</h3>
            <ul className="space-y-2.5 text-sm">
              {site.categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/products#${c.slug}`}
                    className="transition-colors hover:text-white"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-eyebrow mb-4 text-white">Get in touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                <span>
                  {site.contact.addressLines.join(', ')}
                  <br />
                  {site.contact.pincode}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                <a href={`tel:${site.contact.phoneDial}`} className="hover:text-white">
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-brand-400"
                >
                  Open in Google Maps
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.company.legalName}. All rights reserved.
          </p>
          <p>Ravi® &amp; A.P.® are brands of {site.company.legalName}.</p>
        </div>
      </div>
    </footer>
  )
}
