import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Size Guide",
  description:
    "Measurements for every Sunday Society size, plus fit notes and how to measure yourself.",
};

const mens = [
  { size: "XS", chest: "34–36", waist: "28–29", sleeve: "32" },
  { size: "S", chest: "36–38", waist: "30–31", sleeve: "33" },
  { size: "M", chest: "38–40", waist: "32–33", sleeve: "34" },
  { size: "L", chest: "40–42", waist: "34–36", sleeve: "35" },
  { size: "XL", chest: "42–45", waist: "37–39", sleeve: "36" },
  { size: "XXL", chest: "45–48", waist: "40–42", sleeve: "37" },
];

const womens = [
  { size: "XS", chest: "32–33", waist: "24–25", hip: "34–35" },
  { size: "S", chest: "34–35", waist: "26–27", hip: "36–37" },
  { size: "M", chest: "36–37", waist: "28–29", hip: "38–39" },
  { size: "L", chest: "38–40", waist: "30–32", hip: "40–42" },
  { size: "XL", chest: "41–43", waist: "33–35", hip: "43–45" },
  { size: "XXL", chest: "44–46", waist: "36–38", hip: "46–48" },
];

const headCell =
  "py-2.5 pr-4 text-left font-sans text-[10px] font-bold tracking-[0.18em] text-gold uppercase";
const cell = "py-2.5 pr-4 text-sm text-army/80";

function SizeTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: Record<string, string>[];
}) {
  return (
    // Measurement tables scroll on their own rather than widening the page.
    <div className="mt-5 max-w-prose overflow-x-auto">
      <table className="w-full min-w-[380px] border-collapse">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-army/25">
            {columns.map((column) => (
              <th key={column} scope="col" className={headCell}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.size} className="border-b border-dashed border-army/15">
              {Object.values(row).map((value, i) => (
                <td
                  key={i}
                  className={i === 0 ? `${cell} font-bold text-army` : cell}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizeGuidePage() {
  return (
    <>
      <h1>Size Guide</h1>
      <p>
        Every measurement below is in inches and describes your body, not the
        garment. Between two sizes, size up — our polos are cut trim through the
        chest so the collar stands on its own.
      </p>

      <h2>Men</h2>
      <SizeTable
        caption="Men's apparel measurements in inches"
        columns={["Size", "Chest", "Waist", "Sleeve"]}
        rows={mens}
      />

      <h2>Women</h2>
      <SizeTable
        caption="Women's apparel measurements in inches"
        columns={["Size", "Bust", "Waist", "Hip"]}
        rows={womens}
      />

      <h2>Headwear and accessories</h2>
      <p>
        Rope truckers, mid crowns, and visors are one size with an adjustable
        closure, built to fit 21 to 24 inches around. Head covers, markers, towels,
        and totes are one size as made.
      </p>

      <h2>How to measure</h2>
      <ul>
        <li>
          Chest or bust — around the fullest point, tape level, arms down and
          relaxed.
        </li>
        <li>Waist — around your natural waist, the narrowest part of your torso.</li>
        <li>Hip — around the fullest point, roughly eight inches below the waist.</li>
        <li>
          Sleeve — from the base of your neck, over the shoulder, down to the wrist.
        </li>
      </ul>

      <p>
        Still deciding between two sizes? <a href="/help/contact">Ask us</a> — and
        remember every piece ships free and comes back free within{" "}
        <a href="/help/returns">thirty days</a>.
      </p>
    </>
  );
}
