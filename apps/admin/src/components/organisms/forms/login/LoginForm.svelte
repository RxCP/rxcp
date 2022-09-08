<script>
  import Button from '@components/atoms/buttons/Button.svelte';
  import FormCheckbox from '@components/atoms/forms/FormCheckbox.svelte';
  import FormInput from '@components/atoms/forms/FormInput.svelte';
  import FormLabel from '@components/atoms/forms/FormLabel.svelte';
  import Link from '@components/atoms/links/Link.svelte';
</script>

<form>
  <div class="mb-6 space-y-2">
    <FormLabel htmlFor="email" text="Email address" />
    <FormInput id="email" type="email" />
  </div>
  <div class="mb-6 space-y-2">
    <FormLabel htmlFor="password" text="Password" />
    <FormInput id="password" type="password" />
  </div>
  <div class="flex items-start justify-between mb-6">
    <div class="flex items-center space-x-2">
      <FormCheckbox id="remember" />
      <FormLabel htmlFor="remember" text="Remember me" />
    </div>
    <Link to="/forgot-password">Forgot your password?</Link>
  </div>
  <Button type="submit">Sign In</Button>
</form>
