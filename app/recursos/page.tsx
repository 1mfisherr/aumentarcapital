import { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";
import RecursosClient from "./RecursosClient";

export const metadata: Metadata = {
  title: "Calculadoras Financeiras Gratuitas | Recursos Financeiros",
  description: "Calculadoras financeiras gratuitas e ferramentas práticas: visualizador de fluxo de caixa, simulador de juros compostos, calculadora de fundo de emergência e simulador de amortização de crédito habitação. Planear investimentos e finanças pessoais em Portugal.",
  keywords: [
    "calculadora financeira",
    "calculadora juros compostos",
    "fundo de emergência",
    "fluxo de caixa",
    "finanças pessoais",
    "calculadora investimentos",
    "planeamento financeiro",
    "Portugal",
    "simulador amortização crédito habitação portugal",
    "poupar juros banco",
    "amortizar crédito habitação",
    "calculadora crédito habitação",
    "amortização antecipada",
    "reduzir prestação casa",
  ],
  alternates: {
    canonical: `${siteConfig.url}/recursos`,
  },
  openGraph: {
    title: "Calculadoras Financeiras Gratuitas | Aumentar Capital",
    description: "Ferramentas práticas e calculadoras financeiras gratuitas para planear investimentos, simular amortização de crédito habitação e gerir melhor as tuas finanças pessoais em Portugal.",
    type: "website",
    url: `${siteConfig.url}/recursos`,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Calculadoras Financeiras - Aumentar Capital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadoras Financeiras Gratuitas | Aumentar Capital",
    description: "Ferramentas práticas para planear investimentos, simular amortização de crédito e gerir melhor as tuas finanças pessoais.",
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
  "url": `${siteConfig.url}/recursos`,
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "SoftwareApplication",
        "position": 1,
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
        "position": 2,
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
        "position": 3,
        "name": "Simulador de Juros Compostos",
        "description": "Simula o crescimento do teu investimento ao longo do tempo e vê o poder dos juros compostos em ação.",
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
        "position": 4,
        "name": "Simulador de Amortização de Crédito Habitação",
        "description": "Calcula quanto poupas em juros ao fazer amortizações extra no crédito habitação e vê o impacto na prestação mensal.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "keywords": "amortização crédito habitação, poupar juros, crédito habitação portugal",
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
