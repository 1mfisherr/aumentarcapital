import Link from "next/link";
import { ArticleMeta } from "@/lib/types";

interface ArticleCardProps {
  post: ArticleMeta;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
      <Link href={`/artigos/${post.slug}`} className="group">
        <h2 className="text-2xl font-heading font-semibold text-primary group-hover:text-primary-dark transition-colors mb-2">
          {post.title}
        </h2>
      </Link>

      <div className="flex items-center gap-3 text-sm text-muted mb-3">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("pt-PT", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </time>
        <span>·</span>
        <span>{post.readingTime} min de leitura</span>
        {post.category && (
          <>
            <span>·</span>
            <span className="px-2 py-1 bg-accent/20 text-accent-dark rounded text-xs font-medium">
              {post.category}
            </span>
          </>
        )}
      </div>

      <p className="text-gray-700 mb-4">{post.description}</p>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

