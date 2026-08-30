export type ProjectCategory =
  | "residential"
  | "commercial"
  | "interiors"
  | "architecture"
  | "turnkey";

export type ProjectLayout = "horizontal" | "portrait" | "full" | "compact";

export interface Project {
  id: string;
  title: string;
  location: string;
  category: ProjectCategory;
  year: number;
  description: string;
  coverImage: string;
  tone: 0 | 1 | 2 | 3;
  /** Hero / cover image — first photo of the project */
  image?: string;
  /** All photos for this project */
  gallery: string[];
  featured: boolean;
  services: string[];
  layout: ProjectLayout;
}

// ─── Real client projects ────────────────────────────────────────────────────
// All images are served from /public/projects/ as static assets.

export const projects: Project[] = [
  {
    id: "tapan-bhai-ahmedabad",
    title: "Tapan Residence",
    location: "Ahmedabad, Gujarat",
    category: "residential",
    year: 2025,
    description:
      "A warm, layered home interior composed around natural wood, marble flooring and bespoke ceiling details.",
    coverImage: "Tapan Residence — master bedroom",
    tone: 0,
    image: "/projects/tapan bhai Ahmadava/07.webp",
    gallery: [
      "/projects/tapan bhai Ahmadava/07.webp",
      "/projects/tapan bhai Ahmadava/04.webp",
      "/projects/tapan bhai Ahmadava/02.webp",
      "/projects/tapan bhai Ahmadava/03.webp",
      "/projects/tapan bhai Ahmadava/212 copy.webp",
      "/projects/tapan bhai Ahmadava/314 copy.webp",
      "/projects/tapan bhai Ahmadava/312 copy.webp",
    ],
    featured: true,
    services: ["Interior Design", "Turnkey Projects"],
    layout: "horizontal",
  },
  {
    id: "rajdhani-mukesh-bhai",
    title: "Rajdhani Residence",
    location: "Ahmedabad, Gujarat",
    category: "interiors",
    year: 2024,
    description:
      "An expansive residential interior with rich material detailing — stone, timber and sculpted ceilings throughout.",
    coverImage: "Rajdhani Residence — living area",
    tone: 1,
    image: "/projects/rajdhani mukesh bhai/1_.webp",
    gallery: [
      "/projects/rajdhani mukesh bhai/1_.webp",
      "/projects/rajdhani mukesh bhai/2_.webp",
      "/projects/rajdhani mukesh bhai/3_.webp",
      "/projects/rajdhani mukesh bhai/4_.webp",
      "/projects/rajdhani mukesh bhai/5_.webp",
      "/projects/rajdhani mukesh bhai/105 copy.webp",
      "/projects/rajdhani mukesh bhai/106 copy.webp",
      "/projects/rajdhani mukesh bhai/107 copy.webp",
      "/projects/rajdhani mukesh bhai/108 copy.webp",
      "/projects/rajdhani mukesh bhai/109 copy.webp",
      "/projects/rajdhani mukesh bhai/110 copy.webp",
      "/projects/rajdhani mukesh bhai/201 copy.webp",
      "/projects/rajdhani mukesh bhai/202 copy.webp",
    ],
    featured: false,
    services: ["Interior Design", "3D Visualisation"],
    layout: "portrait",
  },
  {
    id: "alayam-madhuvan",
    title: "Alayam Madhuvan",
    location: "Gujarat",
    category: "residential",
    year: 2024,
    description:
      "A serene residential project with clean geometric forms, soft plaster walls and warm accent lighting.",
    coverImage: "Alayam Madhuvan — living space",
    tone: 2,
    image: "/projects/alayam madhuvan/003_.webp",
    gallery: [
      "/projects/alayam madhuvan/003_.webp",
      "/projects/alayam madhuvan/005_.webp",
      "/projects/alayam madhuvan/006_.webp",
      "/projects/alayam madhuvan/1_.webp",
      "/projects/alayam madhuvan/1_ (2).webp",
      "/projects/alayam madhuvan/2_.webp",
      "/projects/alayam madhuvan/2_ (2).webp",
      "/projects/alayam madhuvan/25_.webp",
      "/projects/alayam madhuvan/3_.webp",
      "/projects/alayam madhuvan/3_ (2).webp",
      "/projects/alayam madhuvan/4_.webp",
    ],
    featured: false,
    services: ["Interior Design", "Turnkey Projects"],
    layout: "full",
  },
  {
    id: "dr-prakash-bhai",
    title: "Dr. Prakash Residence",
    location: "Ahmedabad, Gujarat",
    category: "residential",
    year: 2024,
    description:
      "A refined residence designed for a medical professional — calm, considered spaces with high material quality.",
    coverImage: "Dr. Prakash Residence — foyer",
    tone: 3,
    image: "/projects/DR.Prakash bhai/01_.webp",
    gallery: [
      "/projects/DR.Prakash bhai/01_.webp",
      "/projects/DR.Prakash bhai/05_.webp",
      "/projects/DR.Prakash bhai/06_.webp",
      "/projects/DR.Prakash bhai/20_.webp",
      "/projects/DR.Prakash bhai/21_.webp",
      "/projects/DR.Prakash bhai/22_.webp",
      "/projects/DR.Prakash bhai/302_.webp",
      "/projects/DR.Prakash bhai/303_.webp",
    ],
    featured: false,
    services: ["Interior Design", "AD Living"],
    layout: "compact",
  },
  {
    id: "krushnam-gruham",
    title: "Krushnam Gruham",
    location: "Gujarat",
    category: "residential",
    year: 2023,
    description:
      "A family home with devotional character — traditional influences expressed through contemporary spatial design.",
    coverImage: "Krushnam Gruham — main hall",
    tone: 0,
    image: "/projects/KRUSHNAM GRUHAM 07 BAKA BHAI/001_.webp",
    gallery: [
      "/projects/KRUSHNAM GRUHAM 07 BAKA BHAI/001_.webp",
      "/projects/KRUSHNAM GRUHAM 07 BAKA BHAI/002_.webp",
      "/projects/KRUSHNAM GRUHAM 07 BAKA BHAI/003_.webp",
      "/projects/KRUSHNAM GRUHAM 07 BAKA BHAI/004_.webp",
      "/projects/KRUSHNAM GRUHAM 07 BAKA BHAI/005_.webp",
      "/projects/KRUSHNAM GRUHAM 07 BAKA BHAI/006_.webp",
    ],
    featured: false,
    services: ["Interior Design", "Turnkey Projects"],
    layout: "compact",
  },
  {
    id: "shreenathji-ashiyana",
    title: "Shreenathji Ashiyana",
    location: "Gujarat",
    category: "residential",
    year: 2023,
    description:
      "A devotion-inspired home with intricate ceiling work, rich colour and crafted woodwork throughout.",
    coverImage: "Shreenathji Ashiyana — prayer room",
    tone: 1,
    image: "/projects/SHREENATHJI ASHIYANA/001.webp",
    gallery: [
      "/projects/SHREENATHJI ASHIYANA/001.webp",
      "/projects/SHREENATHJI ASHIYANA/002.webp",
      "/projects/SHREENATHJI ASHIYANA/003.webp",
    ],
    featured: false,
    services: ["Interior Design"],
    layout: "compact",
  },
  {
    id: "pahal-83",
    title: "Pahal 83",
    location: "Ahmedabad, Gujarat",
    category: "interiors",
    year: 2023,
    description:
      "A compact modern interior executed with precision — maximising space, light and material value.",
    coverImage: "Pahal 83 — living & dining",
    tone: 2,
    image: "/projects/PAHAL83 11/001.webp",
    gallery: [
      "/projects/PAHAL83 11/001.webp",
      "/projects/PAHAL83 11/002.webp",
      "/projects/PAHAL83 11/003.webp",
      "/projects/PAHAL83 11/01.webp",
      "/projects/PAHAL83 11/02.webp",
      "/projects/PAHAL83 11/03.webp",
      "/projects/PAHAL83 11/04.webp",
      "/projects/PAHAL83 11/05.webp",
      "/projects/PAHAL83 11/1.webp",
      "/projects/PAHAL83 11/2.webp",
    ],
    featured: false,
    services: ["Interior Design"],
    layout: "horizontal",
  },
  {
    id: "bhemat-jweler",
    title: "Bhemat Jewellers",
    location: "Gujarat",
    category: "commercial",
    year: 2022,
    description:
      "A premium jewellery showroom interior — refined material palette, display lighting and crafted showcases.",
    coverImage: "Bhemat Jewellers — showroom",
    tone: 3,
    image: "/projects/BHEMAT JWELER/2022_09_17_07_22_IMG_1654.webp",
    gallery: [
      "/projects/BHEMAT JWELER/2022_09_17_07_22_IMG_1654.webp",
      "/projects/BHEMAT JWELER/2022_09_17_07_22_IMG_1655.webp",
      "/projects/BHEMAT JWELER/2022_09_17_07_32_IMG_1661.webp",
      "/projects/BHEMAT JWELER/2022_10_07_23_38_IMG_2260.webp",
      "/projects/BHEMAT JWELER/2022_10_07_23_39_IMG_2261.webp",
      "/projects/BHEMAT JWELER/2022_10_07_23_39_IMG_2262.webp",
      "/projects/BHEMAT JWELER/2022_10_07_23_40_IMG_2265.webp",
      "/projects/BHEMAT JWELER/2022_10_07_23_40_IMG_2266.webp",
    ],
    featured: false,
    services: ["Interior Design", "Turnkey Projects"],
    layout: "portrait",
  },
];
