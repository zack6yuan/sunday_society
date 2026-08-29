import { productBySlug, type Product } from "./products";

// A hardcoded sample cart, standing in until real cart state exists. The nav
// badge and /cart both read from here so the count and the line items always
// agree — when a commerce backend is chosen, this module becomes the seam.
export type CartLine = {
  product: Product;
  size?: string;
  quantity: number;
};

const line = (slug: string, quantity: number, size?: string): CartLine => ({
  product: productBySlug(slug)!,
  size,
  quantity,
});

export const cartLines: CartLine[] = [
  line("the-classic-sunday", 1, "M"),
  line("the-rope-trucker", 1),
];

export const cartCount = cartLines.reduce((sum, l) => sum + l.quantity, 0);

export const cartSubtotal = cartLines.reduce(
  (sum, l) => sum + l.product.price * l.quantity,
  0,
);
