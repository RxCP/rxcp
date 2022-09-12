<script lang="ts" context="module">
  import type { PageMeta } from '@vitebook/client';

  export const __pageMeta: PageMeta = {
    title: 'Alert',
    description: '',
  };
</script>

<script>
  import { Variant } from '@vitebook/client';
  import {
    ControlsAddon,
    EventsAddon,
    eventCallback,
  } from '@vitebook/client/addons';
  import Alert from './Alert.svelte';

  let text = 'Alert message';
</script>

<Variant name="Info">
  <Alert status="info">{text}</Alert>
</Variant>

<Variant name="Error">
  <Alert status="error">{text}</Alert>
</Variant>
