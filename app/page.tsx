import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";
import NewsletterSignup from "@/components/NewsletterSignup";
import HeroValueProp from "@/components/HeroValueProp";
import QuickStartCards from "@/components/QuickStartCards";
import { Container } from "@/components/layout";
import { HomeContent } from "@/app/HomeContent";
import {
  IconBookOpen,
  IconTrendingUp,
  IconWrench,
  IconArrowRight,
} from "@/components/icons/ShellIcons";

export async function generateMetadata() {
  const allPosts = await getSortedPostsData();
  const featuredPost = allPosts[0];
  const featuredImage = featuredPost?.image && featuredPost.image.trim() !== "" ? featuredPost.image : null;

  return {
    title: "Início - " + siteConfig.name,
    description: siteConfig.description + " Aprende a gerir o teu dinheiro, poupar e investir com confiança. Guias práticos sobre finanças pessoais, investimentos e empreendedorismo em Portugal.",
    openGraph: {
      title: siteConfig.name + " - Finanças Pessoais, Investimentos e Empreendedorismo",
      description: siteConfig.description + " Aprende a gerir o teu dinheiro, poupar e investir com confiança. Guias práticos sobre finanças pessoais, investimentos e empreendedorismo em Portugal.",
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: featuredImage ? [
        {
          url: featuredImage.startsWith("http") ? featuredImage : `${siteConfig.url}${featuredImage}`,
          width: featuredPost?.imageWidth || 1200,
          height: featuredPost?.imageHeight || 628,
          alt: featuredPost?.imageAlt || featuredPost?.title || siteConfig.name,
        },
      ] : [
        {
          url: `${siteConfig.url}/images/aumentarcapital_logo.svg`,
          width: 1200,
          height: 628,
          alt: siteConfig.name,
        },
      ],
    },
    alternates: {
      canonical: siteConfig.url,
    },
  };
}

export default async function HomePage() {
  const allPosts = await getSortedPostsData();
  const featuredPost = allPosts[0];
  const latestPosts = allPosts.slice(1, 6);

  return (
    <Container className="py-6 md:py-8 lg:py-10 overflow-x-hidden" as="div">
      <HeroValueProp />
      <QuickStartCards />

      {/* Featured + Latest — bento layout */}
      <HomeContent featuredPost={featuredPost ?? null} latestPosts={latestPosts} />

      {/* Categories */}
      <section className="section-spacing-lg mb-section w-full" aria-label="Explorar por categoria">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-ink)] mb-3 tracking-tight">
            Explora por Categoria
          </h2>
          <p className="text-[var(--color-ink-secondary)] text-base lg:text-lg">
            Descobre conteúdo organizado por temas
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
          <Link
            href="/artigos"
            className="group block p-8 lg:p-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-ink-muted)] hover:shadow-[var(--shadow-md)]"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            <div className="mb-5 text-[var(--color-primary)]" aria-hidden>
              <IconBookOpen className="w-10 h-10 lg:w-11 lg:h-11" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-[var(--color-ink)] mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-200">
              Finanças Pessoais
            </h3>
            <p className="text-[var(--color-ink-secondary)] text-sm lg:text-base leading-relaxed mb-6">
              Aprende a gerir o teu dinheiro, criar orçamentos e controlar despesas
            </p>
            <span className="text-[var(--color-primary)] font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
              Explorar
              <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </span>
          </Link>

          <Link
            href="/artigos"
            className="group block p-8 lg:p-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-ink-muted)] hover:shadow-[var(--shadow-md)]"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            <div className="mb-5 text-[var(--color-primary)]" aria-hidden>
              <IconTrendingUp className="w-10 h-10 lg:w-11 lg:h-11" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-[var(--color-ink)] mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-200">
              Investimentos
            </h3>
            <p className="text-[var(--color-ink-secondary)] text-sm lg:text-base leading-relaxed mb-6">
              Descobre como fazer o teu dinheiro crescer através de investimentos inteligentes
            </p>
            <span className="text-[var(--color-primary)] font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
              Explorar
              <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </span>
          </Link>

          <Link
            href="/artigos"
            className="group block p-8 lg:p-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] sm:col-span-2 lg:col-span-1 transition-all duration-300 hover:border-[var(--color-ink-muted)] hover:shadow-[var(--shadow-md)]"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            <div className="mb-5 text-[var(--color-primary)]" aria-hidden>
              <IconWrench className="w-10 h-10 lg:w-11 lg:h-11" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-[var(--color-ink)] mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-200">
              Empreendedorismo
            </h3>
            <p className="text-[var(--color-ink-secondary)] text-sm lg:text-base leading-relaxed mb-6">
              Transforma as tuas ideias em negócios lucrativos e sustentáveis
            </p>
            <span className="text-[var(--color-primary)] font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
              Explorar
              <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </span>
          </Link>
        </div>
      </section>

      <section className="mb-14 w-full" aria-label="Newsletter">
        <NewsletterSignup />
      </section>
    </Container>
  );
}
