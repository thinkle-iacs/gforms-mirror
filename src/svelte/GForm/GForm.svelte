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

  async function submitForm() {
    let formData = new FormData(theFormElement);
    let formJson = formDataToJson(formData, form.id); // ✅ Include form ID

    console.log("Submitting form:", formJson);

    if (postUrl) {
      try {
        const response = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formJson),
        });

        if (!response.ok) {
          console.error("Form submission failed:", response.statusText);
        } else {
          console.log("Form submitted successfully");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else if (postCallback) {
      postCallback(formJson);
    }
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
