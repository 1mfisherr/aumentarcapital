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
        <div className="text-8xl font-bold text-[var(--color-primary)]/30 mb-4" aria-hidden="true">
          404
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-4">
          Página não encontrada
        </h1>
        <p className="text-lg text-[var(--color-ink-secondary)] mb-8">
          A página que procuras não existe ou foi movida. 
          Verifica o endereço ou navega para uma das nossas páginas principais.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[var(--color-primary)] text-[var(--color-ink-inverse)] font-semibold rounded-xl hover:bg-[var(--color-primary-hover)] transition-all duration-200 hover:shadow-[var(--shadow-lg)]"
          >
            Ir para o início
          </Link>
          <Link
            href="/artigos"
            className="px-6 py-3 border-2 border-[var(--color-border)] text-[var(--color-ink-secondary)] font-semibold rounded-xl hover:bg-[var(--color-background-subtle)] transition-all duration-200"
          >
            Ver artigos
          </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-ink-muted)] mb-4">Páginas populares:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 bg-[var(--color-background-subtle)] text-[var(--color-ink-secondary)] rounded-lg hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-colors duration-200 text-sm font-medium"
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
