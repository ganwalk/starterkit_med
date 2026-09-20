import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * @hugeicons/core-free-icons@4.3.4 grava os ícones Grid_x_ com X maiúsculo
 * no disco (Grid2X2Icon.js) mas os importa com x minúsculo no barrel.
 * Passa em macOS (FS sem case), quebra em Linux/CI.
 *
 * Precisa ser corrigido em dois pontos: o esbuild do pré-bundle (dev) e o
 * rollup (build). Corrigir na resolução evita editar node_modules, que não
 * sobreviveria a um install limpo no CI.
 */
const GRID_CASE = /Grid(\d)x(\d)/
const fixName = (value: string) => value.replace(GRID_CASE, 'Grid$1X$2')

function fixHugeiconsCase(): Plugin {
  return {
    name: 'fix-hugeicons-case',
    enforce: 'pre',
    config() {
      return {
        optimizeDeps: {
          esbuildOptions: {
            plugins: [
              {
                name: 'fix-hugeicons-case-esbuild',
                setup(build) {
                  build.onResolve({ filter: /Grid\dx\d\w*\.js$/ }, (args) => {
                    if (!args.importer.includes('@hugeicons/core-free-icons')) return null
                    return {
                      path: path.resolve(path.dirname(args.importer), fixName(args.path)),
                    }
                  })
                },
              },
            ],
          },
        },
      }
    },
    resolveId(source, importer, options) {
      if (!importer?.includes('@hugeicons/core-free-icons')) return null
      if (!GRID_CASE.test(source)) return null
      return this.resolve(fixName(source), importer, options)
    },
  }
}

// base precisa casar com o nome do repositório no GitHub Pages:
// https://ganwalk.github.io/starterkit_med/
export default defineConfig({
  base: process.env.VITE_BASE ?? '/starterkit_med/',
  plugins: [fixHugeiconsCase(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
