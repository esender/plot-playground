<script>
  import * as Plot from "@observablehq/plot";
  import { onMount, afterUpdate } from "svelte";

  import data from "./crimea.json";

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

<div bind:this={container} class="ml-10 mt-10" />
<div>
  <input type="range" min="0" max="100" bind:value={marginLeft} />
  <input type="number" bind:value={ticks} />
</div>
