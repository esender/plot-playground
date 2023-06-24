<script lang="ts">
  import Icon from "@iconify/svelte";
  export let title: string;
  let show = false;

  function toggle() {
    show = !show;
  }
</script>

<div>
  <button
    class="px-2 flex items-center justify-between w-full"
    on:click={toggle}
  >
    {title}
    <div class:rotate-90={show} class="transition">
      <Icon icon="tabler:chevron-right" />
    </div>
  </button>
  {#if show}
    <div class="px-2"><slot /></div>
  {/if}
</div>
