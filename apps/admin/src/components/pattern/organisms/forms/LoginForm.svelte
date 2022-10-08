<script lang="ts">
  import toast from 'svelte-french-toast';
  import Button from 'rxcp-ui/src/Button/Button.svelte';
  import FormCheckbox from '@pattern/atoms/forms/FormCheckbox.svelte';
  import FormInput from '@pattern/atoms/forms/FormInput.svelte';
  import FormLabel from '@pattern/atoms/forms/FormLabel.svelte';
  import Link from '@pattern/atoms/links/Link.svelte';
  import { signIn } from '@astro-auth/client';

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
      toast.error('Incorrect email or password');
    }

    isSubmitting = false;
  }
</script>

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
      <FormCheckbox id="remember" checked />
      <FormLabel htmlFor="remember" text="Remember me" />
    </div>
    <Link to="/forgot-password" className="lt-md:text-right lt-md:w-full"
      >Forgot your password?</Link
    >
  </div>
  <Button type="submit" isLoading={isSubmitting} isBlock>Sign In</Button>
</form>
