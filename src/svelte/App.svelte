<script lang="ts">
  import GFormMirror from "./GForm/GFormMirror.svelte";
  import GForm from "./GForm/GForm.svelte";
  import { parseContext } from "./lib/parseContext";
  import { GoogleAppsScript } from "./gasApi";

  import { onMount } from "svelte";
  let email;
  let contextString = `<? context ?>`;
  let context = parseContext(contextString);
  let appsScriptUrl = "";
  import { ALL_TESTS } from "../gas/consts";
  let formsUrl = ALL_TESTS[0];
  onMount(async () => {
    email = await GoogleAppsScript.getActiveUserEmail();
    appsScriptUrl = await GoogleAppsScript.getAppsScriptUrl();
  });

  let loadMode = false;
  let data = null;
  async function loadData() {
    console.log("Grabbing data...");
    data = await GoogleAppsScript.getFormData(null, formsUrl);
    console.log("Data is ", data);
  }

  $: if (loadMode) {
    loadData();
  }
</script>

<main
  class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6"
>
  <div class="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
    <h1 class="text-2xl font-semibold text-gray-800">Hello, {email}</h1>
    <p class="text-gray-600 mt-2">We have an Apps Script URL of:</p>
    <p
      class="text-sm font-mono bg-gray-200 text-gray-800 p-2 rounded mt-1 break-all"
    >
      {appsScriptUrl}
    </p>

    <label class="block mt-4">
      <span class="text-gray-700 font-medium">Form URL:</span>
      <input
        type="text"
        bind:value={formsUrl}
        class="mt-2 w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
        placeholder="Enter Google Form URL..."
      />
    </label>

    <button
      on:click={() => (loadMode = true)}
      class="mt-4 w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition"
    >
      Load
    </button>

    {#if loadMode}
      <div class="mt-6 border-t pt-4">
        <h2>With Data From Apps Script...</h2>
        {#if data}
          <GForm form={data} postCallback={console.log} />
        {:else}
          <p>Loading...</p>
        {/if}
      </div>
      <div class="mt-6 border-t pt-4">
        <h2>With Full Loading...</h2>
        <GFormMirror {appsScriptUrl} {formsUrl} />
      </div>
    {/if}
  </div>
</main>
