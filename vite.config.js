import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Completely disable source maps so original code is hidden
    sourcemap: false, 
  },
  esbuild: {
    // Automatically remove all console.log and debugger statements in production
    drop: ['console', 'debugger'],
  }
})