import Image from "next/image";

// Collections 02 and 03 have no photography yet. Like DropCard, the image slot
// falls back to a flat brand-colour tile with the shot description set into it;
// filling `image` on an entry replaces the tile with the real photo.
type Collection = {
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
  image?: { src: string; alt: string };
  shot?: string;
  panel: "paper" | "army";
  reverse?: boolean;
};

const collections: Collection[] = [
  {
    eyebrow: "COLLECTION 01",
    title: "THE SUNDAY BEST CAPSULE",
    copy: "Cut for the day that matters twice. Pressed enough for the pew, built enough for the tee. No changing in the parking lot, no apologies to the starter. Just one shirt that holds up from the first hymn to the last putt.",
    cta: "SHOP SUNDAY BEST →",
    image: { src: "/pga.jpg", alt: "" },
    panel: "paper",
  },
  {
    eyebrow: "COLLECTION 02",
    title: "FIRST LIGHT",
    copy: "The first tee time belongs to the faithful. Dew on the fairway, nobody ahead of you, service at eleven. First Light is layered for cold starts — quarter zips and mid crowns for the hours before the world wakes up.",
    cta: "SHOP FIRST LIGHT →",
    shot: "MISTY DAWN TEE BOX",
    panel: "army",
    reverse: true,
  },
  {
    eyebrow: "COLLECTION 03",
    title: "THE BACK NINE",
    copy: "Anyone can start well. The back nine is where rounds are won and character shows. Heavier fabrics, quieter colors — pieces for the players who finish what they started.",
    cta: "SHOP THE BACK NINE →",
    shot: "SCORECARD AND PENCIL, LATE LIGHT",
    panel: "paper",
  },
];

export default function Collections() {
  return (
    <>
      {collections.map((collection) => {
        const onArmy = collection.panel === "army";
        return (
          <section
            key={collection.title}
            id={collection.eyebrow.toLowerCase().replace(/\s+/g, "-")}
            className={`w-full flex flex-col ${collection.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} border-b border-dashed ${onArmy ? "border-rule" : "border-army/20"}`}
          >
            <div className="relative w-full h-[50svh] lg:w-1/2">
              {collection.image ? (
                <Image
                  src={collection.image.src}
                  alt={collection.image.alt}
                  fill
                  sizes="100vw"
                  className="object-cover transform-3d"
                />
              ) : (
                <div
                  className={`flex h-full items-center justify-center ${onArmy ? "bg-paper" : "bg-army"}`}
                >
                  <span
                    className={`text-[9px] font-semibold tracking-[0.26em] uppercase opacity-55 lg:text-[11px] lg:tracking-[0.3em] ${onArmy ? "text-army" : "text-paper"}`}
                  >
                    {collection.shot}
                  </span>
                </div>
              )}
            </div>
            <div
              className={`flex flex-col justify-center p-10 space-y-5 lg:w-1/2 lg:px-16 ${onArmy ? "bg-army" : "bg-paper"}`}
            >
              <span className="text-gold font-bold font-sans tracking-wide text-sm">
                {collection.eyebrow}
              </span>
              <h3
                className={`font-bold font-display text-4xl lg:text-5xl ${onArmy ? "text-paper" : "text-army"}`}
              >
                {collection.title}
              </h3>
              <p className={`text-base md:text-lg lg:text-xl ${onArmy ? "text-paper/80" : "text-army"}`}>
                {collection.copy}
              </p>
              <button
                className={`underline underline-offset-5 decoration-2 flex hover:text-gold transition cursor-pointer ${onArmy ? "text-paper" : "text-army"}`}
              >
                <p className="font-semibold text-base md:text-lg lg:text-xl">{collection.cta}</p>
              </button>
            </div>
          </section>
        );
      })}
    </>
  );
}
