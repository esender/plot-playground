<script>
  export let value = 0;

  let mouseIsDown = false;

  function handleMouseDown() {
    mouseIsDown = true;
  }

  function handleMouseUp() {
    mouseIsDown = false;
  }

  function handleMouseMove(event) {
    if (mouseIsDown) {
      value += event.movementX;
    }
  }
</script>

<svelte:document on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div class="flex items-center gap-2">
  <div
    class="w-4 h-4 bg-red-300 cursor-ew-resize"
    on:mousedown={handleMouseDown}
    role="option"
  />
  <input type="number" bind:value />
</div>
