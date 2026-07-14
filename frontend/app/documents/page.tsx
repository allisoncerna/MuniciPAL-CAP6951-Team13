import { AppShell } from "@/components/layout/app-shell";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";

export default function DocumentsPage() {
  return (
    <AppShell>
      <div className="px-6 py-6 sm:px-10 sm:py-10 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <SectionHeader
            eyebrow="Generated Documents"
            title="Review draft outputs"
            description="Use this space for saved drafts, exports, and generated municipal documents in later iterations."
          />
          <EmptyState
            title="Document viewer shell ready"
            description="The page foundation is ready for a future split-view document viewer and source traceability panel."
          />
        </div>
      </div>
    </AppShell>
  );
}