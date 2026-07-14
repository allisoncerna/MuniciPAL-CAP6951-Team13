import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type DocumentPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function DocumentPagination({ currentPage, totalPages, totalItems, pageSize, onPrevious, onNext }: DocumentPaginationProps) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(totalItems, currentPage * pageSize);

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Showing {start} to {end} of {totalItems} documents
      </p>

      <div className="flex items-center gap-2">
        <Button type="button" variant="secondary" size="sm" onClick={onPrevious} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <span className="px-2 text-sm text-slate-500">
          Page {currentPage} of {totalPages}
        </span>
        <Button type="button" variant="secondary" size="sm" onClick={onNext} disabled={currentPage === totalPages}>
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}