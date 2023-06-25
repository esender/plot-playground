import { computePosition, autoUpdate } from "@floating-ui/dom";
import Tooltip from "./Tooltip.svelte";
import { marked } from "marked";

export const tooltip = (node: HTMLElement) => {
  let tooltip: Tooltip | null;
  let title: string | null;
  let cleanupUpdater: () => void;
  let wrapper: HTMLElement;

  function updatePosition() {
    if (!tooltip) return;

    computePosition(node, wrapper).then(({ x, y }) => {
      wrapper.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  function mouseOver(event: MouseEvent) {
    if (tooltip) return;
    title = marked.parse(node.getAttribute("title") ?? "");
    node.removeAttribute("title");
    wrapper = document.createElement("div");
    wrapper.classList.add("absolute", "top-0", "left-0");
    document.body.appendChild(wrapper);
    console.log("mouseOver");
    console.log("mouseOver", title);

    tooltip = new Tooltip({
      props: {
        title: title,
      },
      target: wrapper,
    });

    cleanupUpdater = autoUpdate(node, wrapper, updatePosition);
  }

  function mouseLeave() {
    tooltip?.$destroy();
    title && node.setAttribute("title", title);
    cleanupUpdater();
    wrapper.remove();
    tooltip = null;
  }

  node.addEventListener("mouseover", mouseOver);
  node.addEventListener("mouseleave", mouseLeave);

  return {
    destroy() {
      node.removeEventListener("mouseover", mouseOver);
      node.removeEventListener("mouseleave", mouseLeave);
      cleanupUpdater && cleanupUpdater();
      wrapper && wrapper.remove();
    },
  };
};
