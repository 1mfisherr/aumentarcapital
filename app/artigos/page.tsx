import { getSortedPostsData } from "@/lib/posts";
import NewsletterSignup from "@/components/NewsletterSignup";
import { siteConfig } from "@/lib/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Container } from "@/components/layout";
import { ArtigosList } from "@/app/artigos/ArtigosList";
import Link from "next/link";
import { IconChevronLeft, IconChevronRight } from "@/components/icons/ShellIcons";

export const revalidate = 60;

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
  const params = await Promise.resolve(searchParams);
  const currentPage = Math.max(1, parseInt(params.pagina || "1", 10));

  let filteredPosts = allPosts;
  let selectedCategory: string | null = null;

  if (params.categoria) {
    selectedCategory = categoryDisplayNames[params.categoria] || null;
    if (selectedCategory) {
      filteredPosts = allPosts.filter((post) => {
        const postCategory = post.category;
        if (Array.isArray(postCategory)) {
          if (postCategory.includes(selectedCategory as never)) return true;
        } else {
          if (postCategory === selectedCategory) return true;
        }
        if (post.categories?.includes(selectedCategory as never)) return true;
        return false;
      });
    }
  }

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const posts = filteredPosts.slice(startIndex, endIndex);
  const baseUrl = params.categoria ? `/artigos?categoria=${params.categoria}` : "/artigos";

  return (
    <Container as="main" variant="content" className="py-10 md:py-14 lg:py-16 overflow-x-hidden">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: selectedCategory || "Artigos", href: selectedCategory ? `/artigos?categoria=${params.categoria}` : "/artigos" },
        ]}
      />

      <header className="mb-12 lg:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-[var(--color-ink)] tracking-tight">
          {selectedCategory || "Artigos"}
        </h1>
        <p className="text-lg sm:text-xl text-[var(--color-ink-secondary)] leading-relaxed max-w-3xl">
          {selectedCategory
            ? `Artigos sobre ${selectedCategory.toLowerCase()}`
            : "Descobre as melhores dicas sobre finanças pessoais, investimentos e empreendedorismo."}
        </p>
      </header>

      <div className="mb-12 lg:mb-14">
        <NewsletterSignup />
      </div>

      {posts.length === 0 ? (
        <div
          className="text-center py-16 lg:py-20 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]"
          style={{ boxShadow: "var(--shadow-sm)" }}
          role="status"
          aria-live="polite"
        >
          <div className="text-5xl mb-6" aria-hidden>
            📝
          </div>
          <p className="text-[var(--color-ink)] text-lg sm:text-xl font-semibold mb-2">
            Ainda não há artigos disponíveis.
          </p>
          <p className="text-[var(--color-ink-muted)] text-base">
            Volta em breve para novos conteúdos!
          </p>
        </div>
      ) : (
        <>
          <ArtigosList posts={posts} />

          {totalPages > 1 && (
            <nav
              className="mt-12 lg:mt-16 flex items-center justify-center gap-2 flex-wrap"
              aria-label="Paginação de artigos"
            >
              {currentPage > 1 ? (
                <Link
                  href={`${baseUrl}${baseUrl.includes("?") ? "&" : "?"}pagina=${currentPage - 1}`}
                  className="btn-secondary inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold"
                  aria-label="Página anterior"
                >
                  <IconChevronLeft className="w-4 h-4" aria-hidden />
                  <span className="hidden sm:inline">Anterior</span>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl border border-[var(--color-border)] text-[var(--color-ink-muted)] cursor-not-allowed">
                  <IconChevronLeft className="w-4 h-4" aria-hidden />
                  <span className="hidden sm:inline">Anterior</span>
                </span>
              )}

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                  const showEllipsis = (page === 2 && currentPage > 3) || (page === totalPages - 1 && currentPage < totalPages - 2);
                  if (showEllipsis && !showPage) {
                    return <span key={page} className="px-2 text-[var(--color-ink-muted)]">...</span>;
                  }
                  if (!showPage) return null;
                  return (
                    <Link
                      key={page}
                      href={`${baseUrl}${baseUrl.includes("?") ? "&" : "?"}pagina=${page}`}
                      className={`min-w-[40px] h-10 flex items-center justify-center font-semibold rounded-xl text-sm transition-all duration-200 ${
                        page === currentPage
                          ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-sm)]"
                          : "border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-background-subtle)]"
                      }`}
                      aria-label={`Página ${page}`}
                      aria-current={page === currentPage ? "page" : undefined}
                    >
                      {page}
                    </Link>
                  );
                })}
              </div>

              {currentPage < totalPages ? (
                <Link
                  href={`${baseUrl}${baseUrl.includes("?") ? "&" : "?"}pagina=${currentPage + 1}`}
                  className="btn-secondary inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold"
                  aria-label="Página seguinte"
                >
                  <span className="hidden sm:inline">Seguinte</span>
                  <IconChevronRight className="w-4 h-4" aria-hidden />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl border border-[var(--color-border)] text-[var(--color-ink-muted)] cursor-not-allowed">
                  <span className="hidden sm:inline">Seguinte</span>
                  <IconChevronRight className="w-4 h-4" aria-hidden />
                </span>
              )}
            </nav>
          )}

          <p className="text-center text-sm text-[var(--color-ink-muted)] mt-6">
            A mostrar {startIndex + 1}–{Math.min(endIndex, totalPosts)} de {totalPosts} artigos
          </p>
        </>
      )}
    </Container>
  );
}
