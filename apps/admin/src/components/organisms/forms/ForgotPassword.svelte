<script>
  import Button from '@components/atoms/buttons/Button.svelte';
  import FormInput from '@components/atoms/forms/FormInput.svelte';
  import FormLabel from '@components/atoms/forms/FormLabel.svelte';
</script>

<form>
  <div class="mb-6 space-y-2">
    <FormLabel htmlFor="email" text="Email address" />
    <FormInput id="email" type="email" />
  </div>
  <Button type="submit">Reset password</Button>
</form>
