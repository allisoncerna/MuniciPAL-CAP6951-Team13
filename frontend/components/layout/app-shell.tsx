import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-page-glow">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <Sidebar />
        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-h-[calc(100vh-2rem)] rounded-[2rem] border border-slate-200/70 bg-white shadow-soft">{children}</div>
        </main>
      </div>
    </div>
  );
}