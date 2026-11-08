import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Em desenvolvimento, tudo que começa com /api vai para o back-end local.
// Assim o navegador fala com um único endereço e nunca vê a chave de API.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
