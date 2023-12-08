import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // wszystkie żądania zaczynające się od /api będą przekierowywane
      '/api': {
        target: 'http://localhost:8080', // adres backendu
        changeOrigin: true, // może być potrzebne w przypadku korzystania z virtual host
      },
      // wszystkie żądania zaczynające się od /uploadDir również będą przekierowywane
      '/uploadDir': {
        target: 'http://localhost:8080', // adres backendu
        changeOrigin: true,
      },
    }
  }
});