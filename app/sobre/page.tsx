import { siteConfig } from "@/lib/site.config";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "Sobre Nós - Aumentar Capital",
  description: "Conhece a missão e a equipa por trás do Aumentar Capital. Ajudamos portugueses a tomar melhores decisões financeiras através de conteúdo claro, prático e acessível sobre finanças pessoais, investimentos e empreendedorismo.",
  alternates: {
    canonical: `${siteConfig.url}/sobre`,
  },
  openGraph: {
    title: "Sobre Nós - Aumentar Capital",
    description: "Conhece a missão e a equipa por trás do Aumentar Capital. Ajudamos portugueses a tomar melhores decisões financeiras.",
    type: "website",
    url: `${siteConfig.url}/sobre`,
  },
};

export default function SobrePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Sobre", href: "/sobre" },
        ]}
      />
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-neutral-900 tracking-tight">
        Sobre o {siteConfig.name}
      </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl sm:text-2xl text-neutral-700 mb-10 leading-relaxed font-medium">
          Bem-vindo ao {siteConfig.name}, o teu guia completo para finanças pessoais,
          investimentos e empreendedorismo em Portugal.
        </p>

        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 lg:p-8 mb-8 shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-3xl font-bold mt-0 mb-5 text-neutral-900">
            A Nossa Missão
          </h2>
          <p className="text-neutral-700 mb-0 leading-relaxed text-lg">
            A nossa missão é ajudar os portugueses a tomar melhores decisões financeiras,
            através de conteúdo claro, prático e acessível. Acreditamos que todos merecem
            ter acesso a informação de qualidade sobre como gerir o seu dinheiro,
            investir para o futuro e alcançar os seus objetivos financeiros.
          </p>
        </div>

        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 lg:p-8 mb-8 shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-3xl font-bold mt-0 mb-5 text-neutral-900">
            O Que Fazemos
          </h2>
          <p className="text-neutral-700 mb-5 leading-relaxed text-lg">
            Criamos artigos detalhados sobre:
          </p>
          <ul className="space-y-3 text-neutral-700 mb-0 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl">💰</span>
              <span>Finanças pessoais e gestão de orçamento</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl">💵</span>
              <span>Poupança e fundos de emergência</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl">📈</span>
              <span>Investimentos em Portugal e no estrangeiro</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl">🚀</span>
              <span>Empreendedorismo e criação de negócios</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-xl">📊</span>
              <span>Gestão de dívidas e crédito</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 lg:p-8 mb-8 shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-3xl font-bold mt-0 mb-5 text-neutral-900">
            Quem Somos
          </h2>
          <p className="text-neutral-700 mb-0 leading-relaxed text-lg">
            Somos apaixonados por finanças e por ajudar as pessoas a alcançarem
            a liberdade financeira. A nossa equipa é composta por profissionais
            com experiência em finanças, investimentos e educação financeira.
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary-50 via-primary-50/80 to-white border border-primary-200/60 rounded-2xl p-8 lg:p-10 mt-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary-100/30 rounded-full blur-3xl" />
          <div className="relative">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-neutral-900">
              Tens perguntas ou sugestões?
            </h3>
            <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
              Adoraríamos ouvir-te! Entra em contacto connosco através da nossa
              página de contacto.
            </p>
            <a
              href="/contacto"
              className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary-800 hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-200"
            >
              <span>Contacta-nos</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

