"use client";
import { useState } from "react";
import DropCard, { type DropCardProps } from "./DropCard";

const men: DropCardProps[] = [
  { name: "The Classic Sunday", price: 98, colorway: "Deep Forest Green", tile: "Polo 01", ground: "forest", ink: "paper", badge: "Icon" },
  { name: "The Pure Focus", price: 98, colorway: "Cream / Forest", tile: "Polo 02", ground: "cream", ink: "army", badge: "New Arrival" },
  { name: "The Sharp Edge", price: 108, colorway: "Matte Black Monogram", tile: "Polo 03", ground: "black", ink: "paper", soldOut: true },
  { name: "The Foundation", price: 98, colorway: "Antique Gold", tile: "Polo 04", ground: "gold", ink: "army", badge: "New Arrival" },
  { name: "The Rope Trucker", price: 42, colorway: "Cream / Green Rope", tile: "Hat 01", ground: "cream", ink: "army" },
  { name: "The Mid Crown", price: 42, colorway: "Forest / Gold Stitch", tile: "Hat 02", ground: "forest", ink: "paper", badge: "Icon" },
  { name: "The Strategy Layer", price: 128, colorway: "Cream Performance", tile: "Quarter Zip", ground: "cream", ink: "army", badge: "New Arrival" },
  { name: "The Foursome Set", price: 68, colorway: "Head Covers / Markers", tile: "Accessories", ground: "black", ink: "gold" },
];

const women: DropCardProps[] = [
  { name: "The Classic Sunday W", price: 94, colorway: "Deep Forest Green", tile: "Polo 01", ground: "forest", ink: "paper", badge: "New Arrival" },
  { name: "The Pure Focus W", price: 94, colorway: "Cream / Forest", tile: "Polo 02", ground: "cream", ink: "army", badge: "New Arrival" },
  { name: "The Sunday Skort", price: 88, colorway: "Warm White", tile: "Bottoms 01", ground: "cream", ink: "army" },
  { name: "The Foundation W", price: 94, colorway: "Antique Gold", tile: "Polo 03", ground: "gold", ink: "army", soldOut: true },
  { name: "The Rope Trucker", price: 42, colorway: "Cream / Green Rope", tile: "Hat 01", ground: "cream", ink: "army", badge: "Icon" },
  { name: "The Visor", price: 36, colorway: "Forest Green", tile: "Hat 02", ground: "forest", ink: "gold" },
  { name: "The Strategy Layer W", price: 124, colorway: "Cream Performance", tile: "Quarter Zip", ground: "cream", ink: "army", badge: "New Arrival" },
  { name: "The Sunday Tote", price: 58, colorway: "Forest / Gold", tile: "Accessories", ground: "black", ink: "gold" },
];

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
            <span className="font-sans text-[9px] font-bold tracking-[0.24em] text-gold uppercase lg:text-[10px] lg:tracking-[0.26em]">
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
                  tab === t.id ? "bg-army text-paper" : "bg-transparent text-army hover:text-gold"
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
            <div key={product.name} className={i >= 4 ? "hidden lg:block" : undefined}>
              <DropCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
