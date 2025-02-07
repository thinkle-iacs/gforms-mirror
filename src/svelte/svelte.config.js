import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const isWebComponent = process.env.NODE_ENV === "webcomponent";

export default {
  preprocess: vitePreprocess({
    postcss: true,
  }),
  compilerOptions: {
    customElement: isWebComponent, // Only enable Web Component mode when building for it
  },
};