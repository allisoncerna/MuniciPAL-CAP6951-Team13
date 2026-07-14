import { FileText, ShieldCheck, Sparkles } from "lucide-react";

export const dashboardFeatures = [
  {
    title: "Generate Service Descriptions",
    description: "Create comprehensive service descriptions based on municipal policies and guidelines.",
    icon: Sparkles
  },
  {
    title: "Create Compliance Summaries",
    description: "Produce detailed compliance reports aligned with municipal regulations and grant requirements.",
    icon: ShieldCheck
  },
  {
    title: "Produce Public Reports",
    description: "Generate clear, accessible reports for residents and stakeholders using official sources.",
    icon: FileText
  }
] as const;

export const dashboardStats = [
  { value: "85%", label: "Time Saved" },
  { value: "100%", label: "Policy Compliant" },
  { value: "24/7", label: "Available" }
] as const;