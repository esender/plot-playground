<svelte:options accessors={true} />

<script lang="ts">
  export let title: string;
  export let arrow = null;
  export let arrowPosition: { x: number | null; y: number | null } = {
    x: null,
    y: null,
  };
</script>

<div class="bg-gray-800 text-white rounded px-2 py-1 max-w-lg relative">
  {@html title}
  <div
    bind:this={arrow}
    class="absolute w-3 h-3 bg-gray-800 rotate-45 translate-y-1/2"
    style:top={arrowPosition.y ? `${arrowPosition.y}px` : ""}
    style:left={arrowPosition.x ? `${arrowPosition.x}px` : ""}
    style={`bottom: 0px;`}
  />
</div>

<style>
  a {
    @apply underline;
  }
</style>
