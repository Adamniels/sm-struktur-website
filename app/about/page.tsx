import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind SM Struktur — the craftsman, the workshop, and the approach to fine woodworking.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-36 pb-16 bg-cream">
        <div className="page-container">
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-gold mb-4">
            About
          </p>
          <h1
            className="font-serif text-display-lg text-forest mb-6"
            style={{ fontWeight: 300 }}
          >
            The maker
          </h1>
          <div className="w-12 h-px bg-gold" />
        </div>
      </section>

      <section className="bg-cream pb-24">
        <div className="page-container">
          <div className="max-w-2xl">
            <p className="font-sans text-sm text-charcoal/40 italic">
              This page will be populated from the Sanity studio. Add your story,
              portrait, and workshop images in the admin under{" "}
              <strong className="text-charcoal/60">About Page</strong>.
            </p>
            <div className="mt-12">
              <Link
                href="/portfolio"
                className="font-sans text-xs tracking-widest uppercase text-forest border-b border-forest/30 hover:border-forest pb-1 transition-colors duration-300"
              >
                View the work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
