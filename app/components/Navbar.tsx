"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cartCount } from "../lib/cart";

export default function Navbar() {
  // The Society and Journal return here once those pages exist.
  const navItems = [
    { label: "MEN", route: "/men" },
    { label: "WOMEN", route: "/women" },
  ];
  const utilityItems = [
    { label: "SEARCH", route: "#" },
    { label: "ACCOUNT", route: "#" },
    { label: `CART (${cartCount})`, route: "/cart" },
  ];

  const [clicked, setClicked] = useState(false);

  return (
    <header className="relative bg-army text-paper border-b border-dashed border-rule">
      <nav className="flex items-center justify-between px-5 py-4 md:px-8 md:py-6 lg:py-8">
        <Link href="/" onClick={() => setClicked(false)} className="lg:flex-1">
          <Image
            src="/logo.png"
            alt="Sunday Society"
            width={452}
            height={246}
            priority
            className="h-11 w-auto md:h-13 lg:h-15"
          />
        </Link>
        <button
          type="button"
          onClick={() => setClicked(!clicked)}
          aria-label={clicked ? "Close menu" : "Open menu"}
          aria-expanded={clicked}
          className="relative flex size-6 items-center justify-center lg:hidden cursor-pointer"
        >
          <Menu
            aria-hidden
            className={`absolute transition ${
              clicked ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <X
            aria-hidden
            className={`absolute transition ${
              clicked ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
            }`}
          />
        </button>
        {/* Desktop links speak in the mobile menu's voice: oversized lowercase
            with the gold underline wipe — set in EB Garamond, the editorial
            serif, rather than a small tracked-out label face. */}
        <ul className="hidden lg:flex gap-8 xl:gap-10">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.route}
                className="relative cursor-pointer py-1 font-serif text-xl tracking-normal transition hover:text-gold
             after:absolute after:bottom-0 after:left-0 after:h-px after:w-full
             after:origin-right after:scale-x-0 after:bg-gold
             after:transition-transform
             hover:after:origin-left hover:after:scale-x-100"
              >
                {item.label.toLowerCase()}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="hidden lg:flex lg:flex-1 lg:justify-end gap-7 xl:gap-9">
          {utilityItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.route}
                className="cursor-pointer font-serif text-lg tracking-normal transition hover:text-gold"
              >
                {item.label.toLowerCase()}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Rows go 0fr -> 1fr so the panel animates to its own content height,
          with no max-height to outgrow as menu items are added. Absolutely
          positioned under the header so opening it overlays the page instead
          of pushing it down. */}
      <div
        className={`absolute inset-x-0 top-full z-50 grid bg-army lg:hidden transition-[grid-template-rows] ease-in-out ${
          clicked ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-5 px-5 pt-4 pb-6 sm:gap-6 md:px-8 md:pb-8 text-sm font-bold border-b border-dashed border-rule">
            {[...navItems, ...utilityItems].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.route}
                  onClick={() => setClicked(false)}
                  className="relative block w-fit cursor-pointer font-serif text-3xl tracking-normal sm:text-4xl transition hover:text-gold
             after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full
             after:origin-right after:scale-x-0 after:bg-gold
             after:transition-transform
             hover:after:origin-left hover:after:scale-x-100"
                >
                  {item.label.toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
