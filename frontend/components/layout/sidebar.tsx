"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, FolderKanban, LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/wizard", label: "Generate Document", icon: FileText },
  { href: "/repository", label: "Document Repository", icon: FolderKanban },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 border-r border-slate-200/80 bg-brand-900 px-4 py-5 text-white lg:flex lg:flex-col">
      <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 shadow-inner backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/10">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-semibold leading-none">MuniciPAL</div>
            <p className="mt-1 text-xs text-blue-100">Local Government Assistant</p>
          </div>
        </div>
      </div>

      <nav className="mt-8 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                active ? "bg-brand-500 text-white shadow-soft" : "text-blue-100 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-xs text-blue-100">
        <p className="font-medium text-white">© 2026 MuniciPAL</p>
        <p className="mt-1">Version 1.0.0</p>
      </div>
    </aside>
  );
}