import { getPostData, getSortedPostsData } from "@/lib/posts";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";
import ArticleTracker from "@/components/ArticleTracker";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import Image from "next/image";
import { getNextArticles } from "@/lib/next-articles";
import NextArticles from "@/components/NextArticles";
import Breadcrumbs from "@/components/Breadcrumbs";
import { formatDate } from "@/lib/date-utils";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/schema-utils";
import { Container } from "@/components/layout";
import { IconClock } from "@/components/icons/ShellIcons";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);
  const canonicalUrl = `${siteConfig.url}/artigos/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: post.image.startsWith("http") ? post.image : `${siteConfig.url}${post.image}`,
          width: post.imageWidth || 1200,
          height: post.imageHeight || 628,
          alt: post.imageAlt || post.title,
        },
      ],
      type: "article",
      locale: "pt_PT",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image.startsWith("http") ? post.image : `${siteConfig.url}${post.image}`],
      creator: siteConfig.social.twitter ? `@${siteConfig.social.twitter.split("/").pop()}` : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);
  const nextArticles = getNextArticles(post);
  const categoryDisplay = Array.isArray(post.category) ? post.category[0] : post.category;
  const wordCount = post.contentHtml
    ? post.contentHtml.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length
    : 0;
  const articleSchema = generateArticleSchema(post, siteConfig, wordCount);
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: "Início", url: "/" },
      { name: "Artigos", url: "/artigos" },
      { name: post.title, url: `/artigos/${slug}` },
    ],
    siteConfig
  );

  return (
    <>
      <ReadingProgressBar />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <ArticleTracker
        articleData={{
          slug: post.slug,
          title: post.title,
          category: categoryDisplay || undefined,
          author: post.author,
          readingTime: post.readingTime || 5,
        }}
      />

      <Container as="article" variant="narrow" className="py-10 md:py-14 lg:py-16 overflow-x-hidden">
        <Breadcrumbs
          items={[
            { label: "Início", href: "/" },
            { label: "Artigos", href: "/artigos" },
            { label: post.title, href: `/artigos/${slug}` },
          ]}
        />

        <header className="mb-10 lg:mb-14">
          {categoryDisplay && (
            <span className="inline-block px-4 py-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm font-semibold uppercase tracking-wider mb-5">
              {categoryDisplay}
            </span>
          )}

          <h1
            className="font-bold mb-6 lg:mb-8 text-[var(--color-ink)] tracking-tight leading-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)" }}
          >
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base text-[var(--color-ink-muted)] mb-8 lg:mb-10">
            <time dateTime={post.date} className="font-medium text-[var(--color-ink-secondary)]">
              {formatDate(post.date)}
            </time>
            <span className="text-[var(--color-border)]" aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <IconClock className="w-4 h-4" aria-hidden />
              {post.readingTime} min de leitura
            </span>
            <span className="text-[var(--color-border)]" aria-hidden>·</span>
            <span className="font-medium">Por {post.author}</span>
          </div>

          {post.image && (
            <div className="relative max-w-full sm:max-w-[90%] lg:max-w-[85%] mx-auto rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-background-subtle)]">
              <Image
                src={post.image}
                alt={post.imageAlt || post.title}
                width={post.imageWidth || 1200}
                height={post.imageHeight || 628}
                className="w-full h-auto object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 900px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIBAAAgEDBAMAAAAAAAAAAAAAAQIDAAQRBRIhMRNBUf/EABQBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEA/AJOm6nDZ2kEDWtvKY0CeRlJLYGM8EYz+VKlAHVQMdWZ//9k="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" aria-hidden />
            </div>
          )}
        </header>

        <div
          className="prose prose-lg max-w-none mx-auto prose-headings:text-[var(--color-ink)] prose-p:text-[var(--color-ink-secondary)] prose-a:text-[var(--color-accent)] prose-strong:text-[var(--color-ink)] prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {nextArticles.length > 0 && <NextArticles articles={nextArticles} />}

        {post.tags && post.tags.length > 0 && (
          <footer className="mt-14 lg:mt-16 pt-8 border-t border-[var(--color-border)]">
            <h3 className="text-lg font-bold text-[var(--color-ink)] mb-5 tracking-tight">Tags Relacionadas</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-[var(--color-background-subtle)] border border-[var(--color-border)] text-[var(--color-ink-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] rounded-xl text-sm font-medium transition-all duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        )}
      </Container>
    </>
  );
}
