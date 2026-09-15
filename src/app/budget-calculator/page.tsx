import type { Metadata } from "next";
import { BudgetCalculator } from "@/components/sections/budget-calculator";
import { BackLink } from "@/components/ui/back-link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Turnkey Budget Calculator | ${siteConfig.name}`,
  description:
    "Get an instant, indicative budget range for your turnkey interior project with Ascend Designs, based on area and finish level.",
};

export default function BudgetCalculatorPage() {
  return (
    <main className="flex-1 px-5 pb-28 pt-28 sm:px-8 sm:pt-36 lg:px-12 lg:pt-44">
      <div className="mx-auto max-w-[1100px]">
        <BackLink href="/#services" label="Back to Services" />
        <BudgetCalculator />
      </div>
    </main>
  );
}
