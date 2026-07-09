import { AppShell } from "@/components/layout/app-shell";
import { DashboardFeatureCards } from "@/components/dashboard/dashboard-feature-cards";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { DashboardImagePlaceholder } from "@/components/dashboard/dashboard-image-placeholder";
import { DashboardStatsBanner } from "@/components/dashboard/dashboard-stats-banner";

export default function HomePage() {
  return (
    <AppShell>
      <div className="px-6 py-6 sm:px-10 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-14">
          <DashboardHero />
          <DashboardImagePlaceholder />
          <DashboardFeatureCards />
          <DashboardStatsBanner />
        </div>
      </div>
    </AppShell>
  );
}