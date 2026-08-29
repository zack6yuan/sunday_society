"use client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { productBySlug } from "../lib/products";

// Client-side cart with localStorage as the source of truth, read through
// useSyncExternalStore: the server snapshot is an empty cart so hydration
// always matches, the stored cart appears right after mount, and the
// storage event keeps multiple tabs in sync. This is the whole cart until a
// commerce backend is chosen — swapping in a real one replaces this
// provider, not the components that call useCart.
export type CartLine = {
  slug: string;
  size?: string;
  quantity: number;
};

type CartApi = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, size?: string) => void;
  remove: (slug: string, size?: string) => void;
  setQuantity: (slug: string, size: string | undefined, quantity: number) => void;
};

const STORAGE_KEY = "sunday-society-cart";
const CART_EVENT = "sunday-society:cart-change";

const EMPTY: CartLine[] = [];

// getSnapshot must return a referentially stable value for an unchanged
// store, so the parse is cached against the raw string.
let cachedRaw: string | null = null;
let cachedLines: CartLine[] = EMPTY;

function readLines(): CartLine[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedLines;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cachedLines = Array.isArray(parsed)
      ? (parsed as CartLine[]).filter(
          (line) => productBySlug(line.slug) && line.quantity > 0,
        )
      : EMPTY;
  } catch {
    // Unreadable storage is treated as an empty cart.
    cachedLines = EMPTY;
  }
  return cachedLines;
}

function writeLines(lines: CartLine[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(CART_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CART_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CART_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

const CartContext = createContext<CartApi | null>(null);

export function useCart(): CartApi {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside CartProvider");
  return cart;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribe, readLines, () => EMPTY);

  const add = useCallback((slug: string, size?: string) => {
    const prev = readLines();
    const at = prev.findIndex((line) => line.slug === slug && line.size === size);
    writeLines(
      at === -1
        ? [...prev, { slug, size, quantity: 1 }]
        : prev.map((line, i) =>
            i === at ? { ...line, quantity: line.quantity + 1 } : line,
          ),
    );
  }, []);

  const remove = useCallback((slug: string, size?: string) => {
    writeLines(
      readLines().filter((line) => !(line.slug === slug && line.size === size)),
    );
  }, []);

  const setQuantity = useCallback(
    (slug: string, size: string | undefined, quantity: number) => {
      const prev = readLines();
      writeLines(
        quantity <= 0
          ? prev.filter((line) => !(line.slug === slug && line.size === size))
          : prev.map((line) =>
              line.slug === slug && line.size === size ? { ...line, quantity } : line,
            ),
      );
    },
    [],
  );

  const value = useMemo<CartApi>(() => {
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = lines.reduce(
      (sum, line) => sum + (productBySlug(line.slug)?.price ?? 0) * line.quantity,
      0,
    );
    return { lines, count, subtotal, add, remove, setQuantity };
  }, [lines, add, remove, setQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
