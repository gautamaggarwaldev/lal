export default function ProductLoading() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-8 flex gap-2">
          <div className="h-4 w-12 skeleton-shimmer rounded" />
          <div className="h-4 w-4 skeleton-shimmer rounded" />
          <div className="h-4 w-24 skeleton-shimmer rounded" />
          <div className="h-4 w-4 skeleton-shimmer rounded" />
          <div className="h-4 w-36 skeleton-shimmer rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery skeleton */}
          <div className="space-y-4">
            <div className="aspect-square skeleton-shimmer rounded-sm" />
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-20 h-20 skeleton-shimmer rounded-sm" />
              ))}
            </div>
          </div>

          {/* Details skeleton */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="h-10 w-3/4 skeleton-shimmer rounded" />
              <div className="h-5 w-32 skeleton-shimmer rounded" />
            </div>
            <div className="h-12 w-1/3 skeleton-shimmer rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full skeleton-shimmer rounded" />
              <div className="h-4 w-5/6 skeleton-shimmer rounded" />
              <div className="h-4 w-4/6 skeleton-shimmer rounded" />
            </div>
            <div className="h-14 w-full skeleton-shimmer rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
