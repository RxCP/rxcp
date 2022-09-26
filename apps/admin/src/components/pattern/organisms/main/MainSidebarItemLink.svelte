<script lang="ts">
  export let to: string;
  export let text: string;
  export let isActive: boolean = false;
</script>

<li>
  <a
    href={to}
    un-bg="hover:slate-200 dark:hover:slate-800/50"
    un-text="gray-600 dark:slate-400 sm"
    un-border="l hover:blue-500"
    class="block {isActive
      ? 'border-blue-500 bg-slate-200 dark:bg-slate-800/50'
      : 'border-transparent'} py-2 px-4"
  >
    {text}
  </a>
</li>
