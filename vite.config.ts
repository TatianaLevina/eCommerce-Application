import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
  if (command === 'build' && mode === 'production') {
    return {
      base: './',
      plugins: [checker({ typescript: true }), tsconfigPaths()],
    };
  } else {
    return {
      plugins: [checker({ typescript: true }), tsconfigPaths()],
      test: {
        globals: true,
        environment: 'jsdom',
      },
    };
  }
});
