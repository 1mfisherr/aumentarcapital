export default function ArticlesLoading() {
  return (
    <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
      {/* Header Skeleton */}
      <div className="mb-12 lg:mb-16">
        <div className="h-12 sm:h-14 lg:h-16 bg-neutral-200 rounded-xl w-48 mb-5 animate-pulse" />
        <div className="h-6 bg-neutral-200 rounded-lg w-full max-w-xl animate-pulse" />
      </div>

      {/* Newsletter Skeleton */}
      <div className="mb-14 lg:mb-16">
        <div className="bg-neutral-100 rounded-2xl p-8 sm:p-10 md:p-12 animate-pulse">
          <div className="h-8 bg-neutral-200 rounded-lg w-64 mb-3" />
          <div className="h-5 bg-neutral-200 rounded-lg w-full max-w-md mb-8" />
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 h-12 bg-neutral-200 rounded-xl" />
            <div className="h-12 w-32 bg-neutral-200 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Articles Skeleton */}
      <div className="grid gap-8 lg:gap-10">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border border-neutral-200/60 rounded-2xl p-6 lg:p-8 bg-white animate-pulse"
          >
            <div className="h-6 bg-neutral-200 rounded-full w-24 mb-4" />
            <div className="h-8 bg-neutral-200 rounded-xl w-3/4 mb-4" />
            <div className="flex gap-2 mb-5">
              <div className="h-4 bg-neutral-200 rounded w-24" />
              <div className="h-4 bg-neutral-200 rounded w-32" />
            </div>
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-neutral-200 rounded w-full" />
              <div className="h-4 bg-neutral-200 rounded w-5/6" />
            </div>
            <div className="h-5 bg-neutral-200 rounded w-28" />
          </div>
        ))}
      </div>
    </main>
  );
}
