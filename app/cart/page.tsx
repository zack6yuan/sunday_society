import type { Metadata } from "next";
import CartContents from "../components/CartContents";

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
        <CartContents />
      </div>
    </section>
  );
}
