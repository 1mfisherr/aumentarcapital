import { getPostData, getSortedPostsData } from "@/lib/posts";
import type { Metadata } from "next";
import Layout from "@/components/Layout";


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

  return (
    <main className="max-w-3xl mx-auto p-8 prose prose-blue">
      <h1 className="mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500">
        {new Date(post.date).toLocaleDateString("pt-PT", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}{" "}
        · {post.readingTime} min de leitura
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </main>
  );
}
