import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { siteConfig } from "@/lib/site.config";

export default async function HomePage() {
  // Get the 3 most recent posts
  const allPosts = await getSortedPostsData();
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-blue-600">
          Bem-vindo ao {siteConfig.name}
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
          O teu guia para finanças pessoais, investimentos e empreendedorismo em Portugal
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/artigos"
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg shadow-sm"
          >
            Ver Artigos
          </Link>
          <Link
            href="/sobre"
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-lg"
          >
            Sobre Nós
          </Link>
        </div>
      </section>

      {/* What We Cover */}
      <section className="mb-16">
        <h2 className="text-3xl font-heading font-bold text-center mb-8">
          O Que Abordamos
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-blue-600 transition-colors">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-heading font-semibold mb-2">
              Finanças Pessoais
            </h3>
            <p className="text-gray-600">
              Aprende a gerir o teu dinheiro, criar orçamentos e controlar despesas
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-blue-600 transition-colors">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-heading font-semibold mb-2">
              Investimentos
            </h3>
            <p className="text-gray-600">
              Descobre como fazer o teu dinheiro crescer através de investimentos inteligentes
            </p>
          </div>
          <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-blue-600 transition-colors">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-heading font-semibold mb-2">
              Empreendedorismo
            </h3>
            <p className="text-gray-600">
              Transforma as tuas ideias em negócios lucrativos e sustentáveis
            </p>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-heading font-bold">Artigos Recentes</h2>
            <Link
              href="/artigos"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid gap-6">
            {recentPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="mb-16">
        <NewsletterSignup />
      </section>

      {/* Why Trust Us */}
      <section className="bg-gray-50 rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-heading font-bold text-center mb-6">
          Porquê Confiar em Nós?
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-heading font-semibold mb-3">
              ✓ Conteúdo Verificado
            </h3>
            <p className="text-gray-600">
              Todos os nossos artigos são baseados em fontes confiáveis e experiências reais
            </p>
          </div>
          <div>
            <h3 className="text-xl font-heading font-semibold mb-3">
              ✓ Focado em Portugal
            </h3>
            <p className="text-gray-600">
              Informações adaptadas à realidade portuguesa, impostos e legislação local
            </p>
          </div>
          <div>
            <h3 className="text-xl font-heading font-semibold mb-3">
              ✓ Linguagem Simples
            </h3>
            <p className="text-gray-600">
              Explicamos conceitos complexos de forma clara e acessível a todos
            </p>
          </div>
          <div>
            <h3 className="text-xl font-heading font-semibold mb-3">
              ✓ Atualizado Regularmente
            </h3>
            <p className="text-gray-600">
              Novo conteúdo publicado regularmente para te manter informado
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
