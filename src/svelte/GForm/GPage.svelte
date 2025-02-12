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
<div class="page-container" class:hidden={!isActive}>
  <!-- Page Title -->
  {#if page.title}
    <h2 class="page-title">{page.title}</h2>
  {/if}

  <!-- Page Description -->
  {#if page.description}
    <p class="page-description">
      <T text={page.description} {lang} {translations} />
    </p>
  {/if}

  <!-- Form Items -->
  {#each page.items as item}
    <GFormItem {item} {onInputChange} {setChoice} {lang} {translations} />
    {#if formErrors[item.id]}
      <p class="error-message">
        {formErrors[item.id]}
      </p>
    {/if}
  {/each}

  <!-- Navigation Buttons -->
  <div class="nav-buttons">
    {#if !isFirst}
      <button on:click|preventDefault={onBack} class="nav-button back-button">
        <T text="Back" {lang} {translations} />
      </button>
    {:else}
      <div></div>
    {/if}

    <button
      on:click|preventDefault={handleNext}
      class="nav-button next-button"
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
  /* === Page Container === */
  .page-container {
    max-width: 42rem;
    margin: 0 auto;
    padding: 1.5rem;
    background-color: var(--bg-color, #ffffff);
    color: var(--text-color, #1f2937);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    transition: opacity 0.3s ease-in-out;
  }

  .page-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-color, #1f2937);
    margin-bottom: 0.75rem;
  }

  .page-description {
    font-size: 0.875rem;
    color: var(--muted-text, #6b7280);
    margin-bottom: 1rem;
  }

  /* === Error Message Styling === */
  .error-message {
    background-color: var(--error-bg, #fef2f2);
    border: 1px solid var(--error-color, #dc2626);
    color: var(--error-color, #dc2626);
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }

  /* === Navigation Buttons === */
  .nav-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
  }

  .nav-button {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 500;
    font-size: 1rem;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    border: none;
    outline: none;
  }

  .back-button {
    background-color: var(--muted-bg, #e5e7eb);
    color: var(--text-color, #1f2937);
  }

  .back-button:hover {
    background-color: var(--muted-hover, #d1d5db);
  }

  .next-button {
    background-color: var(--primary-color, #2563eb);
    color: #ffffff;
  }

  .next-button:hover {
    background-color: var(--primary-dark, #1d4ed8);
  }

  .next-button:disabled {
    background-color: var(--disabled-bg, #9ca3af);
    cursor: not-allowed;
  }

  /* === Focus & Active States === */
  .nav-button:focus {
    outline: 2px solid var(--input-focus-color, #2563eb);
    outline-offset: 2px;
  }
  .hidden {
    visibility: hidden;
  }
</style>
