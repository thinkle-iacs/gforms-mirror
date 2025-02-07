<script lang="ts">
  import { getText } from "./translate.ts";
  import type { StandardFormItem, ChoiceFormItem } from "./../../gas/types.ts";
  import type { Page } from "./types";
  import GFormItem from "./GFormItem.svelte";
  import T from "./T.svelte";

  export let page: Page;
  export let isActive = false;
  export let isFirst = false;
  export let isSubmitting = false;
  export let onBack: () => void;
  export let onGoto: (id: string) => void;
  export let lang = "en";
  export let translations = {};

  let nextPageId = page.defaultNextPage;
  let formState: Record<string, any> = {}; // Stores form values
  let formErrors: Record<string, string> = {}; // Tracks validation errors

  function setChoice(item: ChoiceFormItem, idx: number) {
    if (!item.choicesNavigation) return;
    if (!item.choicesNavigation[idx]) return;
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
        formErrors[item.id] = getText(
          "This field is required.",
          translations,
          lang
        );
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
  {#if page.title}<h2 class="text-2xl font-semibold">{page.title}</h2>{/if}
  {#if page.description}<p class="text-gray-600 mb-4">
      {page.description}
    </p>{/if}

  {#each page.items as item}
    <GFormItem {item} {onInputChange} {setChoice} {lang} {translations} />
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
        <T text="Back" {lang} {translations} />
      </button>
    {/if}
    <button
      on:click|preventDefault={handleNext}
      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      disabled={isSubmitting}
    >
      {#if isSubmitting}
        <T text="Submitting" {lang} {translations} />
      {:else if nextPageId === "submit"}
        <T text="Submit" {lang} {translations} />
      {:else}
        <T text="Next" {lang} {translations} />
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
