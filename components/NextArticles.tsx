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
    <section className="mt-14 lg:mt-16 pt-8 border-t-2 border-neutral-200">
      <h2 className="text-xl font-bold text-neutral-900 mb-6">
        {articles.length === 1 ? "Próximo Artigo" : "Artigos Recomendados"}
      </h2>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <Link
            key={article.slug}
            href={`/artigos/${article.slug}`}
            className="block group"
          >
            <article className="p-6 bg-neutral-50 hover:bg-primary-50 rounded-xl border border-neutral-200 hover:border-primary-300 transition-all duration-200">
              <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-700 mb-2 transition-colors">
                {article.title}
              </h3>
              {article.description && (
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {article.description}
                </p>
              )}
              <div className="mt-4 flex items-center text-primary-600 font-medium text-sm">
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

