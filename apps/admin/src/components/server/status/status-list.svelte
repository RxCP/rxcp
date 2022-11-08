<script>
  import { onMount } from "svelte";
  import socket from "../../../socket/socket";

  let loginStatus = 'offline'
  let charStatus = 'offline'
  let mapStatus = 'offline'

  onMount(() => {
    socket.on('server-status', (data) => {
      loginStatus = data?.login?.status
      charStatus = data?.char?.status
      mapStatus = data?.map?.status
    })
  })
</script>


<h2 class="font-bold">Server Status</h2>
<ul class="mt-4 space-y-2">
  <li
    class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400"
  >
    Login
    <span
      un-rounded="full"
      un-text="xs white"
      class="uppercase px-2 py-1 {loginStatus === 'online' ? 'bg-green-700':'bg-red-500'}"
    >
      {loginStatus}
    </span>
  </li>
  <li
    class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400"
  >
    Character
    <span
      un-rounded="full"
      un-text="xs white"
      class="uppercase px-2 py-1 {charStatus === 'online' ? 'bg-green-700':'bg-red-500'}"
    >
      {charStatus}
    </span>
  </li>
  <li
    class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400"
  >
    Map
    <span
      un-rounded="full"
      un-text="xs white"
      class="uppercase px-2 py-1 {mapStatus === 'online' ? 'bg-green-700':'bg-red-500'}"
    >
      {mapStatus}
    </span>
  </li>
  <li
    class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400"
  >
    Players Online
    <span
      un-rounded="full"
      class="uppercase text-xs px-2 py-1 bg-slate-600 text-white"
    >
      100
    </span>
  </li>
</ul>
