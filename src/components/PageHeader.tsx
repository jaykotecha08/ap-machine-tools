import type { ReactNode } from 'react'

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: string
  lead?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-steel-950 text-white">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div
        className="absolute -top-24 right-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(238,43,43,0.6) 0%, rgba(238,43,43,0) 65%)',
        }}
        aria-hidden="true"
      />
      <div className="container-page relative py-14 sm:py-20">
        <p className="text-eyebrow text-brand-400">{eyebrow}</p>
        <h1 className="mt-3 text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">{title}</h1>
        <div className="rule-brand mt-5" />
        {lead && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-300 sm:text-lg">
            {lead}
          </p>
        )}
      </div>
    </section>
  )
}
