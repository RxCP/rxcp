<script lang="ts">
  export let name: string;
</script>

<img
  id="avatarButton"
  class="w-10 h-10 rounded-full cursor-pointer"
  src={`https://ui-avatars.com/api/?name=${name}&rounded=true&background=3b82f6&bold=true&color=fff&format=svg`}
  alt="User dropdown"
/>
