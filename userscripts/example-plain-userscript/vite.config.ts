/// <reference types='vitest' />
import { defineConfig } from "vite"
import userscript from "vite-userscript-plugin"
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin"
import { nxCopyAssetsPlugin } from "@nx/vite/plugins/nx-copy-assets.plugin"

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/userscripts/example-plain-userscript",
  plugins: [
    nxViteTsPaths(),
    nxCopyAssetsPlugin(["*.md"]),
    userscript({
      entry: "src/main.ts",
      fileName: "example-plain-userscript",
      header: {
        name: "Example Plain Userscript",
        namespace: "https://github.com/your-username/grease-monorepo",
        version: "1.0.0",
        description: "A plain userscript example using the common library",
        author: "Your Name",
        match: "https://example.com/*",
        grant: "none",
      },
    }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building the userscript
  build: {
    outDir: "../../dist/userscripts/example-plain-userscript",
    emptyOutDir: true,
    reportCompressedSize: true,
    rollupOptions: {
      external: [],
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: "node",
    include: ["{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    reporters: ["default"],
    coverage: {
      reportsDirectory: "../../coverage/userscripts/example-plain-userscript",
      provider: "v8" as const,
    },
  },
}))
