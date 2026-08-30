"use client";
import { useState } from "react";
import DropCard from "./DropCard";
import { men, women } from "../lib/products";

const tabs = [
  { id: "men", label: "MEN", products: men },
  { id: "women", label: "WOMEN", products: women },
] as const;

export default function Drop() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("men");
  const products = tabs.find((t) => t.id === tab)!.products;

  return (
    <section id="releases" className="bg-cloud px-5 pt-11 pb-13 lg:px-12 lg:pt-22 lg:pb-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-end justify-between gap-4 lg:mb-11">
          <div>
            <span className="font-sans text-[9px] font-bold tracking-[0.24em] text-brass uppercase lg:text-[10px] lg:tracking-[0.26em]">
              Featured Releases
            </span>
            <h2 className="mt-2 font-display text-xl font-extrabold tracking-[0.02em] text-army uppercase lg:mt-3 lg:text-[34px]">
              The First Drop
            </h2>
          </div>

          {/* One shared hairline around both halves, so the pair reads as a single control. */}
          <div className="flex shrink-0 border border-army">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={`cursor-pointer px-3.5 py-2 text-[9px] font-bold tracking-[0.16em] uppercase transition lg:px-6 lg:py-2.5 lg:text-[11px] lg:tracking-[0.2em] ${
                  tab === t.id ? "bg-army text-paper" : "bg-transparent text-army hover:text-brass"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-5 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-6">
          {products.map((product, i) => (
            // The mobile mock runs a four-product grid; the back half is desktop-only.
            <div key={product.slug} className={i >= 4 ? "hidden lg:block" : undefined}>
              <DropCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
