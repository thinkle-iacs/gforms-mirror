<script lang="ts">
  import GPage from "./GPage.svelte";

  import type {
    Form,
    StandardFormItem,
    ChoiceFormItem,
    FormResponse,
  } from "./../../gas/types.ts";
  import type { Page } from "./types";

  export let form: Form;
  // We can provide a function OR just a URL to post standard form data to
  export let postUrl: string = "";
  export let postCallback: (data: any) => void | null = null;

  $: console.log("GForm got", form);

  let pages: Page[];

  function parsePages(form: Form): Page[] {
    if (!form) return [];
    const pages: Page[] = [];
    let currentPage: Page = {
      id: "start",
      items: [],
      defaultNextPage: null, // To be updated later
    };

    for (const item of form.items) {
      if (item.type === "pageBreak") {
        // Store the current page before starting a new one
        pages.push(currentPage);

        // Create new page from this page break
        currentPage = {
          id: item.id,
          items: [],
          title: item.title || undefined,
          description: item.description || undefined,
          defaultNextPage: item.navigation?.id || null, // Use Google Forms' navigation rule
        };
      } else {
        currentPage.items.push(item);
      }
    }

    // Add the last page if it wasn't added
    if (currentPage.items.length > 0) {
      pages.push(currentPage);
    }

    // ✅ Fix any missing `defaultNextPage` values
    for (let i = 0; i < pages.length - 1; i++) {
      if (!pages[i].defaultNextPage) {
        pages[i].defaultNextPage = pages[i + 1].id; // Default to next page in order
      }
    }

    // ✅ Ensure the final page leads to submit if no other navigation is set
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
  function formDataToJson(formData: FormData, formId: string): FormResponse {
    const json: Record<string, any> = { id: formId, items: {} };

    formData.forEach((value, key) => {
      if (json.items[key] !== undefined) {
        if (!Array.isArray(json.items[key])) {
          json.items[key] = [json.items[key]]; // Convert existing value into an array
        }
        json.items[key].push(value); // Add new value to the array
      } else {
        json.items[key] = value; // Store as a string if it's the first occurrence
      }
    });

    return json;
  }

  /*
   * NOTE: Due to CORS restrictions, Google Apps Script does not support direct POST responses.
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
    let formData = new FormData(theFormElement);
    const uuid = crypto.randomUUID(); // Generate a unique ID
    let formJson = { ...formDataToJson(formData, form.id), uuid }; // Add UUID to form data

    // Step 1: Send no-cors request
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

    // Step 2: Poll for response
    let result = await pollForResponse(uuid);
    console.log("Final result:", result);
  }

  async function pollForResponse(uuid) {
    let attempts = 0;
    const maxAttempts = 10; // Prevent infinite loops
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    while (attempts < maxAttempts) {
      console.log(`Checking form submission status (Attempt ${attempts + 1})`);

      let response = await fetch(`${postUrl}?uuid=${uuid}`, { method: "GET" });
      let data = await response.json();

      if (data.success || data.error) {
        return data; // ✅ We got a valid response
      }

      await delay(1000); // ⏳ Wait 1 second before retrying
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

  let theFormElement: HTMLFormElement;
</script>

{#if form}
  <form bind:this={theFormElement}>
    <h1 class="text-3xl font-semibold">{form.title}</h1>
    <a class="text-blue-600 hover:underline" href={form.publishedUrl}
      >(complete in Google Forms)</a
    >
    <p>We have {form.items.length} items total...</p>
    {#each pages as page}
      <GPage
        isFirst={pageHistory.length === 0}
        isActive={currentPageId === page.id}
        {page}
        onBack={goBack}
        onGoto={(id) => {
          nextPageOrSubmit(id);
        }}
      ></GPage>
    {/each}
  </form>
{/if}

<style>
  .page {
    color: #888;
  }
  .page.active {
    color: #000;
  }
</style>
