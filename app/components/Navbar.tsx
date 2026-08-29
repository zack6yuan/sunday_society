"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";

export default function Navbar() {
  const { count: cartCount } = useCart();
  // The Society and Journal return here once those pages exist.
  const navItems = [
    { label: "Men", route: "/men" },
    { label: "Women", route: "/women" },
  ];
  const utilityItems = [
    { label: "Search", route: "#" },
    { label: "Account", route: "#" },
  ];
  const menuItems = [
    ...navItems,
    ...utilityItems,
    { label: `Cart (${cartCount})`, route: "/cart" },
  ];

  const [clicked, setClicked] = useState(false);

  return (
    // The bar floats as a rounded pill with the page visible around it, and
    // sticks while the gold utility bar scrolls away above it.
    <header className="sticky top-0 z-50 px-3 pt-3 text-paper md:px-6">
      <nav className="relative flex items-center justify-between rounded-full bg-army px-5 py-2.5 shadow-lg md:px-7 md:py-3">
        <Link href="/" onClick={() => setClicked(false)} className="lg:flex-1">
          <Image
            src="/logo.png"
            alt="Sunday Society"
            width={452}
            height={246}
            priority
            className="h-10 w-auto md:h-11"
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

        {/* Desktop links are sentence case with a soft pill highlight on
            hover; the cart is the one filled call-to-action. */}
        <ul className="hidden lg:flex lg:items-center lg:gap-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.route}
                className="cursor-pointer rounded-full px-4 py-2 font-sans text-[15px] font-medium tracking-normal transition hover:bg-paper/10"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-1">
          {utilityItems.map((item) => (
            <Link
              key={item.label}
              href={item.route}
              className="cursor-pointer rounded-full px-4 py-2 font-sans text-[15px] font-medium tracking-normal transition hover:bg-paper/10"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="ml-2 cursor-pointer rounded-full bg-gold px-5 py-2 font-sans text-[15px] font-semibold tracking-normal text-army transition hover:bg-paper"
          >
            Cart ({cartCount})
          </Link>
        </div>
      </nav>

      {/* Rows go 0fr -> 1fr so the panel animates to its own content height,
          with no max-height to outgrow as menu items are added. Absolutely
          positioned under the pill so opening it overlays the page instead
          of pushing it down. */}
      <div
        className={`absolute inset-x-3 top-full z-50 mt-2 grid rounded-3xl bg-army shadow-lg lg:hidden transition-[grid-template-rows] ease-in-out md:inset-x-6 ${
          clicked ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden rounded-3xl">
          <ul className="flex flex-col gap-5 px-6 pt-5 pb-7 sm:gap-6">
            {menuItems.map((item) => (
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
