<script lang="ts">
  export let colspan: number | null | undefined = null;
</script>

<td class="py-3 px-6 bg-slate-50 dark:bg-slate-800" {colspan}>
  <slot />
</td>
