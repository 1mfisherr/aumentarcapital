import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recursos - Aumentar Capital",
  description: "Ferramentas, guias e recursos essenciais para melhorar as suas finanças pessoais e aumentar o seu capital.",
};

export default function RecursosPage() {
  const recursos = [
    {
      category: "Calculadoras Financeiras",
      items: [
        {
          title: "Calculadora de Orçamento",
          description: "Organize as suas receitas e despesas mensais",
          link: "#",
          available: false,
        },
        {
          title: "Calculadora de Juros Compostos",
          description: "Veja como os seus investimentos podem crescer ao longo do tempo",
          link: "#",
          available: false,
        },
        {
          title: "Calculadora de Fundo de Emergência",
          description: "Descubra quanto deve poupar para emergências",
          link: "#",
          available: false,
        },
      ],
    },
    {
      category: "Templates e Guias",
      items: [
        {
          title: "Template de Orçamento Excel",
          description: "Planilha completa para gerir o seu orçamento mensal",
          link: "#",
          available: false,
        },
        {
          title: "Guia de Investimentos para Iniciantes",
          description: "PDF com tudo o que precisa saber para começar a investir",
          link: "#",
          available: false,
        },
        {
          title: "Checklist Financeira Anual",
          description: "Lista de tarefas financeiras para fazer todos os anos",
          link: "#",
          available: false,
        },
      ],
    },
    {
      category: "Ferramentas Recomendadas",
      items: [
        {
          title: "Apps de Gestão Financeira",
          description: "As melhores aplicações para controlar o seu dinheiro",
          link: "#",
          available: false,
        },
        {
          title: "Plataformas de Investimento",
          description: "Onde investir o seu dinheiro com segurança",
          link: "#",
          available: false,
        },
        {
          title: "Livros Recomendados",
          description: "Os melhores livros sobre finanças pessoais",
          link: "#",
          available: false,
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Recursos Gratuitos
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
              Ferramentas, templates e guias para ajudá-lo a construir uma base financeira sólida
              e alcançar os seus objetivos.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="space-y-16">
          {recursos.map((categoria, idx) => (
            <div key={idx}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                {categoria.category}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoria.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    {item.available ? (
                      <Link
                        href={item.link}
                        className="inline-flex items-center text-blue-700 font-semibold hover:text-blue-900 transition-colors duration-200"
                      >
                        Aceder ao recurso
                        <svg
                          className="w-5 h-5 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    ) : (
                      <span className="inline-flex items-center text-gray-400 font-medium">
                        Em breve
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-700 to-blue-900 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Quer receber novos recursos?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscreva a nossa newsletter e seja o primeiro a receber novas ferramentas,
            guias e recursos gratuitos.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-colors duration-200"
          >
            Subscrever Newsletter
          </Link>
        </div>
      </section>
    </main>
  );
}

