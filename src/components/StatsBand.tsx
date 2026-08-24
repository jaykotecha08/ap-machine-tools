import site from '../content/site'
import { Reveal } from './Reveal'

export function StatsBand() {
  return (
    <div className="border-y border-steel-200 bg-white">
      <div className="container-page grid grid-cols-2 divide-steel-200 lg:grid-cols-4 lg:divide-x">
        {site.stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 70}
            className="border-b border-steel-200 px-2 py-8 text-center lg:border-b-0 lg:px-6 lg:py-10"
          >
            <p className="font-display text-4xl leading-none text-steel-900 sm:text-5xl">
              {s.value}
              {s.suffix && <span className="text-brand-600">{s.suffix}</span>}
            </p>
            <p className="mt-2 text-xs leading-snug text-steel-500 sm:text-sm">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
