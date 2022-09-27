<script>
  import { hstEvent } from 'histoire/client';
  import Button from './Button.svelte';

  export let Hst;
  const source = `
  <Button>
    Click me!
  </Button>
`;

  let isDisabled = false;
  let size = 'md';
</script>

<Hst.Story title="Button" {source}>
  <Button {isDisabled} {size} on:click={(event) => hstEvent('click', event)}>
    Click me!
  </Button>

  <svelte:fragment slot="controls">
    <Hst.Checkbox bind:value={isDisabled} title="isDisabled" />
    <Hst.Select bind:value={size} options={['sm', 'md', 'lg']} title="Size" />
    <pre>{JSON.stringify({ isDisabled, size }, null, 2)}</pre>
  </svelte:fragment>
</Hst.Story>
