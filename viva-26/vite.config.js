import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5173
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-gsap': ['gsap'],
          'vendor-lenis': ['lenis'],
        },
      },
    },
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 500,
    // Enable source maps for debugging (optional, can disable for smaller builds)
    sourcemap: false,
    // Target modern browsers for smaller bundles
    target: 'esnext',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'gsap', 'lenis'],
  },
})
