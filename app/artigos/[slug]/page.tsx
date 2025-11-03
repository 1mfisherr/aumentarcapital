import { getPostData, getSortedPostsData } from "@/lib/posts";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";
import ArticleTracker from "@/components/ArticleTracker";
import Image from "next/image";


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

  // Handle category as either string or array
  const categoryDisplay = Array.isArray(post.category) ? post.category[0] : post.category;
  const categoryForSchema = categoryDisplay || (Array.isArray(post.category) && post.category.length > 0 ? post.category[0] : undefined);

  // Calculate word count from content
  const wordCount = post.contentHtml
    ? post.contentHtml.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
    : 0;

  // JSON-LD structured data for SEO (Enhanced Article Schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: {
      "@type": "ImageObject",
      url: post.image.startsWith('http') ? post.image : `${siteConfig.url}${post.image}`,
      width: post.imageWidth || 1200,
      height: post.imageHeight || 628,
      ...(post.imageAlt && { caption: post.imageAlt }),
    },
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/aumentarcapital_logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/artigos/${slug}`,
    },
    ...(categoryForSchema && { articleSection: categoryForSchema }),
    ...(post.tags && post.tags.length > 0 && { keywords: post.tags.join(", ") }),
    wordCount: wordCount,
    timeRequired: `PT${post.readingTime}M`, // ISO 8601 duration format
    inLanguage: "pt-PT",
    isAccessibleForFree: true,
  };

  return (
    <>
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
              {new Date(post.date).toLocaleDateString("pt-PT", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span className="text-neutral-300">•</span>
            <span className="font-medium">{post.readingTime} min de leitura</span>
            <span className="text-neutral-300">•</span>
            <span className="font-medium">Por {post.author}</span>
          </div>

          {post.image && (
            <div className="relative max-w-[70%] mx-auto rounded-2xl overflow-hidden shadow-strong">
              <Image
                src={post.image}
                alt={post.imageAlt || post.title}
                width={post.imageWidth || 1200}
                height={post.imageHeight || 628}
                className="w-full h-auto object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 840px"
              />
            </div>
          )}
        </header>

        <div
          className="prose prose-lg prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-a:text-primary-500 prose-strong:text-neutral-900 prose-img:rounded-2xl mx-auto"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {post.tags && post.tags.length > 0 && (
          <footer className="mt-14 lg:mt-16 pt-8 border-t-2 border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Tags Relacionadas</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-neutral-100 text-neutral-700 hover:bg-primary hover:text-white rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer"
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
