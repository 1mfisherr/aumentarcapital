"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { NextArticleLink } from "@/lib/next-articles";
import { IconArrowRight } from "@/components/icons/ShellIcons";

interface NextArticlesProps {
  articles: NextArticleLink[];
}

export default function NextArticles({ articles }: NextArticlesProps) {
  if (!articles?.length) return null;

  return (
    <section className="mt-14 lg:mt-16 pt-8 border-t border-[var(--color-border)]">
      <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-8 tracking-tight">
        {articles.length === 1 ? "Próximo Artigo" : "Artigos Recomendados"}
      </h2>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
          >
            <Link href={`/artigos/${article.slug}`} className="block group">
              <article className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/5 transition-all duration-300 hover:shadow-[var(--shadow-sm)]">
                <h3 className="text-lg font-bold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] mb-2 transition-colors duration-200">
                  {article.title}
                </h3>
                {article.description && (
                  <p className="text-[var(--color-ink-secondary)] text-sm leading-relaxed mb-4 line-clamp-2">
                    {article.description}
                  </p>
                )}
                <span className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold text-sm group-hover:gap-3 transition-all">
                  Continuar a ler
                  <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </span>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
