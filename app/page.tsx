import { getSortedPostsData } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";
import NewsletterSignup from "@/components/NewsletterSignup";
import HeroValueProp from "@/components/HeroValueProp";
import QuickStartCards from "@/components/QuickStartCards";
import { Container } from "@/components/layout";
import { HomeContent } from "@/app/HomeContent";

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

      <section className="mb-14 w-full" aria-label="Newsletter">
        <NewsletterSignup />
      </section>
    </Container>
  );
}
