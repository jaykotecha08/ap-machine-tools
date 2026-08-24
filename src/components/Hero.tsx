import { ArrowRight, Phone, CircleCheck } from 'lucide-react'
import site from '../content/site'
import { Button } from './Button'

const proof = ['SQC quality control', '100% performance tested', 'Est. 2000, Rajkot']

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-steel-950 text-white">
      {/* Machined backdrop: hairline grid, brand glow, angular light sweep. */}
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div
        className="absolute -top-40 -right-32 h-[38rem] w-[38rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(238,43,43,0.55) 0%, rgba(238,43,43,0) 65%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-1/2 hidden w-px bg-linear-to-b from-transparent via-white/15 to-transparent lg:block"
        aria-hidden="true"
      />

      <div className="container-page relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div>
          <p className="text-eyebrow inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Ravi &amp; A.P. — since {site.company.established}
          </p>

          <h1 className="mt-6 text-[2.6rem] leading-[0.98] sm:text-6xl lg:text-[4.25rem]">
            Jacks that hold
            <br />
            <span className="text-brand-500">when it matters.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-steel-300 sm:text-lg">
            Hydraulic jacks, mechanical screw jacks, garage tools and tailor-made
            hydraulic cylinders — designed and manufactured in Rajkot for Tata and
            Leyland trailers, tractor automobiles and industry.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/products" size="lg">
              Explore the catalogue
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href={`tel:${site.contact.phoneDial}`} variant="light" size="lg">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Talk to us
            </Button>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-steel-400">
            {proof.map((p) => (
              <li key={p} className="inline-flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-brand-500" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Product plinth — the real Ravi 4-ton jack, lit like a spec sheet. */}
        <div className="relative">
          <div className="relative mx-auto max-w-md">
            <div
              className="absolute inset-0 -m-6 rounded-[2rem] border border-white/10 bg-white/[0.03]"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-linear-to-b from-white/10 to-white/[0.02] p-8">
              <div className="overflow-hidden rounded-xl border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)]">
                <img
                  src={site.categories[0].image}
                  alt="Ravi brand 4 tonne mechanical screw jack"
                  width={235}
                  height={157}
                  className="aspect-3/2 w-full object-cover"
                />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
                {[
                  { k: 'Capacity', v: '4–80 T' },
                  { k: 'Categories', v: '6' },
                  { k: 'Tested', v: '100%' },
                ].map((s) => (
                  <div key={s.k}>
                    <p className="font-mono text-lg font-medium text-white">{s.v}</p>
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

      {/* Scrolling capability ticker — reads as a factory readout. */}
      <div className="relative border-t border-white/10 bg-steel-950/60 py-4">
        <div className="snap-rail flex gap-8 overflow-x-auto px-5 text-eyebrow text-steel-500 sm:justify-center">
          {site.categories.map((c) => (
            <span key={c.slug} className="whitespace-nowrap">
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
