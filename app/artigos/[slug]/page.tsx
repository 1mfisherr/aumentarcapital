import { getPostData, getSortedPostsData } from "@/lib/posts";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";
import ArticleTracker from "@/components/ArticleTracker";


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
          url: post.image,
          width: 1200,
          height: 628,
          alt: post.imageAlt || post.title,
        },
      ],
      type: "article",
      locale: "pt_PT",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);

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
      url: post.image,
      width: 1200,
      height: 628,
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
    ...(post.category && { articleSection: post.category }),
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
          category: post.category,
          author: post.author,
          readingTime: post.readingTime || 5,
        }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6 text-green-600">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("pt-PT", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime} min de leitura</span>
            <span>·</span>
            <span>Por {post.author}</span>
          </div>

          {post.category && (
            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-8">
              {post.category}
            </div>
          )}

          {post.image && (
            <img
              src={post.image}
              alt={(post as any).imageAlt || post.title}
              width={(post as any).imageWidth || 1200}
              height={(post as any).imageHeight || 628}
              className="w-full sm:w-4/5 h-auto rounded-lg shadow-lg mt-6 sm:mt-8 mx-auto"
            />
          )}
        </header>

        <div
          className="prose prose-lg prose-headings:font-heading prose-a:text-green-600 prose-img:rounded-lg mx-auto"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {post.tags && post.tags.length > 0 && (
          <footer className="mt-12 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
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
