<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let type: string = 'text';
  export let id: string;
  export let iconClass: string = '';
  export let placeholder: string = '';
  export let value: string | number = '';
  export let name: string = '';

  let className = $$props.class;

  const dispatch = createEventDispatcher();

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    value = target.value;
    dispatch('input', { value });
  };
</script>

<div class="relative {className}">
  {#if iconClass}
    <div
      class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
    >
      <div class="{iconClass} text-slate-400" />
    </div>
  {/if}
  <input
    {type}
    {id}
    un-border="~ gray-300 dark:slate-700"
    un-text="gray-900 dark:slate-300 sm"
    class:pl-10={iconClass}
    class="disabled:(opacity-75 cursor-not-allowed text-opacity-75) rounded focus:(outline-none ring-blue-500 border-blue-500 dark:ring-blue-800 dark:border-blue-800) block w-full p-2.5 outline-none dark:placeholder-gray-400"
    un-bg="gray-50 dark:slate-900"
    {value}
    {placeholder}
    {name}
    {...$$restProps}
    required
    on:input={handleInput}
    on:change
  />
</div>
