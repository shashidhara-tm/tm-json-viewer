import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [react()],
  resolve: {
    alias: {
      'react-json-viewer-lite': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
  },
});
