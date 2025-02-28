<script lang="ts">
  import TranslationSelector from "./TranslationSelector.svelte";
  import GPage from "./GPage.svelte";
  import T from "./T.svelte";
  import type { Form, Translations } from "./../../gas/types.ts";
  import type { Page } from "./types";

  export let form: Form;
  export let translations: Translations = {};
  export let postUrl: string = "";
  export let allowPostAgain = true;
  export let postAgainText = "Submit another response";

  let pages: Page[] = [];
  let submitting = false;
  let submitted = false;
  let submissionError = "";
  let editResponseUrl = "";
  let currentPageId: string;
  let pageHistory: string[] = [];

  $: pages = parsePages(form);
  $: nextPageId =
    pages.find((page) => page.id === currentPageId)?.defaultNextPage ||
    "submit";

  function parsePages(form: Form): Page[] {
    if (!form) return [];
    const pages: Page[] = [];
    let currentPage: Page = {
      id: "start",
      description: form.description,
      items: [],
      defaultNextPage: "", // This will be populated later
    };

    for (const item of form.items) {
      if (item.type === "pageBreak") {
        pages.push(currentPage);
        currentPage = {
          id: item.id,
          items: [],
          title: item.title,
          description: item.description,
        };
      } else {
        currentPage.items.push(item);
      }
    }
    if (currentPage.items.length > 0) pages.push(currentPage);
    for (let i = 0; i < pages.length - 1; i++) {
      if (!pages[i].defaultNextPage) pages[i].defaultNextPage = pages[i + 1].id;
    }
    pages[pages.length - 1].defaultNextPage = "submit";
    currentPageId = pages[0].id;
    return pages;
  }

  function goBack() {
    if (pageHistory.length > 0) {
      currentPageId = pageHistory.pop();
      pageHistory = [...pageHistory]; // Trigger reactivity
    }
  }

  async function submitForm() {
    submitting = true;
    submissionError = "";
    let formData = new FormData(theFormElement);
    const uuid = crypto.randomUUID();
    let formJson = { id: form.id, items: Object.fromEntries(formData), uuid };

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
    console.log("Submitted data... polling for response: ", uuid);

    let result = await pollForResponse(uuid);
    console.log("Submitted form!", result);
    if (result.success) {
      submitted = true;
      editResponseUrl = result.editResponseUrl || "";
    } else {
      submissionError = "Error submitting the form.";
    }

    submitting = false;
  }

  async function pollForResponse(uuid) {
    for (let i = 0; i < 10; i++) {
      let response = await fetch(`${postUrl}?uuid=${uuid}`, { method: "GET" });
      let data = await response.json();
      if (data.success || data.error) return data;
      await new Promise((r) => setTimeout(r, 1000));
    }
    return { success: false, error: "Timeout waiting for response" };
  }

  function nextPageOrSubmit(nextPageId: string) {
    if (nextPageId === "submit") {
      submitForm();
    } else {
      pageHistory = [...pageHistory, currentPageId];
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

  function onLanguageChange(newLang: string) {
    lang = newLang;
  }
</script>

{#if form}
  <section>
    <TranslationSelector {translations} {form} onChange={onLanguageChange} />

    <form
      bind:this={theFormElement}
      class="form-container"
      class:hidden={submitted}
    >
      <!-- Form Title -->
      <h1 class="form-title">
        <T text={form.title} {lang} {translations} />
      </h1>

      <a class="form-link" href={form.publishedUrl}>
        (<T text="Complete in Google Forms" {lang} {translations} />)
      </a>

      <!-- Pages -->
      <div class="page-list">
        {#each pages as page}
          <GPage
            isFirst={pageHistory.length === 0}
            isActive={currentPageId === page.id}
            isSubmitting={submitting}
            {page}
            {lang}
            {translations}
            onBack={goBack}
            onGoto={nextPageOrSubmit}
          />
        {/each}
      </div>
    </form>

    {#if submissionError}
      <div class="error-message">
        <T text={submissionError} {lang} {translations} />
      </div>
    {/if}

    {#if submitted}
      <div class="success-container">
        <h2 class="success-title">
          <T text="Form submitted successfully!" {lang} {translations} />
        </h2>

        {#if form.confirmationMessage}
          <p>
            <T text={form.confirmationMessage} {lang} {translations} />
          </p>
        {/if}

        {#if editResponseUrl}
          <p>
            <a
              class="edit-response-link"
              href={editResponseUrl}
              target="_blank"
            >
              <T
                text="Edit your response in Google Forms"
                {lang}
                {translations}
              />
            </a>
          </p>
        {/if}

        {#if allowPostAgain}
          <button on:click={resetForm} class="submit-again-button">
            <T text={postAgainText} {lang} {translations} />
          </button>
        {/if}
      </div>
    {/if}
  </section>
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

  .form-container {
    background: var(--bg-color);
    color: var(--text-color);
    font-family: var(--font-family);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .form-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--primary-color);
  }

  .form-link {
    color: var(--primary-color);
    font-size: 0.875rem;
    text-decoration: underline;
    cursor: pointer;
  }

  .page-list {
    margin-top: 1rem;
  }

  .error-message {
    background: #fde2e2;
    border: 1px solid var(--error-color);
    padding: 0.75rem;
    color: var(--error-color);
    border-radius: 6px;
    margin-top: 1rem;
  }

  .success-container {
    text-align: center;
    padding: 1.5rem;
    border: 1px solid var(--text-color);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .success-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--success-color);
  }

  .edit-response-link {
    color: var(--secondary-color);
    text-decoration: underline;
    margin-top: 0.5rem;
  }

  .submit-again-button {
    background: var(--primary-color);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 1rem;
  }

  .submit-again-button:hover {
    background: var(--secondary-color);
  }
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
  }
  .hidden {
    visibility: hidden;
    display: none;
  }
</style>
