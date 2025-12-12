import { Metadata } from "next";
import EmergencyFundCalculator from "@/components/EmergencyFundCalculator";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Recursos - Calculadora de Fundo de Emergência",
  description: "Calculadora gratuita de fundo de emergência. Descubra quanto deve poupar para emergências e quanto tempo levará a construir o seu fundo de segurança financeira. Ferramenta prática para planeamento financeiro em Portugal.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aumentarcapital.com'}/recursos`,
  },
  openGraph: {
    title: "Recursos - Calculadora de Fundo de Emergência | Aumentar Capital",
    description: "Calculadora gratuita de fundo de emergência. Descubra quanto deve poupar para emergências e quanto tempo levará a construir o seu fundo de segurança financeira.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aumentarcapital.com'}/recursos`,
  },
};

export default function RecursosPage() {
  return (
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
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-neutral-900">
              Recursos Financeiros
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
              Ferramentas práticas e calculadoras para te ajudar a gerir melhor as tuas finanças pessoais e tomar decisões informadas.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">💰</div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">Fundo de Emergência</h2>
              <p className="text-neutral-600 mb-4 text-sm leading-relaxed">
                Calcula quanto deves poupar para emergências e quanto tempo levará a construir o teu fundo de segurança.
              </p>
              <a
                href="#calculadora-fundo-emergencia"
                className="text-primary font-semibold text-sm hover:text-primary-600 transition-colors inline-flex items-center gap-1 group-hover:gap-2"
              >
                Usar calculadora
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 opacity-60">
              <div className="text-5xl mb-4">📊</div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2">Calculadora de Orçamento</h2>
              <p className="text-neutral-600 mb-4 text-sm leading-relaxed">
                Em breve: Cria e gere o teu orçamento mensal de forma simples e eficaz.
              </p>
              <span className="text-neutral-400 font-medium text-sm">Em breve</span>
            </div>

            <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 opacity-60">
              <div className="text-5xl mb-4">📈</div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2">Simulador de Investimentos</h2>
              <p className="text-neutral-600 mb-4 text-sm leading-relaxed">
                Em breve: Simula diferentes cenários de investimento e vê o potencial crescimento do teu capital.
              </p>
              <span className="text-neutral-400 font-medium text-sm">Em breve</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculadora-fundo-emergencia" className="scroll-mt-20">
        <EmergencyFundCalculator />
      </section>

      {/* Additional Resources Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="bg-gradient-to-br from-primary-50 via-primary-50/80 to-white border border-primary-200/60 rounded-2xl p-8 lg:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary-100/30 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Mais Recursos</h2>
            <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
              Além das calculadoras, temos artigos detalhados sobre finanças pessoais, investimentos e empreendedorismo.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/artigos"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-800 hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-200"
              >
                Ver todos os artigos
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/artigos/fundacao-fundo-emergencia"
                className="inline-flex items-center px-6 py-3 bg-white border border-primary text-primary font-bold rounded-xl hover:bg-primary-50 hover:shadow-md transition-all duration-200"
              >
                Ler sobre fundo de emergência
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
