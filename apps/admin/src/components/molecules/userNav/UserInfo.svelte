<script lang="ts">
  export let name: string;
  export let email: string;
</script>

<div un-text="gray-900 dark:white" class="py-3 px-4 text-sm">
  <div class="line-clamp-1 font-medium" title={name}>{name}</div>
  <div class="text-sm truncate text-slate-600 dark:text-slate-300">{email}</div>
</div>
