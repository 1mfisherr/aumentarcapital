"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ArticleMeta } from "@/lib/types";
import { formatTimeAgo } from "@/lib/date-utils";
import { IconArrowRight, IconClock } from "@/components/icons/ShellIcons";

function getCategoryDisplay(category: string | string[] | undefined): string | undefined {
  if (!category) return undefined;
  return Array.isArray(category) ? category[0] : category;
}

type HomeContentProps = {
  featuredPost: ArticleMeta | null;
  latestPosts: ArticleMeta[];
};

const featuredVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 * i, duration: 0.3 },
  }),
};

export function HomeContent({ featuredPost, latestPosts }: HomeContentProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 mb-20 lg:mb-24 mt-20 lg:mt-28 relative">
      {/* Featured article */}
      {featuredPost && (
        <motion.div
          className="group block relative z-10 lg:-mb-4"
          initial="hidden"
          animate="visible"
          variants={featuredVariants}
        >
          <Link href={`/artigos/${featuredPost.slug}`}>
            <article
              className="rounded-2xl overflow-hidden h-full border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-ink-muted)] hover:shadow-[var(--shadow-lg)]"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <div className="relative w-full h-[280px] sm:h-[400px] lg:h-[450px] bg-[var(--color-background-subtle)] overflow-hidden">
                {featuredPost.image ? (
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.imageAlt || featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIBAAAgEDBAMAAAAAAAAAAAAAAQIDAAQRBRIhMRNBUf/EABQBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEA/AJOm6nDZ2kEDWtvKY0CeRlJLYGM8EYz+VKlAHVQMdWZ//9k="
                  />
                ) : (
                  <div className="absolute inset-0 bg-[var(--color-border)] opacity-50" aria-hidden />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="inline-block px-3.5 py-1.5 text-xs font-semibold text-white rounded-lg uppercase tracking-wider bg-[var(--color-primary)]">
                    Em Destaque
                  </span>
                  {getCategoryDisplay(featuredPost.category) && (
                    <span className="inline-block px-3.5 py-1.5 text-xs font-semibold text-white rounded-lg uppercase tracking-wider bg-[var(--color-primary-muted)]">
                      {getCategoryDisplay(featuredPost.category)}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-8 sm:p-10 lg:p-12 bg-[var(--color-surface)]">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-ink)] mb-4 leading-tight group-hover:text-[var(--color-primary)] transition-colors duration-200 tracking-tight">
                  {featuredPost.title}
                </h1>
                <p className="text-base sm:text-lg text-[var(--color-ink-secondary)] mb-6 line-clamp-3 leading-relaxed">
                  {featuredPost.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-semibold text-sm">
                      {featuredPost.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--color-ink)]">Por {featuredPost.author}</div>
                      <div className="text-xs text-[var(--color-ink-muted)]">{formatTimeAgo(featuredPost.date)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--color-background-subtle)] text-[var(--color-ink-secondary)] font-medium text-sm">
                    <IconClock className="w-4 h-4" aria-hidden />
                    <span>{featuredPost.readingTime} min</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </motion.div>
      )}

      {/* Latest posts */}
      <aside className="pt-6" aria-label="Artigos recentes">
        <div className="mb-8 flex items-center justify-between pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)] tracking-tight">
            Mais Recentes
          </h2>
          <Link
            href="/artigos"
            className="text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-primary)] transition-colors duration-200 inline-flex items-center gap-1.5 group"
          >
            Ver Todos
            <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        <ul className="space-y-4">
          {latestPosts.map((post, index) => (
            <motion.li
              key={post.slug}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={listItemVariants}
            >
              <Link href={`/artigos/${post.slug}`} className="group block">
                <article className="flex gap-4 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-ink-muted)] hover:shadow-[var(--shadow-sm)]">
                  {post.image && (
                    <div className="flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 relative rounded-lg overflow-hidden bg-[var(--color-background-subtle)]">
                      <Image
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="96px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    {getCategoryDisplay(post.category) && (
                      <span className="inline-block px-2.5 py-1 text-xs font-medium text-[var(--color-ink)] bg-[var(--color-background-subtle)] rounded-md uppercase tracking-wide mb-2">
                        {getCategoryDisplay(post.category)}
                      </span>
                    )}
                    <h3 className="text-sm sm:text-base font-bold text-[var(--color-ink)] leading-snug mb-1.5 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-200">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
                      <span>{formatTimeAgo(post.date)}</span>
                      <span aria-hidden>·</span>
                      <span>{post.readingTime} min</span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
