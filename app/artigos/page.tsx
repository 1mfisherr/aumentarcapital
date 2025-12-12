import { getSortedPostsData } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { siteConfig } from "@/lib/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";

export const revalidate = 60; // ISR: rebuild this page every 60s if content changes

export const metadata = {
  title: "Artigos - Finanças Pessoais, Investimentos e Empreendedorismo",
  description: "Descobre artigos práticos sobre finanças pessoais, investimentos e empreendedorismo em Portugal. Aprende a gerir o teu dinheiro, poupar e investir com confiança. Guias completos e dicas práticas.",
  alternates: {
    canonical: `${siteConfig.url}/artigos`,
  },
  openGraph: {
    title: "Artigos - Finanças Pessoais, Investimentos e Empreendedorismo",
    description: "Descobre artigos práticos sobre finanças pessoais, investimentos e empreendedorismo em Portugal. Aprende a gerir o teu dinheiro, poupar e investir com confiança.",
    type: "website",
    url: `${siteConfig.url}/artigos`,
  },
};

// Map of URL slugs to display names
const categoryDisplayNames: Record<string, string> = {
  "financas-pessoais": "Finanças Pessoais",
  "investimentos": "Investimentos",
  "poupanca": "Poupança",
  "empreendedorismo": "Empreendedorismo",
  "fazer-dinheiro-online": "Fazer Dinheiro Online",
};

export default async function ArtigosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }> | { categoria?: string };
}) {
  const allPosts = await getSortedPostsData();
  
  // Await searchParams if it's a Promise (Next.js 15+)
  const params = await Promise.resolve(searchParams);
  
  // Filter posts by category if a category is specified
  let posts = allPosts;
  let selectedCategory: string | null = null;
  
  if (params.categoria) {
    selectedCategory = categoryDisplayNames[params.categoria] || null;
    
    if (selectedCategory) {
      posts = allPosts.filter((post) => {
        // Handle category as either a string or an array
        const postCategory = post.category;
        
        // If category is an array, check if it includes the selected category
        if (Array.isArray(postCategory)) {
          if (postCategory.includes(selectedCategory as any)) {
            return true;
          }
        } else {
          // If category is a string, check for exact match
          if (postCategory === selectedCategory) {
            return true;
          }
        }
        
        // Also check the optional categories array
        if (post.categories && post.categories.includes(selectedCategory as any)) {
          return true;
        }
        
        return false;
      });
    }
  }

  return (
    <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16 overflow-x-hidden">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: selectedCategory || "Artigos", href: selectedCategory ? `/artigos?categoria=${params.categoria}` : "/artigos" },
        ]}
      />
      <div className="mb-12 lg:mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 text-neutral-900 tracking-tight">
          {selectedCategory ? selectedCategory : "Artigos"}
        </h1>
        <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-3xl">
          {selectedCategory
            ? `Artigos sobre ${selectedCategory.toLowerCase()}`
            : "Descobre as melhores dicas sobre finanças pessoais, investimentos e empreendedorismo."}
        </p>
      </div>

      <div className="mb-14 lg:mb-16">
        <NewsletterSignup />
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 lg:py-20 bg-gradient-to-br from-neutral-50 to-white rounded-2xl border border-neutral-200/60 shadow-sm" role="status" aria-live="polite">
          <div className="text-6xl mb-6" aria-hidden="true">📝</div>
          <p className="text-neutral-700 text-lg sm:text-xl font-medium mb-2">Ainda não há artigos disponíveis.</p>
          <p className="text-neutral-500 text-base">
            Volta em breve para novos conteúdos!
          </p>
        </div>
      ) : (
        <div className="grid gap-8 lg:gap-10">
          {posts.map((post, index) => (
            <div key={post.slug} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <ArticleCard post={post} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
