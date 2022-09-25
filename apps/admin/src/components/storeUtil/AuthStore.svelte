<script>
  import { user as userStore } from '@store/auth';

  export let user = {};

  let clientUser = {
    ...user,
    ...{ accessToken: '**********' }, // don't reveal token on client side
  };

  // Save store to client side
  userStore.set(clientUser);
</script>
