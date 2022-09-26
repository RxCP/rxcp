<script lang="ts">
  import CardWrapper from './cardWrapper.svelte';

  export let number: number;
  export let label: string;
</script>

<CardWrapper
  class="flex flex-col justify-center text-center space-y-2 p-4 rounded"
>
  <span
    class="text-lg lg:text-4xl font-bold text-slate-700 dark:text-slate-200"
  >
    {number}
  </span>
  <h2 class="text-sm text-gray-500">{label}</h2>
</CardWrapper>
