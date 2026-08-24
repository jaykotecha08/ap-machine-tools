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
    <section className="relative overflow-hidden border-b border-steel-200 bg-dawn">
      <div className="absolute inset-0 bg-blueprint opacity-70" aria-hidden="true" />
      <div className="container-page relative py-14 sm:py-20">
        <p className="text-eyebrow text-brand-600">{eyebrow}</p>
        <h1 className="mt-3 text-4xl leading-[1.02] text-steel-900 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <div className="rule-brand mt-5" />
        {lead && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-600 sm:text-lg">
            {lead}
          </p>
        )}
      </div>
    </section>
  )
}
