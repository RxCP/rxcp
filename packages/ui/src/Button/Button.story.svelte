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
  import type { buttonColor } from './ButtonTypes';

  let text: string = 'Button';
  let color: buttonColor = 'primary';
  let isDisabled: boolean = false;
  let isLoading: boolean = false;
</script>

<Variant name="Solid" description="The solid button.">
  <Button {color} {isDisabled} {isLoading} on:click={eventCallback}>
    {text}
  </Button>
</Variant>

<Variant name="Ghost" description="The ghost button.">
  <Button
    variant="ghost"
    {color}
    {isDisabled}
    {isLoading}
    on:click={eventCallback}
  >
    {text}
  </Button>
</Variant>

<Variant
  name="Disabled"
  on:enter={() => {
    isDisabled = true;
  }}
  on:exit={() => {
    isDisabled = false;
  }}
>
  <Button {color} {isDisabled} {isLoading}>{text}</Button>
</Variant>

<Variant name="Sizes">
  <Button {color} {isDisabled} {isLoading} size="xs">{text}</Button>
  <Button {color} {isDisabled} {isLoading} size="sm">{text}</Button>
  <Button {color} {isDisabled} {isLoading} size="md">{text}</Button>
  <Button {color} {isDisabled} {isLoading} size="lg">{text}</Button>
</Variant>

<ControlsAddon>
  <div class="vbk-controls">
    <label>
      text <input type="text" bind:value={text} />
    </label>
    <label>
      Color
      <select bind:value={color}>
        <option value="primary">Primary</option>
        <option value="secondary">Secondary</option>
      </select>
    </label>
    <label>
      Disabled <input type="checkbox" bind:checked={isDisabled} />
    </label>
    <label>
      isLoading <input type="checkbox" bind:checked={isLoading} />
    </label>
  </div>
</ControlsAddon>

<EventsAddon />
