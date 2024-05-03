import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
// import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig(({ command, mode }) => {
  if (command === 'build' && mode === 'production') {
    return {
      base: './',
      plugins: [checker({ typescript: true }), tsconfigPaths()],
    };
  } else {
    return {
      plugins: [checker({ typescript: true }), tsconfigPaths()],
      // plugins: [checker({ typescript: true }), tsconfigPaths(), svelte({ hot: !process.env.VITEST })],
      test: {
        globals: true,
        environment: 'jsdom',
      },
    };
  }
});
