<script lang="ts">
  export let to: string;
  export let className: string = '';
</script>

<a href={to} class="text-sm font-medium text-blue-500 {className}">
  <slot />
</a>
