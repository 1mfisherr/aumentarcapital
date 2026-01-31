import Link from "next/link";
import { ArticleMeta } from "@/lib/types";
import { formatDate } from "@/lib/date-utils";

interface ArticleCardProps {
  post: ArticleMeta;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  // Handle category as either string or array
  const categoryDisplay = Array.isArray(post.category) ? post.category[0] : post.category;
  
  return (
    <article 
      className="group relative rounded-2xl p-8 lg:p-10 bg-white transition-all duration-300 hover:-translate-y-1 premium-shadow-card"
    >
      <Link href={`/artigos/${post.slug}`}>
        {categoryDisplay && (
          <div className="mb-5">
            <span className="inline-block px-3 py-1.5 bg-[#D8DCD3]/30 text-[#051B11] rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 group-hover:bg-[#0A261F] group-hover:text-white">
              {categoryDisplay}
            </span>
          </div>
        )}
        
        <h2 className="text-2xl lg:text-3xl font-black text-[#051B11] mb-4 leading-tight transition-colors duration-300 group-hover:text-[#0A261F]">
          {post.title}
        </h2>
      </Link>

      <div className="flex flex-wrap items-center gap-2 text-sm text-[#0A261F] mb-6">
        <time dateTime={post.date} className="font-medium">
          {formatDate(post.date)}
        </time>
        <span className="text-[#D8DCD3]">•</span>
        <span className="font-medium">{post.readingTime} min de leitura</span>
      </div>

      <p className="text-base text-[#0A261F] mb-7 leading-relaxed line-clamp-3">{post.description}</p>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-6 border-t border-[#D8DCD3]/50">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 bg-[#FDFCF8] text-[#0A261F] hover:bg-[#0A261F] hover:text-white rounded-lg font-medium transition-all duration-200 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="mt-7 pt-6 border-t border-[#D8DCD3]/50">
        <Link 
          href={`/artigos/${post.slug}`}
          className="inline-flex items-center gap-2 text-[#051B11] font-semibold text-sm group-hover:gap-3 transition-all duration-200"
        >
          Ler artigo
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

