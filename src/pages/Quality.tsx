import site from '../content/site'
import { PageHeader } from '../components/PageHeader'
import { Section, SectionHeading } from '../components/Section'
import { CapabilityGrid } from '../components/CapabilityGrid'
import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'

const process = [
  { step: '01', title: 'Material inward', body: 'Parts and materials are checked before they enter the line.' },
  { step: '02', title: 'In-process control', body: 'Every process step carries its own inspection under SQC systems.' },
  { step: '03', title: 'Directorial check', body: 'Inspection under the practical supervision of a company director.' },
  { step: '04', title: 'Performance test', body: '100% of units tested for performance as per Indian Standards recommendations.' },
]

export default function Quality() {
  return (
    <>
      <PageHeader
        eyebrow="Quality"
        title="Quality is not a stage. It is every stage."
        lead={site.qualityIntro}
      />

      <Section>
        <SectionHeading
          eyebrow="Our commitments"
          title="Four things we do not compromise on"
          align="center"
        />
        <div className="mt-12">
          <CapabilityGrid items={site.quality} />
        </div>
      </Section>

      <Section className="bg-steel-900 text-white">
        <SectionHeading
          tone="dark"
          eyebrow="The process"
          title="From material inward to performance test"
          lead="A jack that fails in the field is a safety event, not a warranty claim. That is why nothing leaves untested."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl2 border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 80} as="li" className="bg-steel-900 p-6">
              <span className="font-mono text-3xl font-medium text-brand-500">{p.step}</span>
              <h3 className="mt-4 text-lg text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-400">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section className="bg-white">
        <Reveal className="mx-auto max-w-3xl rounded-xl2 border border-steel-200 bg-steel-50 p-8 text-center sm:p-12">
          <p className="font-display text-2xl leading-snug text-steel-900 sm:text-3xl">
            “Our products are marked by excellent reliability, durability and a high
            standard of performance.”
          </p>
          <p className="mt-6 text-sm font-semibold text-steel-700">
            {site.company.director}
          </p>
          <p className="text-sm text-steel-500">Director, {site.company.legalName}</p>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  )
}
