"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { products } from "../lib/products";
import { grounds, inks } from "../lib/tiles";

// Search runs entirely over the client-side catalog — no backend, no index.
// Every term has to match somewhere in the product's name, category,
// colorway, or tile, so "cream polo" narrows rather than widens.
function search(query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return products;
  return products.filter((product) => {
    const haystack =
      `${product.name} ${product.category} ${product.colorway} ${product.tile}`.toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

// Mounted only while open, so every visit starts from an empty field.
export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => search(query), [query]);

  // Focus the field on open, close on Escape, keep Tab inside the dialog, and
  // hold the page still behind it so the results list is the only scroller.
  useEffect(() => {
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        "a[href], button, input",
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);


  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      className="fixed inset-0 z-100 flex flex-col bg-army text-paper"
    >
      {/* min-h-0 lets the results list — not the page — take the overflow. */}
      <div className="mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col px-5 pt-6 pb-0 lg:px-12 lg:pt-10">
        <div className="flex items-center justify-between gap-6 border-b border-paper/25 pb-4">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <input
            ref={inputRef}
            id="product-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the drop"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent font-serif text-2xl tracking-normal placeholder:text-paper/40 focus:outline-none sm:text-3xl lg:text-4xl [&::-webkit-search-cancel-button]:appearance-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 cursor-pointer font-sans text-[11px] font-bold tracking-[0.2em] text-paper/70 uppercase transition hover:text-gold"
          >
            Close
          </button>
        </div>

        <p className="pt-4 font-sans text-[10px] font-bold tracking-[0.24em] text-gold uppercase">
          {query.trim() === ""
            ? `The First Drop — ${results.length} pieces`
            : results.length === 0
              ? "No pieces match"
              : `${results.length} ${results.length === 1 ? "piece" : "pieces"}`}
        </p>

        <div className="-mx-5 mt-5 flex-1 overflow-y-auto px-5 pb-10 lg:-mx-12 lg:px-12">
          {results.length === 0 ? (
            <p className="max-w-sm text-sm text-paper/70 lg:text-base">
              Nothing under that name yet. Try a colour, a category, or the name of
              a piece — cream, hats, quarter zip.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-x-3 gap-y-5 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-6">
              {results.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="group block"
                  >
                    {/* Hairline: forest and black tiles would otherwise
                        disappear into the army overlay ground. */}
                    <div
                      className={`flex h-32 items-center justify-center border border-paper/15 lg:h-44 ${grounds[product.ground]}`}
                    >
                      <span
                        className={`text-[9px] font-semibold tracking-[0.26em] uppercase opacity-55 ${inks[product.ink]}`}
                      >
                        {product.tile}
                      </span>
                    </div>
                    <div className="mt-2.5 flex items-baseline justify-between gap-2">
                      <span className="text-[10px] font-bold tracking-[0.1em] uppercase transition group-hover:text-gold lg:text-xs">
                        {product.name}
                      </span>
                      <span className="text-[10px] font-medium lg:text-xs">
                        ${product.price}
                      </span>
                    </div>
                    <p className="mt-[3px] text-[9px] tracking-[0.05em] text-paper/60 lg:text-[11px]">
                      {product.colorway}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
