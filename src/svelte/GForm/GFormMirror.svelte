<script lang="ts">
  import { onMount } from "svelte";
  import type { Form, Translations } from "../../gas/types";
  import GForm from "./GForm.svelte";
  export let formsUrl: string = "";
  export let formsId: string = "";
  export let appsScriptUrl: string = "";
  export let translations: Translations = {};

  export let data: Form;

  async function loadForm() {
    try {
      loading = true;
      console.log("Loading form from URL", formsUrl);

      // Construct the API request URL based on formId or formsUrl
      var fetchUrl = formsId
        ? `${appsScriptUrl}?getFormData=1&formId=${encodeURIComponent(formsId)}`
        : `${appsScriptUrl}?getFormData=1&formUrl=${encodeURIComponent(formsUrl)}`;

      const response = await fetch(fetchUrl, {
        method: "GET",
        redirect: "follow", // ✅ Ensures it follows redirects
      });

      if (!response.ok) {
        throw new Error(`Failed to load form: ${response.statusText}`);
      }

      data = await response.json(); // ✅ Parse JSON response
      console.log("Form Data Loaded:", data);
    } catch (error) {
      console.error("Error loading form from URL", fetchUrl, error);
    } finally {
      loading = false;
    }
    let translationsUrl = `${appsScriptUrl}?translations=1`;
    if (formsId) {
      translationsUrl += `&formId=${encodeURIComponent(formsId)}`;
    } else {
      translationsUrl += `&formUrl=${encodeURIComponent(formsUrl)}`;
    }

    loading = true;
    try {
      console.log("Fetch transalations from", translationsUrl);
      const response = await fetch(translationsUrl, {
        method: "GET",
        redirect: "follow", // ✅ Ensures it follows redirects
      });

      if (!response.ok) {
        throw new Error(`Failed to load translations: ${response.statusText}`);
      }

      translations = await response.json(); // ✅ Parse JSON response
      console.log("Translations Loaded:", translations);
    } catch (error) {
      console.error(
        "Error loading translations from URL",
        translationsUrl,
        error
      );
    }
  }
  let loading = false;

  onMount(() => {
    loadForm();
  });
</script>

{#if data}
  <GForm form={data} postUrl={appsScriptUrl} {translations} lang="en" />
{/if}
{#if formsUrl || translationsUrl}
  <button
    disabled={loading}
    class="bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded"
    on:click={loadForm}
  >
    &#x21bb; <!-- Unicode symbol for refresh arrow -->
  </button>
{/if}
