<script lang="ts">
  import type {
    StandardFormItem,
    ChoiceFormItem,
    Translations,
  } from "./../../gas/types.ts";
  import RatingItem from "./components/RatingItem.svelte";

  export let item: StandardFormItem;
  export let onInputChange: (id: string, value: any) => void;
  export let setChoice: (item: ChoiceFormItem, idx: number) => void;
  export let lang = "en";
  export let translations: Translations = {};
  import { getRowIdentifier } from "../../util";
  import T from "./T.svelte";
  function handleChange(event) {
    onInputChange(item.id, event.target.value);
  }
</script>

<div class="mb-6">
  <!-- Question Title -->
  <h3 class="text-lg font-semibold text-text">
    <T text={item.title} {lang} {translations} />
  </h3>

  <!-- Question Description -->
  {#if item.description}
    <p class="text-sm text-muted mb-2">
      <T text={item.description} {lang} {translations} />
    </p>
  {/if}

  <!-- Checkbox Inputs -->
  {#if item.type === "checkbox"}
    <div class="space-y-2">
      {#each item.choices as choice}
        <label class="flex items-center space-x-2">
          <input
            type="checkbox"
            name={item.id}
            value={choice}
            class="h-5 w-5 text-primary focus-visible:ring focus-visible:ring-inputFocus"
            on:change={handleChange}
          />
          <span class="text-text">
            <T text={choice} {lang} {translations} />
          </span>
        </label>
      {/each}
    </div>

    <!-- Radio Inputs -->
  {:else if item.type === "multipleChoice"}
    <div class="space-y-2">
      {#each item.choices as choice, idx}
        <label class="flex items-center space-x-2">
          <input
            type="radio"
            name={item.id}
            value={choice}
            class="h-5 w-5 text-primary focus-visible:ring focus-visible:ring-inputFocus"
            on:change={(event) => {
              handleChange(event);
              setChoice(item, idx);
            }}
          />
          <span class="text-text">
            <T text={choice} {lang} {translations} />
          </span>
        </label>
      {/each}
    </div>

    <!-- Text Input -->
  {:else if item.type === "text"}
    <input
      type="text"
      name={item.id}
      class="w-full p-2 border border-inputBorder rounded bg-input text-inputText font-input
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus"
      on:input={handleChange}
    />

    <!-- Paragraph (Textarea) -->
  {:else if item.type === "paragraph"}
    <textarea
      name={item.id}
      class="w-full p-2 border border-inputBorder rounded bg-input text-inputText font-input
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus"
      on:input={handleChange}
    ></textarea>

    <!-- Rating Item -->
  {:else if item.type == "rating"}
    <RatingItem
      name={item.id}
      icon={item.icon}
      max={item.max}
      on:input={handleChange}
    />

    <!-- Scale Input -->
  {:else if item.type == "scale"}
    <input
      type="range"
      name={item.id}
      min={item.min}
      max={item.max}
      step={item.step}
      class="w-full p-2 border border-inputBorder rounded bg-input text-inputText
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus"
      on:input={handleChange}
      on:change={handleChange}
    />

    <!-- Dropdown List -->
  {:else if item.type == "list"}
    <select
      name={item.id}
      class="w-full p-2 border border-inputBorder rounded bg-input text-inputText
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus"
      on:change={handleChange}
    >
      <option value="">Select an option</option>
      {#each item.choices as choice}
        <option value={choice}>{choice}</option>
      {/each}
    </select>

    <!-- Date, Time, and Datetime Inputs -->
  {:else if item.type == "date" || item.type == "time" || item.type == "datetime"}
    <input
      type={item.type}
      name={item.id}
      class="w-full p-2 border border-inputBorder rounded bg-input text-inputText font-input
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus"
      on:input={handleChange}
      on:change={handleChange}
    />

    <!-- Duration Input -->
  {:else if item.type == "duration"}
    <input
      type="number"
      name={item.id}
      class="w-full p-2 border border-inputBorder rounded bg-input text-inputText font-input
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inputFocus"
      on:input={handleChange}
      on:change={handleChange}
    />

    <!-- Grid & Checkbox Grid -->
  {:else if item.type === "grid" || item.type === "checkboxGrid"}
    <table class="w-full border border-inputBorder rounded-md shadow-sm">
      <thead class="bg-backgroundLight">
        <tr>
          <th class="p-2 text-left border-b"></th>
          {#each item.columns as col}
            <th class="p-2 text-center border-b text-text">{col}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each item.rows as row}
          <tr class="border-b hover:bg-hoverBackground">
            <th class="p-2 text-left font-medium text-text">{row}</th>
            {#each item.columns as col}
              <td class="p-2 text-center">
                <label class="flex items-center justify-center cursor-pointer">
                  <input
                    type={item.type === "grid" ? "radio" : "checkbox"}
                    name={getRowIdentifier(item.id, row)}
                    value={col}
                    class="h-5 w-5 text-primary focus-visible:ring focus-visible:ring-inputFocus"
                    on:change={handleChange}
                  />
                </label>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
