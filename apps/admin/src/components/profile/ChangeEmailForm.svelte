<script lang="ts">
  import type { AuthUser } from '@store/auth';
  import FormInput from "@components/pattern/atoms/forms/FormInput.svelte";
  import FormLabel from "@components/pattern/atoms/forms/FormLabel.svelte";
  import Button from "rxcp-ui/src/Button/Button.svelte";
  import Alert from 'rxcp-ui/src/Alert/Alert.svelte';

  let isSubmitting: boolean = false;

 function handleFormSubmit(e: Event) {

  if (isSubmitting) return;

    isSubmitting = true;

 }
</script>

<Alert status="info" class="mb-8">
  Current password is required to update your <strong>email address</strong>.
</Alert>

<form on:submit|preventDefault={handleFormSubmit}>
  <div class="grid grid-cols-1 gap-4 mb-8">
    <div class="space-y-2">
      <FormLabel htmlFor="new_email" text="New Email" />
      <FormInput id="new_email" type="email" name="new_email" value="" required/>
    </div>
    <div class="space-y-2">
      <FormLabel htmlFor="password" text="Current Password" />
      <FormInput id="password" name="password" value="" required/>
    </div>
  </div>
  <div class="space-y-2 flex place-items-end">
    <Button type="submit" isLoading={isSubmitting}>Update</Button>
  </div>
</form>
