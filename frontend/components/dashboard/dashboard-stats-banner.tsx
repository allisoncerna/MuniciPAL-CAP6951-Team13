import { dashboardStats } from "@/components/dashboard/dashboard-data";

export function DashboardStatsBanner() {
  return (
    <section className="rounded-[2rem] border border-brand-200 bg-brand-500 px-8 py-8 text-white shadow-soft sm:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Why Use MuniciPAL?</h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-blue-50 sm:text-base">
          Using AI-powered generation with exisitng policies and guidelines, MuniciPAL helps local governments save time while creating compliant and consistent municipal documents.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {dashboardStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-5 backdrop-blur-sm">
              <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-sm text-blue-50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}