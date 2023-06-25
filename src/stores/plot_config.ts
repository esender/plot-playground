import { writable } from "svelte/store";

const DEFAULTS = {
  width: 640,
  height: 400,
  margin: undefined,
};

export const plotConfig = writable(DEFAULTS);
