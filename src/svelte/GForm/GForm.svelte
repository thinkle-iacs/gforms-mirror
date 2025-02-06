<script lang="ts">
  import type {
    Form,
    StandardFormItem,
    ChoiceFormItem,
  } from "./../../gas/types.ts";
  export let form: Form;
  $: console.log("GForm got", form);

  type Page = {
    id: string;
    items: StandardFormItem[];
    title?: string;
    description?: string;
    defaultNextPage: string | null;
  };
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

  function setChoice(item: ChoiceFormItem, idx: number) {
    if (!item.choicesNavigation) {
      return;
    }
    console.log("Setting choice for", item, idx);
    if (item.choicesNavigation[idx].type == "page") {
      nextPageId = item.choicesNavigation[idx].id;
    } else if (item.choicesNavigation[idx].type == "submit") {
      nextPageId = "submit";
    }
  }

  let pageHistory = [];

  function goBack(e) {
    if (pageHistory.length > 0) {
      currentPageId = pageHistory.pop();
      pageHistory = pageHistory;
    }
    e.preventDefault();
  }

  function nextPageOrSubmit(e) {
    if (nextPageId == "submit") {
      window.alert("submit!");
    } else {
      pageHistory.push(currentPageId);
      pageHistory = pageHistory;
      currentPageId = nextPageId;
    }
    e.preventDefault();
  }
</script>

{#if form}
  <form>
    <p>We have {form.items.length} items total...</p>
    {#each pages as page}
      <div class="page" class:active={currentPageId == page.id}>
        Page: ${page.id}

        {#each page.items as item}
          <h2>{item.title}</h2>
          ({item.type})
          {#if item.description}<div>{item.description}</div>{/if}
          {#if item.type == "checkbox"}
            <div>
              {#each item.choices as choice}
                <label>
                  <input type="checkbox" name={item.id} value={choice} />
                  {choice}
                </label>
              {/each}
            </div>
          {:else if item.type == "multipleChoice"}
            <div>
              {#each item.choices as choice, idx}
                <label>
                  <input
                    type="radio"
                    name={item.id}
                    value={choice}
                    on:click={() => setChoice(item, idx)}
                  />
                  {choice}
                </label>
              {/each}
            </div>
          {:else if item.type == "text"}
            <input type="text" name={item.id} />
          {:else if item.type == "paragraph"}
            <textarea name={item.id}></textarea>
          {/if}
        {/each}
      </div>
    {/each}
    {#if pageHistory.length}
      <button on:click={goBack} type="button">Back</button>
    {/if}
    <button on:click={nextPageOrSubmit} type="submit">Continue</button>
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
