export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-sm overflow-hidden" role="status" aria-label="Loading product">
      {/* Image skeleton */}
      <div className="aspect-[3/4] skeleton-shimmer" />
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 skeleton-shimmer rounded" />
        <div className="h-5 w-3/4 skeleton-shimmer rounded" />
        <div className="h-4 w-1/2 skeleton-shimmer rounded" />
        <div className="h-4 w-1/3 skeleton-shimmer rounded" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
