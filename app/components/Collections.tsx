import Image from "next/image";

export default function Collections() {
  return (
    <section className="w-full flex flex-col lg:flex-row border-b border-dashed border-paper">
      <div className="relative w-full h-[50svh] lg:h-[50svh]">
        <Image
          src="/pga.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover transform-3d"
        />
      </div>
      <div className="bg-paper flex flex-col p-10 space-y-5">
        <span className="text-gold font-bold font-sans tracking-wide text-sm">COLLECTION 01</span>
        <h3 className="text-army font-bold font-display text-4xl lg:text-5xl">THE SUNDAY BEST CAPSULE</h3>
        <p className="text-army text-base md:text-lg lg:text-xl">Cut for the day that matters twice. Pressed enough for the pew, built enough for the tee. No changing in the parking lot, no apologies to the starter. Just one shirt that holds up from the first hymn to the last putt.</p>
        <button className="text-army underline underline-offset-5 decoration-2 flex hover:text-gold transition cursor-pointer">
          <p className="font-semibold text-base md:text-lg lg:text-xl">SHOP SUNDAY BEST →</p>
        </button>
      </div>
    </section>
  );
}