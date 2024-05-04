import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
    },
  };
});
