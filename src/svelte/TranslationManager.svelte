<script lang="ts">
  import LanguageSelector from "./LanguageSelector.svelte";
  import type { Translations } from "../gas/types";

  export let appsScriptUrl: string;
  export let formId: string;
  export let translations: Translations = {};
  export let onTranslationsUpdated: (translations: Translations) => void;

  let selectedLanguages: string[] = [];
  let spreadsheetUrl = "";

  /** 🛠 Helper function to ensure formId, translations=1 & all languages are included */
  async function doFetch(extraParams: string = "") {
    let languageParams = selectedLanguages
      .map((lang) => `language=${lang}`)
      .join("&");
    let url = `${appsScriptUrl}?formId=${formId}&translations=1&${languageParams}&${extraParams}`;

    try {
      const response = await fetch(url, { redirect: "follow" }); // Follow redirects
      const text = await response.text(); // Read response as text first

      try {
        return JSON.parse(text); // Attempt JSON parsing
      } catch (error) {
        console.warn("Response was not JSON, possible redirect:", text);
        return null;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  }

  async function fetchTranslations() {
    const data = await doFetch();

    if (data) {
      translations = data;
      onTranslationsUpdated(translations);
    }
  }

  async function setupTranslations() {
    spreadsheetUrl = await doFetch("create=1");
  }

  function updateSelectedLanguages(langs: string[]) {
    selectedLanguages = langs;
  }
</script>

<div class="p-6 bg-gray-100 rounded-md shadow-md">
  <h2 class="text-xl font-semibold">Translation Manager</h2>

  <LanguageSelector
    {selectedLanguages}
    onLanguageChange={updateSelectedLanguages}
  />

  <button
    on:click={setupTranslations}
    class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
  >
    Setup Translation Sheet
  </button>

  {#if spreadsheetUrl}
    <p class="mt-2">
      <a href={spreadsheetUrl} target="_blank" class="text-blue-600 underline">
        Open Translation Sheet
      </a>
    </p>
  {/if}

  <button
    on:click={fetchTranslations}
    class="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
  >
    Fetch Translations!
  </button>
</div>
