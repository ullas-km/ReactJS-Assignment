/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      exclude: [
        "**/*.css",
        "**/*.d.ts",
        "node_modules/**",
        "coverage/**",
        "dist/**",
        "src/main.tsx",
        "src/vite-env.d.ts",
        "src/setupTests.ts",
      ],
    },
    
  },
});