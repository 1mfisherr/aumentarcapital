import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6">
          {/* About */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-3">
              {siteConfig.name}
            </h3>
            <p className="text-sm text-gray-600">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/politica-privacidade"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-3">Segue-nos</h3>
            <div className="flex gap-4">
              {Object.entries(siteConfig.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition-colors capitalize"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
