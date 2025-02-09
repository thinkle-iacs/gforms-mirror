<script lang="ts">
  import { onMount } from "svelte";
  import type { Form } from "../../gas/types";
  import T from "./T.svelte";

  export let translations = {}; // { es: {...}, km: {...}, pt: {...} }
  export let sourceLanguage = "en"; // Default source language
  export let onChange: (lang: string, useGoogle: boolean) => void;
  export let form: Form;

  let selectedLang = sourceLanguage;
  let useGoogleTranslate = false;
  let googleTranslateIsReady = false;

  function googleTranslateElementInit() {
    new google.translate.TranslateElement(
      { pageLanguage: sourceLanguage },
      "google_translate_element"
    );
  }
  function googleTranslateLoaded() {
    googleTranslateIsReady = true;
  }

  function detectGoogleTranslateLanguage(hash: string) {
    let match = hash.match(/googtrans\((\w+)\|(\w+)\)/);
    if (match) {
      selectedLang = match[2];
      useGoogleTranslate = true;
    }
  }

  onMount(() => {
    detectGoogleTranslateLanguage(window.location.hash);
    window.googleTranslateLoaded = googleTranslateLoaded;
    // Listen for hash changes
    window.addEventListener("hashchange", () => {
      detectGoogleTranslateLanguage(window.location.hash);
    });
  });

  function setLanguage(lang: string) {
    selectedLang = lang;
    let useGoogle = sourceLanguage !== lang && !hasCompleteTranslations(lang);
    useGoogleTranslate = useGoogle;

    if (useGoogle) {
      triggerGoogleTranslate(lang);
    } else {
      window.location.hash = "";
    }
  }

  function triggerGoogleTranslate(lang: string) {
    window.location.hash = `#googtrans(${sourceLanguage}|${lang})`;
    location.reload();
  }

  function hasCompleteTranslations(lang: string) {
    let translation = translations[lang];
    if (!translation) return false;
    // Now crawl the form for strings...
    if (form.title && !translation[form.title]) return false;
    if (form.description && !translation[form.description]) return false;
    for (let item of form.items) {
      if (!translation[item.title]) return false;
      if (item.description && !translation[item.description]) return false;
      if (item.choices) {
        for (let choice of item.choices) {
          if (!translation[choice]) return false;
        }
      }
    }
    return true;
  }

  $: if ((useGoogleTranslate || showAllLanguages) && googleTranslateIsReady) {
    googleTranslateElementInit();
  }

  let showAllLanguages = false;
  $: onChange(selectedLang, useGoogleTranslate);
</script>

<svelte:head>
  <script
    src="https://translate.google.com/translate_a/element.js?cb=googleTranslateLoaded"
  ></script>
</svelte:head>
<div class="translate space-y-2 mt-4">
  <div class="flex flex-wrap gap-2">
    {#if selectedLang !== sourceLanguage}
      {@const langName = new Intl.DisplayNames([sourceLanguage], {
        type: "language",
      }).of(sourceLanguage)}
      <button
        on:click={() => setLanguage(sourceLanguage)}
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm capitalize notranslate"
      >
        <T lang={selectedLang} {translations} text={langName} />
      </button>
    {/if}
    {#each Object.keys(translations) as lang}
      {@const langName = new Intl.DisplayNames([lang], { type: "language" }).of(
        lang
      )}
      <button
        on:click={() => setLanguage(lang)}
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm capitalize notranslate"
      >
        {langName}
      </button>
    {/each}
    <button
      on:click={() => {
        setLanguage(sourceLanguage); // remove any translations in place
        showAllLanguages = !showAllLanguages; // toggle the visibility of the google translate element
      }}
      class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition text-sm"
    >
      {#if Object.keys(translations).length}
        <T lang={selectedLang} {translations} text="Other Languages" />
      {:else}
        <T lang={selectedLang} {translations} text="Translate" />
      {/if}
    </button>
  </div>
</div>
<div class:hidden={!showAllLanguages} id="google_translate_element"></div>

<style>
  .translate {
    margin-bottom: 10px;
  }
  .hidden {
    display: none;
  }
  button {
    text-transform: capitalize; /* Capitalizes the language names */
  }
</style>
