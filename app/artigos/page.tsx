import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export const revalidate = 60; // ISR: rebuild this page every 60s if content changes

export default async function ArtigosPage() {
  const posts = await getSortedPostsData();

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">Artigos</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">Ainda não há artigos disponíveis.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border-b border-gray-200 pb-4 last:border-none"
            >
              <Link
                href={`/artigos/${post.slug}`}
                className="text-2xl font-semibold text-primary hover:underline"
              >
                {post.title}
              </Link>

              <p className="text-gray-600 text-sm mt-1">
                {new Date(post.date).toLocaleDateString("pt-PT", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}{" "}
                · {post.readingTime} min de leitura
              </p>

              <p className="mt-2 text-gray-700">{post.description}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
