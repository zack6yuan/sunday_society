import type { Metadata } from "next";
import Link from "next/link";
import { cartLines, cartSubtotal } from "../lib/cart";
import { grounds, inks } from "../lib/tiles";

export const metadata: Metadata = {
  title: "Cart — Sunday Society",
  description: "Your Sunday Society cart.",
};

export default function CartPage() {
  return (
    <section className="bg-cloud px-5 py-10 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-[1100px]">
        <span className="font-sans text-[9px] font-bold tracking-[0.24em] text-gold uppercase lg:text-[10px] lg:tracking-[0.26em]">
          The Shop
        </span>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-[0.02em] text-army uppercase lg:mt-3 lg:text-5xl">
          Your Cart
        </h1>

        {cartLines.length === 0 ? (
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
        ) : (
          <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[1fr_360px] lg:gap-16">
            <ul className="border-t border-dashed border-army/20">
              {cartLines.map((line) => (
                <li
                  key={`${line.product.slug}-${line.size ?? "os"}`}
                  className="flex gap-4 border-b border-dashed border-army/20 py-5 lg:gap-6 lg:py-6"
                >
                  <Link
                    href={`/products/${line.product.slug}`}
                    className={`flex size-24 shrink-0 items-center justify-center lg:size-28 ${grounds[line.product.ground]}`}
                  >
                    <span
                      className={`text-[8px] font-semibold tracking-[0.2em] uppercase opacity-55 ${inks[line.product.ink]}`}
                    >
                      {line.product.tile}
                    </span>
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <Link
                        href={`/products/${line.product.slug}`}
                        className="text-xs font-bold tracking-[0.1em] text-army uppercase transition hover:text-gold lg:text-sm"
                      >
                        {line.product.name}
                      </Link>
                      <span className="text-xs font-medium text-army lg:text-sm">
                        ${line.product.price * line.quantity}
                      </span>
                    </div>
                    <p className="text-[11px] tracking-[0.05em] text-army/75 lg:text-xs">
                      {line.product.colorway}
                      {line.size ? ` · Size ${line.size}` : ""} · Qty {line.quantity}
                    </p>
                    <button
                      type="button"
                      className="mt-1 w-fit cursor-pointer text-[10px] font-bold tracking-[0.14em] text-army/60 uppercase transition hover:text-gold"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit border border-dashed border-army/30 p-6 lg:p-8">
              <h2 className="font-sans text-[11px] font-bold tracking-[0.2em] text-army uppercase">
                Order Summary
              </h2>
              <dl className="mt-5 flex flex-col gap-3 text-sm text-army/80">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="font-medium text-army">${cartSubtotal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="font-bold tracking-wide text-gold uppercase">Free</dd>
                </div>
              </dl>
              <div className="mt-5 flex justify-between border-t border-dashed border-army/30 pt-5 text-sm font-bold text-army uppercase">
                <span>Total</span>
                <span>${cartSubtotal}</span>
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
        )}
      </div>
    </section>
  );
}
