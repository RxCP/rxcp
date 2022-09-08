<script>
  export let to;
  export let text;
</script>

<li>
  <a
    href={to}
    class="block text-slate-700
      dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/50
      py-2 px-4 text-sm"
  >
    {text}
  </a>
</li>
