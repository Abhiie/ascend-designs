import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // About/Services/FAQ/Contact are now sections on the one-page home instead
  // of their own routes — send any old links or bookmarks to the matching
  // section rather than 404ing.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/faq", destination: "/#faq", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
