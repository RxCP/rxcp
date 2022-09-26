<script>
  import { user } from '@store/auth';
  import Avatar from './Avatar.svelte';
</script>

<Avatar name={$user?.first_name || ''} {...$$restProps} />
