import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { allPiecesQuery, PieceCard } from "@/sanity/queries";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A collection of handcrafted furniture and bespoke woodwork — each piece built with intention.",
};

// Revalidate every 60 seconds so new Sanity pieces appear without a full rebuild
export const revalidate = 60;

export default async function PortfolioPage() {
  const pieces = await client.fetch<PieceCard[]>(allPiecesQuery);

  return (
    <>
      {/* Page header */}
      <section className="pt-36 pb-16 bg-cream">
        <div className="page-container">
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-gold mb-4">
            Portfolio
          </p>
          <h1
            className="font-serif text-display-lg text-forest mb-6"
            style={{ fontWeight: 300 }}
          >
            The work
          </h1>
          <div className="w-12 h-px bg-gold" />
        </div>
      </section>

      {/* Grid */}
      <section className="bg-cream pb-24">
        <div className="page-container">
          {pieces.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-serif text-2xl text-forest/40 mb-4">
                No pieces published yet
              </p>
              <p className="font-sans text-sm text-charcoal/40">
                Add your first piece in the{" "}
                <a
                  href="/studio"
                  className="underline hover:text-forest transition-colors"
                >
                  admin studio
                </a>
                .
              </p>
            </div>
          ) : (
            <PortfolioGrid pieces={pieces} />
          )}
        </div>
      </section>
    </>
  );
}
