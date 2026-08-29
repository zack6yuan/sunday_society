export default function UtilityBar() {
  return (
    // Fixed h-6: the hero's height calc subtracts exactly this much viewport.
    <section className="bg-gold flex h-6 items-center justify-center">
      <p className="font-sans text-ink text-xs tracking-wide font-bold">
        FREE SHIPPING ON ALL ORDERS
      </p>
    </section>
  );
}
