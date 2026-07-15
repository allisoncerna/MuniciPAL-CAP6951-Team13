import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHero() {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-panel sm:p-12">
      <div className="mx-auto max-w-3xl text-center">

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">MuniciPAL</h1>
        <p className="mt-3 text-lg font-medium text-slate-600 sm:text-xl">Local Government Assistant, Powered by AI</p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Generate municipal documents with existing policies, reports, and service descriptions
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