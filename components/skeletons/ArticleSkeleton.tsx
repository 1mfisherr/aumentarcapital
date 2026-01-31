/**
 * Article Card Skeleton Loading Component
 * 
 * Displays a placeholder while article cards are loading
 */

export function ArticleCardSkeleton() {
  return (
    <article className="border-2 border-[var(--color-border)] rounded-2xl p-6 lg:p-8 bg-[var(--color-surface)]/90 animate-pulse">
      {/* Category badge skeleton */}
      <div className="mb-4">
        <div className="h-7 w-32 bg-[var(--color-border)] rounded-full" />
      </div>
      
      {/* Title skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-7 bg-[var(--color-border)] rounded w-full" />
        <div className="h-7 bg-[var(--color-border)] rounded w-4/5" />
      </div>

      {/* Meta skeleton */}
      <div className="flex items-center gap-2 mb-5">
        <div className="h-4 w-24 bg-[var(--color-border)] rounded" />
        <div className="h-4 w-4 bg-[var(--color-border)] rounded-full" />
        <div className="h-4 w-28 bg-[var(--color-border)] rounded" />
      </div>

      {/* Description skeleton */}
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-[var(--color-border)] rounded w-full" />
        <div className="h-4 bg-[var(--color-border)] rounded w-full" />
        <div className="h-4 bg-[var(--color-border)] rounded w-3/4" />
      </div>

      {/* Tags skeleton */}
      <div className="flex flex-wrap gap-2 pt-5 border-t border-neutral-100">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-8 w-20 bg-[var(--color-border)] rounded-lg" />
        ))}
      </div>

      {/* CTA skeleton */}
      <div className="mt-6 pt-5 border-t border-neutral-100">
        <div className="h-5 w-24 bg-[var(--color-border)] rounded" />
      </div>
    </article>
  );
}

/**
 * Article List Skeleton
 * 
 * Displays multiple article card skeletons
 */
export function ArticleListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="grid gap-8 lg:gap-10">
      {Array.from({ length: count }, (_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Featured Article Skeleton
 * 
 * Displays a placeholder for the featured article on homepage
 */
export function FeaturedArticleSkeleton() {
  return (
    <article className="rounded-3xl overflow-hidden h-full bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background-subtle)] shadow-xl border border-[var(--color-border)] animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-[280px] sm:h-[400px] lg:h-[450px] bg-[var(--color-border)]" />
      
      {/* Content skeleton */}
      <div className="p-8 sm:p-10 lg:p-12 bg-white/80">
        {/* Title */}
        <div className="space-y-2 mb-5">
          <div className="h-9 bg-[var(--color-border)] rounded w-full" />
          <div className="h-9 bg-[var(--color-border)] rounded w-3/4" />
        </div>
        
        {/* Description */}
        <div className="space-y-2 mb-6">
          <div className="h-5 bg-[var(--color-border)] rounded w-full" />
          <div className="h-5 bg-[var(--color-border)] rounded w-full" />
          <div className="h-5 bg-[var(--color-border)] rounded w-2/3" />
        </div>
        
        {/* Author & Meta */}
        <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-border)]" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-[var(--color-border)] rounded" />
              <div className="h-3 w-16 bg-[var(--color-border)] rounded" />
            </div>
          </div>
          <div className="h-9 w-24 bg-[var(--color-border)] rounded-full" />
        </div>
      </div>
    </article>
  );
}

export default ArticleCardSkeleton;
