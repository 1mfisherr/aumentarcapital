import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData } from "@/lib/posts";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero Section with Featured Article and Latest Sidebar */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16">
        {/* Featured Article */}
        {featuredPost && (
          <Link href={`/artigos/${featuredPost.slug}`} className="group block">
            <article className="border border-gray-200 rounded-lg overflow-hidden h-full transition-all duration-300 hover:border-green-500 hover:shadow-xl">
              {/* Featured Image */}
              <div className="relative w-full h-[240px] sm:h-[300px] bg-gray-100 overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.imageAlt || featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {/* Featured Content */}
              <div className="p-5 sm:p-6 bg-white">
                {/* Category */}
                <div className="mb-3">
                  <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                    {featuredPost.category}
                  </span>
                </div>
                
                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  {featuredPost.title}
                </h1>
                
                {/* Description */}
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                  {featuredPost.description}
                </p>
                
                {/* Author */}
                <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  {featuredPost.author}
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* The Latest Sidebar */}
        <aside>
          <div className="mb-4 sm:mb-6 flex items-center justify-between border-b border-gray-300 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Mais Recentes</h2>
            <Link 
              href="/artigos" 
              className="text-xs font-semibold text-gray-900 hover:text-green-600 transition-colors uppercase tracking-wider"
            >
              Ver Todos →
            </Link>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/artigos/${post.slug}`} className="group block">
                <article className="border-b border-gray-100 pb-4 sm:pb-6 last:border-b-0 last:pb-0 cursor-pointer -mx-3 px-3 py-2 rounded-lg transition-all hover:bg-green-50 hover:shadow-sm">
                  {/* Category */}
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wide group-hover:text-green-700 transition-colors">
                      {post.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  {/* Meta */}
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    <span className="font-medium">{post.author}</span>
                    <span className="mx-1">|</span>
                    <span>{formatTimeAgo(post.date)}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </aside>
      </div>

      {/* Categories Section */}
      <section className="mb-8 sm:mb-12 border-t border-gray-200 pt-8 sm:pt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Explora por Categoria</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Link href="/artigos" className="group p-5 sm:p-6 border border-gray-200 rounded-lg hover:border-green-600 hover:shadow-lg hover:bg-green-50 transition-all bg-white">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💰</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">
              Finanças Pessoais
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Aprende a gerir o teu dinheiro, criar orçamentos e controlar despesas
            </p>
          </Link>
          
          <Link href="/artigos" className="group p-5 sm:p-6 border border-gray-200 rounded-lg hover:border-green-600 hover:shadow-lg hover:bg-green-50 transition-all bg-white">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📈</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">
              Investimentos
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Descobre como fazer o teu dinheiro crescer através de investimentos inteligentes
            </p>
          </Link>
          
          <Link href="/artigos" className="group p-5 sm:p-6 border border-gray-200 rounded-lg hover:border-green-600 hover:shadow-lg hover:bg-green-50 transition-all bg-white sm:col-span-2 lg:col-span-1">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🚀</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">
              Empreendedorismo
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Transforma as tuas ideias em negócios lucrativos e sustentáveis
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
