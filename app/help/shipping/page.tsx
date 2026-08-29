import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping",
  description:
    "Free shipping on every Sunday Society order, with delivery estimates and tracking details.",
};

export default function ShippingPage() {
  return (
    <>
      <h1>Shipping</h1>
      <p>
        Free standard shipping on every order, every time. No minimum, no code, no
        fine print at the bottom of the scorecard.
      </p>

      <h2>When it ships</h2>
      <p>
        Orders leave within two business days. Drops move quickly, so anything
        ordered the morning a drop opens usually goes out the same afternoon.
      </p>

      <h2>How long it takes</h2>
      <ul>
        <li>Standard — free, three to seven business days.</li>
        <li>Expedited — two business days, priced at checkout.</li>
        <li>
          Orders placed after noon Friday enter the queue on Monday. Sunday is for
          playing.
        </li>
      </ul>

      <h2>Tracking</h2>
      <p>
        A tracking number lands in your inbox the moment the label prints. If it
        has not arrived within three business days of your order confirmation,{" "}
        <a href="/help/contact">tell us</a> and we will chase it down.
      </p>

      <h2>Where we ship</h2>
      <p>
        Anywhere in the United States, including Alaska, Hawaii, and APO
        addresses. International shipping opens once the first drop settles.
      </p>
    </>
  );
}
