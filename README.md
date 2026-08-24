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
| Routing | react-router-dom 7 |
| Hosting | GitHub Pages via GitHub Actions |

No CSS framework overrides, no runtime CSS-in-JS, no jQuery. Production bundle is
~88 kB gzipped JS + ~8 kB gzipped CSS.

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
- **Product ranges and model names** — the current `products.aspx` catalogue
  (39 models across 6 ranges, tonnages 4 T to 80 T).
- **Phone and email** — the header of the legacy page source.
- **Product photography** — the six category images from the current site,
  carried over as-is.

### Needs confirmation before go-live

- [ ] **Street address.** `contact.addressLines` is sourced from public business
      listings, not from the client. Confirm the exact works/office address.
- [ ] **Working hours.** `contact.hours` is a placeholder — confirm real hours.
- [ ] **WhatsApp number.** Currently the same as the phone number; confirm it
      is WhatsApp-enabled.

### Known asset limitation

The six product photographs are the originals from the current site and are only
**235 × 157 px**. They are displayed larger than that and look soft on high-DPI
screens. Replacing them with proper studio photography (ideally 1600 px wide,
shot on the same neutral backdrop) is the single biggest visual upgrade
available. Drop the new files into `public/media/products/` under the same
filenames and nothing else needs to change.

## Design notes

- **Mobile is app-shaped.** A fixed bottom tab bar, a frosted sticky header, a
  full-height drawer, `env(safe-area-inset-*)` padding, momentum-scroll
  segmented controls, and `overscroll-behavior` to kill rubber-banding.
- **Design tokens** are declared once in `src/styles/index.css` under `@theme`:
  a graphite `steel` ramp, the `brand` red lifted from the original A.P. mark,
  and `--color-studio` (`#cdbc9e`) — the backdrop shared by every product
  photograph, reused as the card colour so the photos read as intentional.
- **Motion is progressive.** Reveal-on-scroll is driven by `IntersectionObserver`
  and degrades to always-visible where it is unavailable. Everything is disabled
  under `prefers-reduced-motion`.
- **Accessibility.** Skip link, labelled landmarks, `aria-expanded` on the menu,
  visible focus rings, real form labels, alt text on every image.

## Verified

- `tsc --noEmit` clean.
- All five routes plus the 404 render with **no console errors** and **no
  horizontal overflow** at 390 px and 1440 px (checked in Chromium).
- Deep links and hash anchors resolve correctly under GitHub Pages' 404
  fallback semantics.
