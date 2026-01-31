"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ArticleMeta } from "@/lib/types";
import { formatTimeAgo } from "@/lib/date-utils";
import { IconClock, IconArrowRight } from "@/components/icons/ShellIcons";

function getCategoryDisplay(category: string | string[] | undefined): string | undefined {
  if (!category) return undefined;
  return Array.isArray(category) ? category[0] : category;
}

type HomeContentProps = {
  featuredPost: ArticleMeta | null;
  latestPosts: ArticleMeta[];
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const featuredVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.04 * i, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function HomeContent({ featuredPost, latestPosts }: HomeContentProps) {
  return (
    <motion.section
      className="relative mb-20 lg:mb-24 mt-16 lg:mt-24"
      aria-label="Artigos em destaque e recentes"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={sectionVariants}
    >
      {/* Ambient background — soft gradient blob (2026 trend) */}
      <div
        className="absolute -inset-4 -z-10 rounded-3xl opacity-[0.4] pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(30, 64, 175, 0.06), transparent 50%), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(99, 102, 241, 0.04), transparent 50%)",
        }}
      />

      <div className="relative">
        {/* Section header — minimal, editorial */}
        <div className="flex items-baseline justify-between gap-4 mb-6 lg:mb-8">
          <div className="flex items-baseline gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
              Leituras
            </span>
            <span className="text-[var(--color-ink-muted)] font-light">/</span>
            <h2 className="text-lg font-medium text-[var(--color-ink)] tracking-tight">
              Artigos em destaque
            </h2>
          </div>
          <Link
            href="/artigos"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] transition-colors duration-300"
          >
            Ver todos
            <IconArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Bento grid: featured hero + sidebar list */}
        <div className="grid lg:grid-cols-[1fr_minmax(0,360px)] gap-6 lg:gap-8">
          {/* Featured — hero card with 2026 depth & motion */}
          {featuredPost && (
            <motion.div variants={featuredVariants} className="min-w-0">
              <Link href={`/artigos/${featuredPost.slug}`} className="group block h-full">
                <article
                  className="relative h-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 ease-out hover:border-[var(--color-primary)]/20 hover:shadow-[0_8px_30px_rgba(30,64,175,0.08)] hover:-translate-y-0.5"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)" }}
                >
                  {/* Accent strip — left edge (editorial trend) */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-l-2xl" />

                  <div className="flex flex-col sm:flex-row lg:flex-row">
                    {/* Image — constrained, aspect ratio */}
                    <div className="relative w-full sm:w-2/5 lg:w-[42%] shrink-0 aspect-[4/3] sm:aspect-auto sm:min-h-[200px] lg:min-h-[220px] bg-[var(--color-background-subtle)] overflow-hidden">
                      {featuredPost.image ? (
                        <Image
                          src={featuredPost.image}
                          alt={featuredPost.imageAlt || featuredPost.title}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          priority
                          sizes="(max-width: 640px) 100vw, 45vw"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIBAAAgEDBAMAAAAAAAAAAAAAAQIDAAQRBRIhMRNBUf/EABQBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEA/AJOm6nDZ2kEDWtvKY0CeRlJLYGM8EYz+VKlAHVQMdWZ//9k="
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[var(--color-border)]/60" aria-hidden />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/25 via-transparent to-transparent" />
                      {/* Glass pill — Em Destaque (2026 glassmorphism-lite) */}
                      <div className="absolute bottom-3 left-3 right-3 sm:left-3 sm:right-auto flex flex-wrap gap-2">
                        <span className="inline-flex px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white rounded-lg bg-[var(--color-primary)]/90 backdrop-blur-md border border-white/10">
                          Em Destaque
                        </span>
                        {getCategoryDisplay(featuredPost.category) && (
                          <span className="inline-flex px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-ink)] rounded-lg bg-white/80 backdrop-blur-md border border-white/50">
                            {getCategoryDisplay(featuredPost.category)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content — typography-led */}
                    <div className="flex flex-1 flex-col justify-center p-5 sm:p-6 lg:p-7">
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--color-ink)] mb-2 leading-snug group-hover:text-[var(--color-primary)] transition-colors duration-300 tracking-tight line-clamp-2">
                        {featuredPost.title}
                      </h3>
                      <p className="text-sm text-[var(--color-ink-secondary)] mb-4 line-clamp-2 leading-relaxed">
                        {featuredPost.description}
                      </p>
                      {/* Meta row — compact with reading-time pill */}
                      <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-[var(--color-border)]/80">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-semibold text-xs shrink-0 ring-2 ring-[var(--color-surface)]">
                            {featuredPost.author.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-medium text-[var(--color-ink)] truncate">Por {featuredPost.author}</div>
                            <div className="text-[11px] text-[var(--color-ink-muted)]">{formatTimeAgo(featuredPost.date)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-full bg-[var(--color-background-subtle)] text-[var(--color-ink-muted)] font-medium text-xs border border-[var(--color-border)]/60">
                          <IconClock className="w-3.5 h-3.5" aria-hidden />
                          <span>{featuredPost.readingTime} min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          )}

          {/* Sidebar — elevated panel (bento style) */}
          <motion.aside
            className="lg:pt-0 flex flex-col"
            aria-label="Artigos recentes"
            variants={featuredVariants}
          >
            <div
              className="flex-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 lg:p-5"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                  Recentes
                </span>
                <span className="text-[10px] font-medium text-[var(--color-ink-muted)] bg-[var(--color-background-subtle)] px-2 py-0.5 rounded-full">
                  {latestPosts.length}
                </span>
              </div>
              <ul className="space-y-2">
                {latestPosts.map((post, index) => (
                  <motion.li key={post.slug} custom={index} variants={listItemVariants}>
                    <Link href={`/artigos/${post.slug}`} className="group/article block">
                      <article className="flex gap-3 p-3 rounded-xl border border-transparent bg-transparent transition-all duration-300 hover:bg-[var(--color-background-subtle)]/80 hover:border-[var(--color-border)]">
                        {post.image ? (
                          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 relative rounded-lg overflow-hidden bg-[var(--color-background-subtle)] ring-1 ring-[var(--color-border)]/50">
                            <Image
                              src={post.image}
                              alt={post.imageAlt || post.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover/article:scale-105"
                              sizes="56px"
                            />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[var(--color-background-subtle)] ring-1 ring-[var(--color-border)]/50" />
                        )}
                        <div className="flex-1 min-w-0 py-0.5">
                          {getCategoryDisplay(post.category) && (
                            <span className="inline-block px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-ink-muted)] uppercase tracking-wide mb-1">
                              {getCategoryDisplay(post.category)}
                            </span>
                          )}
                          <h4 className="text-sm font-bold text-[var(--color-ink)] leading-snug line-clamp-2 group-hover/article:text-[var(--color-primary)] transition-colors duration-200">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-ink-muted)] mt-1">
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
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.section>
  );
}
