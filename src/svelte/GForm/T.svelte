<script lang="ts">
  import type { Translations } from "./../../gas/types.ts";
  import { getText } from "./translate.js";

  export let text;
  export let lang = "en";
  export let translations: Translations = {};
  let translatedText = text;
  let haveTranslation = false;

  $: {
    haveTranslation = !!(translations[lang] && translations[lang][text]);
    translatedText = getText(text, translations, lang);
  }
</script>

<span data-original-text={text} class:notranslate={haveTranslation}>
  {translatedText}
</span>

<style>
  span {
    display: contents;
  }
</style>
