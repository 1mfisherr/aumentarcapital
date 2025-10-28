import Link from "next/link";
import { ArticleMeta } from "@/lib/types";

interface ArticleCardProps {
  post: ArticleMeta;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="group border-2 border-neutral-200 rounded-2xl p-6 lg:p-7 hover:shadow-strong transition-all duration-300 bg-white hover:border-primary-400">
      <Link href={`/artigos/${post.slug}`}>
        {post.category && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
          </div>
        )}
        
        <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-200 mb-3 leading-tight">
          {post.title}
        </h2>
      </Link>

      <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-500 mb-4">
        <time dateTime={post.date} className="font-medium">
          {new Date(post.date).toLocaleDateString("pt-PT", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </time>
        <span className="text-neutral-300">•</span>
        <span className="font-medium">{post.readingTime} min de leitura</span>
      </div>

      <p className="text-base text-neutral-600 mb-5 leading-relaxed">{post.description}</p>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-100">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 bg-neutral-100 text-neutral-600 hover:bg-primary-50 hover:text-primary-700 rounded-lg font-medium transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

