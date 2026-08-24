import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from the custom domain preview-ap-machine-tools.jaykotecha.online,
// which is a site root — hence '/'. public/CNAME pins the domain across
// deploys. Set BASE_PATH=/ap-machine-tools/ to build for the bare
// <user>.github.io/<repo>/ URL instead.
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: { outDir: 'dist', sourcemap: false },
})
