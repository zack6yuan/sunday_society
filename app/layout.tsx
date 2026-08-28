import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo, EB_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import UtilityBar from "./components/UtilityBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

const dmSans = DM_Sans({
  variable: "--font-dmSans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Sunday Society",
  description: "Golf apparel and accessories",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} ${ebGaramond.variable} ${dmSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans tracking-tighter">
        <UtilityBar />
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

