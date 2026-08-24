import { copyFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve('dist')
const base = process.env.BASE_PATH ?? '/ap-machine-tools/'
const origin = process.env.SITE_ORIGIN ?? 'https://jaykotecha08.github.io'
const routes = ['', 'products', 'about', 'quality', 'contact']

// GitHub Pages serves 404.html for any unknown path. Shipping a copy of the
// app shell there is what makes deep links such as /products work.
copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))

const today = new Date().toISOString().slice(0, 10)
writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url><loc>${origin}${base}${r}</loc><lastmod>${today}</lastmod></url>`,
  )
  .join('\n')}
</urlset>
`,
)

console.log('postbuild: 404.html + sitemap.xml written')
