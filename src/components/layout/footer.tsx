import Link from "next/link";
import { navLinks, siteConfig, socialLinks } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="font-display text-2xl text-ink">{siteConfig.name}</p>
            <p className="label mt-3 text-ink-faint">{siteConfig.tagline}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="label text-ink-soft transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-ink-soft transition-colors hover:text-gold"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-ink-faint">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p className="label text-ink-faint">
            Architecture · Interiors · Turnkey Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
