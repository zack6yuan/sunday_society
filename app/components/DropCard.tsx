import Link from "next/link";
import type { Product } from "../lib/products";
import { grounds, inks } from "../lib/tiles";

export default function DropCard({ product }: { product: Product }) {
  const { slug, name, price, colorway, tile, ground, ink, badge, soldOut } = product;
  return (
    <Link href={`/products/${slug}`} className="group block">
      <div
        className={`relative flex h-50 items-center justify-center lg:h-85 ${grounds[ground]}`}
      >
        <span
          className={`text-[9px] font-semibold tracking-[0.26em] uppercase opacity-55 lg:text-[11px] lg:tracking-[0.3em] ${inks[ink]}`}
        >
          {tile}
        </span>

        {badge && (
          <span className="absolute top-2 left-2 bg-gold px-[7px] py-1 text-[8px] font-bold tracking-[0.14em] text-army uppercase lg:top-3 lg:left-3 lg:px-[9px] lg:py-[5px] lg:text-[9px] lg:tracking-[0.18em]">
            {badge}
          </span>
        )}

        {soldOut && (
          <span className="absolute inset-0 flex items-center justify-center bg-cloud/55">
            <span className="border border-ink bg-cloud px-3 py-1.5 text-[8px] font-bold tracking-[0.2em] text-ink uppercase lg:px-4 lg:py-2 lg:text-[10px] lg:tracking-[0.24em]">
              Sold Out
            </span>
          </span>
        )}
      </div>

      <div className="mt-2.5 flex items-baseline justify-between gap-2 lg:mt-3.5">
        <span className="text-[10px] font-bold tracking-[0.1em] text-army uppercase transition group-hover:text-gold lg:text-xs lg:tracking-[0.12em]">
          {name}
        </span>
        <span className="text-[10px] font-medium text-army lg:text-xs">${price}</span>
      </div>
      <p className="mt-[3px] text-[9px] tracking-[0.05em] text-army/75 lg:mt-1 lg:text-[11px] lg:tracking-[0.06em]">
        {colorway}
      </p>
    </Link>
  );
}
