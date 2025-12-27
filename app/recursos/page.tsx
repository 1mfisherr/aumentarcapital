import { Metadata } from "next";
import CashFlowVisualizer from "@/components/CashFlowVisualizer";
import EmergencyFundCalculator from "@/components/EmergencyFundCalculator";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Calculadoras Financeiras Gratuitas | Recursos Financeiros",
  description: "Calculadoras financeiras gratuitas e ferramentas práticas: visualizador de fluxo de caixa, simulador de juros compostos e calculadora de fundo de emergência. Planear investimentos e finanças pessoais em Portugal.",
  keywords: [
    "calculadora financeira",
    "calculadora juros compostos",
    "fundo de emergência",
    "fluxo de caixa",
    "finanças pessoais",
    "calculadora investimentos",
    "planeamento financeiro",
    "Portugal",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aumentarcapital.com'}/recursos`,
  },
  openGraph: {
    title: "Calculadoras Financeiras Gratuitas | Aumentar Capital",
    description: "Ferramentas práticas e calculadoras financeiras gratuitas para planear investimentos e gerir melhor as tuas finanças pessoais em Portugal.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aumentarcapital.com'}/recursos`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aumentarcapital.com'}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Calculadoras Financeiras - Aumentar Capital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadoras Financeiras Gratuitas | Aumentar Capital",
    description: "Ferramentas práticas para planear investimentos e gerir melhor as tuas finanças pessoais.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RecursosPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aumentarcapital.com';
  
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Calculadoras Financeiras Gratuitas",
    "description": "Ferramentas práticas e calculadoras financeiras gratuitas para planear investimentos e gerir melhor as tuas finanças pessoais em Portugal.",
    "url": `${siteUrl}/recursos`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "SoftwareApplication",
          "name": "Visualizador de Fluxo de Caixa",
          "description": "Descobre para onde vai o teu dinheiro e se tens excedente ou défice. O primeiro passo para controlo financeiro.",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
          }
        },
        {
          "@type": "SoftwareApplication",
          "name": "Calculadora de Fundo de Emergência",
          "description": "Calcula quanto deves poupar para emergências e quanto tempo levará a construir o teu fundo de segurança.",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
          }
        },
        {
          "@type": "SoftwareApplication",
          "name": "Simulador de Juros Compostos",
          "description": "Simula o crescimento do teu investimento ao longo do tempo e vê o poder dos juros compostos em ação.",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
          }
        }
      ]
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
        {/* Hero Section */}
        <section className="w-full py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Início", href: "/" },
                { label: "Recursos", href: "/recursos" },
              ]}
            />
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-neutral-900 px-4">
                Calculadoras Financeiras Gratuitas
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed mb-3 sm:mb-4 px-4">
                Ferramentas práticas e calculadoras para te ajudar a gerir melhor as tuas finanças pessoais e tomar decisões informadas.
              </p>
              <p className="text-sm sm:text-base text-neutral-500 px-4">
                Todas as calculadoras são 100% gratuitas, sem registo necessário, e funcionam diretamente no teu navegador.
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 px-4 sm:px-0">
              <a
                href="#visualizador-fluxo-caixa"
                className="bg-white border border-neutral-200/60 rounded-2xl p-5 sm:p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group cursor-pointer block focus:outline-none focus:ring-2 focus:ring-primary/50 touch-manipulation"
                aria-label="Usar Visualizador de Fluxo de Caixa"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 transform transition-transform duration-300 group-hover:scale-110">💸</div>
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                  Visualizador de Fluxo de Caixa
                </h2>
                <p className="text-neutral-600 mb-4 text-xs sm:text-sm leading-relaxed">
                  Descobre para onde vai o teu dinheiro e se tens excedente ou défice. O primeiro passo para controlo financeiro.
                </p>
                <div className="text-primary font-semibold text-xs sm:text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Usar ferramenta
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              <a
                href="#calculadora-fundo-emergencia"
                className="bg-white border border-neutral-200/60 rounded-2xl p-5 sm:p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group cursor-pointer block focus:outline-none focus:ring-2 focus:ring-primary/50 touch-manipulation"
                aria-label="Usar Calculadora de Fundo de Emergência"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 transform transition-transform duration-300 group-hover:scale-110">💰</div>
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                  Fundo de Emergência
                </h2>
                <p className="text-neutral-600 mb-4 text-xs sm:text-sm leading-relaxed">
                  Calcula quanto deves poupar para emergências e quanto tempo levará a construir o teu fundo de segurança.
                </p>
                <div className="text-primary font-semibold text-xs sm:text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Usar calculadora
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              <a
                href="#calculadora-juros-compostos"
                className="bg-white border border-neutral-200/60 rounded-2xl p-5 sm:p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group cursor-pointer block focus:outline-none focus:ring-2 focus:ring-primary/50 touch-manipulation"
                aria-label="Usar Simulador de Juros Compostos"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 transform transition-transform duration-300 group-hover:scale-110">📈</div>
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                  Simulador de Juros Compostos
                </h2>
                <p className="text-neutral-600 mb-4 text-xs sm:text-sm leading-relaxed">
                  Simula o crescimento do teu investimento ao longo do tempo e vê o poder dos juros compostos em ação.
                </p>
                <div className="text-primary font-semibold text-xs sm:text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Usar calculadora
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>
        </div>
      </section>

      {/* Cash Flow Visualizer Section */}
      <section id="visualizador-fluxo-caixa" className="scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-3 sm:mb-4 px-4">
              Para Onde Vai o Teu Dinheiro?
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
              Em 2 minutos, descobre se tens controlo financeiro. Visualiza o teu fluxo de caixa e recebe orientações personalizadas.
            </p>
          </div>
        </div>
        <CashFlowVisualizer />
      </section>

      {/* Emergency Fund Calculator Section */}
      <section id="calculadora-fundo-emergencia" className="scroll-mt-20 pt-6 sm:pt-8 lg:pt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-3 sm:mb-4 px-4">
              Calculadora de Fundo de Emergência
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
              Descobre quanto precisas de poupar para estar protegido contra imprevistos financeiros.
            </p>
          </div>
        </div>
        <EmergencyFundCalculator />
      </section>

      {/* Compound Interest Calculator Section */}
      <section id="calculadora-juros-compostos" className="scroll-mt-20 pt-6 sm:pt-8 lg:pt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-3 sm:mb-4 px-4">
              Simulador de Juros Compostos
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-4">
              Descobre como o teu dinheiro pode crescer ao longo do tempo. Vê o poder dos juros compostos — "a oitava maravilha do mundo".
            </p>
          </div>
        </div>
        <CompoundInterestCalculator />
      </section>

        {/* Additional Resources Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
          <div className="bg-gradient-to-br from-primary-50 via-primary-50/80 to-white border border-primary-200/60 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-100/30 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 sm:mb-4">Mais Recursos</h2>
              <p className="text-base sm:text-lg text-neutral-700 mb-5 sm:mb-6 leading-relaxed">
                Além das calculadoras, temos artigos detalhados sobre finanças pessoais, investimentos e empreendedorismo.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <a
                  href="/artigos"
                  className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-800 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm sm:text-base touch-manipulation"
                  aria-label="Ver todos os artigos sobre finanças pessoais"
                >
                  Ver todos os artigos
                  <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="/artigos/fundacao-fundo-emergencia"
                  className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-white border border-primary text-primary font-bold rounded-xl hover:bg-primary-50 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm sm:text-base touch-manipulation"
                  aria-label="Ler artigo sobre fundo de emergência"
                >
                  Ler sobre fundo de emergência
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
