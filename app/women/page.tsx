import type { Metadata } from "next";
import ShopGrid from "../components/ShopGrid";
import { women } from "../lib/products";

export const metadata: Metadata = {
  title: "Women — Sunday Society",
  description: "The women's side of the first drop: polos, the skort, layers, and accessories.",
};

export default function WomenPage() {
  return (
    <ShopGrid
      title="Women"
      blurb="The house polos recut for her, warm-white bottoms, and a layer for early tee times. Everything from the first drop, cut for her."
      products={women}
    />
  );
}
