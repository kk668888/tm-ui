import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '../..')

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  root: __dirname,
  resolve: {
    alias: {
      '@': resolve(rootDir, 'src'),
      '@admin': resolve(__dirname, 'src'),
      'tm-ui': resolve(rootDir, 'src/index.ts'),
    },
  },
  server: {
    port: 3002,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
