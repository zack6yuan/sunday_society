import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Sunday Society about an order, a fit question, or the Society itself.",
};

const field =
  "w-full border border-army/30 bg-transparent px-4 py-3 text-sm text-army placeholder:text-army/45 focus:border-army focus:outline-none";

export default function ContactPage() {
  return (
    <>
      <h1>Contact</h1>
      <p>
        Questions about an order, a fit, or the Society itself — one of us reads
        every message and answers within one business day.
      </p>

      <h2>By email</h2>
      <p>
        <a href="mailto:hello@sundaysociety.com">hello@sundaysociety.com</a>
      </p>
      <p>
        Have an order number handy if your question is about a shipment; it moves
        things along considerably.
      </p>

      <h2>Send a message</h2>
      {/* Inert until a commerce backend exists — deliberately not a <form>, so a
          stray Enter cannot reload the page. Fields carry
          suppressHydrationWarning for the same reason the footer sign-up does:
          Chrome stamps autofill-* attributes on them before hydration. */}
      <div className="mt-5 flex max-w-prose flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="contact-name" className="sr-only">
              Your name
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              suppressHydrationWarning
              placeholder="Name"
              className={field}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="contact-email" className="sr-only">
              Your email address
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              suppressHydrationWarning
              placeholder="Email address"
              className={field}
            />
          </div>
        </div>
        <label htmlFor="contact-message" className="sr-only">
          Your message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          suppressHydrationWarning
          placeholder="What can we help with?"
          className={`${field} resize-y`}
        />
        <button
          type="button"
          className="w-full cursor-pointer bg-army px-8 py-4 text-xs font-bold tracking-[0.2em] text-paper uppercase transition hover:bg-gold hover:text-army sm:w-fit"
        >
          Send
        </button>
        <p className="text-[11px] text-army/75">
          The form opens with the shop. Until then, email reaches us fastest.
        </p>
      </div>

      <h2>Before you write</h2>
      <ul>
        <li>
          Shipping timelines and tracking questions are answered on the{" "}
          <a href="/help/shipping">shipping page</a>.
        </li>
        <li>
          Returns run thirty days with a prepaid label — the details are on the{" "}
          <a href="/help/returns">returns page</a>.
        </li>
        <li>
          Caught between two sizes? The <a href="/help/size-guide">size guide</a>{" "}
          has the measurements.
        </li>
      </ul>
    </>
  );
}
