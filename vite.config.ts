import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Repo is served from https://<user>.github.io/ap-machine-tools/
// Override with BASE_PATH=/ when moving to a custom domain (apmachinetools.net).
const base = process.env.BASE_PATH ?? '/ap-machine-tools/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: { outDir: 'dist', sourcemap: false },
})
