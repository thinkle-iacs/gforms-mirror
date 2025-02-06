<script lang="ts">
  import type { StandardFormItem, ChoiceFormItem } from "./../../gas/types.ts";
  import type { Page } from "./types";
  import GFormItem from "./GFormItem.svelte";

  export let page: Page;
  export let isActive = false;
  export let isFirst = false;
  export let onBack: () => void;
  export let onGoto: (id: string) => void;

  let nextPageId = page.defaultNextPage;
  let formState: Record<string, any> = {}; // Stores form values
  let formErrors: Record<string, string> = {}; // Tracks validation errors

  function setChoice(item: ChoiceFormItem, idx: number) {
    if (!item.choicesNavigation) return;
    nextPageId =
      item.choicesNavigation[idx].type === "page"
        ? item.choicesNavigation[idx].id
        : "submit";
  }

  function onInputChange(id: string, value: any) {
    formState[id] = value;
    formErrors[id] = ""; // Clear previous error
  }

  function validatePage(): boolean {
    let isValid = true;
    formErrors = {}; // Reset errors

    for (let item of page.items) {
      if (
        item.required &&
        (!formState[item.id] || formState[item.id].length === 0)
      ) {
        formErrors[item.id] = "This field is required.";
        isValid = false;
      }
    }

    return isValid;
  }

  function handleNext() {
    if (!validatePage()) {
      console.log("Validation failed", formErrors);
      return;
    }
    onGoto(nextPageId);
  }
</script>

<div
  class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md page"
  class:active={isActive}
>
  <h2 class="text-2xl font-semibold">{page.title}</h2>
  <p class="text-gray-600 mb-4">{page.description}</p>

  {#each page.items as item}
    <GFormItem {item} {onInputChange} {setChoice} />
    {#if formErrors[item.id]}
      <p class="text-red-500 text-sm">{formErrors[item.id]}</p>
    {/if}
  {/each}

  <div class="flex justify-between mt-6">
    {#if !isFirst}
      <button
        on:click|preventDefault={onBack}
        class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
      >
        Back
      </button>
    {/if}
    <button
      on:click|preventDefault={handleNext}
      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
    >
      {#if nextPageId === "submit"}
        Submit
      {:else}
        Next
      {/if}
    </button>
  </div>
</div>

<style>
  .page {
    display: none;
  }
  .page.active {
    display: block;
  }
</style>
