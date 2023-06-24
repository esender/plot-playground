<script lang="ts">
  export let value: any;

  let mouseIsDown = false;
  let offsetX = 0;

  function handleMouseDown(event: MouseEvent) {
    mouseIsDown = true;
    offsetX = event.offsetX;
  }

  function handleMouseUp() {
    mouseIsDown = false;
    offsetX = 0;
  }

  function handleMouseMove(event: MouseEvent) {
    if (mouseIsDown) {
      event.preventDefault();
      value = window.innerWidth - event.x - (2 - offsetX);
    }
  }

  function setClass(node: HTMLBodyElement, mouseIsDown: boolean) {
    node.classList.toggle("cursor-ew-resize", mouseIsDown);

    return {
      update(mouseIsDown: boolean) {
        node.classList.toggle("cursor-ew-resize", mouseIsDown);
      },
      destroy() {
        node.classList.remove("cursor-ew-resize");
      },
    };
  }
</script>

<svelte:document on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />
<svelte:body use:setClass={mouseIsDown} />

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
  role="separator"
  aria-orientation="vertical"
  tabindex="0"
  on:mousedown={handleMouseDown}
  class="absolute h-full left-0 w-1 -translate-x-1/2 hover:bg-blue-600 transition-colors delay-150 cursor-ew-resize"
/>
