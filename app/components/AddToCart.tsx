"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";

// Size selection and add-to-cart against the client cart. Checkout is still
// inert until a commerce backend exists.
export default function AddToCart({
  slug,
  sizes,
  soldOut,
}: {
  slug: string;
  sizes?: readonly string[];
  soldOut?: boolean;
}) {
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, []);

  const needsSize = Boolean(sizes) && size === null;

  const handleAdd = () => {
    if (needsSize) return;
    add(slug, size ?? undefined);
    setJustAdded(true);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      {sizes && (
        <div>
          <div className="flex items-baseline justify-between gap-4 lg:max-w-md">
            <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-army uppercase">
              Size
            </span>
            <Link
              href="/help/size-guide"
              className="text-[10px] font-bold tracking-[0.14em] text-army/60 uppercase underline underline-offset-4 transition hover:text-gold"
            >
              Size Guide
            </Link>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {sizes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSize(option)}
                aria-pressed={size === option}
                disabled={soldOut}
                className={`min-w-11 cursor-pointer border px-3 py-2.5 text-[11px] font-bold tracking-wide uppercase transition disabled:cursor-not-allowed disabled:opacity-40 ${
                  size === option
                    ? "border-army bg-army text-paper"
                    : "border-army/40 bg-transparent text-army hover:border-army hover:text-gold"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {soldOut ? (
        <button
          type="button"
          disabled
          className="w-full cursor-not-allowed border border-army/40 py-4 text-xs font-bold tracking-[0.2em] text-army/50 uppercase lg:max-w-md"
        >
          Sold Out
        </button>
      ) : (
        <button
          type="button"
          onClick={handleAdd}
          disabled={needsSize}
          className="w-full cursor-pointer bg-army py-4 text-xs font-bold tracking-[0.2em] text-paper uppercase transition hover:bg-gold hover:text-army disabled:cursor-not-allowed disabled:bg-army/40 disabled:hover:text-paper lg:max-w-md"
        >
          {justAdded ? "Added ✓" : needsSize ? "Select a Size" : "Add to Cart"}
        </button>
      )}
    </div>
  );
}
