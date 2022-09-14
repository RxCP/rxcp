<script>
  export let className = '';

  let isDarkTheme = false;

  function handleButtonClick() {
    const html = document.querySelector('html');
    isDarkTheme = html.classList.contains('dark');

    if (isDarkTheme) {
      html.classList.remove('dark');
      return;
    }

    html.classList.add('dark');
  }
</script>

<button
  type="button"
  class={`${className} bg-transparent`}
  on:click={handleButtonClick}
>
  <div
    class:i-tabler-sun={!isDarkTheme}
    class:i-tabler-moon={isDarkTheme}
    class="text-3xl"
  />
</button>
