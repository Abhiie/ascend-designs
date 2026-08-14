"use client";

import { useDesign } from "@/components/providers/design-provider";
import { Hero } from "@/components/sections/hero";
import { EditorialHero } from "@/components/sections/editorial-hero";

/**
 * The hero is the one place the two designs differ structurally rather than
 * just in palette and type — classic is a full-bleed photograph, editorial is
 * type-first on the page ground. Everything below the fold is shared and
 * restyled by the `data-design` tokens instead.
 */
export function HeroSwitch() {
  const { design } = useDesign();
  return design === "editorial" ? <EditorialHero /> : <Hero />;
}
