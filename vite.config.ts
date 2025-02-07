import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

export default defineConfig(({ command, mode }) => {
  const isWebComponent = mode === "webcomponent"; // Use a separate mode for the web component build

  return {
    plugins: [svelte({ compilerOptions: { customElement: isWebComponent } })],
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    root: "./src/svelte/",
    build: isWebComponent
      ? {
          outDir: "../../dist/webcomponent",
          emptyOutDir: true,
          lib: {
            entry: "./GForm/GFormMirror.svelte", // The Web Component entry point
            name: "GFormMirror",
            fileName: "gform-mirror",
            formats: ["es"], // Only ES module format
          },
          rollupOptions: {
            output: {
              dir: "./webcomponent",
              entryFileNames: "gform-mirror.js",
            },
          },
        }
      : {
          outDir: "../../dist",
          emptyOutDir: true,
          plugins: [viteSingleFile()],
        },
  };
});
