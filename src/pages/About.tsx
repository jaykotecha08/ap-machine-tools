import site from '../content/site'
import { PageHeader } from '../components/PageHeader'
import { Section, SectionHeading } from '../components/Section'
import { StatsBand } from '../components/StatsBand'
import { CapabilityGrid } from '../components/CapabilityGrid'
import { CtaBand } from '../components/CtaBand'
import { Reveal } from '../components/Reveal'

const timeline = [
  {
    accent: 'var(--color-cat-ravi)',
    year: '2000',
    title: 'Founded in Rajkot',
    body: 'A. P. Machine Tools is established in Rajkot, Gujarat, to serve the need for quality jack and hydraulic jack products.',
  },
  {
    accent: 'var(--color-cat-hydraulic)',
    year: 'Brand',
    title: 'Ravi & A.P. take shape',
    body: 'The two marks become known as a symbol of quality in hydraulic jacks for Tata and Leyland tractor trailers.',
  },
  {
    accent: 'var(--color-cat-mechanical)',
    year: 'Industry',
    title: 'Beyond the trailer',
    body: 'Hydraulic cylinders for cement concrete mixers and other tailor-made cylinders extend the range into industrial duty.',
  },
  {
    accent: 'var(--color-cat-garage)',
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

      <Section className="bg-mist">
        <SectionHeading eyebrow="Milestones" title="How the workshop grew" />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((t, i) => (
            <Reveal
              key={t.title}
              delay={i * 80}
              as="li"
              style={{ ['--accent' as string]: t.accent }}
              className="relative overflow-hidden rounded-xl2 border border-steel-200 bg-white p-6 shadow-lift"
            >
              <span className="accent-bar absolute inset-x-0 top-0 h-1" aria-hidden="true" />
              <span className="accent-chip inline-block rounded-full border px-2.5 py-1 font-mono text-xs font-medium">
                {t.year}
              </span>
              <h3 className="mt-3 text-lg text-steel-900">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-600">{t.body}</p>
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
