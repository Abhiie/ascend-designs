export type ProjectCategory =
  | "architecture"
  | "interiors"
  | "residential"
  | "commercial"
  | "turnkey";

export type ProjectLayout = "horizontal" | "portrait" | "full" | "compact";

export interface Project {
  id: string;
  title: string;
  location: string;
  category: ProjectCategory;
  year: number;
  description: string;
  /** Alt text / placeholder caption for the cover image. */
  coverImage: string;
  /** Selects the placeholder's warm gradient tone (0–3), used when `image` is unset. */
  tone: 0 | 1 | 2 | 3;
  /** Real photo URL — omit to fall back to the gradient placeholder. */
  image?: string;
  gallery: string[];
  featured: boolean;
  services: string[];
  /** Layout hint for the portfolio grid rhythm. */
  layout: ProjectLayout;
}

export const projects: Project[] = [
  {
    id: "residence-01",
    title: "Residence 01",
    location: "Ahmedabad, Gujarat",
    category: "residential",
    year: 2026,
    description:
      "An exploration of warmth, proportion and natural material for a family home built around light.",
    coverImage: "Residence 01 — living room in marble and wood",
    tone: 0,
    image:
      "https://images.unsplash.com/photo-1758565811033-84d1365000c6?q=80&w=1800&auto=format&fit=crop",
    gallery: [
      "Residence 01 — living pavilion",
      "Residence 01 — dining alcove",
      "Residence 01 — courtyard light",
    ],
    featured: true,
    services: ["Interior Design", "Turnkey Projects"],
    layout: "horizontal",
  },
  {
    id: "oakline-residence",
    title: "The Oakline Residence",
    location: "Ahmedabad, Gujarat",
    category: "interiors",
    year: 2025,
    description:
      "A material palette of oak and linen, arranged around a family's everyday rituals.",
    coverImage: "Oakline Residence — bedroom in oak and linen",
    tone: 1,
    image:
      "https://images.unsplash.com/photo-1764760764956-fcb78be107a5?q=80&w=1800&auto=format&fit=crop",
    gallery: ["Oakline Residence — bedroom", "Oakline Residence — study"],
    featured: false,
    services: ["Interior Design"],
    layout: "portrait",
  },
  {
    id: "meridian-business-park",
    title: "Meridian Business Park",
    location: "Ahmedabad, Gujarat",
    category: "commercial",
    year: 2025,
    description:
      "A workplace envelope designed around daylight, proportion and material honesty.",
    coverImage: "Meridian Business Park — lobby facade in stone and glass",
    tone: 2,
    image:
      "https://images.unsplash.com/photo-1758448500688-3ababa93fd67?q=80&w=1800&auto=format&fit=crop",
    gallery: ["Meridian Business Park — lobby", "Meridian Business Park — atrium"],
    featured: false,
    services: ["Architectural Design", "Project Management"],
    layout: "full",
  },
  {
    id: "villa-amara",
    title: "Villa Amara",
    location: "Gandhinagar, Gujarat",
    category: "architecture",
    year: 2024,
    description: "A concrete and stone villa organised around a central courtyard.",
    coverImage: "Villa Amara — courtyard facade",
    tone: 3,
    image:
      "https://images.unsplash.com/photo-1715523609055-fad02a8651da?q=80&w=1800&auto=format&fit=crop",
    gallery: ["Villa Amara — courtyard", "Villa Amara — facade"],
    featured: false,
    services: ["Architectural Design"],
    layout: "compact",
  },
  {
    id: "studio-loft-12",
    title: "Studio Loft 12",
    location: "Ahmedabad, Gujarat",
    category: "interiors",
    year: 2024,
    description: "A compact live-work loft finished in warm plaster and brushed metal.",
    coverImage: "Studio Loft 12 — living corner in plaster and metal",
    tone: 0,
    image:
      "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?q=80&w=1800&auto=format&fit=crop",
    gallery: ["Studio Loft 12 — living corner", "Studio Loft 12 — kitchen"],
    featured: false,
    services: ["Interior Design", "AD Living"],
    layout: "compact",
  },
  {
    id: "ridgeline-villa",
    title: "The Ridgeline Villa",
    location: "Ahmedabad, Gujarat",
    category: "turnkey",
    year: 2023,
    description:
      "Full turnkey execution from architectural shell to final furnishing and decor.",
    coverImage: "Ridgeline Villa — terrace in natural stone",
    tone: 1,
    image:
      "https://images.unsplash.com/photo-1783932944218-df55066daead?q=80&w=1800&auto=format&fit=crop",
    gallery: ["Ridgeline Villa — terrace", "Ridgeline Villa — living room"],
    featured: false,
    services: ["Turnkey Projects", "AD Living"],
    layout: "compact",
  },
  {
    id: "court-house-9",
    title: "Court House 9",
    location: "Ahmedabad, Gujarat",
    category: "architecture",
    year: 2023,
    description: "A quiet courtyard house designed around cross-ventilation and shadow.",
    coverImage: "Court House 9 — internal courtyard",
    tone: 2,
    image:
      "https://images.unsplash.com/photo-1612476082186-7a5e4fa1e8d0?q=80&w=1800&auto=format&fit=crop",
    gallery: ["Court House 9 — courtyard", "Court House 9 — verandah"],
    featured: false,
    services: ["Architectural Design"],
    layout: "horizontal",
  },
  {
    id: "linen-oak-apartment",
    title: "Linen & Oak Apartment",
    location: "Ahmedabad, Gujarat",
    category: "residential",
    year: 2023,
    description: "A restrained material palette for a compact family apartment.",
    coverImage: "Linen & Oak Apartment — kitchen",
    tone: 3,
    image:
      "https://images.unsplash.com/photo-1617228069096-4638a7ffc906?q=80&w=1800&auto=format&fit=crop",
    gallery: ["Linen & Oak Apartment — kitchen", "Linen & Oak Apartment — bedroom"],
    featured: false,
    services: ["Interior Design"],
    layout: "portrait",
  },
];

export const filterCategories: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Architecture", value: "architecture" },
  { label: "Interiors", value: "interiors" },
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Turnkey", value: "turnkey" },
];
