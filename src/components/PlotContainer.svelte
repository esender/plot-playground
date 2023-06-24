<script>
  import * as Plot from "@observablehq/plot";
  import NumberInput from "./NumberInput.svelte";
  import { onMount, afterUpdate } from "svelte";

  import data from "./crimea.json";
  import Group from "./Group.svelte";

  let container;
  let marginLeft = 40;
  let ticks = 10;

  let plot;

  afterUpdate(async () => {
    plot = Plot.plot({
      marginLeft,
      x: {
        interval: "month",
        tickFormat: (d) => d.toLocaleString("en", { month: "narrow" }),
        label: null,
      },
      y: { grid: true, ticks },
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
  <div class="bg-neutral-200 divide-y divide-neutral-300 w-1/5 max-w-sm">
    <Group title="Dimensions">
      <NumberInput bind:value={marginLeft} />
    </Group>
    <Group title="Margins">
      <NumberInput bind:value={marginLeft} />
    </Group>
    <Group title="Margins">
      <NumberInput bind:value={marginLeft} />
    </Group>
    <Group title="Ticks">
      <NumberInput bind:value={ticks} />
    </Group>
  </div>
</div>
