/// <reference types="vitest" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      copyDtsFiles: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueComponentAnnotatedText",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vue", "vue-demi"],
      output: {
        globals: {
          "vue-demi": "vue-demi",
          vue: "Vue",
        },
      },
    },
    outDir: "dist",
  },
  test: {
    coverage: {
      reportsDirectory: "../test_coverage",
    },
  },
  optimizeDeps: {
    exclude: ["vue-demi"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
