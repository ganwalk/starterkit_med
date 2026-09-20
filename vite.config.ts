import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base precisa casar com o nome do repositório no GitHub Pages:
// https://ganwalk.github.io/starterkit_med/
export default defineConfig({
  base: process.env.VITE_BASE ?? '/starterkit_med/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
