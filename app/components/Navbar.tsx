"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const navItems = [
    { label: "MEN", route: "#" },
    { label: "WOMEN", route: "#" },
    { label: "THE SOCIETY", route: "#" },
    { label: "JOURNAL", route: "#" },
  ];
  const utilityItems = [
    { label: "SEARCH", route: "#" },
    { label: "ACCOUNT", route: "#" },
    { label: "CART (0)", route: "#" },
  ];

  const [clicked, setClicked] = useState(false);

  return (
    <header className="relative bg-army text-paper border-b border-dashed border-rule">
      <nav className="flex items-center justify-between px-5 py-4 md:px-8 md:py-6 lg:py-8">
        <span className="lg:flex-1 font-bold font-sans tracking-tighter text-lg sm:text-xl md:text-2xl">
          SUNDAY SOCIETY
        </span>
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
        <ul className="hidden lg:flex gap-6 xl:gap-10 text-sm font-bold">
          {navItems.map((item, k) => (
            <li key={k} className="hover:text-gold transition cursor-pointer">
              {item.label}
            </li>
          ))}
        </ul>
        <ul className="hidden lg:flex lg:flex-1 lg:justify-end gap-6 xl:gap-10 text-sm font-bold">
          {utilityItems.map((item, j) => (
            <li key={j} className="hover:text-gold transition cursor-pointer">
              {item.label}
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
            {[...navItems, ...utilityItems].map((item, i) => (
              <li
                key={i}
                onClick={() => setClicked(false)}
                className="relative w-fit cursor-pointer text-3xl sm:text-4xl font-light transition hover:text-gold
             after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full
             after:origin-right after:scale-x-0 after:bg-gold
             after:transition-transform
             hover:after:origin-left hover:after:scale-x-100"
              >
                {item.label.toLowerCase()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
