import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 to-gray-100 border-t border-neutral-200/60 mt-20 lg:mt-24 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-12">
          {/* About */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-neutral-900">
              {siteConfig.name}
            </h3>
            <p className="text-base text-neutral-600 leading-relaxed mb-4">
              {siteConfig.description}
            </p>
            <p className="text-sm text-neutral-500">
              Ajudamos portugueses a tomar melhores decisões financeiras.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-neutral-900">Navegação</h3>
            <ul className="space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base text-neutral-600 hover:text-primary transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span>{item.label}</span>
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/politica-privacidade"
                  className="text-base text-neutral-600 hover:text-cyan-600 transition-colors duration-200 inline-flex items-center gap-2 group"
                >
                  <span>Política de Privacidade</span>
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-5 text-neutral-900">Redes Sociais</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(siteConfig.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-white border border-neutral-200/60 text-neutral-700 hover:border-cyan-500 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-200 rounded-xl font-medium text-sm capitalize hover:scale-105"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-600">
            © {new Date().getUTCFullYear()} <span className="font-semibold text-neutral-900">{siteConfig.name}</span>. Todos os direitos reservados.
          </p>
          <p className="text-sm text-neutral-500">
            Feito com ❤️ para ajudar pessoas
          </p>
        </div>
      </div>
    </footer>
  );
}
