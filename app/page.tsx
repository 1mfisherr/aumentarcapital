import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";

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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16 overflow-x-hidden">
      {/* Hero Section with Featured Article and Latest Sidebar */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-16 lg:mb-20">
        {/* Featured Article */}
        {featuredPost && (
          <Link href={`/artigos/${featuredPost.slug}`} className="group block">
            <article className="border-2 border-neutral-200 rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-primary-500 hover:shadow-xl bg-white">
              {/* Featured Image */}
              <div className="relative w-full h-[260px] sm:h-[320px] bg-neutral-100 overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.imageAlt || featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Featured Content */}
              <div className="p-6 sm:p-7 bg-white">
                {/* Category */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-bold text-primary-700 bg-primary-50 rounded-full uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                </div>
                
                {/* Title */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900 mb-3 leading-tight group-hover:text-primary-600 transition-colors duration-200">
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
                  <div className="text-primary-600 group-hover:translate-x-1 transition-transform duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* The Latest Sidebar */}
        <aside>
          <div className="mb-6 flex items-center justify-between border-b-2 border-neutral-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">Mais Recentes</h2>
            <Link 
              href="/artigos" 
              className="group text-sm font-bold text-primary-600 hover:text-primary-700 transition-all uppercase tracking-wide flex items-center gap-1"
            >
              <span>Ver Todos</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="space-y-5">
            {latestPosts.map((post, index) => (
              <Link key={post.slug} href={`/artigos/${post.slug}`} className="group block">
                <article className="border-b border-neutral-100 pb-5 last:border-b-0 last:pb-0 cursor-pointer -mx-4 px-4 py-3 rounded-xl transition-all hover:bg-primary-50/50 hover:shadow-soft animate-fade-in" 
                  style={{ animationDelay: `${index * 50}ms` }}>
                  {/* Category */}
                  <div className="mb-2">
                    <span className="inline-block px-2.5 py-0.5 text-xs font-bold text-primary-700 bg-primary-100 rounded-md uppercase tracking-wide group-hover:bg-primary-200 transition-colors">
                      {post.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors leading-snug mb-2 line-clamp-2">
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
            ))}
          </div>
        </aside>
      </div>

      {/* Categories Section */}
      <section className="mb-12 border-t-2 border-neutral-200 pt-12 lg:pt-16 w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-8 lg:mb-10">Explora por Categoria</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
          <Link href="/artigos" className="group relative p-6 lg:p-8 border-2 border-neutral-200 rounded-2xl hover:border-primary-500 hover:shadow-strong transition-all duration-300 bg-white overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="text-4xl lg:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">💰</div>
              <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                Finanças Pessoais
              </h3>
              <p className="text-neutral-600 text-sm lg:text-base leading-relaxed mb-4">
                Aprende a gerir o teu dinheiro, criar orçamentos e controlar despesas
              </p>
              <div className="flex items-center text-primary-600 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                <span>Explorar</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
          
          <Link href="/artigos" className="group relative p-6 lg:p-8 border-2 border-neutral-200 rounded-2xl hover:border-primary-500 hover:shadow-strong transition-all duration-300 bg-white overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="text-4xl lg:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">📈</div>
              <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                Investimentos
              </h3>
              <p className="text-neutral-600 text-sm lg:text-base leading-relaxed mb-4">
                Descobre como fazer o teu dinheiro crescer através de investimentos inteligentes
              </p>
              <div className="flex items-center text-primary-600 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                <span>Explorar</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
          
          <Link href="/artigos" className="group relative p-6 lg:p-8 border-2 border-neutral-200 rounded-2xl hover:border-primary-500 hover:shadow-strong transition-all duration-300 bg-white sm:col-span-2 lg:col-span-1 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="text-4xl lg:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🚀</div>
              <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                Empreendedorismo
              </h3>
              <p className="text-neutral-600 text-sm lg:text-base leading-relaxed mb-4">
                Transforma as tuas ideias em negócios lucrativos e sustentáveis
              </p>
              <div className="flex items-center text-primary-600 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                <span>Explorar</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
