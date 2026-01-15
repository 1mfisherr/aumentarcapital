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


export const revalidate = 60; // ISR for individual articles

// Tell Next.js which paths to pre-render
export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
}

// Optional: generate per-article metadata (for SEO)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);
  const canonicalUrl = `${siteConfig.url}/artigos/${slug}`;
  
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: post.image.startsWith('http') ? post.image : `${siteConfig.url}${post.image}`,
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
      images: [post.image.startsWith('http') ? post.image : `${siteConfig.url}${post.image}`],
      creator: siteConfig.social.twitter ? `@${siteConfig.social.twitter.split('/').pop()}` : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);
  const nextArticles = getNextArticles(post);

  // Handle category as either string or array
  const categoryDisplay = Array.isArray(post.category) ? post.category[0] : post.category;

  // Calculate word count from content
  const wordCount = post.contentHtml
    ? post.contentHtml.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
    : 0;

  // Generate JSON-LD structured data using schema utilities
  const articleSchema = generateArticleSchema(post, siteConfig, wordCount);
  
  // Generate breadcrumb schema
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
      {/* Reading progress indicator */}
      <ReadingProgressBar />

      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Track article views and engagement */}
      <ArticleTracker
        articleData={{
          slug: post.slug,
          title: post.title,
          category: categoryDisplay || undefined,
          author: post.author,
          readingTime: post.readingTime || 5,
        }}
      />

      <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16 overflow-x-hidden">
        <Breadcrumbs
          items={[
            { label: "Início", href: "/" },
            { label: "Artigos", href: "/artigos" },
            { label: post.title, href: `/artigos/${slug}` },
          ]}
        />
        <header className="mb-10 lg:mb-14">
          {categoryDisplay && (
            <div className="mb-5">
              <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-bold uppercase tracking-wider">
                {categoryDisplay}
              </span>
            </div>
          )}

          <h1 
            className="font-bold mb-6 lg:mb-8 text-neutral-900 tracking-tight leading-tight"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}
          >
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base text-neutral-500 mb-8 lg:mb-10">
            <time dateTime={post.date} className="font-medium text-neutral-700">
              {formatDate(post.date)}
            </time>
            <span className="text-neutral-300">•</span>
            <span className="font-medium">{post.readingTime} min de leitura</span>
            <span className="text-neutral-300">•</span>
            <span className="font-medium">Por {post.author}</span>
          </div>

          {post.image && (
            <div className="relative max-w-full sm:max-w-[85%] lg:max-w-[75%] mx-auto rounded-2xl overflow-hidden shadow-xl border border-neutral-200/60">
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-10" />
              <Image
                src={post.image}
                alt={post.imageAlt || post.title}
                width={post.imageWidth || 1200}
                height={post.imageHeight || 628}
                className="w-full h-auto object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIBAAAgEDBAMAAAAAAAAAAAAAAQIDAAQRBRIhMRNBUf/EABQBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AJOm6nDZ2kEDWtvKY0CeRlJLYGM8EYz+VKlAHVQMdWZ//9k="
              />
            </div>
          )}
        </header>

        <div
          className="prose prose-lg prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-a:text-primary-500 prose-strong:text-neutral-900 prose-img:rounded-2xl mx-auto"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {nextArticles.length > 0 && <NextArticles articles={nextArticles} />}

        {post.tags && post.tags.length > 0 && (
          <footer className="mt-14 lg:mt-16 pt-8 border-t border-neutral-200/60">
            <h3 className="text-lg font-bold text-neutral-900 mb-5">Tags Relacionadas</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-neutral-50 border border-neutral-200/60 text-neutral-700 hover:bg-primary hover:text-white hover:border-primary rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105"
                >
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        )}
      </article>
    </>
  );
}
