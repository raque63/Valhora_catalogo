import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined,
      }
    }
  },
  assetsInclude: ['**/*.pdf'],
  optimizeDeps: {
    include: ['pdfjs-dist']
  },
  // Importante para el worker de PDF.js
  worker: {
    format: 'es'
  }
})
