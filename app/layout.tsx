import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SM Struktur — Fine Carpentry",
    template: "%s | SM Struktur",
  },
  description:
    "Handcrafted furniture and bespoke woodwork. Each piece is built with intention — designed to last a lifetime.",
  openGraph: {
    title: "SM Struktur — Fine Carpentry",
    description:
      "Handcrafted furniture and bespoke woodwork. Each piece is built with intention.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-cream text-charcoal antialiased min-h-screen flex flex-col">
        <Navbar />
        <ScrollAnimator />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
