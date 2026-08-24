import type { SiteContent } from './types'

const BASE = import.meta.env.BASE_URL

/**
 * All copy below is drawn from the client's existing site
 * (apmachinetools.net) and the supplied legacy source. Nothing here is
 * invented: capacities, model names and the company narrative are as
 * published. Fields marked VERIFY need a final confirmation from the client
 * before go-live.
 */
const ESTABLISHED = 2000
const yearsTrading = new Date().getFullYear() - ESTABLISHED

export const site: SiteContent = {
  company: {
    legalName: 'A. P. Machine Tools',
    shortName: 'A.P. Machine Tools',
    tagline: 'Hydraulic & mechanical jacks engineered in Rajkot since 2000',
    established: ESTABLISHED,
    city: 'Rajkot',
    state: 'Gujarat',
    country: 'India',
    brands: ['Ravi', 'A.P.'],
    director: 'Kapilbhai Siddhapura',
  },

  contact: {
    phone: '+91 98252 92186',
    phoneDial: '+919825292186',
    whatsapp: '919825292186',
    email: 'apmachinetools@yahoo.com',
    // VERIFY: street line confirmed against public listings, not the client.
    addressLines: ['Dhebar Road', 'Opp. Malaviya Railway Crossing', 'Near Shakti Timber'],
    pincode: 'Rajkot 360002, Gujarat, India',
    mapsUrl: 'https://maps.app.goo.gl/PAwEcdGtfRgysSuV7',
    mapsEmbedQuery: 'A.P. Machine Tools, Dhebar Road, Rajkot, Gujarat 360002',
    hours: [
      { days: 'Monday – Saturday', time: '9:30 AM – 7:00 PM' },
      { days: 'Sunday', time: 'Closed' },
    ],
  },

  nav: [
    { label: 'Home', to: '/' },
    { label: 'Store', to: '/store' },
    { label: 'About', to: '/about' },
    { label: 'Quality', to: '/quality' },
    { label: 'Contact', to: '/contact' },
  ],

  stats: [
    { value: String(yearsTrading), suffix: '+', label: 'Years of manufacturing' },
    { value: '4–80', suffix: ' T', label: 'Lifting capacity range' },
    { value: '100', suffix: '%', label: 'Units performance tested' },
    { value: '2', label: 'Trusted brands — Ravi & A.P.' },
  ],

  categories: [
    {
      slug: 'ravi-brand-jack',
      accent: 'var(--color-cat-ravi)',
      name: 'Ravi Brand Jack',
      blurb:
        'The flagship screw-jack line that made the Ravi name, built for Tata and Leyland tractor trailers and the commercial vehicle market.',
      image: `${BASE}media/products/ravi-brand-jack.jpg`,
      variants: [
        { name: '4 Ton Jack', capacity: '4 T' },
        { name: '8 Ton Jack', capacity: '8 T' },
        { name: '12 Ton Jack', capacity: '12 T' },
        { name: '12 Ton Double Screw Jack', capacity: '12 T' },
        { name: '16 Ton Jack', capacity: '16 T' },
        { name: '18 Ton Double Screw Jack', capacity: '18 T' },
        { name: '20 Ton Jack', capacity: '20 T' },
        { name: '30 Ton Jack', capacity: '30 T' },
        { name: '40 Ton Jack', capacity: '40 T' },
        { name: '50 Ton Jack', capacity: '50 T' },
        { name: '60 Ton Jack', capacity: '60 T' },
        { name: 'Special 60 Ton Jack', capacity: '60 T' },
        { name: '65 Ton Jack', capacity: '65 T' },
        { name: '70 Ton Jack', capacity: '70 T' },
        { name: '75 Ton Jack', capacity: '75 T' },
        { name: '80 Ton Jack', capacity: '80 T' },
        { name: 'Tata ACE Jack' },
      ],
      applications: ['Tractor trailers', 'Tata & Leyland vehicles', 'Commercial fleets'],
    },
    {
      slug: 'garage-tools',
      accent: 'var(--color-cat-garage)',
      name: 'Garage Tools',
      blurb:
        'Workshop equipment for heavy-vehicle service bays — chassis jacks, engine handling trolleys, boards and stands.',
      image: `${BASE}media/products/garage-tools.jpg`,
      variants: [
        { name: 'Climb Down Arched Trolly' },
        { name: 'Climb Down Engine Table' },
        { name: 'Engine Lifter Trolly' },
        { name: 'Garage Sliper Trolly' },
        { name: 'Jack Board Stand' },
        { name: '15" Chasis Jack' },
        { name: 'Tata Layland 28" Chesis Jack' },
        { name: 'Tata Layland Chesis Board-Stand' },
      ],
      applications: ['Truck & bus workshops', 'Fleet service centres', 'Body-building units'],
    },
    {
      slug: 'hydraulic-jack',
      accent: 'var(--color-cat-hydraulic)',
      name: 'Hydraulic Jack',
      blurb:
        'Hydraulic jacks and accessories, including tailor-made hydraulic cylinders for cement concrete mixers and special applications.',
      image: `${BASE}media/products/hydraulic-jack.jpg`,
      variants: [
        { name: '70 Ton Hydraulic Jack', capacity: '70 T' },
        { name: 'Hydraulic Jack Accessories' },
        { name: 'Tailor-made Hydraulic Cylinders' },
        { name: 'Hydraulic Cylinders for Cement Concrete Mixers' },
      ],
      applications: ['Heavy lifting', 'Construction equipment', 'Industrial plant'],
    },
    {
      slug: 'mechanical-jack',
      accent: 'var(--color-cat-mechanical)',
      name: 'Mechanical Jack',
      blurb:
        'Mechanical screw jacks across the 30–75 tonne band, machined and heat-treated for repeatable load-holding.',
      image: `${BASE}media/products/mechanical-jack.jpg`,
      variants: [
        { name: '30 Ton Mechanical Jack', capacity: '30 T' },
        { name: '40 Ton Mechanical Jack', capacity: '40 T' },
        { name: '50 Ton Mechanical Jack', capacity: '50 T' },
        { name: '60 Ton Mechanical Jack', capacity: '60 T' },
        { name: '65 Ton Mechanical Jack', capacity: '65 T' },
        { name: '70 Ton Mechanical Jack', capacity: '70 T' },
        { name: '75 Ton Mechanical Jack', capacity: '75 T' },
      ],
      applications: ['Trailer support', 'Machine installation', 'Structural jacking'],
    },
    {
      slug: 'car-jack',
      accent: 'var(--color-cat-car)',
      name: 'Car Jack',
      blurb:
        'Trolley-type jacks for passenger cars and light commercial vehicles, sized for garage and roadside use.',
      image: `${BASE}media/products/car-jack.jpg`,
      variants: [{ name: 'Car Trolly Jack' }, { name: 'Garage Trolly Jack' }],
      applications: ['Car workshops', 'Tyre & service bays', 'Roadside assistance'],
    },
    {
      slug: 'machinery',
      accent: 'var(--color-cat-machinery)',
      name: 'Machinery',
      blurb:
        'Plant machinery built to order, produced alongside the jack lines in the same Rajkot facility.',
      image: `${BASE}media/products/machinery.jpg`,
      variants: [{ name: 'Made-to-order Industrial Machinery' }],
      applications: ['Process plant', 'Custom fabrication'],
    },
  ],

  services: [
    {
      title: 'Design & Engineering',
      body: 'Designing, manufacturing and marketing every class of hydraulic jack, jack accessory, mechanical screw jack and garage tool in-house.',
      icon: 'Ruler',
    },
    {
      title: 'Tailor-made Cylinders',
      body: 'Hydraulic cylinders built to a customer drawing — including cylinders for cement concrete mixers and other special industrial duties.',
      icon: 'Cog',
    },
    {
      title: 'OEM & Fleet Supply',
      body: 'Jack programmes for Tata and Leyland tractor trailers, tractor automobiles and the wider commercial vehicle market.',
      icon: 'Truck',
    },
    {
      title: 'Aftermarket Support',
      body: 'A team of professionals dedicated to rendering service for customers’ critical needs, with spares and accessories backing every line.',
      icon: 'Wrench',
    },
  ],

  quality: [
    {
      title: 'SQC-controlled process',
      body: 'Parts and materials pass strict quality control at each process step, administered as per SQC systems.',
      icon: 'ShieldCheck',
    },
    {
      title: '100% performance tested',
      body: 'Every product is tested for performance as per the recommendations of Indian Standards — not sampled, all of it.',
      icon: 'Gauge',
    },
    {
      title: 'Directorial supervision',
      body: 'Each Ravi and A.P. branded product is inspected under the practical supervision of Kapilbhai Siddhapura, a director of the company.',
      icon: 'Target',
    },
    {
      title: 'Built to last',
      body: 'Products are marked by excellent reliability, durability and a high standard of performance in the field.',
      icon: 'Award',
    },
  ],

  about: {
    heading: 'A quarter century of lifting India’s commercial fleet',
    paragraphs: [
      'A. P. Machine Tools is a Rajkot, Gujarat based company, established in the year 2000. We have dedicated ourselves to keeping pace with technology to serve the need for quality jack and hydraulic jack products.',
      'Today “Ravi” and “A.P.” are known as a symbol of quality in hydraulic jacks for Tata and Leyland tractor trailers, for tractor automobiles and the commercial market — and, on the industrial side, in hydraulic cylinders for cement concrete mixers and other tailor-made hydraulic cylinders.',
      'We have determined to carve a niche for ourselves in the highly competitive arena of designing, manufacturing and marketing all kinds of hydraulic jacks, hydraulic jack accessories, mechanical screw jacks and garage tools.',
      'At “Ravi” and “A.P.”, quality is always given top priority. Above all, Ravi is a team of professionals dedicated to rendering services for our customers’ critical needs.',
    ],
  },

  qualityIntro:
    'Under the practical supervision of Kapilbhai Siddhapura — one of the directors of the company himself — each and every Ravi and A.P. branded product, part and material passes through strict quality controls and is fully checked and inspected at each process.',
}

export default site
