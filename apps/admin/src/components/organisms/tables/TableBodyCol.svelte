<script lang="ts">
  export let colspan: number | null | undefined = null;
</script>

<td class="py-4 px-6" {colspan}>
  <slot />
</td>
