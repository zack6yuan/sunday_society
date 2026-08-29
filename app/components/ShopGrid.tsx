import DropCard from "./DropCard";
import type { Product } from "../lib/products";

// The department listing: page header plus the full product grid. Unlike the
// homepage drop section, nothing is hidden on mobile — a listing page shows
// the whole department.
export default function ShopGrid({
  title,
  blurb,
  products,
}: {
  title: string;
  blurb: string;
  products: Product[];
}) {
  return (
    <section className="bg-cloud px-5 pt-11 pb-13 lg:px-12 lg:pt-16 lg:pb-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-7 lg:mb-11">
          <span className="font-sans text-[9px] font-bold tracking-[0.24em] text-gold uppercase lg:text-[10px] lg:tracking-[0.26em]">
            The First Drop
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-[0.02em] text-army uppercase lg:mt-3 lg:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-md text-sm text-army/75 lg:text-base">{blurb}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-5 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-6">
          {products.map((product) => (
            <DropCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
