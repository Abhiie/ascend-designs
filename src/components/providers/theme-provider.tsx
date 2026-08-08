"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const STORAGE_KEY = "ascend-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Runs before hydration (see layout.tsx) so the correct theme is painted
// on the very first frame — no light-to-dark flash on load.
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("${STORAGE_KEY}");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

const listeners = new Set<() => void>();

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

// Used for SSR and the initial hydration pass so React's client output
// matches the server HTML exactly (both always render as "light"). Once
// hydrated, useSyncExternalStore re-reads getSnapshot() and reconciles to
// the real theme the inline bootstrap script already painted.
function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable (private mode) — theme still applies for this session
  }
  listeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    applyTheme(getSnapshot() === "light" ? "dark" : "light");
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
