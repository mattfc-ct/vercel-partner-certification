import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    silent: "passed-only",
  },
  resolve: {
    tsconfigPaths: true,
  },
});
