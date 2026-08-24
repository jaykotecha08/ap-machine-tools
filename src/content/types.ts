/**
 * Content model for A.P. Machine Tools.
 *
 * Everything the site renders comes from `src/content/site.ts`. When the CMS is
 * wired up, replace that module with a loader that returns the same shapes and
 * no component needs to change.
 */

export interface NavItem {
  label: string
  to: string
}

export interface Company {
  legalName: string
  shortName: string
  tagline: string
  established: number
  city: string
  state: string
  country: string
  brands: string[]
  director: string
}

export interface Contact {
  phone: string
  phoneDial: string
  whatsapp: string
  email: string
  addressLines: string[]
  pincode: string
  mapsUrl: string
  mapsEmbedQuery: string
  hours: { days: string; time: string }[]
}

export interface ProductVariant {
  name: string
  capacity?: string
}

export interface ProductCategory {
  slug: string
  name: string
  blurb: string
  image: string
  /** Verified from the current apmachinetools.net catalogue. */
  variants: ProductVariant[]
  applications: string[]
}

export interface Capability {
  title: string
  body: string
  icon: string
}

export interface Stat {
  value: string
  suffix?: string
  label: string
}

export interface SiteContent {
  company: Company
  contact: Contact
  nav: NavItem[]
  stats: Stat[]
  categories: ProductCategory[]
  services: Capability[]
  quality: Capability[]
  about: { heading: string; paragraphs: string[] }
  qualityIntro: string
}
