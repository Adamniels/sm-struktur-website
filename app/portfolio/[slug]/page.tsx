import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import {
  pieceBySlugQuery,
  allPieceSlugsQuery,
  PieceDetail,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import StatusBadge from "@/components/StatusBadge";
import PortableTextRenderer from "@/components/PortableTextRenderer";

export const revalidate = 60;

// Pre-build all published piece pages at build time
export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allPieceSlugsQuery);
  return slugs.map(({ slug }) => ({ slug }));
}

// Next.js 15: params is a Promise
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const piece = await client.fetch<PieceDetail | null>(pieceBySlugQuery, {
    slug,
  });
  if (!piece) return { title: "Piece not found" };

  return {
    title: piece.title,
    description: `${piece.title} — handcrafted ${piece.category} by SM Struktur.`,
    openGraph: {
      images: [
        urlFor(piece.heroImage).width(1200).height(630).fit("crop").url(),
      ],
    },
  };
}

const categoryLabel: Record<string, string> = {
  furniture: "Furniture",
  commission: "Custom Commission",
  storage: "Storage",
  seating: "Seating",
  tables: "Tables",
  outdoor: "Outdoor",
};

// Next.js 15: params is a Promise
export default async function PieceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = await client.fetch<PieceDetail | null>(pieceBySlugQuery, {
    slug,
  });

  if (!piece) notFound();

  const heroUrl = urlFor(piece.heroImage)
    .width(1600)
    .height(1000)
    .fit("crop")
    .auto("format")
    .url();

  const heroBlurhash = urlFor(piece.heroImage)
    .width(20)
    .height(13)
    .fit("crop")
    .blur(50)
    .url();

  const hasGallery = piece.images && piece.images.length > 0;
  const hasDimensions =
    piece.dimensions &&
    (piece.dimensions.height ||
      piece.dimensions.width ||
      piece.dimensions.depth);

  return (
    <>
      {/* Hero image — full bleed */}
      <section className="relative w-full pt-16 md:pt-20 bg-cream-dark">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <Image
            src={heroUrl}
            alt={piece.heroImage.alt ?? piece.title}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={heroBlurhash}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream-dark to-transparent" />
        </div>
      </section>

      {/* Piece content */}
      <section className="bg-cream-dark pb-24">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-20 pt-12">

            {/* Left: gallery + description */}
            <div>
              {hasGallery && (
                <div className="flex gap-3 overflow-x-auto pb-4 mb-12">
                  {piece.images!.map((img, i) => {
                    const thumbUrl = urlFor(img)
                      .width(400)
                      .height(500)
                      .fit("crop")
                      .auto("format")
                      .url();
                    return (
                      <div
                        key={i}
                        className="flex-shrink-0 w-48 aspect-[4/5] relative overflow-hidden bg-sand"
                      >
                        <Image
                          src={thumbUrl}
                          alt={img.alt ?? `${piece.title} — image ${i + 2}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="192px"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {piece.description && piece.description.length > 0 && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-8 h-px bg-gold" />
                    <p className="font-sans text-xs tracking-[0.25em] uppercase text-gold">
                      About this piece
                    </p>
                  </div>
                  <PortableTextRenderer value={piece.description} />
                </div>
              )}
            </div>

            {/* Right: sticky details panel */}
            <div className="lg:sticky lg:top-28 self-start space-y-8">

              <div className="flex items-center gap-2 text-xs font-sans text-charcoal/40">
                <Link href="/portfolio" className="hover:text-forest transition-colors">
                  Work
                </Link>
                <span>/</span>
                <span className="text-charcoal/60">
                  {categoryLabel[piece.category] ?? piece.category}
                </span>
              </div>

              <div>
                <h1
                  className="font-serif text-display-md text-forest mb-4 leading-tight"
                  style={{ fontWeight: 300 }}
                >
                  {piece.title}
                </h1>
                <StatusBadge status={piece.status} />
              </div>

              {piece.price && piece.status === "available" && (
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-charcoal/40 mb-1">
                    Price
                  </p>
                  <p className="font-serif text-3xl text-forest">
                    {piece.price.toLocaleString("sv-SE")}{" "}
                    <span className="text-lg text-charcoal/40">kr</span>
                  </p>
                </div>
              )}

              {piece.materials && piece.materials.length > 0 && (
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-charcoal/40 mb-3">
                    Materials
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {piece.materials.map((m) => (
                      <span
                        key={m}
                        className="font-sans text-xs px-3 py-1.5 bg-sand border border-sand-dark text-charcoal/70"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {hasDimensions && (
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-charcoal/40 mb-3">
                    Dimensions
                  </p>
                  <table className="font-sans text-sm text-charcoal/70 w-full">
                    <tbody>
                      {piece.dimensions!.height && (
                        <tr className="border-b border-sand">
                          <td className="py-2 text-charcoal/40">Height</td>
                          <td className="py-2 text-right">{piece.dimensions!.height} cm</td>
                        </tr>
                      )}
                      {piece.dimensions!.width && (
                        <tr className="border-b border-sand">
                          <td className="py-2 text-charcoal/40">Width</td>
                          <td className="py-2 text-right">{piece.dimensions!.width} cm</td>
                        </tr>
                      )}
                      {piece.dimensions!.depth && (
                        <tr className="border-b border-sand">
                          <td className="py-2 text-charcoal/40">Depth</td>
                          <td className="py-2 text-right">{piece.dimensions!.depth} cm</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {piece.dimensions!.note && (
                    <p className="font-sans text-xs text-charcoal/40 mt-2 italic">
                      {piece.dimensions!.note}
                    </p>
                  )}
                </div>
              )}

              {piece.year && (
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-charcoal/40 mb-1">
                    Year
                  </p>
                  <p className="font-sans text-sm text-charcoal/70">{piece.year}</p>
                </div>
              )}

              <div className="w-full h-px bg-gold/30" />

              {piece.status !== "sold" && (
                <Link
                  href={`/contact?piece=${encodeURIComponent(piece.title)}`}
                  className="block w-full text-center bg-forest text-cream font-sans text-sm tracking-widest uppercase px-6 py-4 hover:bg-forest-dark transition-colors duration-300"
                >
                  {piece.status === "commission"
                    ? "Inquire About a Commission"
                    : "Inquire About This Piece"}
                </Link>
              )}

              <Link
                href="/portfolio"
                className="block w-full text-center border border-forest/30 text-forest/60 font-sans text-xs tracking-widest uppercase px-6 py-3 hover:border-forest hover:text-forest transition-all duration-300"
              >
                Back to All Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
