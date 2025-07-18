"use client";
type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPages(page: number, totalPages: number) {
  const pages: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }
  pages.push(1);
  if (page > 4) pages.push("...");
  for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
    pages.push(i);
  }
  if (page < totalPages - 3) pages.push("...");
  pages.push(totalPages);
  return pages;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = getPages(page, totalPages);

  return (
    <nav className="flex items-center gap-2 justify-center mt-6" aria-label="Pagination">
      <button
        className="px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-blue-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        Prev
      </button>
      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={p}
            className={`px-3 py-1 rounded-lg border transition-colors duration-150 font-medium
              ${p === page ? 'bg-[#CD5656] text-[#EAEBD0] shadow-md' : 'bg-white text-[#AF3E3E] border-[#DA6C6C] hover:bg-[#DA6C6C] hover:text-[#EAEBD0]'}
            `}
            onClick={() => onPageChange(p)}
            disabled={p === page}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ) : (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 select-none">...</span>
        )
      )}
      <button
        className="px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-blue-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}