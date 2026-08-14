import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/providers/theme-provider";
import { DesignProvider, designInitScript } from "@/components/providers/design-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { LoaderProvider, bootScript } from "@/components/loader/loader";
import { FloatingContact } from "@/components/ui/floating-contact";
import { ContactModal } from "@/components/ui/contact-modal";


const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ascend Designs | Architecture & Interior Design Studio in Ahmedabad",
  description:
    "Ascend Designs is an Ahmedabad-based architecture and interior design studio creating thoughtful residential and commercial spaces through architecture, interiors and turnkey solutions.",
  openGraph: {
    title: "Ascend Designs | Architecture & Interior Design Studio in Ahmedabad",
    description:
      "Ascend Designs is an Ahmedabad-based architecture and interior design studio creating thoughtful residential and commercial spaces through architecture, interiors and turnkey solutions.",
    siteName: "Ascend Designs",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface text-ink">
        {/* Sets data-theme from storage before Next's own modules run, so the
            correct palette is painted on the first frame. A bare <script> tag
            works during SSR but React refuses to execute one it renders on the
            client, which is what the console was complaining about. */}
        <Script
          id="ascend-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        {/* Same reasoning as the theme: the design swaps the display face as
            well as the palette, so a late swap reflows the whole page. */}
        <Script
          id="ascend-design-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: designInitScript }}
        />
        {/* Pins to the top and locks scroll before the first paint — the
            loader's effect only runs after hydration, by which point the
            restored scroll offset and the scrollbar have already shown. */}
        <Script
          id="ascend-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: bootScript }}
        />
        <ThemeProvider>
          <DesignProvider>
            {/* LoaderProvider sits above the smooth-scroll and cursor layers so
                both can stay dormant until the intro is done — neither has any
                job while the doors are closed, and their per-frame work is what
                made the intro stutter. */}
            <LoaderProvider>
              <SmoothScrollProvider>
                <CustomCursor />
                <Nav />
                {children}
                <Footer />
                <FloatingContact />
                <ContactModal />
              </SmoothScrollProvider>
            </LoaderProvider>
          </DesignProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
