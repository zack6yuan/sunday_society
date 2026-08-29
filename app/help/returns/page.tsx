import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns",
  description:
    "Thirty days to return any unworn Sunday Society piece, with a prepaid label and no restocking fee.",
};

export default function ReturnsPage() {
  return (
    <>
      <h1>Returns</h1>
      <p>
        Thirty days from the day it lands. No questions on the scorecard, no
        restocking fee, no talking you out of it.
      </p>

      <h2>What we can take back</h2>
      <ul>
        <li>Unworn pieces with the tags still attached.</li>
        <li>Anything that arrived flawed or wrong — that one is on us entirely.</li>
        <li>
          Headwear and accessories, same thirty days, provided they have not been
          worn on a course.
        </li>
      </ul>

      <h2>How it works</h2>
      <p>
        Start a return from your order confirmation email and a prepaid label comes
        straight back. Drop it with any carrier location, then watch for the refund
        — it posts to the original payment method within five business days of the
        package reaching us.
      </p>

      <h2>Exchanges</h2>
      <p>
        Sizing between two numbers is the most common reason a piece comes back, so
        exchanges are simply a return plus a new order. That way the size you
        actually want ships immediately instead of waiting on the round trip. The{" "}
        <a href="/help/size-guide">size guide</a> is worth a look first.
      </p>

      <h2>Final sale</h2>
      <p>
        Nothing is final sale today. If that ever changes for a specific piece, it
        will say so plainly on the product page before you add it.
      </p>
    </>
  );
}
