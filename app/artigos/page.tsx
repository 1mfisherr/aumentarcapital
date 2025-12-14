import { getSortedPostsData } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { siteConfig } from "@/lib/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export const revalidate = 60; // ISR: rebuild this page every 60s if content changes

const ARTICLES_PER_PAGE = 10;

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
  searchParams: Promise<{ categoria?: string; pagina?: string }> | { categoria?: string; pagina?: string };
}) {
  const allPosts = await getSortedPostsData();
  
  // Await searchParams if it's a Promise (Next.js 15+)
  const params = await Promise.resolve(searchParams);
  
  // Get current page number
  const currentPage = Math.max(1, parseInt(params.pagina || "1", 10));
  
  // Filter posts by category if a category is specified
  let filteredPosts = allPosts;
  let selectedCategory: string | null = null;
  
  if (params.categoria) {
    selectedCategory = categoryDisplayNames[params.categoria] || null;
    
    if (selectedCategory) {
      filteredPosts = allPosts.filter((post) => {
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

  // Calculate pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const posts = filteredPosts.slice(startIndex, endIndex);

  // Build base URL for pagination links
  const baseUrl = params.categoria ? `/artigos?categoria=${params.categoria}` : "/artigos";

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
        <>
        <div className="grid gap-8 lg:gap-10">
          {posts.map((post, index) => (
            <div key={post.slug} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <ArticleCard post={post} />
            </div>
          ))}
        </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-12 lg:mt-16 flex items-center justify-center gap-2" aria-label="Paginação de artigos">
              {/* Previous Button */}
              {currentPage > 1 ? (
                <Link
                  href={`${baseUrl}${baseUrl.includes("?") ? "&" : "?"}pagina=${currentPage - 1}`}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 hover:border-primary transition-all duration-200 flex items-center gap-1"
                  aria-label="Página anterior"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden sm:inline">Anterior</span>
                </Link>
              ) : (
                <span className="px-4 py-2 border border-neutral-200 text-neutral-400 font-medium rounded-lg cursor-not-allowed flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden sm:inline">Anterior</span>
                </span>
              )}

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first, last, current, and adjacent pages
                  const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                  const showEllipsis = (page === 2 && currentPage > 3) || (page === totalPages - 1 && currentPage < totalPages - 2);

                  if (showEllipsis && !showPage) {
                    return <span key={page} className="px-2 text-neutral-400">...</span>;
                  }

                  if (!showPage) return null;

                  return (
                    <Link
                      key={page}
                      href={`${baseUrl}${baseUrl.includes("?") ? "&" : "?"}pagina=${page}`}
                      className={`min-w-[40px] h-10 flex items-center justify-center font-medium rounded-lg transition-all duration-200 ${
                        page === currentPage
                          ? "bg-primary text-white"
                          : "border border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-primary"
                      }`}
                      aria-label={`Página ${page}`}
                      aria-current={page === currentPage ? "page" : undefined}
                    >
                      {page}
                    </Link>
                  );
                })}
              </div>

              {/* Next Button */}
              {currentPage < totalPages ? (
                <Link
                  href={`${baseUrl}${baseUrl.includes("?") ? "&" : "?"}pagina=${currentPage + 1}`}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 hover:border-primary transition-all duration-200 flex items-center gap-1"
                  aria-label="Página seguinte"
                >
                  <span className="hidden sm:inline">Seguinte</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <span className="px-4 py-2 border border-neutral-200 text-neutral-400 font-medium rounded-lg cursor-not-allowed flex items-center gap-1">
                  <span className="hidden sm:inline">Seguinte</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              )}
            </nav>
          )}

          {/* Posts Count */}
          <p className="text-center text-sm text-neutral-500 mt-6">
            A mostrar {startIndex + 1}-{Math.min(endIndex, totalPosts)} de {totalPosts} artigos
          </p>
        </>
      )}
    </main>
  );
}
