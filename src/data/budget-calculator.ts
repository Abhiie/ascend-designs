// Indicative turnkey rate bands only — not the client's real pricing.
// Swap `minRatePerSqft` / `maxRatePerSqft` for actual figures once the
// client supplies them; every usage reads from here.

export interface FinishTier {
  id: string;
  label: string;
  tagline: string;
  description: string;
  minRatePerSqft: number;
  maxRatePerSqft: number;
}

export const finishTiers: FinishTier[] = [
  {
    id: "essential",
    label: "Essential",
    tagline: "Clean, functional turnkey delivery",
    description: "Quality laminates, standard modular fittings and efficient space planning.",
    minRatePerSqft: 1500,
    maxRatePerSqft: 1900,
  },
  {
    id: "premium",
    label: "Premium",
    tagline: "Elevated materials, custom detailing",
    description: "Veneers, stone accents, custom joinery and considered lighting design.",
    minRatePerSqft: 1900,
    maxRatePerSqft: 2600,
  },
  {
    id: "luxury",
    label: "Luxury",
    tagline: "Bespoke, no-compromise execution",
    description: "Imported marble, solid wood, bespoke AD Living furniture and statement lighting.",
    minRatePerSqft: 2600,
    maxRatePerSqft: 3800,
  },
];

export const AREA_MIN = 300;
export const AREA_MAX = 8000;
export const AREA_DEFAULT = 1500;
export const AREA_STEP = 50;
