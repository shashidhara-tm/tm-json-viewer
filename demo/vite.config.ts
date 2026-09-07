import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig(({ command }) => ({
  root: fileURLToPath(new URL('.', import.meta.url)),
  // Project pages are served from https://<user>.github.io/tm-json-viewer/, so asset URLs
  // need that path prefix in production; the dev server still serves from '/'.
  base: command === 'build' ? '/tm-json-viewer/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      'tm-json-viewer-lite': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
  },
}));
