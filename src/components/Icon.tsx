import {
  Ruler,
  Cog,
  Truck,
  Wrench,
  ShieldCheck,
  Gauge,
  Target,
  Award,
  Package,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/** Maps the icon names used in the content layer to real components. */
const registry: Record<string, LucideIcon> = {
  Ruler,
  Cog,
  Truck,
  Wrench,
  ShieldCheck,
  Gauge,
  Target,
  Award,
}

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = registry[name] ?? Package
  return <Cmp className={className} aria-hidden="true" />
}
