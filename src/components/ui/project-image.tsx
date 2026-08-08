import Image from "next/image";

const GRADIENTS = [
  "linear-gradient(135deg, #cbb797 0%, #a3805a 45%, #6f5138 100%)",
  "linear-gradient(135deg, #d9cdb8 0%, #b7a084 50%, #8a6446 100%)",
  "linear-gradient(160deg, #c8bfb0 0%, #9c8f78 55%, #5f5548 100%)",
  "linear-gradient(140deg, #e2d7c3 0%, #b08a52 60%, #6b4d30 100%)",
];

interface ProjectImageProps {
  /** Alt text always; also shown as an on-image caption when no `src` is supplied. */
  label: string;
  tone?: 0 | 1 | 2 | 3;
  className?: string;
  /** Real photo URL. Omit to fall back to a warm gradient placeholder. */
  src?: string;
  priority?: boolean;
  sizes?: string;
}

export function ProjectImage({
  label,
  tone = 0,
  className = "",
  src,
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: ProjectImageProps) {
  if (src) {
    // The inner wrapper is always exactly `relative h-full w-full`, never
    // touched by a caller-supplied className (which may itself contain
    // `absolute`/`inset-0` for outer layout) — so next/image's `fill` always
    // gets a clean positioning context regardless of how it's being used.
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={label}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex h-full w-full items-end overflow-hidden ${className}`}
      style={{ background: GRADIENTS[tone] }}
    >
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 6px)",
        }}
      />
      <span className="label relative z-10 m-4 text-surface-strong/80 sm:m-6">
        {label}
      </span>
    </div>
  );
}
