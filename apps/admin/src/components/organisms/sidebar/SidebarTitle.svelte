<script>
  export let className = '';
  export let title;
</script>

<span
  un-text="lg:center xl:left sm lg:xs xl:sm gray-400 dark:gray-500"
  class={`${className} inline-block ml-4 lg:ml-0 xl:ml-4 uppercase`}
>
  {title}
</span>
