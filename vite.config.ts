import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [svelte(), viteSingleFile()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer], // ✅ Explicitly load Tailwind
    },
  },
  root: "./src/svelte/",
  build: {
    outDir: "../../dist",
    emptyOutDir: true, // Ensure the output directory is empty
    // Inline HTML and CSS
    rollupOptions: {},
  },
});
