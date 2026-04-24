export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-cinza-200">
      <div className="h-56 skeleton-shimmer" />
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <div className="h-5 w-16 skeleton-shimmer rounded-full" />
          <div className="h-5 w-14 skeleton-shimmer rounded-full" />
        </div>
        <div className="h-5 skeleton-shimmer rounded w-4/5" />
        <div className="h-4 skeleton-shimmer rounded w-3/5" />
        <div className="h-7 skeleton-shimmer rounded w-1/3" />
        <div className="h-10 skeleton-shimmer rounded-xl" />
      </div>
    </div>
  );
}
