<script lang="ts">
  type size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export let name: string;
  export let size: size = 'md';

  let sizeClass = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 w-10',
    lg: 'w-20 w-20',
    xl: 'w-30 w-30',
  }[size];
</script>

<img
  id="avatarButton"
  class="rounded-full cursor-pointer {sizeClass}"
  src={`https://ui-avatars.com/api/?name=${name}&rounded=true&background=3b82f6&bold=true&color=fff&format=svg`}
  alt="User dropdown"
/>
