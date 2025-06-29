/// <reference types="vitest" />
import { defineConfig } from 'vite'
import * as path from 'path'

export default defineConfig({
  cacheDir: '../../node_modules/.vite/libs/common',
  plugins: [],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'GreaseCommon',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    outDir: '../../dist/libs/common',
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/libs/common',
      provider: 'v8',
    },
  },
  define: {
    'import.meta.vitest': undefined,
  },
})