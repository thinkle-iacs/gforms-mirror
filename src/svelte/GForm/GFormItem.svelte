<script lang="ts">
  import type { StandardFormItem, ChoiceFormItem } from "./../../gas/types.ts";

  export let item: StandardFormItem;
  export let onInputChange: (id: string, value: any) => void;
  export let setChoice: (item: ChoiceFormItem, idx: number) => void;

  function handleChange(event) {
    onInputChange(item.id, event.target.value);
  }
</script>

<div class="mb-6">
  <h3 class="text-lg font-semibold">{item.title}</h3>
  {#if item.description}
    <p class="text-sm text-gray-600 mb-2">{item.description}</p>
  {/if}

  {#if item.type === "checkbox"}
    {#each item.choices as choice}
      <label class="block">
        <input
          type="checkbox"
          name={item.id}
          value={choice}
          class="mr-2 accent-blue-500"
          on:change={handleChange}
        />
        {choice}
      </label>
    {/each}
  {:else if item.type === "multipleChoice"}
    {#each item.choices as choice, idx}
      <label class="block">
        <input
          type="radio"
          name={item.id}
          value={choice}
          class="mr-2 accent-blue-500"
          on:change={() => {
            handleChange(event);
            setChoice(item, idx);
          }}
        />
        {choice}
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
  {/if}
</div>
