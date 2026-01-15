import { Metadata } from "next";
import RecursosClient from "./RecursosClient";

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

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Calculadoras Financeiras Gratuitas",
  "description": "Ferramentas práticas e calculadoras financeiras gratuitas para planear investimentos e gerir melhor as tuas finanças pessoais em Portugal.",
  "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aumentarcapital.com'}/recursos`,
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

export default function RecursosPage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <RecursosClient />
    </>
  );
}
