<script>
  export let to;
</script>

<a
  href={to}
  class="flex items-center
    py-2 px-4 rounded
    text-sm font-normal text-slate-900
    dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-800/50"
>
  <slot />
</a>
