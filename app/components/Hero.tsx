import Image from "next/image";

export default function Hero() {
  return (
    // Pulled up under the sticky nav pill so the photo bleeds behind it —
    // the negative margins match the header's height (pt-3 + pill), which
    // makes the first screen exactly utility bar + hero at every width:
    // 100svh minus the utility bar's h-6.
    <section className="relative -mt-18 h-[calc(100svh-1.5rem)] md:-mt-20">
      <Image src="/first-light.jpg" alt="" fill priority className="object-cover" />
      {/* Scrim. The copy sits on whatever the photo happens to put behind it —
          bright foliage took the headline to 1.1:1 in places. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-army/95 via-army/70 to-transparent"
      />
      <div className="relative z-10 flex h-full items-end px-8 pb-8">
        <div className="flex flex-col items-start gap-6">
          <span className="font-sans tracking-wide text-gold font-semibold text-sm">THE FIRST DROP — NOW LIVE</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-paper">
            SIX DAYS TO PRACTICE. <br /> ONE DAY TO PLAY.
          </h1>
          <button
            type="button"
            className="text-army font-sans font-black tracking-wide bg-paper py-3 px-10 hover:bg-army hover:text-paper transition cursor-pointer"
          >
            SHOP THE FIRST DROP
          </button>
        </div>
      </div>
    </section>
  );
}
