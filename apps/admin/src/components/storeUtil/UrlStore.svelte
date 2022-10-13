<script>
  import { currentPath, queryParams as queryParamsStore } from '@store/url';

  export let currentUrl = ''
  export let queryParams = {}

  // Save store to client side
  currentPath.set(currentUrl)
  queryParamsStore.set(queryParams)
</script>
