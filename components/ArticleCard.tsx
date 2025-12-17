import Link from "next/link";
import { ArticleMeta } from "@/lib/types";
import { formatDate } from "@/lib/date-utils";

interface ArticleCardProps {
  post: ArticleMeta;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  // Handle category as either string or array
  const categoryDisplay = Array.isArray(post.category) ? post.category[0] : post.category;
  
  // Get category-specific colors
  const getCategoryColors = (category: string | undefined) => {
    const lowerCategory = category?.toLowerCase() || '';
    if (lowerCategory.includes('finan') || lowerCategory.includes('poupan')) {
      return { bg: 'bg-blue-100', text: 'text-blue-700', hover: 'hover:bg-blue-600', border: 'hover:border-blue-200' };
    } else if (lowerCategory.includes('invest')) {
      return { bg: 'bg-cyan-100', text: 'text-cyan-700', hover: 'hover:bg-cyan-600', border: 'hover:border-cyan-200' };
    } else if (lowerCategory.includes('empreend')) {
      return { bg: 'bg-purple-100', text: 'text-purple-700', hover: 'hover:bg-purple-600', border: 'hover:border-purple-200' };
    }
    return { bg: 'bg-cyan-100', text: 'text-cyan-700', hover: 'hover:bg-cyan-600', border: 'hover:border-cyan-200' };
  };
  
  const colors = getCategoryColors(categoryDisplay);
  
  return (
    <article className={`group relative border-2 border-gray-100 ${colors.border} rounded-2xl p-6 lg:p-8 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
      <Link href={`/artigos/${post.slug}`}>
        {categoryDisplay && (
          <div className="mb-4">
            <span className={`inline-block px-3 py-1.5 ${colors.bg} ${colors.text} rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${colors.hover} group-hover:text-white group-hover:scale-105`}>
              {categoryDisplay}
            </span>
          </div>
        )}
        
        <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4 leading-tight transition-colors duration-300 group-hover:text-cyan-600">
          {post.title}
        </h2>
      </Link>

      <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-500 mb-5">
        <time dateTime={post.date} className="font-medium">
          {formatDate(post.date)}
        </time>
        <span className="text-neutral-300">•</span>
        <span className="font-medium">{post.readingTime} min de leitura</span>
      </div>

      <p className="text-base text-neutral-600 mb-6 leading-relaxed line-clamp-3">{post.description}</p>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-5 border-t border-neutral-100">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 bg-neutral-50 text-neutral-600 hover:bg-cyan-500 hover:text-white rounded-lg font-medium transition-all duration-200 cursor-pointer hover:scale-105"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="mt-6 pt-5 border-t border-neutral-100">
        <Link 
          href={`/artigos/${post.slug}`}
          className="inline-flex items-center gap-2 text-cyan-600 font-semibold text-sm group-hover:gap-3 transition-all duration-200"
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

