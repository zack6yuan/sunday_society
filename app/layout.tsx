import type { Metadata } from "next";
import { Archivo, EB_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import UtilityBar from "./components/UtilityBar";
import Footer from "./components/Footer";

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
      className={`${archivo.variable} ${ebGaramond.variable} ${dmSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans tracking-tighter">
        <UtilityBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

