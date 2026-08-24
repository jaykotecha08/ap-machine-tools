import { ArrowRight } from 'lucide-react'
import site from '../content/site'
import { Hero } from '../components/Hero'
import { StatsBand } from '../components/StatsBand'
import { Section, SectionHeading } from '../components/Section'
import { ProductCard } from '../components/ProductCard'
import { StoreProductCard } from '../components/StoreProductCard'
import products from '../content/products'
import { CapabilityGrid } from '../components/CapabilityGrid'
import { CtaBand } from '../components/CtaBand'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'

/** One model from four different ranges, so the strip shows the spread. */
const featuredSlugs = [
  'ravi-brand-jack-4-ton-jack',
  'garage-tools-engine-lifter-trolly',
  'hydraulic-jack-70-ton-hydraulic-jack',
  'car-jack-car-trolly-jack',
]

export default function Home() {
  const featured = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <>
      <Hero />
      <StatsBand />

      <Section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Our ranges"
            title="Six ranges, one standard of build"
            lead="From the 4 tonne Ravi screw jack to 80 tonne heavy lifting and custom hydraulic cylinders."
          />
          <Reveal delay={120}>
            <Button to="/store" variant="outline">
              Shop all {products.length} models
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60} className="h-full">
              <ProductCard category={c} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* A taste of the store itself, so the catalogue is one tap away. */}
      <Section className="bg-mist">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="In the store"
            title="Popular models"
            lead="Add what you need to a quote request and send the whole list in one message."
          />
          <Reveal delay={120}>
            <Button to="/store" variant="outline">
              Open the store
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60} className="h-full">
              <StoreProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* About strip */}
      <section className="relative overflow-hidden border-y border-steel-200 bg-mist">
        <div className="container-page relative grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <SectionHeading
            eyebrow="Who we are"
            title={site.about.heading}
            lead={site.about.paragraphs[0]}
          />
          <Reveal delay={100} className="space-y-5 text-sm leading-relaxed text-steel-600 lg:text-base">
            {site.about.paragraphs.slice(1, 3).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <Button to="/about" variant="outline">
              More about us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeading
          align="center"
          eyebrow="What we do"
          title="Engineering, supply and support"
          lead="Designing, manufacturing and marketing every class of jack we sell — plus the cylinders built to your drawing."
        />
        <div className="mt-12">
          <CapabilityGrid items={site.services} />
        </div>
      </Section>

      <Section className="bg-mist">
        <SectionHeading
          eyebrow="Quality"
          title="Checked at every process, tested at the end of every line"
          lead={site.qualityIntro}
        />
        <div className="mt-12">
          <CapabilityGrid items={site.quality} />
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
