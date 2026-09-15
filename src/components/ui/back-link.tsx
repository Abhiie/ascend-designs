import Link from "next/link";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="label mb-10 inline-flex items-center gap-2 text-ink-faint transition-colors duration-300 hover:text-gold"
    >
      <span aria-hidden>←</span> {label}
    </Link>
  );
}
