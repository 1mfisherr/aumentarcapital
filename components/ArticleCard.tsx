"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ArticleMeta } from "@/lib/types";
import { formatDate } from "@/lib/date-utils";
import { IconArrowRight, IconClock } from "@/components/icons/ShellIcons";

interface ArticleCardProps {
  post: ArticleMeta;
  index?: number;
}

export default function ArticleCard({ post, index = 0 }: ArticleCardProps) {
  const categoryDisplay = Array.isArray(post.category) ? post.category[0] : post.category;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 lg:p-8 transition-all duration-300 hover:border-[var(--color-primary)]/40 hover:shadow-[var(--shadow-md)]"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <Link href={`/artigos/${post.slug}`} className="block">
        {post.image && (
          <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden mb-6 bg-[var(--color-background-subtle)]">
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        )}

        {categoryDisplay && (
          <span className="inline-block px-3 py-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-lg text-xs font-semibold uppercase tracking-wider mb-4">
            {categoryDisplay}
          </span>
        )}

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-ink)] mb-3 leading-tight transition-colors duration-200 group-hover:text-[var(--color-primary)] tracking-tight">
          {post.title}
        </h2>

        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-ink-muted)] mb-4">
          <time dateTime={post.date} className="font-medium">
            {formatDate(post.date)}
          </time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <IconClock className="w-4 h-4" aria-hidden />
            {post.readingTime} min
          </span>
        </div>

        <p className="text-[var(--color-ink-secondary)] text-base leading-relaxed line-clamp-3 mb-6">
          {post.description}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 bg-[var(--color-background-subtle)] text-[var(--color-ink-muted)] rounded-md font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <span className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold text-sm group-hover:gap-3 transition-all">
          Ler artigo
          <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
        </span>
      </Link>
    </motion.article>
  );
}
