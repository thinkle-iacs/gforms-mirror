<script lang="ts">
  import { onMount } from "svelte";

  export let selectedLanguages: string[] = [];
  export let onLanguageChange: (langs: string[]) => void;

  let searchQuery = "";
  let filteredLanguages: string[] = [];
  let allLanguages: string[] = [];

  function getLanguageName(code: string): string {
    try {
      return (
        new Intl.DisplayNames(["en"], { type: "language" }).of(code) || code
      );
    } catch {
      return code; // If language code is invalid, return as-is
    }
  }

  onMount(() => {
    // Get list of all ISO language codes (full ISO 639-1)
    allLanguages = [
      "af",
      "ar",
      "az",
      "be",
      "bg",
      "bn",
      "bs",
      "ca",
      "cs",
      "cy",
      "da",
      "de",
      "el",
      "en",
      "es",
      "et",
      "eu",
      "fa",
      "fi",
      "fr",
      "ga",
      "gl",
      "gu",
      "he",
      "hi",
      "hr",
      "hu",
      "hy",
      "id",
      "is",
      "it",
      "ja",
      "ka",
      "kk",
      "km",
      "kn",
      "ko",
      "ky",
      "lt",
      "lv",
      "mk",
      "ml",
      "mn",
      "mr",
      "ms",
      "my",
      "nb",
      "ne",
      "nl",
      "nn",
      "or",
      "pa",
      "pl",
      "pt",
      "ro",
      "ru",
      "si",
      "sk",
      "sl",
      "sq",
      "sr",
      "sv",
      "sw",
      "ta",
      "te",
      "th",
      "tl",
      "tr",
      "uk",
      "ur",
      "uz",
      "vi",
      "zh",
      "zu",
    ];
  });

  function updateFilteredLanguages() {
    filteredLanguages = allLanguages
      .filter(
        (code) =>
          getLanguageName(code)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          code.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 10);
  }

  function addLanguage(lang: string) {
    if (!selectedLanguages.includes(lang)) {
      selectedLanguages = [...selectedLanguages, lang];
      onLanguageChange(selectedLanguages);
    }
    searchQuery = "";
    filteredLanguages = [];
  }

  function removeLanguage(lang: string) {
    selectedLanguages = selectedLanguages.filter((l) => l !== lang);
    onLanguageChange(selectedLanguages);
  }
</script>

<div class="p-4 bg-white shadow-md rounded-md">
  <label class="block font-medium">Select Languages:</label>

  <input
    type="text"
    bind:value={searchQuery}
    on:input={updateFilteredLanguages}
    placeholder="Type a language or code..."
    class="w-full mt-2 p-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
  />

  {#if searchQuery && filteredLanguages.length > 0}
    <ul
      class="border rounded-md mt-1 bg-white shadow-md max-h-40 overflow-auto divide-y"
    >
      {#each filteredLanguages as lang}
        <li
          on:click={() => addLanguage(lang)}
          class="p-2 cursor-pointer hover:bg-blue-100 transition"
        >
          {getLanguageName(lang)} <span class="text-gray-500">({lang})</span>
        </li>
      {/each}
    </ul>
  {/if}

  <ul class="mt-3 space-y-2">
    {#each selectedLanguages as lang}
      <li class="flex justify-between items-center bg-gray-200 p-2 rounded-md">
        <span class="text-gray-900 font-medium"
          >{getLanguageName(lang)} ({lang})</span
        >
        <button
          on:click={() => removeLanguage(lang)}
          class="bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600 transition"
        >
          Remove
        </button>
      </li>
    {/each}
  </ul>
</div>
