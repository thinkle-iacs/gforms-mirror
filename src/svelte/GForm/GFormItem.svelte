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

<div class="form-item">
  <!-- Question Title -->
  <h3 class="question-title">
    <T text={item.title} {lang} {translations} />
  </h3>

  <!-- Question Description -->
  {#if item.description}
    <p class="question-description">
      <T text={item.description} {lang} {translations} />
    </p>
  {/if}

  <!-- Checkbox Inputs -->
  {#if item.type === "checkbox"}
    <div class="checkbox-group">
      {#each item.choices as choice}
        <label class="checkbox-label">
          <input
            type="checkbox"
            name={item.id}
            value={choice}
            class="checkbox-input"
            on:change={handleChange}
          />
          <span class="choice-text">
            <T text={choice} {lang} {translations} />
          </span>
        </label>
      {/each}
    </div>

    <!-- Radio Inputs -->
  {:else if item.type === "multipleChoice"}
    <div class="radio-group">
      {#each item.choices as choice, idx}
        <label class="radio-label">
          <input
            type="radio"
            name={item.id}
            value={choice}
            class="radio-input"
            on:change={(event) => {
              handleChange(event);
              setChoice(item, idx);
            }}
          />
          <span class="choice-text">
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
      class="input-field"
      on:input={handleChange}
    />

    <!-- Paragraph (Textarea) -->
  {:else if item.type === "paragraph"}
    <textarea
      name={item.id}
      class="input-field textarea-field"
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
      class="input-range"
      on:input={handleChange}
      on:change={handleChange}
    />

    <!-- Dropdown List -->
  {:else if item.type == "list"}
    <select name={item.id} class="dropdown" on:change={handleChange}>
      <option value="">Select an option</option>
      {#each item.choices as choice}
        <option value={choice}>{choice}</option>
      {/each}
    </select>
  {/if}
</div>

<style>
  /* === Global Form Item Styles === */
  .form-item {
    margin-bottom: 1.5rem;
  }

  .question-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-color, #1f2937);
    margin-bottom: 0.5rem;
  }

  .question-description {
    font-size: 0.875rem;
    color: var(--muted-text, #6b7280);
    margin-bottom: 0.75rem;
  }

  /* === Checkbox & Radio Group Styles === */
  .checkbox-group,
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .checkbox-label,
  .radio-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .choice-text {
    color: var(--text-color, #1f2937);
  }

  /* === Styled Checkboxes & Radio Buttons === */
  .checkbox-input,
  .radio-input {
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid var(--input-border-color, #d1d5db);
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
  }

  .checkbox-input:hover,
  .radio-input:hover {
    transform: scale(1.1);
  }

  .checkbox-input:checked,
  .radio-input:checked {
    background-color: var(--primary-color, #2563eb);
    border-color: var(--primary-color, #2563eb);
    box-shadow: 0 0 5px var(--primary-color, #2563eb);
  }

  /* === Text & Paragraph Input Styling === */
  .input-field {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid var(--input-border-color, #d1d5db);
    border-radius: 6px;
    background-color: var(--input-bg-color, #f9fafb);
    color: var(--input-text-color, #111827);
    font-family: var(--input-font, sans-serif);
    transition: all 0.2s ease-in-out;
  }

  .input-field:focus {
    outline: none;
    border-color: var(--input-focus-color, #2563eb);
    box-shadow: 0 0 6px var(--input-focus-color, #2563eb);
  }

  .textarea-field {
    min-height: 100px;
    resize: vertical;
  }

  /* === Range Input Styling === */
  .input-range {
    width: 100%;
    padding: 0.5rem;
    border: none;
    cursor: pointer;
  }

  /* === Dropdown Select === */
  .dropdown {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid var(--input-border-color, #d1d5db);
    border-radius: 6px;
    background-color: var(--input-bg-color, #f9fafb);
    color: var(--input-text-color, #111827);
    font-family: var(--input-font, sans-serif);
    appearance: none;
  }

  .dropdown:focus {
    outline: none;
    border-color: var(--input-focus-color, #2563eb);
    box-shadow: 0 0 6px var(--input-focus-color, #2563eb);
  }

  /* === Hover & Focus Effects === */
  .input-field:hover,
  .dropdown:hover {
    border-color: var(--primary-dark, #1d4ed8);
  }

  .input-field:focus,
  .dropdown:focus {
    border-color: var(--primary-color, #2563eb);
  }
</style>
