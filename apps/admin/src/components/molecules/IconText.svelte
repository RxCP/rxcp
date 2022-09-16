<script lang="ts">
  export let iconClass: string = '';
  export let textClass: string = '';
  export let sizeClass: string = 'text-xl';
  export let text: string;
</script>

<div class="{iconClass} {sizeClass} text-blue-500" />
<span class="ml-3 {textClass}">{text}</span>
