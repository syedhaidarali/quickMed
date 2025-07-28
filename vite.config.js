/** @format */

// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/quickMed/", // replace with your actual repo name
  plugins: [tailwindcss()],
});
