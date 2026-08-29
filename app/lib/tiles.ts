import type { Ground, Ink } from "./products";

// Tailwind classes for the flat product tile that stands in for photography.
// Shared by every surface that renders a tile (drop grid, product page, cart).
export const grounds: Record<Ground, string> = {
  forest: "bg-army",
  cream: "bg-paper",
  gold: "bg-gold",
  black: "bg-ink",
};

export const inks: Record<Ink, string> = {
  paper: "text-paper",
  army: "text-army",
  gold: "text-gold",
};
