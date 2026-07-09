import { Building2, FileText, MessageSquareText, ShieldCheck, Sparkles, Target, Users } from "lucide-react";

export const wizardSteps = [
  { id: "document-type", label: "Document Type", icon: FileText },
  { id: "department", label: "Department", icon: Building2 },
  { id: "audience", label: "Audience", icon: Users },
  { id: "instructions", label: "Instructions", icon: MessageSquareText },
  { id: "review", label: "Review & Generate", icon: ShieldCheck }
] as const;

export const documentTypes = [
  {
    id: "service-description",
    title: "Service Description",
    description: "Create detailed descriptions of municipal services for public and internal use.",
    icon: Sparkles
  },
  {
    id: "compliance-summary",
    title: "Compliance Summary",
    description: "Generate compliance reports aligned with regulations and grant requirements.",
    icon: ShieldCheck
  },
  {
    id: "public-report",
    title: "Public Report",
    description: "Produce clear, accessible reports for residents and stakeholders.",
    icon: FileText
  }
] as const;

export const departmentOptions = ["Parks & Recreation", "Community Development", "Public Works", "Administration", "Public Safety"];

export const audienceOptions = ["Residents", "Internal Staff", "City Council", "Grant Agency", "General Public"];
