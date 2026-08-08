import Link from "next/link";
import { navLinks, siteConfig, socialLinks } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Col 1: Studio Info & Architect */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <p className="font-display text-2xl tracking-wide text-ink font-semibold">
                {siteConfig.name}
              </p>
            </Link>
            <p className="label mt-2 text-gold tracking-widest">{siteConfig.tagline}</p>

            <p className="mt-5 text-sm leading-relaxed text-ink-soft max-w-sm">
              An Ahmedabad-based architecture and interior design studio crafting luxury
              residential and commercial spaces with turnkey execution precision.
            </p>

            <div className="mt-6 border-l-2 border-gold/40 pl-4 py-1">
              <p className="label text-xs text-ink-faint">Principal Architect</p>
              <p className="font-display text-lg text-ink">{siteConfig.founder}</p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-2">
            <p className="label text-ink mb-4 font-semibold">Explore</p>
            <nav aria-label="Footer Navigation" className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="label text-ink-soft transition-colors hover:text-gold w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Studio Location */}
          <div className="lg:col-span-3">
            <p className="label text-ink mb-4 font-semibold">Studio Location</p>
            <p className="text-sm leading-relaxed text-ink-soft mb-3">
              {siteConfig.location}
            </p>
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label text-gold hover:underline inline-flex items-center gap-1 text-xs"
            >
              View on Google Maps <span aria-hidden>↗</span>
            </a>
            <div className="mt-4 pt-3 border-t border-line/50">
              <p className="label text-xs text-ink-faint">Studio Hours</p>
              <p className="text-xs text-ink-soft mt-1">{siteConfig.hours}</p>
            </div>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="lg:col-span-3">
            <p className="label text-ink mb-4 font-semibold">Connect & Inquire</p>
            <div className="flex flex-col gap-2 text-sm text-ink-soft mb-6">
              <a href={siteConfig.phoneHref} className="hover:text-gold transition-colors">
                Phone: {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-gold transition-colors">
                Email: {siteConfig.email}
              </a>
              <a
                href={siteConfig.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                Instagram: {siteConfig.instagramHandle}
              </a>
            </div>

            <p className="label text-ink mb-3 font-semibold text-xs">Social Channels</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-xs text-ink-soft transition-colors hover:text-gold"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-xs text-ink-faint">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="label text-xs text-ink-faint">
            Architecture · Interior Design · Turnkey Execution · Ahmedabad, Gujarat
          </p>
        </div>
      </div>
    </footer>
  );
}
