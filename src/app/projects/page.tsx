import type { Metadata } from "next";
import { PhotoGridWall } from "@/components/sections/photo-grid-wall";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Selected Projects | ${siteConfig.name}`,
  description:
    "Browse every project photo from Ascend Designs, filterable by client — luxury residential, commercial and turnkey work across Ahmedabad and Gujarat.",
};

export default function ProjectsPage() {
  return (
    <main className="flex-1 px-5 pb-28 pt-28 sm:px-8 sm:pt-36 lg:px-12 lg:pt-44">
      <div className="mx-auto max-w-[1600px]">
        <PhotoGridWall />
      </div>
    </main>
  );
}
