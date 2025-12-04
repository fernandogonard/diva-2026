import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-syntax-import-assertions', { version: 'November2023' }],
        ],
      },
    }),
  ],

  // Path aliases para imports limpios
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  
  build: {
    // Optimizar bundle
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: true,
      format: {
        comments: false,
      },
    },
    
    // Code splitting estratégico
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animation';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor-other';
          }
          
          // Components chunks
          if (id.includes('components/sections')) {
            return 'sections';
          }
          if (id.includes('components/layout')) {
            return 'layout';
          }
          if (id.includes('components/whatsapp')) {
            return 'whatsapp';
          }
        },
        // Sourcemaps solo en development
        sourcemap: process.env.NODE_ENV === 'development',
      },
    },
    
    // Reportar tamaño de bundle
    reportCompressedSize: true,
    chunkSizeWarningLimit: 600,
    
    // Habilitar cache
    emptyOutDir: true,
    
    // Assets inline si son pequeños
    assetsInlineLimit: 4096,
  },
  
  // Optimizaciones en dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react', 'styled-components'],
    exclude: ['@vite/client', '@vite/env'],
  },
})
