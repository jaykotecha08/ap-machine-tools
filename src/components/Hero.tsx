import { Link } from 'react-router-dom'
import { ArrowRight, Phone, CircleCheck } from 'lucide-react'
import site from '../content/site'
import products from '../content/products'
import { Button } from './Button'

const proof = ['SQC quality control', '100% performance tested', `Est. ${site.company.established}, Rajkot`]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-dawn">
      <div className="absolute inset-0 bg-blueprint opacity-70" aria-hidden="true" />

      <div className="container-page relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div>
          <p className="text-eyebrow inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-brand-700 shadow-lift">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Ravi &amp; A.P. — since {site.company.established}
          </p>

          <h1 className="mt-6 text-[2.7rem] leading-[0.98] text-steel-900 sm:text-6xl lg:text-[4.25rem]">
            Jacks that hold
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-brand-600">when it matters.</span>
              {/* Hand-drawn style underline — a spot of warmth against the grid. */}
              <svg
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-2.5 w-full text-amber-load"
              >
                <path
                  d="M2 8 C 60 2, 120 2, 180 6 S 260 10, 298 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-relaxed text-steel-600 sm:text-lg">
            Hydraulic jacks, mechanical screw jacks, garage tools and tailor-made
            hydraulic cylinders — designed and manufactured in Rajkot for Tata and
            Leyland trailers, tractor automobiles and industry.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/store" size="lg">
              Browse {products.length} products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href={`tel:${site.contact.phoneDial}`} variant="outline" size="lg">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Talk to us
            </Button>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-steel-600">
            {proof.map((p) => (
              <li key={p} className="inline-flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Product plinth: the real Ravi 4-tonne jack on a lit stage. */}
        <div className="relative">
          <div className="relative mx-auto max-w-md">
            <div
              className="absolute inset-0 -m-5 rotate-2 rounded-[2rem] bg-linear-to-br from-amber-load/25 to-brand-500/20"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white bg-white p-4 shadow-lift-lg">
              <div className="overflow-hidden rounded-xl bg-plinth">
                <img
                  src={site.categories[0].image}
                  alt="Ravi brand 4 tonne mechanical screw jack"
                  width={235}
                  height={157}
                  className="aspect-3/2 w-full object-cover"
                />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-steel-200 pt-5 text-center">
                {[
                  { k: 'Capacity', v: '4–80 T' },
                  { k: 'Models', v: String(products.length) },
                  { k: 'Tested', v: '100%' },
                ].map((s) => (
                  <div key={s.k}>
                    <p className="font-mono text-lg font-medium text-steel-900">{s.v}</p>
                    <p className="text-eyebrow mt-1 text-[0.58rem] text-steel-400">{s.k}</p>
                  </div>
                ))}
              </div>
            </div>
            <span className="absolute -top-3 -left-3 rounded-full bg-brand-600 px-3.5 py-1.5 text-[0.7rem] font-semibold tracking-wide text-white shadow-lift">
              Ravi® Brand
            </span>
          </div>
        </div>
      </div>

      {/* Category rail — colour-coded, doubles as quick navigation. */}
      <div className="relative border-t border-steel-200 bg-white/70">
        <div className="snap-rail container-page flex gap-2 overflow-x-auto py-3">
          {site.categories.map((c) => (
            <Link
              key={c.slug}
              to={`/store?category=${c.slug}`}
              style={{ ['--accent' as string]: c.accent }}
              className="accent-chip shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-transform duration-200 active:scale-95"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
