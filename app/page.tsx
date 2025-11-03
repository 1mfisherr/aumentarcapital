import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata = {
  title: "Início - " + siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

function formatTimeAgo(date: string): string {
  const now = new Date();
  const postDate = new Date(date);
  const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return "há menos de 1 hora";
  if (diffInHours < 24) return `há ${diffInHours} horas`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "há 1 dia";
  if (diffInDays < 7) return `há ${diffInDays} dias`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) return "há 1 semana";
  if (diffInWeeks < 4) return `há ${diffInWeeks} semanas`;
  
  return postDate.toLocaleDateString("pt-PT", { day: "numeric", month: "short" });
}

export default async function HomePage() {
  const allPosts = await getSortedPostsData();
  const featuredPost = allPosts[0];
  const latestPosts = allPosts.slice(1, 6); // Next 5 posts

  // Helper to get category display string
  const getCategoryDisplay = (category: string | string[] | undefined) => {
    if (!category) return undefined;
    return Array.isArray(category) ? category[0] : category;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16 overflow-x-hidden">
      {/* Hero Section with Featured Article and Latest Sidebar */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-16 lg:mb-20">
        {/* Featured Article */}
        {featuredPost && (
          <div className="group block">
            <Link href={`/artigos/${featuredPost.slug}`}>
              <article className="border border-neutral-200 rounded-lg overflow-hidden h-full bg-white">
                {/* Featured Image */}
                <div className="relative w-full h-[260px] sm:h-[320px] bg-neutral-100 overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.imageAlt || featuredPost.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                {/* Featured Content */}
                <div className="p-6 sm:p-7 bg-white">
                  {/* Category */}
                  {getCategoryDisplay(featuredPost.category) && (
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-bold text-primary-700 bg-primary-50 rounded-full uppercase tracking-wider">
                        {getCategoryDisplay(featuredPost.category)}
                      </span>
                    </div>
                  )}
                  
                  {/* Title */}
                  <h1 className="hover-title text-xl sm:text-2xl lg:text-3xl font-bold text-[#1E3A8A] mb-3 leading-tight">
                    {featuredPost.title}
                  </h1>
                
                {/* Description */}
                <p className="text-base text-neutral-600 mb-4 line-clamp-2 leading-relaxed">
                  {featuredPost.description}
                </p>
                
                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
                    {featuredPost.author}
                  </div>
                </div>
              </div>
            </article>
            </Link>
          </div>
        )}

        {/* The Latest Sidebar */}
        <aside>
          <div className="mb-6 flex items-center justify-between border-b-2 border-neutral-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A]">Mais Recentes</h2>
            <Link 
              href="/artigos" 
              className="text-sm font-bold text-[#1E3A8A] hover:text-primary transition-colors duration-200 uppercase tracking-wide"
            >
              Ver Todos
            </Link>
          </div>
          
          <div className="space-y-5">
            {latestPosts.map((post, index) => (
              <div key={post.slug} className="group block">
                <Link href={`/artigos/${post.slug}`}>
                  <article className="border-b border-neutral-100 pb-5 last:border-b-0 last:pb-0 cursor-pointer animate-fade-in" 
                    style={{ animationDelay: `${index * 50}ms` }}>
                    {/* Category */}
                    {getCategoryDisplay(post.category) && (
                      <div className="mb-2">
                        <span className="inline-block px-2.5 py-0.5 text-xs font-bold text-primary-700 bg-primary-100 rounded-md uppercase tracking-wide">
                          {getCategoryDisplay(post.category)}
                        </span>
                      </div>
                    )}
                    
                    {/* Title */}
                    <h3 className="hover-title text-base sm:text-lg font-bold text-[#1E3A8A] leading-snug mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    {/* Meta */}
                    <div className="flex items-center text-xs text-neutral-500 uppercase tracking-wide">
                      <span className="font-semibold text-neutral-700">{post.author}</span>
                      <span className="mx-2 text-neutral-300">•</span>
                      <span>{formatTimeAgo(post.date)}</span>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Categories Section */}
      <section className="mb-12 border-t-2 border-neutral-200 pt-12 lg:pt-16 w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] mb-8 lg:mb-10">Explora por Categoria</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
          <Link href="/artigos" className="group relative p-6 lg:p-8 border-2 border-neutral-200 rounded-2xl hover:border-primary transition-colors duration-200 bg-white overflow-hidden">
            <div className="relative">
              <div className="text-4xl lg:text-5xl mb-4">💰</div>
              <h3 className="text-xl lg:text-2xl font-bold text-[#1E3A8A] mb-3 group-hover:text-primary transition-colors duration-200">
                Finanças Pessoais
              </h3>
              <p className="text-neutral-600 text-sm lg:text-base leading-relaxed mb-4">
                Aprende a gerir o teu dinheiro, criar orçamentos e controlar despesas
              </p>
              <div className="text-[#1E3A8A] font-semibold text-sm">
                <span>Explorar</span>
              </div>
            </div>
          </Link>
          
          <Link href="/artigos" className="group relative p-6 lg:p-8 border-2 border-neutral-200 rounded-2xl hover:border-primary transition-colors duration-200 bg-white overflow-hidden">
            <div className="relative">
              <div className="text-4xl lg:text-5xl mb-4">📈</div>
              <h3 className="text-xl lg:text-2xl font-bold text-[#1E3A8A] mb-3 group-hover:text-primary transition-colors duration-200">
                Investimentos
              </h3>
              <p className="text-neutral-600 text-sm lg:text-base leading-relaxed mb-4">
                Descobre como fazer o teu dinheiro crescer através de investimentos inteligentes
              </p>
              <div className="text-[#1E3A8A] font-semibold text-sm">
                <span>Explorar</span>
              </div>
            </div>
          </Link>
          
          <Link href="/artigos" className="group relative p-6 lg:p-8 border-2 border-neutral-200 rounded-2xl hover:border-primary transition-colors duration-200 bg-white sm:col-span-2 lg:col-span-1 overflow-hidden">
            <div className="relative">
              <div className="text-4xl lg:text-5xl mb-4">🚀</div>
              <h3 className="text-xl lg:text-2xl font-bold text-[#1E3A8A] mb-3 group-hover:text-primary transition-colors duration-200">
                Empreendedorismo
              </h3>
              <p className="text-neutral-600 text-sm lg:text-base leading-relaxed mb-4">
                Transforma as tuas ideias em negócios lucrativos e sustentáveis
              </p>
              <div className="text-[#1E3A8A] font-semibold text-sm">
                <span>Explorar</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="mb-12 w-full">
        <NewsletterSignup />
      </section>
    </div>
  );
}
