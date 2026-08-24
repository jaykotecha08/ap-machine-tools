# A.P. Machine Tools — website

A redesign of [apmachinetools.net](https://www.apmachinetools.net/) as a fast,
responsive, app-like static site. Built as a **preview**: all content lives in one
typed module so a CMS and database can be wired in later without touching the UI.

## Stack

| Concern | Choice |
| --- | --- |
| Build | Vite 7 |
| UI | React 19 + TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Icons | lucide-react |
| Type | Space Grotesk (display) + DM Sans (body) + JetBrains Mono (data) |
| Routing | react-router-dom 7 |
| Hosting | GitHub Pages via GitHub Actions |

No CSS framework overrides, no runtime CSS-in-JS, no jQuery. Production bundle is
~94 kB gzipped JS + ~8 kB gzipped CSS.

## Running locally

```bash
npm install
npm run dev        # http://localhost:5173/
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build
```

## Deploying

Pushing to `claude/ap-machine-tools-redesign-kt3se6` runs
`.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages.

The workflow passes `enablement: true` to `actions/configure-pages`, which turns
Pages on via the API on the first run — no manual setup needed. If your account
plan does not permit that (Pages on private repos needs a paid plan), enable it
by hand at *Settings → Pages → Source = GitHub Actions* and re-run the workflow.

The site is served at **https://preview-ap-machine-tools.jaykotecha.online**.

`public/CNAME` pins that custom domain. Keep the file — GitHub Pages reads the
domain from the deployed artifact, so removing it drops the custom domain on the
next deploy.

### Changing where it is served

`vite.config.ts` reads `BASE_PATH` (default `/`, correct for a custom domain at
a site root) and `scripts/postbuild.mjs` reads `SITE_ORIGIN` for the sitemap.
To build for the bare GitHub Pages project URL instead:

```bash
BASE_PATH=/ap-machine-tools/ SITE_ORIGIN=https://jaykotecha08.github.io npm run build
```

For the production domain, update `public/CNAME` and build with
`SITE_ORIGIN=https://www.apmachinetools.net`.

### SPA routing on Pages

GitHub Pages has no rewrite rules, so `scripts/postbuild.mjs` copies
`index.html` to `404.html`. Pages serves that for unknown paths and the router
takes over, which is what makes `/products` and `/products#car-jack` work as
direct links. The same script generates `sitemap.xml`.

## The store

`/store` lists all 39 models from the legacy catalogue, with category filters,
search, and sorting by capacity or name. Category and search live in the URL
(`/store?category=car-jack&q=60`) so a filtered view is shareable. Each model
has its own page at `/store/<slug>`.

### Why it takes quote requests, not payments

**The source catalogue publishes no prices — not one.** Rather than invent them,
the store works as a request-for-quote basket: customers collect models and
quantities, then send the whole list as one enquiry. For jacks sold to fleets
and workshops in varying quantities, that is how the business actually prices
anyway.

The basket lives in `localStorage` (`apmt.quote.v1`) and survives reloads. Lines
referencing a model that no longer exists are dropped on read, so a catalogue
change cannot corrupt someone's basket.

**To turn on real pricing later:** `Product` already carries an optional
`price` field and `src/lib/quote.tsx` exports a `formatPrice` helper (INR).
Populate `price` from the database and the store can start showing money.

### Product data

`src/content/products.ts` derives the 39 products from the category variants in
`site.ts` rather than duplicating them — every model traces back to a name
published on the current site. Slugs, build type and search text are computed.

## Where the content lives

Everything the site renders comes from **`src/content/site.ts`**, typed by
`src/content/types.ts`. Product ranges, model lists, capacities, copy, contact
details and working hours are all there. Nothing is hardcoded in components.

When the CMS lands, replace that module with a loader returning the same shapes
(`SiteContent`) and no component needs to change.

## Content provenance

The copy is taken from the client's existing site and the supplied legacy
source, not invented:

- **Company narrative, director, quality process** — the About and Quality text
  on the current site.
- **Product ranges and model names** — the current `products.aspx` catalogue:
  all 39 models across 6 ranges, tonnages 4 T to 80 T. These are the store's
  entire inventory; no model was invented.
- **No prices** appear anywhere in the source, which is why the store collects
  quote requests instead of taking payment. See "The store" above.
- **Phone and email** — the header of the legacy page source.
- **Product photography** — the six category images from the current site,
  carried over as-is.

### Needs confirmation before go-live

- [ ] **Street address.** `contact.addressLines` is sourced from public business
      listings, not from the client. Confirm the exact works/office address.
- [ ] **Working hours.** `contact.hours` is a placeholder — confirm real hours.
- [ ] **WhatsApp number.** Currently the same as the phone number; confirm it
      is WhatsApp-enabled.

### Known asset limitation — photography

Only **six** product photographs exist, one per range, and they are the
originals from the current site at just **235 × 157 px**. Two consequences:

1. Every model in a range shares one image, so 17 Ravi jacks look identical.
   The store works around this by making **capacity the visual hero** of each
   card — the real differentiator when choosing a jack — but it is a
   workaround, not a fix.
2. The images are displayed larger than their native size and look soft on
   high-DPI screens.

Proper per-model studio photography (ideally 1600 px wide, shot on the same
neutral backdrop) is by far the biggest visual upgrade available. Drop new
files into `public/media/products/` and add an `image` override in
`src/content/products.ts` per model.

## Design notes

- **Mobile is app-shaped.** A fixed bottom tab bar, a frosted sticky header, a
  full-height drawer, `env(safe-area-inset-*)` padding, momentum-scroll
  segmented controls, and `overscroll-behavior` to kill rubber-banding.
- **Light by default.** The palette is a warm off-white `steel` ramp; colour
  and gradient carry the section rhythm (`bg-dawn`, `bg-mist`, `bg-flare`)
  rather than dark slabs. Only the footer stays dark, as an anchor.
- **Per-category accents.** Each of the six ranges has its own colour
  (`--color-cat-*`), applied through an `--accent` custom property to chips,
  card rails and store filters, so the catalogue is scannable by colour.
- **Design tokens** are declared once in `src/styles/index.css` under `@theme`,
  including `--color-studio` (`#cdbc9e`) — the backdrop shared by every product
  photograph, reused as the plinth colour so the photos read as intentional.
- **Motion is progressive.** Reveal-on-scroll is driven by `IntersectionObserver`
  and degrades to always-visible where it is unavailable. Everything is disabled
  under `prefers-reduced-motion`.
- **Accessibility.** Skip link, labelled landmarks, `aria-expanded` on the menu,
  visible focus rings, real form labels, alt text on every image.

## Verified

- `tsc --noEmit` clean.
- All eight routes (home, store, product, quote, about, quality, contact, 404)
  render with **no console errors, no 404'd assets and no horizontal overflow**
  at 390 px and 1440 px, checked in Chromium.
- Store behaviour exercised end to end: 39 products listed, category filter,
  search, capacity sort in both directions, add-to-quote from card and from a
  product page, quantity merging, basket persistence across reload, and an
  unknown product slug falling through to the 404 page.
- Deep links and hash anchors resolve correctly under GitHub Pages' 404
  fallback semantics.
- The Google Fonts request was confirmed to serve all three families, and the
  screenshots above were checked with the real fonts loaded.
