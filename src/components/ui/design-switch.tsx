"use client";

import { useDesign, type Design } from "@/components/providers/design-provider";

interface DesignSwitchProps {
  /** `light` renders the switch for placement over dark imagery (the hero). */
  tone?: "default" | "light";
}

const OPTIONS: { value: Design; label: string }[] = [
  { value: "classic", label: "Classic" },
  { value: "editorial", label: "Editorial" },
];

/**
 * Segmented pair rather than a sliding toggle: unlike Light/Dark, the two
 * design names aren't self-evident opposites, so both stay legible with the
 * active one marked.
 */
export function DesignSwitch({ tone = "default" }: DesignSwitchProps) {
  const { design, setDesign } = useDesign();
  const onDark = tone === "light";

  return (
    <div
      role="radiogroup"
      aria-label="Site design"
      className="flex items-center border"
      style={{ borderColor: onDark ? "rgba(255,255,255,0.35)" : "var(--line-strong)" }}
    >
      {OPTIONS.map((option) => {
        const isActive = design === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setDesign(option.value)}
            className={`label px-3 py-2 text-[0.5625rem] transition-colors duration-300 ${
              isActive
                ? "bg-gold text-surface-strong"
                : onDark
                  ? "text-white/60 hover:text-white"
                  : "text-ink-faint hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
