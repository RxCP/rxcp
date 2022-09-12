<script lang="ts">
  export let name: string;
  export let email: string;
</script>

<div un-text="gray-900 dark:white" class="py-3 px-4 text-sm">
  <div>{name}</div>
  <div class="font-medium truncate">{email}</div>
</div>
