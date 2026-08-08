"use client";

import { useTheme } from "@/components/providers/theme-provider";

interface ThemeSwitchProps {
  /** `light` renders the switch for placement over dark imagery (the hero). */
  tone?: "default" | "light";
}

export function ThemeSwitch({ tone = "default" }: ThemeSwitchProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const onDark = tone === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={toggleTheme}
      className="group flex items-center gap-2.5 focus:outline-none"
    >
      <span
        className={`label transition-colors ${
          onDark ? "text-white/60 group-hover:text-white" : "text-ink-faint group-hover:text-ink"
        }`}
      >
        Light
      </span>
      <span
        className="relative h-[18px] w-[42px] rounded-full border"
        style={{
          borderColor: onDark ? "rgba(255,255,255,0.35)" : "var(--line-strong)",
          backgroundColor: onDark ? "rgba(255,255,255,0.12)" : "var(--surface-alt)",
        }}
      >
        <span
          className="absolute top-1/2 h-[12px] w-[12px] -translate-y-1/2 rounded-full bg-gold transition-[left] duration-500 ease-out"
          style={{ left: isDark ? "calc(100% - 15px)" : "3px" }}
        />
      </span>
      <span
        className={`label transition-colors ${
          onDark ? "text-white/60 group-hover:text-white" : "text-ink-faint group-hover:text-ink"
        }`}
      >
        Dark
      </span>
    </button>
  );
}
