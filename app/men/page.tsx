import type { Metadata } from "next";
import ShopGrid from "../components/ShopGrid";
import { men } from "../lib/products";

export const metadata: Metadata = {
  title: "Men — Sunday Society",
  description: "The men's side of the first drop: polos, hats, layers, and accessories.",
};

export default function MenPage() {
  return (
    <ShopGrid
      title="Men"
      blurb="Polos that hold a collar, hats that break in right, and a layer for cold starts. Everything from the first drop, cut for him."
      products={men}
    />
  );
}
