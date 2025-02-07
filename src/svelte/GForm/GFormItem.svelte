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
  $: console.log("Render item: ", item);
</script>

<div class="mb-6">
  <h3 class="text-lg font-semibold">
    <T text={item.title} {lang} {translations} />
  </h3>
  {#if item.description}
    <p class="text-sm text-gray-600 mb-2">
      <T text={item.description} {lang} {translations} />
    </p>
  {/if}

  {#if item.type === "checkbox"}
    {#each item.choices as choice}
      <label class="flex items-center space-x-2">
        <input
          type="checkbox"
          name={item.id}
          value={choice}
          class="h-5 w-5 text-blue-500 focus:ring focus:ring-blue-300"
          on:change={handleChange}
        />
        <span class="text-gray-800">
          <T text={choice} {lang} {translations} />
        </span>
      </label>
    {/each}
  {:else if item.type === "multipleChoice"}
    {#each item.choices as choice, idx}
      <label class="flex items-center space-x-2">
        <input
          type="radio"
          name={item.id}
          value={choice}
          class="h-5 w-5 text-blue-500 focus:ring focus:ring-blue-300"
          on:change={(event) => {
            handleChange(event);
            setChoice(item, idx);
          }}
        />
        <span class="text-gray-800">
          <T text={choice} {lang} {translations} />
        </span>
      </label>
    {/each}
  {:else if item.type === "text"}
    <input
      type="text"
      name={item.id}
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      on:input={handleChange}
    />
  {:else if item.type === "paragraph"}
    <textarea
      name={item.id}
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      on:input={handleChange}
    ></textarea>
  {:else if item.type == "rating"}
    <RatingItem
      name={item.id}
      icon={item.icon}
      max={item.max}
      on:input={handleChange}
    />
  {:else if item.type == "scale"}
    <input
      type="range"
      name={item.id}
      min={item.min}
      max={item.max}
      step={item.step}
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      on:input={handleChange}
      on:change={handleChange}
    />
  {:else if item.type == "list"}
    <select
      name={item.id}
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      on:change={handleChange}
    >
      <option value="">Select an option</option>
      {#each item.choices as choice}
        <option value={choice}>{choice}</option>
      {/each}
    </select>
  {:else if item.type == "date"}
    <input
      type="date"
      name={item.id}
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      on:input={handleChange}
      on:change={handleChange}
    />
  {:else if item.type == "time"}
    <input
      type="time"
      name={item.id}
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      on:input={handleChange}
      on:change={handleChange}
    />
  {:else if item.type == "datetime"}
    <input
      type="datetime-local"
      name={item.id}
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      on:input={handleChange}
      on:change={handleChange}
    />
  {:else if item.type == "duration"}
    <input
      type="number"
      name={item.id}
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      on:input={handleChange}
      on:change={handleChange}
    />
  {:else if item.type === "grid" || item.type === "checkboxGrid"}
    <table class="w-full border border-gray-300 rounded-md shadow-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 text-left border-b"></th>
          {#each item.columns as col}
            <th class="p-2 text-center border-b">{col}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each item.rows as row}
          <tr class="border-b hover:bg-gray-50">
            <th class="p-2 text-left font-medium">{row}</th>
            {#each item.columns as col}
              <td class="p-2 text-center">
                <label class="flex items-center justify-center cursor-pointer">
                  <input
                    type={item.type === "grid" ? "radio" : "checkbox"}
                    name={getRowIdentifier(item.id, row)}
                    value={col}
                    class="h-5 w-5 text-blue-500 focus:ring focus:ring-blue-300"
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
