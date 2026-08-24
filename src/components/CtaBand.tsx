import { ArrowRight, Phone } from 'lucide-react'
import site from '../content/site'
import { Button } from './Button'
import { Reveal } from './Reveal'

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-brand-600 text-white">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div className="container-page relative py-16 lg:py-20">
        <Reveal className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl leading-tight sm:text-4xl">
              Need a jack sized to your load?
            </h2>
            <p className="mt-3 text-brand-50">
              Tell us the capacity, the vehicle or the application. We build to standard
              ranges from 4 to 80 tonnes — and to your drawing when the standard range
              does not fit.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/contact" variant="light" size="lg">
              Request a quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              href={`tel:${site.contact.phoneDial}`}
              size="lg"
              className="border border-white/40 bg-transparent text-white shadow-none hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.contact.phone}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
