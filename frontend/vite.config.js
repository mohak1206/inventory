import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/products': 'http://127.0.0.1:5000',
      '/transactions': 'http://127.0.0.1:5000',
      '/stock': 'http://127.0.0.1:5000',
      '/dashboard': 'http://127.0.0.1:5000',
      '/login': 'http://127.0.0.1:5000',
    }
  }
});
