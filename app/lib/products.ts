// The product catalog. Hardcoded until a commerce backend or CMS is chosen —
// every page that shows products reads from here, so swapping in real data
// later is a change to this file alone.
export type Ground = "forest" | "cream" | "gold" | "black";
export type Ink = "paper" | "army" | "gold";
export type Category = "Polos" | "Hats" | "Layers" | "Bottoms" | "Accessories";

export type Product = {
  slug: string;
  name: string;
  price: number;
  colorway: string;
  category: Category;
  description: string;
  /** Omitted for one-size and set pieces. */
  sizes?: readonly string[];
  /** The shot name set into the placeholder tile until photography exists. */
  tile: string;
  ground: Ground;
  ink: Ink;
  badge?: string;
  soldOut?: boolean;
};

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

const bySlug: Record<string, Product> = {};
for (const product of [
  {
    slug: "the-classic-sunday",
    name: "The Classic Sunday",
    price: 98,
    colorway: "Deep Forest Green",
    category: "Polos",
    description:
      "The polo that started it. Heavyweight piqué in deep forest with a collar that stands on its own — pressed enough for the pew, built enough for the tee.",
    sizes: APPAREL_SIZES,
    tile: "Polo 01",
    ground: "forest",
    ink: "paper",
    badge: "Icon",
  },
  {
    slug: "the-pure-focus",
    name: "The Pure Focus",
    price: 98,
    colorway: "Cream / Forest",
    category: "Polos",
    description:
      "Cream with a forest tipped collar. No graphics, no noise — nothing between you and the next shot.",
    sizes: APPAREL_SIZES,
    tile: "Polo 02",
    ground: "cream",
    ink: "army",
    badge: "New Arrival",
  },
  {
    slug: "the-sharp-edge",
    name: "The Sharp Edge",
    price: 108,
    colorway: "Matte Black Monogram",
    category: "Polos",
    description:
      "Matte black on black, monogrammed at the cuff. For the round where you let the scorecard do the talking.",
    sizes: APPAREL_SIZES,
    tile: "Polo 03",
    ground: "black",
    ink: "paper",
    soldOut: true,
  },
  {
    slug: "the-foundation",
    name: "The Foundation",
    price: 98,
    colorway: "Antique Gold",
    category: "Polos",
    description:
      "Antique gold, worn like a standard. The foundation piece the rest of the closet answers to.",
    sizes: APPAREL_SIZES,
    tile: "Polo 04",
    ground: "gold",
    ink: "army",
    badge: "New Arrival",
  },
  {
    slug: "the-rope-trucker",
    name: "The Rope Trucker",
    price: 42,
    colorway: "Cream / Green Rope",
    category: "Hats",
    description:
      "Cream crown, forest bill, rope across the front. Breaks in by the back nine and looks better for it.",
    tile: "Hat 01",
    ground: "cream",
    ink: "army",
  },
  {
    slug: "the-mid-crown",
    name: "The Mid Crown",
    price: 42,
    colorway: "Forest / Gold Stitch",
    category: "Hats",
    description:
      "A structured mid crown in forest with gold stitching. Sits square, shades the read, tips politely.",
    tile: "Hat 02",
    ground: "forest",
    ink: "paper",
    badge: "Icon",
  },
  {
    slug: "the-strategy-layer",
    name: "The Strategy Layer",
    price: 128,
    colorway: "Cream Performance",
    category: "Layers",
    description:
      "A cream performance quarter zip for the hours before the world wakes up. Warm on the first tee, gone by the turn, never in the way.",
    sizes: APPAREL_SIZES,
    tile: "Quarter Zip",
    ground: "cream",
    ink: "army",
    badge: "New Arrival",
  },
  {
    slug: "the-foursome-set",
    name: "The Foursome Set",
    price: 68,
    colorway: "Head Covers / Markers",
    category: "Accessories",
    description:
      "Head covers and ball markers for the regular group. Four covers, four markers, one standing tee time.",
    tile: "Accessories",
    ground: "black",
    ink: "gold",
  },
  {
    slug: "the-classic-sunday-w",
    name: "The Classic Sunday W",
    price: 94,
    colorway: "Deep Forest Green",
    category: "Polos",
    description:
      "The house polo, recut for her. Deep forest piqué with a collar that holds from the first hymn to the last putt.",
    sizes: APPAREL_SIZES,
    tile: "Polo 01",
    ground: "forest",
    ink: "paper",
    badge: "New Arrival",
  },
  {
    slug: "the-pure-focus-w",
    name: "The Pure Focus W",
    price: 94,
    colorway: "Cream / Forest",
    category: "Polos",
    description:
      "Cream with a forest tipped collar, tailored through the waist. Quiet enough to let the swing speak.",
    sizes: APPAREL_SIZES,
    tile: "Polo 02",
    ground: "cream",
    ink: "army",
    badge: "New Arrival",
  },
  {
    slug: "the-sunday-skort",
    name: "The Sunday Skort",
    price: 88,
    colorway: "Warm White",
    category: "Bottoms",
    description:
      "Warm white with a built-in short and a scorecard pocket. Moves like practice, reads like Sunday.",
    sizes: APPAREL_SIZES,
    tile: "Bottoms 01",
    ground: "cream",
    ink: "army",
  },
  {
    slug: "the-foundation-w",
    name: "The Foundation W",
    price: 94,
    colorway: "Antique Gold",
    category: "Polos",
    description:
      "Antique gold, cut for her. The piece the rest of the bag gets dressed around.",
    sizes: APPAREL_SIZES,
    tile: "Polo 03",
    ground: "gold",
    ink: "army",
    soldOut: true,
  },
  {
    slug: "the-visor",
    name: "The Visor",
    price: 36,
    colorway: "Forest Green",
    category: "Hats",
    description:
      "Forest green with a gold underbill. Keeps the sun out of the read and the ponytail where it belongs.",
    tile: "Hat 02",
    ground: "forest",
    ink: "gold",
  },
  {
    slug: "the-strategy-layer-w",
    name: "The Strategy Layer W",
    price: 124,
    colorway: "Cream Performance",
    category: "Layers",
    description:
      "The cream performance quarter zip, tailored for her. Built for cold starts and early tee times.",
    sizes: APPAREL_SIZES,
    tile: "Quarter Zip",
    ground: "cream",
    ink: "army",
    badge: "New Arrival",
  },
  {
    slug: "the-sunday-tote",
    name: "The Sunday Tote",
    price: 58,
    colorway: "Forest / Gold",
    category: "Accessories",
    description:
      "Forest canvas with gold lettering. Carries the shoes, the towel, and whatever the pro shop talked you into.",
    tile: "Accessories",
    ground: "black",
    ink: "gold",
  },
] satisfies Product[]) {
  bySlug[product.slug] = product;
}

// Grid order is deliberate — the tiles alternate grounds so each department
// reads as a palette. The Rope Trucker is unisex and appears in both.
const pick = (slugs: string[]) => slugs.map((slug) => bySlug[slug]);

export const men: Product[] = pick([
  "the-classic-sunday",
  "the-pure-focus",
  "the-sharp-edge",
  "the-foundation",
  "the-rope-trucker",
  "the-mid-crown",
  "the-strategy-layer",
  "the-foursome-set",
]);

export const women: Product[] = pick([
  "the-classic-sunday-w",
  "the-pure-focus-w",
  "the-sunday-skort",
  "the-foundation-w",
  "the-rope-trucker",
  "the-visor",
  "the-strategy-layer-w",
  "the-sunday-tote",
]);

export const products: Product[] = Object.values(bySlug);

export function productBySlug(slug: string): Product | undefined {
  return bySlug[slug];
}
