import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";
import NewsletterSignup from "@/components/NewsletterSignup";
import { formatTimeAgo } from "@/lib/date-utils";
import HeroValueProp from "@/components/HeroValueProp";
import QuickStartCards from "@/components/QuickStartCards";

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
  const latestPosts = allPosts.slice(1, 6); // Next 5 posts

  // Helper to get category display string
  const getCategoryDisplay = (category: string | string[] | undefined) => {
    if (!category) return undefined;
    return Array.isArray(category) ? category[0] : category;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10 overflow-x-hidden">
      {/* Value Proposition Hero Banner */}
      <HeroValueProp />
      
      {/* Quick Start Action Cards */}
      <QuickStartCards />
      
      {/* Hero Section with Featured Article and Latest Sidebar */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-16 lg:mb-20">
        {/* Featured Article */}
        {featuredPost && (
          <div className="group block">
            <Link href={`/artigos/${featuredPost.slug}`}>
              <article className="rounded-3xl overflow-hidden h-full bg-gradient-to-br from-white to-neutral-50/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                {/* Featured Image */}
                <div className="relative w-full h-[280px] sm:h-[400px] lg:h-[450px] bg-gradient-to-br from-primary-50 via-primary-100/50 to-neutral-100 overflow-hidden">
                  {featuredPost.image ? (
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.imageAlt || featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIBAAAgEDBAMAAAAAAAAAAAAAAQIDAAQRBRIhMRNBUf/EABQBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AJOm6nDZ2kEDWtvKY0CeRlJLYGM8EYz+VKlAHVQMdWZ//9k="
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-primary-100/50 to-primary-200/30" aria-hidden="true" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {/* Featured Badge */}
                    <span className="inline-block px-4 py-2 text-xs font-bold text-white bg-cyan-500/90 backdrop-blur-sm rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                      <span>✨</span>
                      <span>Em Destaque</span>
                    </span>
                    
                    {/* Category Badge */}
                    {getCategoryDisplay(featuredPost.category) && (
                      <span className="inline-block px-4 py-2 text-xs font-bold text-white bg-primary-500/90 backdrop-blur-sm rounded-full uppercase tracking-wider shadow-lg">
                        {getCategoryDisplay(featuredPost.category)}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Featured Content */}
                <div className="p-8 sm:p-10 lg:p-12 bg-white/80 backdrop-blur-sm">
                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-5 leading-tight group-hover:text-cyan-600 transition-colors duration-300">
                    {featuredPost.title}
                  </h1>
                
                  {/* Description */}
                  <p className="text-lg sm:text-xl text-neutral-600 mb-6 line-clamp-3 leading-relaxed">
                    {featuredPost.description}
                  </p>
                  
                  {/* Author & Meta */}
                  <div className="flex items-center justify-between pt-6 border-t border-neutral-200/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {featuredPost.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-neutral-900">Por {featuredPost.author}</div>
                        <div className="text-xs text-neutral-500">{formatTimeAgo(featuredPost.date)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-cyan-50 rounded-full text-cyan-700 font-semibold text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{featuredPost.readingTime} min</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* The Latest Sidebar */}
        <aside>
          <div className="mb-8 flex items-center justify-between pb-4 border-b border-neutral-200/60">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">Mais Recentes</h2>
            <Link 
              href="/artigos" 
              className="text-sm font-semibold text-primary hover:text-primary-600 transition-colors duration-200 flex items-center gap-1 group"
            >
              Ver Todos
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="space-y-4">
            {latestPosts.map((post, index) => (
              <div key={post.slug} className="group block animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <Link href={`/artigos/${post.slug}`}>
                  <article className="flex gap-4 p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-100 hover:border-cyan-200 hover:shadow-lg transition-all duration-300 cursor-pointer group-hover:-translate-y-0.5">
                    {/* Thumbnail */}
                    {post.image && (
                      <div className="flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 relative rounded-lg overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
                        <Image
                          src={post.image}
                          alt={post.imageAlt || post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="96px"
                        />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Category */}
                      {getCategoryDisplay(post.category) && (
                        <div className="mb-2">
                          <span className="inline-block px-2.5 py-1 text-xs font-bold text-primary-700 bg-primary-50 rounded-md uppercase tracking-wide">
                            {getCategoryDisplay(post.category)}
                          </span>
                        </div>
                      )}
                      
                      {/* Title */}
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors duration-200">
                        {post.title}
                      </h3>
                      
                      {/* Meta */}
                      <div className="flex items-center text-xs text-neutral-500">
                        <span className="font-medium">{formatTimeAgo(post.date)}</span>
                        <span className="mx-2 text-neutral-300">•</span>
                        <span>{post.readingTime} min</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Categories Section */}
      <section className="mb-16 border-t border-neutral-200/60 pt-12 lg:pt-16 w-full bg-gradient-to-b from-blue-50/30 to-transparent rounded-3xl -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">Explora por Categoria</h2>
          <p className="text-neutral-600 text-lg">Descobre conteúdo organizado por temas</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <Link href="/artigos" className="group relative p-8 border-t-4 border-blue-500 border-x border-b border-neutral-200/60 rounded-2xl hover:border-blue-400 transition-all duration-300 bg-gradient-to-br from-white to-blue-50/20 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/50 group-hover:to-transparent transition-all duration-300" />
            <div className="relative">
              <div className="text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300">💰</div>
              <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                Finanças Pessoais
              </h3>
              <p className="text-neutral-600 text-sm lg:text-base leading-relaxed mb-5">
                Aprende a gerir o teu dinheiro, criar orçamentos e controlar despesas
              </p>
              <div className="text-blue-600 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                <span>Explorar</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
          
          <Link href="/artigos" className="group relative p-8 border-t-4 border-cyan-500 border-x border-b border-neutral-200/60 rounded-2xl hover:border-cyan-400 transition-all duration-300 bg-gradient-to-br from-white to-cyan-50/20 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-cyan-50/0 group-hover:from-cyan-50/50 group-hover:to-transparent transition-all duration-300" />
            <div className="relative">
              <div className="text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300">📈</div>
              <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-cyan-600 transition-colors duration-200">
                Investimentos
              </h3>
              <p className="text-neutral-600 text-sm lg:text-base leading-relaxed mb-5">
                Descobre como fazer o teu dinheiro crescer através de investimentos inteligentes
              </p>
              <div className="text-cyan-600 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                <span>Explorar</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
          
          <Link href="/artigos" className="group relative p-8 border-t-4 border-purple-500 border-x border-b border-neutral-200/60 rounded-2xl hover:border-purple-400 transition-all duration-300 bg-gradient-to-br from-white to-purple-50/20 hover:shadow-lg hover:-translate-y-1 sm:col-span-2 lg:col-span-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-purple-50/0 group-hover:from-purple-50/50 group-hover:to-transparent transition-all duration-300" />
            <div className="relative">
              <div className="text-5xl mb-5 transform group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 mb-3 group-hover:text-purple-600 transition-colors duration-200">
                Empreendedorismo
              </h3>
              <p className="text-neutral-600 text-sm lg:text-base leading-relaxed mb-5">
                Transforma as tuas ideias em negócios lucrativos e sustentáveis
              </p>
              <div className="text-purple-600 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                <span>Explorar</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
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
