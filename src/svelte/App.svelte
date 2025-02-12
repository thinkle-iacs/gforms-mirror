<script lang="ts">
  import TranslationManager from "./TranslationManager.svelte";

  import CodePreview from "./CodePreview.svelte";
  import type { Translations, Form, Settings } from "../gas/types";
  import GFormMirror from "./GForm/GFormMirror.svelte";
  import { GoogleAppsScript } from "./gasApi";
  import { onMount } from "svelte";

  let email;
  let appsScriptUrl = "";
  let translationData: Translations;
  let formData: Form;
  let formsUrl =
    "https://docs.google.com/forms/d/1xh9cSzZvDqV9cm0n5ph4L4KwFx00ZQPkY8O3X6-nNLY/edit";
  let formId: string;
  let updateKey = 0;

  $: if (translationData) {
    updateKey++;
  }
  $: if (formData) {
    updateKey++;
  }

  onMount(async () => {
    email = await GoogleAppsScript.getActiveUserEmail();
    appsScriptUrl = await GoogleAppsScript.getAppsScriptUrl();
  });

  async function loadData() {
    console.log("Grabbing form data...");
    //formData = await GoogleAppsScript.getFormData(null, formsUrl);
    const response = await fetch(
      appsScriptUrl + "?getFormData=1&formUrl=" + formsUrl,
      {
        method: "GET",
        redirect: "follow", // ✅ Ensures it follows redirects
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to load form: ${response.statusText}`);
    }
    formData = await response.json(); // ✅ Parse JSON response
    formId = formData.id;
    console.log("Loaded Form Data:", formData);
  }

  let settings: Settings = {
    styleVars: {},
    embedData: true,
    embedTranslations: true,
  };
  let showTranslation = false;
</script>

<main class="min-h-screen flex flex-col items-center bg-gray-100 p-8">
  <div class="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
    <h1 class="text-2xl font-bold text-gray-900">GForms Mirror</h1>
    <p class="text-gray-600">
      Enter a Google Form URL to generate an embeddable web component.
    </p>

    <div class="mt-4">
      <label class="block text-gray-700 font-medium">Google Form URL</label>
      <input
        type="text"
        bind:value={formsUrl}
        class="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
        placeholder="Paste Google Form URL here..."
      />
    </div>
    <button
      on:click={loadData}
      class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      class:bg-gray-300={formId}>Get Form Data</button
    >
    {#if formId}
      <button
        on:click={() => (showTranslation = !showTranslation)}
        class="mt-4 px-4 py-2 rounded-md focus:outline-none transition-colors duration-300"
        class:bg-blue-500={showTranslation}
        class:bg-gray-300={!showTranslation}
      >
        Translations
      </button>{/if}

    <div class:hidden={!showTranslation}>
      {#if formId}
        <TranslationManager
          {formId}
          {appsScriptUrl}
          onTranslationsUpdated={(translations) => {
            console.log("Updating translation data!");
            translationData = translations;
          }}
        ></TranslationManager>
      {/if}
    </div>

    {#if formsUrl}
      <div class="mt-6 border-t pt-4">
        <h2 class="text-xl font-semibold text-gray-900">
          Generated Embed Code
        </h2>
        <CodePreview
          {formsUrl}
          {appsScriptUrl}
          data={formData}
          {settings}
          translations={translationData}
        />
      </div>

      <div class="mt-6 border-t pt-4">
        <h2 class="text-xl font-semibold text-gray-900">Live Preview</h2>
        {#key formsUrl + updateKey}
          <GFormMirror
            {formsUrl}
            {appsScriptUrl}
            data={formData}
            translations={translationData}
          />
        {/key}
      </div>
    {/if}
  </div>
</main>
