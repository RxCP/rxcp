<script>
  import { onMount } from 'svelte';
  import { createPopper } from '@popperjs/core';

  export let text = '';
  export let content = '';
  export let element = 'div';
  export let placement = 'bottom-end';
  export let modifiers = [
    {
      name: 'offset',
      options: {
        offset: [0, 10],
      },
    },
  ];

  let button = null;
  let popup = null;
  let popper = null;
  let isPopupShow = false;
  let className = $$props?.class || '';

  onMount(() => {
    button?.addEventListener('click', showMenu);
    popper = createPopper(button, popup, {
      placement,
      modifiers,
    });

    function showMenu() {
      if (!isPopupShow) {
        popup.removeAttribute('hidden');
        popper.update();
      } else {
        popup.setAttribute('hidden', '');
      }

      isPopupShow = !isPopupShow;
    }

    return () => {
      button.removeEventListener('click', showMenu);
      popper.destroy();
      popper = null;
    };
  });
</script>

<svelte:element
  this={element}
  bind:this={button}
  class={className}
  data-component="popper"
>
  <slot>{text}</slot>
</svelte:element>
<div bind:this={popup} class="z-50" hidden>
  <slot name="popup">{content}</slot>
</div>
