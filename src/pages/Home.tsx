import { ArrowRight } from 'lucide-react'
import site from '../content/site'
import { Hero } from '../components/Hero'
import { StatsBand } from '../components/StatsBand'
import { Section, SectionHeading } from '../components/Section'
import { ProductCard } from '../components/ProductCard'
import { CapabilityGrid } from '../components/CapabilityGrid'
import { CtaBand } from '../components/CtaBand'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />

      <Section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Our product"
            title="Six ranges, one standard of build"
            lead="From the 4 tonne Ravi screw jack to 80 tonne heavy lifting and custom hydraulic cylinders."
          />
          <Reveal delay={120}>
            <Button to="/products" variant="outline">
              View all products
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

      {/* About strip */}
      <section className="relative overflow-hidden bg-steel-900 text-white">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="container-page relative grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <SectionHeading
            tone="dark"
            eyebrow="Who we are"
            title={site.about.heading}
            lead={site.about.paragraphs[0]}
          />
          <Reveal delay={100} className="space-y-5 text-sm leading-relaxed text-steel-300 lg:text-base">
            {site.about.paragraphs.slice(1, 3).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <Button to="/about" variant="light">
              More about us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
      </section>

      <Section className="bg-steel-50">
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

      <Section className="bg-white">
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
