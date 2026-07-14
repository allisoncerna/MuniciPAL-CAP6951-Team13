import type { LucideIcon } from "lucide-react";
import { FileText, FolderOpen, Landmark, ShieldCheck, Sparkles, Wrench } from "lucide-react";

export type RepositoryDocument = {
  id: string;
  name: string;
  type: string;
  department: string;
  uploadedAt: string;
  size: string;
  status: "Active" | "Review" | "Archived";
  tags: string[];
};

export type RepositorySortKey = "newest" | "oldest" | "name-asc" | "name-desc";

export type RepositoryFilterKey = "All" | "Active" | "Review" | "Archived";

export const repositorySortOptions: Array<{ label: string; value: RepositorySortKey }> = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
  { label: "Name A-Z", value: "name-asc" },
  { label: "Name Z-A", value: "name-desc" }
];

export const repositoryFilterOptions: RepositoryFilterKey[] = ["All", "Active", "Review", "Archived"];

export const repositoryDocuments: RepositoryDocument[] = [
  {
    id: "grant-agreement-2025",
    name: "Grant Agreement 2025",
    type: "Grant",
    department: "Community Development",
    uploadedAt: "2025-01-15",
    size: "2.4 MB",
    status: "Active",
    tags: ["Grant", "Funding", "Compliance"]
  },
  {
    id: "municipal-service-guide",
    name: "Municipal Service Guide",
    type: "Policy",
    department: "Administration",
    uploadedAt: "2024-12-10",
    size: "5.1 MB",
    status: "Active",
    tags: ["Policy", "Operations"]
  },
  {
    id: "annual-compliance-report",
    name: "Annual Compliance Report 2024",
    type: "Report",
    department: "Public Works",
    uploadedAt: "2025-02-01",
    size: "3.8 MB",
    status: "Review",
    tags: ["Report", "Audit"]
  },
  {
    id: "parks-recreation-manual",
    name: "Parks & Recreation Manual",
    type: "Handbook",
    department: "Parks & Recreation",
    uploadedAt: "2024-11-20",
    size: "6.2 MB",
    status: "Active",
    tags: ["Handbook", "Operations"]
  },
  {
    id: "transportation-policy-framework",
    name: "Transportation Policy Framework",
    type: "Policy",
    department: "Public Works",
    uploadedAt: "2024-10-05",
    size: "1.9 MB",
    status: "Archived",
    tags: ["Policy", "Infrastructure"]
  },
  {
    id: "community-engagement-report",
    name: "Community Engagement Report Q1 2025",
    type: "Report",
    department: "Community Development",
    uploadedAt: "2025-04-05",
    size: "2.7 MB",
    status: "Review",
    tags: ["Report", "Community"]
  }
];

export const repositoryHighlights: Array<{
  label: string;
  value: string;
  icon: LucideIcon;
}> = [
  { label: "Documents", value: "8", icon: FileText },
  { label: "Active", value: "5", icon: Sparkles },
  { label: "Under Review", value: "2", icon: ShieldCheck },
  { label: "Departments", value: "4", icon: Landmark }
];

export const repositoryRecentTypes = ["Grant", "Policy", "Report", "Handbook", "Reference"];

export const repositoryEmptyState = {
  title: "No documents found",
  description: "Try adjusting the search, sort, or filters to surface a different set of repository documents."
};