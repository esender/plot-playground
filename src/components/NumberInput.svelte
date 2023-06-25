<script>
  import Icon from "@iconify/svelte";
  export let value = 0;
  export let id;

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
  console.log($$props);
</script>

<svelte:document on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div
  class="flex-auto flex items-center gap-2 border border-gray-300 hover:border-white focus-within:outline-blue-400 focus-within:outline-1 focus-within:outline-offset-0 p-1 focus-within:outline"
>
  <!-- svelte-ignore a11y-role-has-required-aria-props -->
  <!-- svelte-ignore a11y-interactive-supports-focus -->
  <span
    class="w-4 h-4 cursor-ew-resize flex-none"
    on:mousedown={handleMouseDown}
    role="option"
  >
    <Icon {icon} />
  </span>
  <input
    {id}
    type="number"
    class="grow-0 shrink bg-transparent outline-0 w-full"
    on:focus={(e) => e.target.select()}
    bind:value
  />
</div>
