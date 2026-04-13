import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 py-10">
      {/* Previous */}
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-4 py-2 font-body text-sm border border-border-linen rounded-sm text-warm-gray hover:border-brand-gold hover:text-brand-gold transition-all duration-200"
          aria-label="Previous page"
        >
          Previous
        </Link>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`w-10 h-10 flex items-center justify-center font-body text-sm rounded-sm transition-all duration-200 ${
            page === currentPage
              ? 'bg-brand-green text-white border border-brand-green'
              : 'border border-border-linen text-warm-gray hover:border-brand-gold hover:text-brand-gold'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
          aria-label={`Page ${page}`}
        >
          {page}
        </Link>
      ))}

      {/* Next */}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-2 font-body text-sm border border-border-linen rounded-sm text-warm-gray hover:border-brand-gold hover:text-brand-gold transition-all duration-200"
          aria-label="Next page"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
