import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "success" | "warning" | "muted";
};

const tones = {
  default: "bg-brand-50 text-brand-700 ring-brand-100",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  warning: "bg-amber-50 text-amber-700 ring-amber-100",
  muted: "bg-slate-100 text-slate-600 ring-slate-200"
};

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1", tones[tone], className)} {...props} />;
}