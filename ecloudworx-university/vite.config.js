import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // prevent "process is not defined" errors in browser
    'process.env': {}
  },
  server: { port: 5173 }
})
