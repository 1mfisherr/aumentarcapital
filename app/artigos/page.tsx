import { getSortedPostsData } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";

export const revalidate = 60; // ISR: rebuild this page every 60s if content changes

export const metadata = {
  title: "Artigos - Aumentar Capital",
  description: "Descobre os nossos artigos sobre finanças pessoais, investimentos e empreendedorismo.",
};

export default async function ArtigosPage() {
  const posts = await getSortedPostsData();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold mb-3 text-blue-600">
          Artigos
        </h1>
        <p className="text-lg text-gray-600">
          Descobre as melhores dicas sobre finanças pessoais, investimentos e empreendedorismo.
        </p>
      </div>

      <div className="mb-12">
        <NewsletterSignup />
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Ainda não há artigos disponíveis.</p>
          <p className="text-gray-500 text-sm mt-2">
            Volta em breve para novos conteúdos!
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
