<script>
  import Button from 'ui/src/Button/Button.svelte';
  import FormInput from '@pattern/atoms/forms/FormInput.svelte';
  import FormLabel from '@pattern/atoms/forms/FormLabel.svelte';
  import Link from '@pattern/atoms/links/Link.svelte';
</script>

<form>
  <div class="mb-6 space-y-2">
    <FormLabel htmlFor="email" text="Email address" />
    <FormInput id="email" type="email" />
  </div>
  <div class="flex items-center justify-between">
    <Link to="/login">Back to sign in</Link>
    <Button type="submit">Reset password</Button>
  </div>
</form>
