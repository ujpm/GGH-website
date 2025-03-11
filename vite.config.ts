import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV !== 'production',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['styled-components', 'framer-motion'],
          'auth': ['@react-oauth/google', 'jwt-decode'],
          'utils': ['date-fns', 'axios', 'react-query']
        }
      }
    }
  },
  define: {
    // Ensure environment variables are available at build time
    'process.env.VITE_ENABLE_ADMIN_FEATURES': JSON.stringify(process.env.VITE_ENABLE_ADMIN_FEATURES),
    'process.env.VITE_ENABLE_PUBLIC_ACCESS': JSON.stringify(process.env.VITE_ENABLE_PUBLIC_ACCESS),
    'process.env.VITE_AUTH_ENABLED': JSON.stringify(process.env.VITE_AUTH_ENABLED)
  }
});
