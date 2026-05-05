import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    silent: "passed-only",
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      "server-only": path.join(root, "src/test/stubs/empty.ts"),
    },
  },
});
