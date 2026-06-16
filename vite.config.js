import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base MUST match your GitHub repository name so assets resolve at
// https://jcoleman1005.github.io/CTX-Calculator/
export default defineConfig({
  base: '/CTX-Calculator/',
  plugins: [react(), tailwindcss()],
})
