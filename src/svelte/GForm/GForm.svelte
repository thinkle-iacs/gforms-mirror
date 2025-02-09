<script lang="ts">
  import TranslationSelector from "./TranslationSelector.svelte";
  import GPage from "./GPage.svelte";
  import T from "./T.svelte";
  import type {
    Form,
    StandardFormItem,
    ChoiceFormItem,
    FormResponse,
    Translations,
  } from "./../../gas/types.ts";
  import type { Page } from "./types";

  export let form: Form;
  export let translations: Translations = {};
  export let postUrl: string = "";
  export let postCallback: (data: any) => void | null = null;
  export let postedMessage = `Form submitted successfully!`;
  export let allowPostAgain = true;
  export let postAgainText = "Submit another response";

  let pages: Page[];
  let submitting = false;
  let submitted = false;
  let submissionError = "";
  let editResponseUrl = "";

  /**
   * Parses the form into separate pages based on Google Forms' "page breaks."
   * Ensures that navigation rules are respected and a default submit behavior is applied.
   */
  function parsePages(form: Form): Page[] {
    if (!form) return [];
    const pages: Page[] = [];
    let currentPage: Page = {
      id: "start",
      items: [],
      defaultNextPage: null,
    };

    for (const item of form.items) {
      if (item.type === "pageBreak") {
        pages.push(currentPage);
        currentPage = {
          id: item.id,
          items: [],
          title: item.title || undefined,
          description: item.description || undefined,
          defaultNextPage: item.navigation?.id || null,
        };
      } else {
        currentPage.items.push(item);
      }
    }

    if (currentPage.items.length > 0) {
      pages.push(currentPage);
    }

    for (let i = 0; i < pages.length - 1; i++) {
      if (!pages[i].defaultNextPage) {
        pages[i].defaultNextPage = pages[i + 1].id;
      }
    }

    const lastPage = pages[pages.length - 1];
    if (!lastPage.defaultNextPage) {
      lastPage.defaultNextPage = "submit";
    }
    currentPageId = pages[0].id;
    return pages;
  }

  let currentPageId: string;
  let nextPageId: string;
  $: pages = parsePages(form);
  $: nextPageId =
    pages.find((page) => page.id === currentPageId)?.defaultNextPage ||
    "submit";

  let pageHistory = [];

  function goBack() {
    if (pageHistory.length > 0) {
      currentPageId = pageHistory.pop();
      pageHistory = pageHistory;
    }
  }

  /**
   * Converts form data into a JSON object that matches the expected format for submission.
   * Ensures multiple selections (checkboxes) are stored as arrays.
   */
  function formDataToJson(formData: FormData, formId: string): FormResponse {
    const json: Record<string, any> = { id: formId, items: {} };

    formData.forEach((value, key) => {
      if (json.items[key] !== undefined) {
        if (!Array.isArray(json.items[key])) {
          json.items[key] = [json.items[key]];
        }
        json.items[key].push(value);
      } else {
        json.items[key] = value;
      }
    });

    return json;
  }

  /*
   * 🛠️ NOTE: Due to CORS restrictions, Google Apps Script does not support direct POST responses.
   * -> (1) Every form submission includes a unique UUID in the request body.
   * -> (2) The POST request is sent using `mode: "no-cors"`, which prevents direct response handling.
   * -> (3) The Google Apps Script backend stores the response temporarily using the UUID.
   * -> (4) The front-end then makes a GET request with the UUID to retrieve the response.
   * -> (5) The backend deletes the stored response after returning it.
   *
   * This workaround ensures that form submissions are properly processed and retrievable,
   * despite CORS limitations. If Apps Script ever supports CORS properly in the future,
   * we can remove this hack and handle responses directly from the POST request.
   */
  async function submitForm() {
    submitting = true;
    submissionError = "";
    let formData = new FormData(theFormElement);
    const uuid = crypto.randomUUID(); // Generate a unique ID
    let formJson = { ...formDataToJson(formData, form.id), uuid };

    try {
      await fetch(postUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formJson),
      });
    } catch (error) {
      console.warn("Expected CORS error, ignoring:", error);
    }

    let result = await pollForResponse(uuid);
    console.log("Final result:", result);

    if (result.success) {
      submitted = true;
      editResponseUrl = result.editResponseUrl || "";
    } else {
      submissionError = "There was an error submitting the form.";
    }
    submitting = false;
  }

  /**
   * Polls the backend for the submission result using the UUID.
   * Tries up to `maxAttempts` times before giving up.
   */
  async function pollForResponse(uuid) {
    let attempts = 0;
    const maxAttempts = 10;
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    while (attempts < maxAttempts) {
      console.log(`Checking form submission status (Attempt ${attempts + 1})`);

      let response = await fetch(`${postUrl}?uuid=${uuid}`, { method: "GET" });
      let data = await response.json();

      if (data.success || data.error) {
        return data;
      }

      await delay(1000);
      attempts++;
    }

    return { success: false, error: "Timeout while waiting for response" };
  }

  function nextPageOrSubmit(nextPageId: string) {
    if (nextPageId == "submit") {
      submitForm();
    } else {
      pageHistory.push(currentPageId);
      pageHistory = pageHistory;
      currentPageId = nextPageId;
    }
  }

  function resetForm() {
    submitted = false;
    submissionError = "";
    editResponseUrl = "";
    currentPageId = pages[0].id;
    pageHistory = [];
    theFormElement.reset();
  }

  let theFormElement: HTMLFormElement;

  export let lang = "en";

  function onLanguageChange(newLang: string, useGoogle: boolean) {
    console.log(
      "Language changed to",
      lang,
      "using Google Translate?",
      useGoogle
    );
    lang = newLang;
  }
</script>

{#if form}
  <TranslationSelector {translations} {form} onChange={onLanguageChange} />

  <form
    bind:this={theFormElement}
    class="bg-background text-text font-ui p-6 rounded-md shadow-md space-y-6"
    class:hidden={submitted}
  >
    <!-- Form Title -->
    <h1 class="text-3xl font-semibold text-primary">
      <T text={form.title} {lang} {translations} />
    </h1>

    <a class="text-link hover:underline text-sm" href={form.publishedUrl}>
      (<T text="Complete in Google Forms" {lang} {translations} />)
    </a>

    <!-- Pages -->
    <div class="space-y-6">
      {#each pages as page}
        <GPage
          isFirst={pageHistory.length === 0}
          isActive={currentPageId === page.id}
          isSubmitting={submitting}
          {page}
          {lang}
          {translations}
          onBack={goBack}
          onGoto={(id) => {
            nextPageOrSubmit(id);
          }}
        />
      {/each}
    </div>

    <!-- Submit Button -->
    <div class="flex justify-end">
      <button
        type="submit"
        class="px-6 py-2 text-white bg-primary rounded hover:bg-primaryDark transition focus:outline-none focus:ring-2 focus:ring-inputFocus"
      >
        <T text="Submit" {lang} {translations} />
      </button>
    </div>
  </form>

  <!-- Submission Error -->
  {#if submissionError}
    <div class="mt-4 text-error bg-red-100 border border-error p-3 rounded-md">
      <T text={submissionError} {lang} {translations} />
    </div>
  {/if}

  <!-- Success Message -->
  {#if submitted}
    <div
      class="text-center p-6 border border-gray-300 rounded-md shadow-md bg-background text-text"
    >
      <h2 class="text-2xl font-semibold text-success">{postedMessage}</h2>

      {#if editResponseUrl}
        <p class="mt-2">
          <a
            href={editResponseUrl}
            target="_blank"
            class="text-link underline hover:text-secondary"
          >
            <T
              text="Click here to edit your response in Google Forms"
              {lang}
              {translations}
            />
          </a>
        </p>
      {/if}

      {#if allowPostAgain}
        <button
          on:click={resetForm}
          class="mt-4 px-6 py-2 text-white bg-primary rounded hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-inputFocus transition"
        >
          <T text={postAgainText} {lang} {translations} />
        </button>
      {/if}
    </div>
  {/if}
{/if}

<style>
  :host,
  :root {
    --primary-color: #2563eb; /* Tailwind blue-600 */
    --secondary-color: #9333ea; /* Purple-600 */
    --success-color: #16a34a; /* Green-600 */
    --error-color: #dc2626; /* Red-600 */
    --primary-dark: color-mix(in srgb, var(--primary-color) 80%, black 20%);
    --secondary-dark: color-mix(in srgb, var(--secondary-color) 80%, black 20%);

    --bg-color: #ffffff; /* Form background */
    --text-color: #1f2937; /* Dark gray text */
    --muted-text: color-mix(in srgb, var(--text-color) 70%, white 30%);

    /* Input-specific theming */
    --input-bg-color: #f9fafb; /* Light gray */
    --input-text-color: #111827; /* Black */
    --input-border-color: #d1d5db; /* Gray-300 */
    --input-focus-color: #2563eb; /* Blue-600 */
    --input-placeholder-color: #9ca3af; /* Gray-400 */

    --font-family: "Inter", sans-serif;
    --input-font: "Inter", sans-serif;
  }

  /* Dark Mode Theme */
  :global([data-theme="dark"]) {
    --bg-color: #1f2937;
    --text-color: #e5e7eb;
    --muted-text: color-mix(in srgb, var(--text-color) 70%, black 30%);

    --input-bg-color: #374151;
    --input-text-color: #f3f4f6;
    --input-border-color: #4b5563;
    --input-focus-color: #60a5fa;
  }

  /* Transparent Mode */
  :global([data-theme="transparent"]) {
    --bg-color: transparent;
    --text-color: inherit;
  }
</style>
