<script>
  import Button from 'rxcp-ui/src/Button/Button.svelte';

  export let href = '';
  export let isActive = false;
  export let isDisabled = false;
</script>

<Button
  {href}
  {isDisabled}
  variant={isActive ? 'solid' : 'outline'}
  color="secondary"
  size="sm"
  on:click
>
  <slot />
</Button>
