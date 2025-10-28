import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-50 border-t-2 border-neutral-200 mt-16 lg:mt-20 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-neutral-900">
              {siteConfig.name}
            </h3>
            <p className="text-base text-neutral-600 leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-neutral-900">Links Rápidos</h3>
            <ul className="space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base text-neutral-600 hover:text-green-600 transition-all duration-300 ease-out inline-flex items-center gap-2 group"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/politica-privacidade"
                  className="text-base text-neutral-600 hover:text-green-600 transition-all duration-300 ease-out inline-flex items-center gap-2 group"
                >
                  <span className="relative">
                    Política de Privacidade
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-neutral-900">Segue-nos</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(siteConfig.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white border-2 border-neutral-200 text-neutral-700 hover:border-green-500 hover:text-green-600 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 ease-out rounded-lg font-medium text-sm capitalize"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t-2 border-neutral-200 pt-8 text-center">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} <span className="font-semibold text-neutral-900">{siteConfig.name}</span>. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
