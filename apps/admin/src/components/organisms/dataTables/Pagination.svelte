<script>
  import { createEventDispatcher } from 'svelte/internal';
  import PaginationButton from './PaginationButton.svelte';

  const dispatch = createEventDispatcher();

  export let current = 1;
  export let num_items = 120;
  export let per_page = 5;

  let arr_pages = [];
  const numPerPageOptions = [5, 10, 20, 50];
  let currentNumPerPage = numPerPageOptions[0];

  $: num_pages = Math.ceil(num_items / per_page);

  $: if (current) {
    setArrPages();
  }

  $: if (per_page) {
    setArrPages();
  }

  $: if (num_pages) {
    setArrPages();
  }

  $: if (num_items) {
    num_pages = Math.ceil(num_items / per_page);
    current = current || 1;
  }

  function buildArr(c, n) {
    if (n <= 7) {
      return [...Array(n)].map((_, i) => i + 1);
    } else {
      if (c < 3 || c > n - 2) {
        return [1, 2, 3, '...', n - 2, n - 1, n];
      } else {
        return [1, '...', c - 1, c, c + 1, '...', n];
      }
    }
  }

  function setCurrent(i) {
    if (isNaN(i)) return;
    current = i;
    dispatch('navigate', { current, perPage: currentNumPerPage });
  }

  function setArrPages() {
    arr_pages = buildArr(current, num_pages);
  }
</script>

<div class="flex items-center justify-between pb-8">
  <div class="flex items-center space-x-2">
    <select
      id="countries"
      class="dark:bg-slate-700 border border-slate-400 dark:border-slate-600 text-slate-400 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      bind:value={currentNumPerPage}
      on:change={setCurrent(current)}
    >
      {#each numPerPageOptions as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
    <label
      for="countries"
      class="flex-none block text-sm font-medium text-current"
    >
      per page
    </label>
  </div>
  <div class="text-current">{current}-{per_page} of {num_items} results</div>
  <div class="flex space-x-1">
    <PaginationButton
      isDisabled={current <= 1}
      on:click={() => current > 1 && setCurrent(current - 1)}
    >
      <div class="i-tabler-arrow-left" />
    </PaginationButton>
    {#each arr_pages as i}
      <PaginationButton isActive={i == current} on:click={() => setCurrent(i)}>
        {i}
      </PaginationButton>
    {/each}
    <PaginationButton
      isDisabled={current >= num_pages}
      on:click={() => current < num_pages && setCurrent(current + 1)}
    >
      <div class="i-tabler-arrow-right" />
    </PaginationButton>
  </div>
</div>
