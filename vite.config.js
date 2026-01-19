import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Simula el navegador para que React funcione [cite: 100, 101]
    globals: true,        // Nos permite usar "describe" e "it" sin importarlos [cite: 102, 103]
    setupFiles: './src/setupTests.js', // Configuración inicial [cite: 98]
    // Solución para evitar errores de importación con archivos locales
    deps: {
        inline: ['/src/utils/UserPostsService.js'], 
    }
  }
})