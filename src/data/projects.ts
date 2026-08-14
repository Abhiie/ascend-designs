import { projectImages, type ProjectImage } from "./project-images";

export type ProjectCategory = "residential" | "commercial";

export interface Project {
  /** Slug — also the folder name under public/projects and the anchor id. */
  id: string;
  title: string;
  location: string;
  category: ProjectCategory;
  /** Only set where the source photography actually evidences it. */
  year?: number;
  description: string;
  services: string[];
  featured: boolean;
  images: ProjectImage[];
}

/**
 * The studio's real work, one entry per folder in the supplied drive export.
 *
 * TITLES, CATEGORIES AND COPY NEED CONFIRMING. The folders were named
 * informally ("tapan bhai Ahmadava", "DR.Prakash bhai"), so titles here are a
 * best reading of them and descriptions are deliberately generic — nothing
 * claims a square footage, a completion date or a scope that the images don't
 * actually evidence. Only Bhemat Jewellers carries a year, because its source
 * filenames were datestamped. Correct these before launch.
 */
const META: Omit<Project, "images">[] = [
  {
    id: "tapan-residence",
    title: "Tapan Residence",
    location: "Ahmedabad, Gujarat",
    category: "residential",
    description:
      "A family home worked through room by room, from the living areas to the private floors above.",
    services: ["Interior Design", "Turnkey Projects"],
    featured: true,
  },
  {
    id: "rajdhani-residence",
    title: "Rajdhani Residence",
    location: "Ahmedabad, Gujarat",
    category: "residential",
    description:
      "A full residential scheme developed across multiple levels, resolved in warm timber and stone.",
    services: ["Interior Design", "Turnkey Projects"],
    featured: false,
  },
  {
    id: "shreenathji-ashiyana",
    title: "Shreenathji Ashiyana",
    location: "Ahmedabad, Gujarat",
    category: "residential",
    description:
      "Interiors for a family residence, balancing formal reception spaces against quieter private rooms.",
    services: ["Interior Design"],
    featured: false,
  },
  {
    id: "alayam-madhuvan",
    title: "Alayam Madhuvan",
    location: "Ahmedabad, Gujarat",
    category: "residential",
    description:
      "A residential interior built on a restrained palette and carefully placed natural light.",
    services: ["Interior Design"],
    featured: false,
  },
  {
    id: "krushnam-gruham-07",
    title: "Krushnam Gruham 07",
    location: "Ahmedabad, Gujarat",
    category: "residential",
    description:
      "A home designed around its central living volume, with joinery detailed to suit the family's routine.",
    services: ["Interior Design", "Turnkey Projects"],
    featured: false,
  },
  {
    id: "pahal-83-unit-11",
    title: "Pahal 83 — Unit 11",
    location: "Ahmedabad, Gujarat",
    category: "residential",
    description:
      "An apartment interior planned for compact living without giving up on generosity or light.",
    services: ["Interior Design"],
    featured: false,
  },
  {
    id: "dr-prakash-residence",
    title: "Dr. Prakash Residence",
    location: "Ahmedabad, Gujarat",
    category: "residential",
    description:
      "A private residence developed from architectural layout through to interior finish.",
    services: ["Architectural Design", "Interior Design"],
    featured: false,
  },
  {
    id: "bhemat-jewellers",
    title: "Bhemat Jewellers",
    location: "Ahmedabad, Gujarat",
    category: "commercial",
    year: 2022,
    description:
      "A retail interior for a jewellery showroom, built around display, lighting and the customer's route through the store.",
    services: ["Interior Design", "Turnkey Projects"],
    featured: false,
  },
];

export const projects: Project[] = META.map((meta) => ({
  ...meta,
  images: projectImages[meta.id] ?? [],
}));

export const filterCategories: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
];

export type { ProjectImage };
