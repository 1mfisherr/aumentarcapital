/**
 * Footer Skeleton Loading Component
 * 
 * Displays a placeholder while the footer is loading via dynamic import
 */

export default function FooterSkeleton() {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 to-gray-100 border-t border-neutral-200/60 mt-20 lg:mt-24 animate-pulse">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-12">
          {/* About skeleton */}
          <div>
            <div className="h-7 w-40 bg-neutral-200 rounded mb-4" />
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-neutral-200 rounded w-full" />
              <div className="h-4 bg-neutral-200 rounded w-5/6" />
              <div className="h-4 bg-neutral-200 rounded w-4/6" />
            </div>
            <div className="h-4 bg-neutral-200 rounded w-3/4" />
          </div>

          {/* Navigation skeleton */}
          <div>
            <div className="h-6 w-28 bg-neutral-200 rounded mb-5" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 bg-neutral-200 rounded w-24" />
              ))}
            </div>
          </div>

          {/* Social skeleton */}
          <div>
            <div className="h-6 w-32 bg-neutral-200 rounded mb-5" />
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-20 bg-neutral-200 rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="h-4 bg-neutral-200 rounded w-64" />
          <div className="h-4 bg-neutral-200 rounded w-40" />
        </div>
      </div>
    </footer>
  );
}
