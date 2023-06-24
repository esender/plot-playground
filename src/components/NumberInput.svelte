<script>
  import Icon from "@iconify/svelte";
  export let value = 0;

  export let icon = "tabler:letter-w";

  let mouseIsDown = false;

  function handleMouseDown() {
    mouseIsDown = true;
  }

  function handleMouseUp() {
    mouseIsDown = false;
  }

  function handleMouseMove(event) {
    if (mouseIsDown) {
      event.preventDefault();
      value += event.movementX;
    }
  }
</script>

<svelte:document on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div
  class="flex w-full items-center gap-2 border border-transparent hover:border-white focus-within:outline-blue-400 focus-within:outline-1 focus-within:outline-offset-0 p-1"
>
  <div
    class="w-4 h-4 cursor-ew-resize"
    on:mousedown={handleMouseDown}
    role="option"
  >
    <Icon {icon} />
  </div>
  <input type="number" class="flex-1 bg-transparent outline-0" bind:value />
</div>
