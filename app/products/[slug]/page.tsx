import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AddToCart from "../../components/AddToCart";
import { productBySlug, products } from "../../lib/products";
import { grounds, inks } from "../../lib/tiles";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Sunday Society`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  return (
    <section className="bg-cloud px-5 py-10 lg:px-12 lg:py-16">
      <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-2 lg:gap-16">
        {/* The tile is the photography seam, same as DropCard: swap in a real
            product image here when it exists. */}
        <div
          className={`relative flex aspect-square items-center justify-center ${grounds[product.ground]}`}
        >
          <span
            className={`text-[11px] font-semibold tracking-[0.3em] uppercase opacity-55 lg:text-sm ${inks[product.ink]}`}
          >
            {product.tile}
          </span>
          {product.badge && (
            <span className="absolute top-3 left-3 bg-gold px-[9px] py-[5px] text-[9px] font-bold tracking-[0.18em] text-army uppercase">
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <span className="font-sans text-[9px] font-bold tracking-[0.24em] text-gold uppercase lg:text-[10px] lg:tracking-[0.26em]">
            {product.category}
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-[0.02em] text-army uppercase lg:mt-3 lg:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-baseline gap-4 lg:mt-4">
            <span className="text-lg font-medium text-army lg:text-xl">${product.price}</span>
            <span className="text-xs tracking-[0.06em] text-army/75 lg:text-sm">
              {product.colorway}
            </span>
          </div>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-army/80 lg:mt-6 lg:text-base">
            {product.description}
          </p>

          <div className="mt-8 lg:mt-10">
            <AddToCart sizes={product.sizes} soldOut={product.soldOut} />
          </div>

          <p className="mt-8 border-t border-dashed border-army/20 pt-5 text-xs tracking-[0.05em] text-army/60 lg:text-[13px]">
            Free shipping on all orders. Returns within 30 days, no questions on the scorecard.
          </p>
        </div>
      </div>
    </section>
  );
}
