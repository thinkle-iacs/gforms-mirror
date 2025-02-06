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
</script>

{#if form}
  <form bind:this={theFormElement} class:hidden={submitted}>
    <h1 class="text-3xl font-semibold">{form.title}</h1>
    <a class="text-blue-600 hover:underline text-xs" href={form.publishedUrl}
      >(complete in Google Forms)</a
    >

    {#each pages as page}
      <GPage
        isFirst={pageHistory.length === 0}
        isActive={currentPageId === page.id}
        isSubmitting={submitting}
        {page}
        onBack={goBack}
        onGoto={(id) => {
          nextPageOrSubmit(id);
        }}
      ></GPage>
    {/each}
  </form>

  {#if submitted}
    <div class="text-center p-6 border border-gray-300 rounded-md shadow-md">
      <h2 class="text-2xl font-semibold text-green-600">{postedMessage}</h2>

      {#if editResponseUrl}
        <p class="mt-2">
          <a
            href={editResponseUrl}
            target="_blank"
            class="text-blue-500 underline hover:text-blue-700"
          >
            Click here to edit your response in Google Forms
          </a>
        </p>
      {/if}

      {#if allowPostAgain}
        <button
          on:click={resetForm}
          class="mt-4 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {postAgainText}
        </button>
      {/if}
    </div>
  {/if}
{/if}
