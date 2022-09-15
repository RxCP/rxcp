<script lang="ts">
  import Button from 'ui/src/Button/Button.svelte';
  import Alert from 'ui/src/Alert/Alert.svelte';
  import FormCheckbox from '@components/atoms/forms/FormCheckbox.svelte';
  import FormInput from '@components/atoms/forms/FormInput.svelte';
  import FormLabel from '@components/atoms/forms/FormLabel.svelte';
  import Link from '@components/atoms/links/Link.svelte';
  import { signIn } from '@astro-auth/client';

  let errors = '';
  let isSubmitting = false;

  async function onSubmit(e: Event) {
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);

    isSubmitting = true;

    const response = await signIn({
      callbackURL: '/admin/dashboard',
      provider: 'credential',
      login: {
        email: formData.get('email'),
        password: formData.get('password'),
      },
    });

    if ('error' in response) {
      errors = 'Invalid email or password';
    }

    isSubmitting = false;
  }
</script>

{#if errors}
  <Alert status="error">{errors}</Alert>
{/if}

<form on:submit|preventDefault={onSubmit}>
  <div class="mb-6 space-y-2">
    <FormLabel htmlFor="email" text="Email address" />
    <FormInput id="email" type="email" name="email" />
  </div>
  <div class="mb-6 space-y-2">
    <FormLabel htmlFor="password" text="Password" />
    <FormInput id="password" type="password" name="password" />
  </div>
  <div
    class="flex flex-col space-y-4 md:space-y-0 md:flex-row items-start justify-between mb-6"
  >
    <div class="flex items-center space-x-2">
      <FormCheckbox id="remember" />
      <FormLabel htmlFor="remember" text="Remember me" />
    </div>
    <Link to="/forgot-password" className="lt-md:text-right lt-md:w-full"
      >Forgot your password?</Link
    >
  </div>
  <Button type="submit" isLoading={isSubmitting}>Sign In</Button>
</form>
