import { writable } from "svelte/store";

const storedWidth = localStorage.getItem("sidebarWidth");

export const sidebarWidth = writable<number | null>(
  storedWidth ? parseInt(storedWidth) : null
);

sidebarWidth.subscribe((value) => {
  localStorage.setItem("sidebarWidth", JSON.stringify(value));
});
