import { writable } from "svelte/store";

const schema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  // "$id": "https://example.com/product.schema.json",
  title: "PlotOptions",
  description: "Plot options",
  type: "object",
  properties: {
    width: {
      type: "number",
      default: 640,
      description:
        "The outer width of the plot in pixels, including margins. Defaults to 640. On Observable, this can be set to the built-in [width](https://github.com/observablehq/stdlib/blob/main/README.md#width) for full-width responsive plots. Note: the default style has a max-width of 100%; the plot will automatically shrink to fit even when a fixed width is specified.",
    },
  },
};

const DEFAULTS = {
  width: 640,
  height: 400,
};

export const plotConfig = writable(DEFAULTS);
