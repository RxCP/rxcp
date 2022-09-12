<script lang="ts">
  export let id: string;
</script>

<div
  {id}
  un-bg="white dark:gray-700"
  un-divide="y gray-100 dark:gray-600"
  class="z-10 w-44 rounded shadow"
  hidden
>
  <slot />
</div>
