"use client";

import { useEffect, useMemo, useState } from "react";

interface SplitFlapBoardProps {
  words: string[];
  /** How long a fully-settled word holds before flipping to the next one. */
  holdMs?: number;
  /** Duration of a single tile's flip. */
  flipMs?: number;
  className?: string;
}

// A single character tile. The bottom layer already holds the incoming
// letter; the top flap covers it at rest and rotates away on its hinge to
// reveal what's underneath — the classic airport-board mechanism, simplified
// to one flap per tile rather than the full two-half hinge.
//
// Both layers stay mounted for the tile's whole lifetime, even while blank
// (both current and next are a space) — only their visible chrome toggles.
// Unmounting the flap on a blank↔letter transition would give the CSS
// transition no previous frame to animate from, so the incoming letter would
// just snap into place instead of flipping in.
function FlapChar({
  current,
  next,
  flipping,
  delayMs,
  flipMs,
}: {
  current: string;
  next: string;
  flipping: boolean;
  delayMs: number;
  flipMs: number;
}) {
  const blank = current === " " && next === " ";
  const chrome = blank
    ? "border-transparent bg-transparent shadow-none"
    : "border-black/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";

  return (
    <div
      className="relative flex h-[1.7em] w-[1.15em] shrink-0 items-center justify-center"
      style={{ perspective: "240px" }}
    >
      {/* Bottom layer — the letter this tile is flipping toward */}
      <span
        className={`absolute inset-0 flex items-center justify-center rounded-[3px] border bg-gradient-to-b from-[#211e17] to-[#121009] ${chrome}`}
      >
        {next}
      </span>

      {/* Top flap — covers the tile at rest, rotates away to reveal the letter beneath */}
      <span
        className={`absolute inset-0 flex items-center justify-center overflow-hidden rounded-[3px] border bg-gradient-to-b from-[#26221a] to-[#16130c] ${chrome}`}
        style={{
          transformOrigin: "bottom center",
          backfaceVisibility: "hidden",
          transform: flipping ? "rotateX(-100deg)" : "rotateX(0deg)",
          transition: flipping
            ? `transform ${flipMs}ms ease-in ${delayMs}ms`
            : "none",
        }}
      >
        {current}
      </span>

      {/* Static hinge crease, for the two-piece-tile look */}
      {!blank && (
        <span className="pointer-events-none absolute inset-x-[2px] top-1/2 h-px bg-black/50" />
      )}
    </div>
  );
}

export function SplitFlapBoard({
  words,
  holdMs = 2800,
  flipMs = 480,
  className = "",
}: SplitFlapBoardProps) {
  const width = useMemo(() => Math.max(...words.map((w) => w.length)), [words]);
  const padded = useMemo(
    () =>
      words.map((w) => {
        const upper = w.toUpperCase();
        const pad = width - upper.length;
        const left = Math.floor(pad / 2);
        const right = pad - left;
        return " ".repeat(left) + upper + " ".repeat(right);
      }),
    [words, width]
  );

  const [wordIndex, setWordIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let holdTimer: ReturnType<typeof setTimeout>;
    let flipTimer: ReturnType<typeof setTimeout>;

    function cycle() {
      holdTimer = setTimeout(() => {
        setFlipping(true);
        flipTimer = setTimeout(() => {
          setWordIndex((i) => (i + 1) % padded.length);
          setFlipping(false);
          cycle();
        }, flipMs + width * 22);
      }, holdMs);
    }

    cycle();
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(flipTimer);
    };
  }, [padded.length, holdMs, flipMs, width]);

  const currentWord = padded[wordIndex];
  const nextWord = padded[(wordIndex + 1) % padded.length];

  return (
    <div
      aria-hidden
      className={`inline-flex items-center gap-[3px] rounded-md border border-white/10 bg-black/40 p-2 shadow-[0_2px_12px_rgba(0,0,0,0.35)] backdrop-blur-sm font-sans text-base font-semibold uppercase tracking-normal text-gold sm:text-lg ${className}`}
    >
      {Array.from({ length: width }).map((_, i) => (
        <FlapChar
          key={i}
          current={currentWord[i]}
          next={flipping ? nextWord[i] : currentWord[i]}
          flipping={flipping}
          delayMs={i * 22}
          flipMs={flipMs}
        />
      ))}
    </div>
  );
}
