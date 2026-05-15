import groq from "groq";

// ─── Shared types ────────────────────────────────────────────────────────────

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number };
  alt?: string;
  caption?: string;
}

export interface PieceDimensions {
  height?: number;
  width?: number;
  depth?: number;
  note?: string;
}

export type PieceStatus = "available" | "sold" | "commission" | "display";
export type PieceCategory =
  | "furniture"
  | "commission"
  | "storage"
  | "seating"
  | "tables"
  | "outdoor";

// ─── Piece (card / list view) ─────────────────────────────────────────────────

export interface PieceCard {
  _id: string;
  title: string;
  slug: { current: string };
  category: PieceCategory;
  status: PieceStatus;
  price?: number;
  heroImage: SanityImage;
  featured: boolean;
  year?: number;
}

export const allPiecesQuery = groq`
  *[_type == "piece"] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    category,
    status,
    price,
    heroImage,
    featured,
    year
  }
`;

export const featuredPiecesQuery = groq`
  *[_type == "piece" && featured == true] | order(order asc) [0...6] {
    _id,
    title,
    slug,
    category,
    status,
    price,
    heroImage,
    year
  }
`;

// ─── Piece (full detail view) ─────────────────────────────────────────────────

export interface PieceDetail extends PieceCard {
  images?: SanityImage[];
  // Portable Text blocks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any[];
  materials?: string[];
  dimensions?: PieceDimensions;
}

export const pieceBySlugQuery = groq`
  *[_type == "piece" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    status,
    price,
    heroImage,
    images,
    description,
    materials,
    dimensions,
    year,
    featured
  }
`;

// Used for generateStaticParams
export const allPieceSlugsQuery = groq`
  *[_type == "piece" && defined(slug.current)] {
    "slug": slug.current
  }
`;
