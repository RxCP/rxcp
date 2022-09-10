<script lang="ts" context="module">
  import type { PageMeta } from '@vitebook/client';

  export const __pageMeta: PageMeta = {
    title: 'Button',
    description: '',
  };
</script>

<script lang="ts">
  import { Variant } from '@vitebook/client';
  import {
    ControlsAddon,
    EventsAddon,
    eventCallback,
  } from '@vitebook/client/addons';
  import Button from './Button.svelte';

  let text : string = 'Primary Button';
  let disabled : boolean = false;
  let isLoading : boolean = false;
</script>

<Variant name="Default" description="The default button.">
  <Button {disabled} {isLoading} on:click={eventCallback}>{text}</Button>
</Variant>

<Variant
  name="Disabled"
  description="The disabled button."
  on:enter={() => {
    disabled = true;
  }}
  on:exit={() => {
    disabled = false;
  }}
>
  <Button {disabled} {isLoading}>{text}</Button>
</Variant>

<ControlsAddon>
  <label>
    text <input type="text" bind:value={text} />
  </label>
  <label style="margin-top: 24px;">
    Disabled <input type="checkbox" bind:checked={disabled} />
  </label>
  <label style="margin-top: 24px;">
    isLoading <input type="checkbox" bind:checked={isLoading} />
  </label>
</ControlsAddon>

<EventsAddon />
