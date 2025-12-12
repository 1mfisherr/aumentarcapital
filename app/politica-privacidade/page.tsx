import { siteConfig } from "@/lib/site.config";

export const metadata = {
  title: "Política de Privacidade - Aumentar Capital",
  description: "Política de privacidade e proteção de dados do Aumentar Capital. Conhece como protegemos e utilizamos as tuas informações pessoais. Conformidade com RGPD.",
  alternates: {
    canonical: `${siteConfig.url}/politica-privacidade`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PoliticaPrivacidadePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-6 text-primary">
        Política de Privacidade
      </h1>

      <div className="prose max-w-none text-gray-700">
        <p className="text-sm text-gray-600 mb-6">
          Última atualização: {new Date().toLocaleDateString("pt-PT")}
        </p>

        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">
          1. Introdução
        </h2>
        <p>
          O {siteConfig.name} ("{siteConfig.name}", "nós", "nos" ou "nosso")
          respeita a tua privacidade e está comprometido em proteger os teus dados
          pessoais. Esta política de privacidade explica como recolhemos, usamos e
          protegemos as tuas informações.
        </p>

        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">
          2. Informações que Recolhemos
        </h2>
        <p>Podemos recolher as seguintes informações:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Nome e informação de contacto (email)</li>
          <li>Informações de navegação (através de cookies)</li>
          <li>Feedback e mensagens que nos envias</li>
        </ul>

        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">
          3. Como Usamos as Tuas Informações
        </h2>
        <p>Usamos as tuas informações para:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Enviar-te a nossa newsletter (se subscreveste)</li>
          <li>Responder às tuas perguntas e mensagens</li>
          <li>Melhorar o nosso website e conteúdo</li>
          <li>Analisar o uso do website (analytics)</li>
        </ul>

        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">
          4. Cookies
        </h2>
        <p>
          Usamos cookies para melhorar a tua experiência no nosso website. Podes
          configurar o teu navegador para recusar cookies, mas isso pode afetar
          algumas funcionalidades do site.
        </p>

        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">
          5. Partilha de Informações
        </h2>
        <p>
          Não vendemos, trocamos ou transferimos as tuas informações pessoais para
          terceiros sem o teu consentimento, exceto quando necessário para fornecer
          os nossos serviços (por exemplo, fornecedores de email marketing).
        </p>

        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">
          6. Os Teus Direitos
        </h2>
        <p>Tens o direito de:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Aceder aos teus dados pessoais</li>
          <li>Corrigir dados incorretos</li>
          <li>Solicitar a eliminação dos teus dados</li>
          <li>Cancelar a subscrição da newsletter a qualquer momento</li>
        </ul>

        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">
          7. Segurança
        </h2>
        <p>
          Implementamos medidas de segurança adequadas para proteger as tuas
          informações contra acesso não autorizado, alteração, divulgação ou
          destruição.
        </p>

        <h2 className="text-2xl font-heading font-semibold mt-8 mb-4">
          8. Contacto
        </h2>
        <p>
          Se tiveres alguma pergunta sobre esta política de privacidade, entra em
          contacto connosco através de:{" "}
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
          >
            {siteConfig.author.email}
          </a>
        </p>

        <div className="bg-primary-50 border border-primary-200 rounded-lg p-5 sm:p-6 mt-8">
          <p className="text-sm">
            <strong>Nota:</strong> Esta é uma política de privacidade básica. Dependendo
            dos serviços que uses (analytics, ads, etc.), poderás precisar de adicionar
            mais informações. Consulta um advogado para garantir conformidade total com
            o RGPD (Regulamento Geral de Proteção de Dados).
          </p>
        </div>
      </div>
    </main>
  );
}

