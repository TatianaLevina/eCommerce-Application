import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(),
      nodePolyfills({
        globals: {
          Buffer: true,
          global: true,
          process: true,
        },
        protocolImports: true,
      }),
      tsconfigPaths(),
    ],
    define: {
      global: 'window',
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
    },
  };
});
