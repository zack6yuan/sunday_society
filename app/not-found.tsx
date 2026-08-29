import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60svh] flex-col items-center justify-center bg-army px-5 py-20 text-center">
      <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-gold uppercase">
        Out of Bounds
      </span>
      <h1 className="mt-4 font-display text-5xl font-extrabold tracking-[0.02em] text-paper uppercase lg:text-7xl">
        Lost Ball
      </h1>
      <p className="mt-4 max-w-sm text-sm text-paper/75 lg:text-base">
        We looked everywhere this page could have landed. Take a free drop back at the clubhouse.
      </p>
      <Link
        href="/"
        className="mt-8 bg-paper px-8 py-4 text-xs font-bold tracking-[0.2em] text-army uppercase transition hover:bg-gold"
      >
        Back to the First Tee
      </Link>
    </section>
  );
}
