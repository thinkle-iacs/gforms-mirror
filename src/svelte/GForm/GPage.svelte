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

<!-- Page Wrapper -->
<div
  class="max-w-2xl mx-auto p-6 bg-background text-text shadow-md rounded-md
         transition-opacity duration-300 ease-in-out"
  class:hidden={!isActive}
>
  <!-- Page Title -->
  {#if page.title}
    <h2 class="text-2xl font-semibold text-text">{page.title}</h2>
  {/if}

  <!-- Page Description -->
  {#if page.description}
    <p class="text-muted mb-4">{page.description}</p>
  {/if}

  <!-- Form Items -->
  {#each page.items as item}
    <GFormItem {item} {onInputChange} {setChoice} {lang} {translations} />
    {#if formErrors[item.id]}
      <p
        class="text-error bg-errorBg border border-error p-2 rounded-md text-sm mt-2"
      >
        {formErrors[item.id]}
      </p>
    {/if}
  {/each}

  <!-- Navigation Buttons -->
  <div class="flex justify-between mt-6">
    {#if !isFirst}
      <button
        on:click|preventDefault={onBack}
        class="px-4 py-2 bg-muted text-text rounded-md hover:bg-mutedHover transition
               focus:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus"
      >
        <T text="Back" {lang} {translations} />
      </button>
    {/if}

    <button
      on:click|preventDefault={handleNext}
      class="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-80 transition
             focus:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus"
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
