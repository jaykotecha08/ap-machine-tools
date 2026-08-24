import site from '../content/site'
import { PageHeader } from '../components/PageHeader'
import { Section, SectionHeading } from '../components/Section'
import { StatsBand } from '../components/StatsBand'
import { CapabilityGrid } from '../components/CapabilityGrid'
import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'

const timeline = [
  {
    year: '2000',
    title: 'Founded in Rajkot',
    body: 'A. P. Machine Tools is established in Rajkot, Gujarat, to serve the need for quality jack and hydraulic jack products.',
  },
  {
    year: 'Brand',
    title: 'Ravi & A.P. take shape',
    body: 'The two marks become known as a symbol of quality in hydraulic jacks for Tata and Leyland tractor trailers.',
  },
  {
    year: 'Industry',
    title: 'Beyond the trailer',
    body: 'Hydraulic cylinders for cement concrete mixers and other tailor-made cylinders extend the range into industrial duty.',
  },
  {
    year: 'Today',
    title: 'Six ranges, one standard',
    body: 'Hydraulic jacks, jack accessories, mechanical screw jacks, garage tools, car jacks and made-to-order machinery.',
  },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A.P. Machine Tools"
        lead={site.company.tagline}
      />
      <StatsBand />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Our story"
            title={site.about.heading}
          />
          <Reveal delay={100} className="space-y-5 text-base leading-relaxed text-steel-600">
            {site.about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section className="bg-steel-900 text-white">
        <SectionHeading
          tone="dark"
          eyebrow="Milestones"
          title="How the workshop grew"
        />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((t, i) => (
            <Reveal
              key={t.title}
              delay={i * 80}
              as="li"
              className="relative rounded-xl2 border border-white/10 bg-white/[0.04] p-6"
            >
              <span className="font-mono text-sm font-medium text-brand-400">{t.year}</span>
              <h3 className="mt-3 text-lg text-white">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-400">{t.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Capabilities"
          title="What we do for customers"
          align="center"
        />
        <div className="mt-12">
          <CapabilityGrid items={site.services} />
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
