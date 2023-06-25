<script>
  import * as Plot from "@observablehq/plot";
  import NumberInput from "./NumberInput.svelte";
  import clsx from "clsx";
  import { afterUpdate } from "svelte";
  import { sidebarWidth } from "../stores/interface";
  import { plotConfig } from "../stores/plot_config";
  import ResizeHandler from "./ResizeHandler.svelte";

  import data from "./crimea.json";
  import Group from "./Group.svelte";
  import Icon from "@iconify/svelte";
  import { tooltip } from "./tooltip/action";

  import plotOptions from "../schemas/plot_options.ts";
  import Option from "./Option.svelte";

  let container;

  let plot;

  afterUpdate(async () => {
    plot = Plot.plot({
      ...$plotConfig,
      x: {
        interval: "month",
        tickFormat: (d) => d.toLocaleString("en", { month: "narrow" }),
        label: null,
      },
      y: { grid: true },
      marks: [
        Plot.barY(
          data.map((d) => ({ ...d, date: new Date(d.date) })),
          { x: "date", y: "deaths", fill: "cause" }
        ),
        Plot.ruleY([0]),
      ],
    });

    if (container.firstChild) {
      container.firstChild.replaceWith(plot);
    } else {
      container.appendChild(plot);
    }
  });
</script>

<div class="flex w-full h-full min-h-screen">
  <div class="flex-1 bg-neutral-100 p-10 grid place-items-center">
    <div bind:this={container} />
  </div>
  <div
    class={clsx("bg-neutral-200 divide-y divide-neutral-300 relative", {
      "w-1/5 max-w-sm": $sidebarWidth === null,
    })}
    style:width={$sidebarWidth ? `${$sidebarWidth}px` : null}
  >
    <ResizeHandler bind:value={$sidebarWidth} />
    <Group title="Canvas dimensions">
      <Option title="Width" let:id>
        <NumberInput
          bind:value={$plotConfig.width}
          icon="tabler:letter-w"
          {id}
        />
      </Option>
      <Option title="Height" let:id>
        <NumberInput
          bind:value={$plotConfig.height}
          icon="tabler:letter-h"
          {id}
        />
      </Option>
      <Option title="Margin" let:id>
        <NumberInput bind:value={$plotConfig.margin} {id} />
      </Option>
    </Group>
    <Group title="Ticks">
      <NumberInput bind:value={$plotConfig.y} />
    </Group>
    <div
      class="flex-none"
      title={"plotOptions.properties.width.description"}
      use:tooltip
    >
      <Icon icon="tabler:x" />
    </div>
  </div>
</div>
