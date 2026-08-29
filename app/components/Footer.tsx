import Image from "next/image";

const columns = [
  {
    heading: "SHOP",
    links: [
      { label: "The First Drop", href: "/#releases" },
      { label: "Men", href: "/men" },
      { label: "Women", href: "/women" },
      { label: "Hats", href: "#" },
      { label: "Accessories", href: "#" },
    ],
  },
  {
    heading: "THE SOCIETY",
    links: [
      { label: "Our Story", href: "#" },
      { label: "Journal", href: "#" },
      { label: "Stockists", href: "#" },
      { label: "Ambassadors", href: "#" },
    ],
  },
  {
    heading: "HELP",
    links: [
      { label: "Shipping", href: "/help/shipping" },
      { label: "Returns", href: "/help/returns" },
      { label: "Size Guide", href: "/help/size-guide" },
      { label: "Contact", href: "/help/contact" },
    ],
  },
];

const social = ["Instagram", "TikTok", "YouTube"];
const legal = ["Privacy Policy", "Terms of Service"];

export default function Footer() {
  return (
    <footer className="bg-army text-paper">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-12">
        {/* Sign-up. Inert until a commerce backend exists — deliberately not a
            <form>, so a stray Enter cannot reload the page. */}
        <div className="flex flex-col gap-6 border-b border-dashed border-rule py-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:py-14">
          <div className="max-w-xl">
            <span className="font-sans text-[9px] font-bold tracking-[0.24em] text-gold uppercase lg:text-[10px] lg:tracking-[0.26em]">
              Join the Society
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold uppercase lg:mt-3 lg:text-4xl">
              First look at every drop
            </h2>
            <p className="mt-2 text-sm text-paper/70 lg:mt-3 lg:text-base">
              Early access, course-tested details, and nothing else.
            </p>
          </div>

          <div className="flex w-full max-w-md shrink-0 border border-paper/40">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            {/* Chrome's autofill predictions stamp autofill-* attributes on
                this input before hydration; element-scoped suppression is
                React's documented remedy for third-party attribute injection.
                It covers this element's attributes only. */}
            <input
              id="footer-email"
              type="email"
              autoComplete="email"
              suppressHydrationWarning
              placeholder="EMAIL ADDRESS"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-xs font-bold tracking-wide uppercase placeholder:text-paper/60 focus:outline-none lg:text-sm"
            />
            <button
              type="button"
              className="shrink-0 cursor-pointer bg-paper px-5 py-3 text-xs font-bold tracking-wide text-army uppercase transition hover:bg-gold lg:px-7 lg:text-sm"
            >
              Join
            </button>
          </div>
        </div>

        {/* Link columns: two-up on phones, four-up from md. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 border-b border-dashed border-rule py-10 md:grid-cols-4 lg:gap-x-10 lg:py-14">
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/logo.png"
              alt="Sunday Society"
              width={452}
              height={246}
              className="h-14 w-auto lg:h-16"
            />
            <p className="mt-3 max-w-xs text-sm text-paper/70">
              Six days to practice. One day to play.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="font-sans text-[10px] font-bold tracking-[0.2em] text-gold uppercase lg:text-[11px]">
                {column.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 lg:mt-5 lg:gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-paper/80 transition hover:text-gold lg:text-base"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col-reverse gap-5 py-8 md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="text-xs text-paper/55">
            © {new Date().getFullYear()} Sunday Society. All rights reserved.
          </p>

          {/* Social and legal are separate rows on phones so the two groups
              break as units, then sit inline from sm. */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5 md:gap-6">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {social.map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-xs font-bold tracking-wide uppercase transition hover:text-gold"
                >
                  {platform}
                </a>
              ))}
            </div>
            <span aria-hidden className="hidden h-3 w-px bg-paper/25 sm:block" />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legal.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-paper/55 transition hover:text-gold"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
