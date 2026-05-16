"use client";

import { useState } from "react";
import PieceCard from "./PieceCard";
import { PieceCard as PieceCardType, PieceCategory } from "@/sanity/queries";

const CATEGORIES: { value: PieceCategory | "all"; label: string }[] = [
  { value: "all", label: "All Work" },
  { value: "furniture", label: "Furniture" },
  { value: "tables", label: "Tables" },
  { value: "seating", label: "Seating" },
  { value: "storage", label: "Storage" },
  { value: "commission", label: "Commissions" },
  { value: "outdoor", label: "Outdoor" },
];

interface Props {
  pieces: PieceCardType[];
}

export default function PortfolioGrid({ pieces }: Props) {
  const [active, setActive] = useState<PieceCategory | "all">("all");

  const availableCategories = CATEGORIES.filter(
    (cat) => cat.value === "all" || pieces.some((p) => p.category === cat.value)
  );

  const filtered =
    active === "all" ? pieces : pieces.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {availableCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={`font-sans text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-300 ${
              active === cat.value
                ? "bg-forest text-cream border-forest"
                : "bg-transparent text-charcoal/60 border-sand-dark hover:border-forest hover:text-forest"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      {filtered.length === 0 ? (
        <p className="font-sans text-sm text-charcoal/40 italic py-24 text-center">
          No pieces in this category yet.
        </p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {filtered.map((piece, i) => (
            <PieceCard key={piece._id} piece={piece} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
