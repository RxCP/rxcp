<script lang="ts">
  export let to: string;
  export let isActive: boolean = false;
</script>

<a
  href={to}
  un-text="sm"
  class="flex items-center
    py-2 px-4 rounded
    hover:(bg-slate-200 dark:bg-slate-800/50 text-blue-500)
    {isActive
    ? 'bg-slate-200 dark:bg-slate-800/50 text-blue-500'
    : 'dark:text-slate-300 text-slate-600 font-normal'}"
>
  <slot />
</a>
