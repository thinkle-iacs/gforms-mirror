import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

export default defineConfig(({ command, mode }) => {
  const isWebComponent = mode === "webcomponent"; // Use a separate mode for the web component build

  return {
    plugins: [
      svelte({
        compilerOptions: {
          customElement: isWebComponent,
        },
        emitCss: false,
        experimental: {
          injectStyles: "always",
        },
      }),
      !isWebComponent && viteSingleFile(), // ✅ Ensure viteSingleFile runs when NOT in webcomponent mode
    ].filter(Boolean), // Remove `false` values
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
          minify: false,
          rollupOptions: {
            output: {
              dir: "./webcomponent",

              sourcemap: true,
              entryFileNames: "gform-mirror.js",
              inlineDynamicImports: true, // ✅ Ensures everything gets inlined
            },
          },
        }
      : {
          outDir: "../../dist",
          emptyOutDir: true,

          rollupOptions: {
            output: {
              inlineDynamicImports: true, // ✅ Ensures everything gets inlined
            },
          },
        },
  };
});
