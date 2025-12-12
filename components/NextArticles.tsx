import Link from "next/link";
import { NextArticleLink } from "@/lib/next-articles";

interface NextArticlesProps {
  articles: NextArticleLink[];
}

export default function NextArticles({ articles }: NextArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="mt-14 lg:mt-16 pt-8 border-t border-neutral-200/60">
      <h2 className="text-2xl font-bold text-neutral-900 mb-8">
        {articles.length === 1 ? "Próximo Artigo" : "Artigos Recomendados"}
      </h2>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <Link
            key={article.slug}
            href={`/artigos/${article.slug}`}
            className="block group"
          >
            <article className="p-6 bg-white border border-neutral-200/60 hover:border-primary/40 hover:bg-primary-50/50 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary mb-2 transition-colors duration-200">
                {article.title}
              </h3>
              {article.description && (
                <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {article.description}
                </p>
              )}
              <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                Continuar a ler
                <svg
                  className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

