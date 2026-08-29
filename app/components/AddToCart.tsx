"use client";
import { useState } from "react";

// Size selection is real client state; the add-to-cart button is inert until
// a commerce backend exists, matching the footer's sign-up treatment.
export default function AddToCart({
  sizes,
  soldOut,
}: {
  sizes?: readonly string[];
  soldOut?: boolean;
}) {
  const [size, setSize] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      {sizes && (
        <div>
          <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-army uppercase">
            Size
          </span>
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
          className="w-full cursor-pointer bg-army py-4 text-xs font-bold tracking-[0.2em] text-paper uppercase transition hover:bg-gold hover:text-army lg:max-w-md"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
