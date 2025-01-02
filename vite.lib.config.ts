import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const filesNeedToExclude = ["src/App.tsx", "src/index.ts", "src/main.tsx"];

export default defineConfig({
    plugins: [react()],
    build: {
      outDir: 'lib',
      lib: {
        entry: 'src/index.ts', // Entry point of your library
        name: 'd3-chart-khoatr',
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        // Ensure to externalize deps that shouldn't be bundled into your library
        external: ['react', 'react-dom', ...filesNeedToExclude],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    }
});
