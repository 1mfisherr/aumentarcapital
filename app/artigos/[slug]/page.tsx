import { getPostData, getSortedPostsData } from "@/lib/posts";
import type { Metadata } from "next";


export const revalidate = 60; // ISR for individual articles

// Tell Next.js which paths to pre-render
export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
}

// Optional: generate per-article metadata (for SEO)
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostData(params.slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
      type: "article",
      locale: "pt_PT",
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Aumentar Capital",
    },
  };

  return (
    <>
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-primary">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-4">
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
            <div className="inline-block px-3 py-1 bg-accent/20 text-accent-dark rounded-full text-sm font-medium">
              {post.category}
            </div>
          )}
        </header>

        <div
          className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-primary prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {post.tags && post.tags.length > 0 && (
          <footer className="mt-12 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-muted mb-3">Tags:</h3>
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
