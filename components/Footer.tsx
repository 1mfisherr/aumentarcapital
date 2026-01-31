import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export default function Footer() {
  return (
    <footer 
      className="w-full bg-[#F0F2ED] mt-24 lg:mt-28 overflow-x-hidden"
      style={{ boxShadow: '0 -4px 20px rgba(10,38,31,0.04)' }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mb-14">
          {/* About */}
          <div>
            <h3 className="font-black text-xl mb-5 text-[#051B11]">
              {siteConfig.name}
            </h3>
            <p className="text-base text-[#3D5A50] leading-relaxed mb-5">
              {siteConfig.description}
            </p>
            <p className="text-sm text-[#5A7A6D]">
              Ajudamos portugueses a tomar melhores decisões financeiras.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-[#0A261F]">Navegação</h3>
            <ul className="space-y-4">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base text-[#3D5A50] hover:text-[#0A261F] transition-colors duration-200 inline-flex items-center gap-2 group"
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
                  className="text-base text-[#3D5A50] hover:text-[#0A261F] transition-colors duration-200 inline-flex items-center gap-2 group"
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
            <h3 className="font-black text-lg mb-6 text-[#051B11]">Redes Sociais</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(siteConfig.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-white text-[#0A261F] hover:text-[#0A261F] hover:bg-[#D8DCD3]/20 transition-all duration-200 rounded-xl font-medium text-sm capitalize"
                  style={{ boxShadow: '0 2px 10px rgba(10,38,31,0.04)' }}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#D8DCD3]/50 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#3D5A50]">
            © {new Date().getUTCFullYear()} <span className="font-semibold text-[#051B11]">{siteConfig.name}</span>. Todos os direitos reservados.
          </p>
          <p className="text-sm text-[#5A7A6D]">
            Feito com cuidado para ajudar pessoas
          </p>
        </div>
      </div>
    </footer>
  );
}
