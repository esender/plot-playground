import {
  computePosition,
  autoUpdate,
  shift,
  offset,
  flip,
  arrow,
} from "@floating-ui/dom";
import Tooltip from "./Tooltip.svelte";
import { marked } from "marked";

export const tooltip = (node: HTMLElement) => {
  let tooltip: Tooltip | null;
  let title: string | null;
  let cleanupUpdater: () => void;
  let wrapper: HTMLElement;

  function updatePosition() {
    if (!tooltip) return;

    console.log(tooltip.arrow);

    computePosition(node, wrapper, {
      placement: "top",
      middleware: [
        shift({ padding: 12 }),
        offset(12),
        flip(),
        tooltip.arrow && arrow({ element: tooltip.arrow }),
      ],
    }).then(({ x, y, middlewareData }) => {
      wrapper.style.transform = `translate(${x}px, ${y}px)`;
      console.log("middlewareData", middlewareData);
      tooltip?.$set({
        arrowPosition: {
          x: middlewareData.arrow?.x ?? null,
          y: middlewareData.arrow?.y ?? null,
        },
      });
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
