<script lang="ts">
  export let max: number = 5;
  export let icon: "THUMBS_UP" | "HEART" | "STAR" = "STAR";
  export let value: number = 0;
  export let name: string = "rating";

  const iconMap = {
    STAR: "⭐",
    HEART: "❤️",
    THUMBS_UP: "👍",
  };
</script>

<div class="flex space-x-1">
  {#each Array(max).fill(0) as _, i}
    <label
      class="cursor-pointer relative"
      class:selected={value > i}
      class:unselected={value <= i}
    >
      <input
        type="radio"
        {name}
        value={i + 1}
        bind:group={value}
        class="sr-only peer"
        on:input
      />
      <span
        class="text-2xl transition-transform duration-200 ease-in-out"
        aria-hidden="true"
      >
        {iconMap[icon]}
      </span>
    </label>
  {/each}
</div>

<style>
  /* Hide radio inputs but keep them accessible */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Default size */
  span {
    display: inline-block;
    transform: scale(0.5);
    transition: transform 200ms;
  }

  /* Selected items stay full size */
  .selected span {
    transform: scale(1);
  }

  /* When hovering, grow all items to the left */
  label:hover span,
  .unselected:has(~ label:hover span) {
    transform: scale(1.1);
  }

  /* When hovering, shrink all selected items to the right */
  label:hover ~ label.selected {
    transform: scale(0.75);
  }

  /* Ensure keyboard focus is visible */
  .peer:focus-visible + span {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
  }
</style>
