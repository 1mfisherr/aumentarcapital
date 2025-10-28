import { siteConfig } from "@/lib/site.config";

export const metadata = {
  title: "Sobre",
  description: "Conhece a missão e a equipa por trás do Aumentar Capital.",
  alternates: {
    canonical: `${siteConfig.url}/sobre`,
  },
};

export default function SobrePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-6 text-green-600">
        Sobre o {siteConfig.name}
      </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-base sm:text-lg text-gray-700 mb-6">
          Bem-vindo ao {siteConfig.name}, o teu guia completo para finanças pessoais,
          investimentos e empreendedorismo em Portugal.
        </p>

        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">
          A Nossa Missão
        </h2>
        <p className="text-gray-700 mb-4">
          A nossa missão é ajudar os portugueses a tomar melhores decisões financeiras,
          através de conteúdo claro, prático e acessível. Acreditamos que todos merecem
          ter acesso a informação de qualidade sobre como gerir o seu dinheiro,
          investir para o futuro e alcançar os seus objetivos financeiros.
        </p>

        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">
          O Que Fazemos
        </h2>
        <p className="text-gray-700 mb-4">
          Criamos artigos detalhados sobre:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
          <li>Finanças pessoais e gestão de orçamento</li>
          <li>Poupança e fundos de emergência</li>
          <li>Investimentos em Portugal e no estrangeiro</li>
          <li>Empreendedorismo e criação de negócios</li>
          <li>Gestão de dívidas e crédito</li>
        </ul>

        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">
          Quem Somos
        </h2>
        <p className="text-gray-700 mb-4">
          Somos apaixonados por finanças e por ajudar as pessoas a alcançarem
          a liberdade financeira. A nossa equipa é composta por profissionais
          com experiência em finanças, investimentos e educação financeira.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-5 sm:p-6 mt-8">
          <h3 className="text-lg sm:text-xl font-heading font-semibold mb-2">
            Tens perguntas ou sugestões?
          </h3>
          <p className="text-sm sm:text-base text-gray-700 mb-4">
            Adoraríamos ouvir-te! Entra em contacto connosco através da nossa
            página de contacto.
          </p>
          <a
            href="/contacto"
            className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Contacta-nos
          </a>
        </div>
      </div>
    </main>
  );
}

