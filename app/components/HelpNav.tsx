"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const helpPages = [
  { label: "Shipping", href: "/help/shipping" },
  { label: "Returns", href: "/help/returns" },
  { label: "Size Guide", href: "/help/size-guide" },
  { label: "Contact", href: "/help/contact" },
];

export default function HelpNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Help">
      <h2 className="font-sans text-[10px] font-bold tracking-[0.24em] text-gold uppercase">
        Help
      </h2>
      {/* Scrolls sideways on phones rather than stacking four rows above
          every article. */}
      <ul className="mt-4 -mx-5 flex gap-5 overflow-x-auto px-5 lg:mx-0 lg:mt-5 lg:flex-col lg:gap-3 lg:overflow-visible lg:px-0">
        {helpPages.map((page) => {
          const current = pathname === page.href;
          return (
            <li key={page.href} className="shrink-0">
              <Link
                href={page.href}
                aria-current={current ? "page" : undefined}
                className={`text-sm whitespace-nowrap transition hover:text-gold lg:text-base ${
                  current ? "font-bold text-army" : "text-army/70"
                }`}
              >
                {page.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
