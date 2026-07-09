import { Card, CardContent } from "@/components/ui/card";
import { dashboardFeatures } from "@/components/dashboard/dashboard-data";

export function DashboardFeatureCards() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {dashboardFeatures.map((feature) => {
        const Icon = feature.icon;
        return (
          <Card key={feature.title}>
            <CardContent>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{feature.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}