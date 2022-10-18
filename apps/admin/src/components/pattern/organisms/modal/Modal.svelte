<script>
  import A11yDialog from 'a11y-dialog';
  import { createEventDispatcher, onMount } from "svelte";

  export let id;
  export let title = ''

  const dispatch = createEventDispatcher()

  onMount(() => {
    if (id) {
      const container = document.getElementById(id)
      const dialog = new A11yDialog(container)
      dispatch('dialog', { dialog })
    }
  })
</script>

<div
  {id}
  class="flex fixed z-50 inset-0 dialog"
  aria-labelledby="user-details"
  aria-hidden="true"
>
  <div class="fixed inset-0 overlay bg-slate-600/60 dark:bg-slate-600/80" data-a11y-dialog-hide></div>
  <div class="content bg-white rounded dark:bg-slate-900 m-auto relative" role="document">
    <div class="flex items-start px-6 py-4">
      <h1 id="user-details" class="font-bold text-lg mr-3">
        <slot name="title">{title}</slot>
      </h1>
      <button
        type="button" data-a11y-dialog-hide aria-label="Close dialog"
        class="bg-slate-100 dark:bg-slate-800 text-xl px-2 rounded ml-auto">
        &times;
      </button>
    </div>
    <div class="p-6 h-[60vh] app-scrollbar">
      <slot />
    </div>
    <div class="p-6">
      <slot name="footer">

      </slot>
    </div>
  </div>
</div>

<style>
.dialog[aria-hidden='true'] {
  display: none;
}
.overlay {
  animation: fade-in 200ms both;
}
.content {
  animation: fade-in 400ms 200ms both, slide-up 400ms 200ms both;
  max-width: 90%;
  width: 800px;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
}

@keyframes slide-up {
  from {
    transform: translateY(10%);
  }
}
</style>
