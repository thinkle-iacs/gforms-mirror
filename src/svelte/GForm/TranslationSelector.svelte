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
  let showAllLanguages = false;

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

  $: onChange(selectedLang, useGoogleTranslate);
</script>

<svelte:head>
  <script
    src="https://translate.google.com/translate_a/element.js?cb=googleTranslateLoaded"
  ></script>
</svelte:head>

<div class="translation-container">
  <div class="button-group">
    {#if selectedLang !== sourceLanguage}
      {@const langName = new Intl.DisplayNames([sourceLanguage], {
        type: "language",
      }).of(sourceLanguage)}
      <button
        on:click={() => setLanguage(sourceLanguage)}
        class="lang-button primary"
      >
        <T lang={selectedLang} {translations} text={langName} />
      </button>
    {/if}

    {#each Object.keys(translations) as lang}
      {@const langName = new Intl.DisplayNames([lang], { type: "language" }).of(
        lang
      )}
      <button on:click={() => setLanguage(lang)} class="lang-button primary">
        {langName}
      </button>
    {/each}

    <!-- Toggle Google Translate -->
    <button
      on:click={() => {
        setLanguage(sourceLanguage);
        showAllLanguages = !showAllLanguages;
      }}
      class="lang-button secondary"
    >
      {#if Object.keys(translations).length}
        <T lang={selectedLang} {translations} text="Other Languages" />
      {:else}
        <T lang={selectedLang} {translations} text="Translate" />
      {/if}
    </button>
  </div>
</div>

<!-- Google Translate Element -->
<div
  class="google-translate-container"
  class:hidden={!showAllLanguages}
  id="google_translate_element"
></div>

<style>
  .translation-container {
    margin-top: 1rem;
  }

  .button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .lang-button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition:
      background 0.2s ease-in-out,
      transform 0.1s ease-in-out;
    text-transform: capitalize;
  }

  .lang-button.primary {
    background-color: var(--primary-color, #2563eb);
    color: white;
  }

  .lang-button.primary:hover {
    background-color: var(--primary-dark, #1d4ed8);
    transform: scale(1.05);
  }

  .lang-button.secondary {
    background-color: var(--text-color, #6b7280);
    color: white;
  }

  .lang-button.secondary:hover {
    background-color: var(--muted-text, #4b5563);
    transform: scale(1.05);
  }

  .google-translate-container {
    margin-top: 1rem;
  }

  .hidden {
    display: none;
  }
</style>
