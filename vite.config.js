/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "copy-index-to-404",
      closeBundle() {
        const distDir = path.resolve(__dirname, "dist");
        fs.copyFileSync(`${distDir}/index.html`, `${distDir}/404.html`);
      },
    },
  ],
  base: "/quickMed/",
});
