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
    <header className="bg-army border-b border-dashed border-rule ">
      <nav className="flex items-center justify-between p-8">
        <span className="lg:flex-1 font-bold font-sans tracking-tighter text-xl md:text-2xl">
          SUNDAY SOCIETY
        </span>
        <button
          type="button"
          onClick={() => setClicked(!clicked)}
          aria-label={clicked ? "Close menu" : "Open menu"}
          aria-expanded={clicked}
          className="flex lg:hidden cursor-pointer"
        >
          {clicked ? <X /> : <Menu />}
        </button>
        <ul className="hidden lg:flex gap-10 text-sm font-bold">
          {navItems.map((item, k) => (
            <li
              key={k}
              className="hover:text-gold transition cursor-pointer"
            >
              {item.label}
            </li>
          ))}
        </ul>
        <ul className="hidden lg:flex lg:flex-1 lg:justify-end gap-10 text-sm font-bold">
          {utilityItems.map((item, j) => (
            <li
              key={j}
              className="hover:text-gold transition cursor-pointer"
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] ease-in-out ${
          clicked ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-6 px-8 pb-8 text-sm font-bold">
          {[...navItems, ...utilityItems].map((item, i) => (
            <li
              key={i}
              onClick={() => setClicked(false)}
              className="relative w-fit cursor-pointer text-4xl font-light transition hover:text-gold
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
    </header>
  );
}
