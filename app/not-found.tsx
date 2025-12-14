import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export const metadata = {
  title: "Página não encontrada",
  description: "A página que procuras não existe ou foi movida.",
};

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-primary-100 mb-4" aria-hidden="true">
          404
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
          Página não encontrada
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          A página que procuras não existe ou foi movida. 
          Verifica o endereço ou navega para uma das nossas páginas principais.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-800 transition-all duration-200 hover:shadow-lg"
          >
            Ir para o início
          </Link>
          <Link
            href="/artigos"
            className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-50 transition-all duration-200"
          >
            Ver artigos
          </Link>
        </div>
        
        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 mb-4">Páginas populares:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 bg-neutral-50 text-neutral-700 rounded-lg hover:bg-primary-50 hover:text-primary transition-colors duration-200 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
