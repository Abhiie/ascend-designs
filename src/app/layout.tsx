import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { LoaderProvider, bootScript } from "@/components/loader/loader";
import { FloatingContact } from "@/components/ui/floating-contact";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface text-ink">
        <Script
          id="ascend-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <Script
          id="ascend-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: bootScript }}
        />
        <ThemeProvider>
          <LoaderProvider>
            <SmoothScrollProvider>
              <CustomCursor />
              <Nav />
              {children}
              <Footer />
              <FloatingContact />
            </SmoothScrollProvider>
          </LoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
