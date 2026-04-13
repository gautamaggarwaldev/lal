import SkeletonCard from '@/components/ui/SkeletonCard';

export default function CategoryLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="h-[350px] sm:h-[400px] skeleton-shimmer" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter bar skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-5 w-32 skeleton-shimmer rounded" />
          <div className="flex gap-3">
            <div className="h-10 w-40 skeleton-shimmer rounded" />
            <div className="h-10 w-24 skeleton-shimmer rounded" />
          </div>
        </div>

        {/* Product grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
