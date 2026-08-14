"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Design = "classic" | "editorial";

interface DesignContextValue {
  design: Design;
  toggleDesign: () => void;
  setDesign: (design: Design) => void;
}

const STORAGE_KEY = "ascend-design";

const DesignContext = createContext<DesignContextValue | null>(null);

// Runs before hydration (see layout.tsx) so the chosen design is painted on
// the very first frame — otherwise every load flashes the classic palette
// before swapping, which is worse than the theme flash because the display
// font changes too and the whole page reflows.
export const designInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("${STORAGE_KEY}");
    document.documentElement.setAttribute(
      "data-design",
      stored === "editorial" ? "editorial" : "classic"
    );
  } catch (e) {
    document.documentElement.setAttribute("data-design", "classic");
  }
})();
`;

const listeners = new Set<() => void>();

function getSnapshot(): Design {
  return document.documentElement.getAttribute("data-design") === "editorial"
    ? "editorial"
    : "classic";
}

// SSR and the first hydration pass both render "classic" so the server and
// client trees match; useSyncExternalStore then reconciles to whatever the
// bootstrap script already painted.
function getServerSnapshot(): Design {
  return "classic";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function applyDesign(design: Design) {
  document.documentElement.setAttribute("data-design", design);
  try {
    window.localStorage.setItem(STORAGE_KEY, design);
  } catch {
    // localStorage unavailable (private mode) — choice still holds this session
  }
  listeners.forEach((listener) => listener());
}

export function DesignProvider({ children }: { children: ReactNode }) {
  const design = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setDesign = useCallback((next: Design) => applyDesign(next), []);
  const toggleDesign = useCallback(() => {
    applyDesign(getSnapshot() === "classic" ? "editorial" : "classic");
  }, []);

  const value = useMemo(
    () => ({ design, toggleDesign, setDesign }),
    [design, toggleDesign, setDesign]
  );

  return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>;
}

export function useDesign() {
  const ctx = useContext(DesignContext);
  if (!ctx) throw new Error("useDesign must be used within DesignProvider");
  return ctx;
}
