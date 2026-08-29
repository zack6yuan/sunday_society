"use client";
import Link from "next/link";
import { productBySlug } from "../lib/products";
import { grounds, inks } from "../lib/tiles";
import { useCart } from "./CartProvider";

export default function CartContents() {
  const { lines, subtotal, remove, setQuantity } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mt-10 border-t border-dashed border-army/20 pt-10 lg:mt-14">
        <p className="text-sm text-army/75 lg:text-base">
          Nothing in the bag yet. The first drop is live.
        </p>
        <Link
          href="/#releases"
          className="mt-6 inline-block bg-army px-8 py-4 text-xs font-bold tracking-[0.2em] text-paper uppercase transition hover:bg-gold hover:text-army"
        >
          Shop the First Drop
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[1fr_360px] lg:gap-16">
      <ul className="border-t border-dashed border-army/20">
        {lines.map((line) => {
          const product = productBySlug(line.slug);
          if (!product) return null;
          return (
            <li
              key={`${line.slug}-${line.size ?? "os"}`}
              className="flex gap-4 border-b border-dashed border-army/20 py-5 lg:gap-6 lg:py-6"
            >
              <Link
                href={`/products/${product.slug}`}
                className={`flex size-24 shrink-0 items-center justify-center lg:size-28 ${grounds[product.ground]}`}
              >
                <span
                  className={`text-[8px] font-semibold tracking-[0.2em] uppercase opacity-55 ${inks[product.ink]}`}
                >
                  {product.tile}
                </span>
              </Link>

              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-xs font-bold tracking-[0.1em] text-army uppercase transition hover:text-gold lg:text-sm"
                  >
                    {product.name}
                  </Link>
                  <span className="text-xs font-medium text-army lg:text-sm">
                    ${product.price * line.quantity}
                  </span>
                </div>
                <p className="text-[11px] tracking-[0.05em] text-army/75 lg:text-xs">
                  {product.colorway}
                  {line.size ? ` · Size ${line.size}` : ""}
                </p>

                <div className="mt-1 flex items-center gap-4">
                  <div className="flex items-center border border-army/30">
                    <button
                      type="button"
                      onClick={() => setQuantity(line.slug, line.size, line.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="cursor-pointer px-2.5 py-1 text-sm text-army transition hover:text-gold"
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center text-xs font-medium text-army">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(line.slug, line.size, line.quantity + 1)}
                      aria-label="Increase quantity"
                      className="cursor-pointer px-2.5 py-1 text-sm text-army transition hover:text-gold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.slug, line.size)}
                    className="cursor-pointer text-[10px] font-bold tracking-[0.14em] text-army/60 uppercase transition hover:text-gold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="h-fit border border-dashed border-army/30 p-6 lg:p-8">
        <h2 className="font-sans text-[11px] font-bold tracking-[0.2em] text-army uppercase">
          Order Summary
        </h2>
        <dl className="mt-5 flex flex-col gap-3 text-sm text-army/80">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-medium text-army">${subtotal}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd className="font-bold tracking-wide text-gold uppercase">Free</dd>
          </div>
        </dl>
        <div className="mt-5 flex justify-between border-t border-dashed border-army/30 pt-5 text-sm font-bold text-army uppercase">
          <span>Total</span>
          <span>${subtotal}</span>
        </div>
        <button
          type="button"
          className="mt-6 w-full cursor-pointer bg-army py-4 text-xs font-bold tracking-[0.2em] text-paper uppercase transition hover:bg-gold hover:text-army"
        >
          Checkout
        </button>
        <p className="mt-4 text-[11px] leading-relaxed text-army/60">
          Checkout opens when the shop does. Free shipping on all orders, always.
        </p>
      </aside>
    </div>
  );
}
