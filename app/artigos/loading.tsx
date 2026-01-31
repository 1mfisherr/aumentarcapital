import { ArticleListSkeleton } from "@/components/skeletons";

export default function ArticlesLoading() {
  return (
    <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
      {/* Breadcrumb Skeleton */}
      <div className="mb-6 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 bg-[var(--color-border)] rounded" />
          <div className="h-4 w-4 bg-[var(--color-border)] rounded" />
          <div className="h-4 w-20 bg-[var(--color-border)] rounded" />
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="mb-12 lg:mb-16 animate-pulse">
        <div className="h-12 sm:h-14 lg:h-16 bg-[var(--color-border)] rounded-xl w-48 mb-5" />
        <div className="h-6 bg-[var(--color-border)] rounded-lg w-full max-w-xl" />
      </div>

      {/* Newsletter Skeleton */}
      <div className="mb-14 lg:mb-16">
        <div className="bg-[var(--color-background-subtle)] rounded-2xl p-8 sm:p-10 md:p-12 animate-pulse">
          <div className="h-8 bg-[var(--color-border)] rounded-lg w-64 mb-3" />
          <div className="h-5 bg-[var(--color-border)] rounded-lg w-full max-w-md mb-8" />
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 h-12 bg-[var(--color-border)] rounded-xl" />
            <div className="h-12 w-32 bg-[var(--color-border)] rounded-xl" />
          </div>
        </div>
      </div>

      {/* Articles Skeleton */}
      <ArticleListSkeleton count={3} />
    </main>
  );
}
