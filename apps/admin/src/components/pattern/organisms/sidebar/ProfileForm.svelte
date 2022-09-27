<script lang="ts">
  import type { AuthUser } from '@store/auth';
  import { user as userAuth } from '@store/auth';
  import { useUser } from '@astro-auth/client';
  import FormInput from '@pattern/atoms/forms/FormInput.svelte';
  import FormLabel from '@pattern/atoms/forms/FormLabel.svelte';
  import Button from 'rxcp-ui/src/Button/Button.svelte';
  import Alert from 'rxcp-ui/src/Alert/Alert.svelte';

  export let user: AuthUser | Record<string, string> = {};

  let isSubmitting: boolean = false;
  let error: string = '';

  async function handleFormSubmit(e: Event) {
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);

    if (isSubmitting) return;

    isSubmitting = true;

    const response = await fetch('/api/me', {
      method: 'PATCH',
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });

    if (!response.ok) {
      error = 'Invalid data';
      isSubmitting = false;
      return;
    }

    const user = await useUser();
    // Refresh user data (client side)
    userAuth.set(user);

    isSubmitting = false;
  }
</script>

{#if error}
  <Alert status="error">{error}</Alert>
{/if}

<form on:submit|preventDefault={handleFormSubmit}>
  <div class="grid grid-cols-1 gap-4 mb-8">
    <div class="space-y-2">
      <FormLabel htmlFor="first_name" text="First name" />
      <FormInput id="first_name" name="first_name" value={user.first_name} />
    </div>
    <div class="space-y-2">
      <FormLabel htmlFor="last_name" text="Last name" />
      <FormInput id="last_name" name="last_name" value={user.last_name} />
    </div>
    <div class="space-y-2">
      <FormLabel htmlFor="email" text="Email address" />
      <FormInput id="email" name="email" value={user.email} disabled />
    </div>
  </div>
  <div class="space-y-2 flex place-items-end">
    <Button type="submit" isLoading={isSubmitting}>Save</Button>
  </div>
</form>
