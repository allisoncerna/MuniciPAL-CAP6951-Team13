import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHero() {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-panel sm:p-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 ring-1 ring-brand-100">
          <Sparkles className="h-4 w-4" />
          AI-Powered Document Generation
        </p>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">MuniciPAL</h1>
        <p className="mt-3 text-lg font-medium text-slate-600 sm:text-xl">AI Assistant for Municipal Staff</p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Generate compliant municipal documents using your department&apos;s policies, reports, and service descriptions.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/wizard">
              Start Document Wizard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/repository">Manage Documents</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}