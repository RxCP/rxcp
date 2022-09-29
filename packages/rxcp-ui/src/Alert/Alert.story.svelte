<script>
  import Alert from './Alert.svelte';

  export let Hst;
  const source = `
  <Alert status="info">
    Sample alert
  </Alert>
`;

  let status = 'info';
</script>

<Hst.Story title="Alert" {source}>
  <Alert {status}>Sample alert</Alert>
</Hst.Story>
