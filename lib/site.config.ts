/**
 * SITE CONFIGURATION
 * 
 * This file contains all the main settings for your website.
 * You can easily edit these values to customize your site.
 * 
 * DO NOT edit the structure (export const siteConfig = {...}),
 * only edit the VALUES inside the quotes.
 */

export const siteConfig = {
  // Basic site information
  name: "Aumentar Capital",
  description: "Finanças pessoais, investimentos e empreendedorismo.",
  locale: "pt-PT",
  url: "https://aumentarcapital.com", // Change to your actual domain
  
  // Author/Owner information
  author: {
    name: "Delfim Almeida",
    email: "contacto@aumentarcapital.com", // Change to your email
  },

  // Navigation menu items (add or remove items here)
  nav: [
    { href: "/artigos", label: "Artigos" },
    { href: "/recursos", label: "Recursos" },
    { href: "/sobre", label: "Sobre" },
  ],

  // Newsletter settings
  newsletter: {
    enabled: true, // Set to false to hide newsletter signup
    provider: "mailerlite", // Options: mailerlite, buttondown, convertkit
    formAction: "", // Add your newsletter provider's form action URL here
    title: "Recebe as melhores dicas de finanças",
    description: "Junta-te a milhares de leitores e recebe artigos exclusivos sobre poupança, investimentos e empreendedorismo.",
  },

  // Ads configuration
  ads: {
    enabled: false, // Set to true when you're ready to show ads
    adsenseClientId: "", // Add your Google AdSense client ID here (e.g., "ca-pub-XXXXXXXXXX")
  },

  // Analytics
  analytics: {
    enabled: true, // Set to true when you add analytics
    plausibleDomain: "", // If using Plausible, add your domain here
    googleAnalyticsId: "G-JRHYS36J4N", // If using GA4, add your ID here (e.g., "G-XXXXXXXXXX")
  },

  // SEO & Search Console
  seo: {
    googleSiteVerification: "", // Add your Google Search Console verification code here
    bingSiteVerification: "", // Add your Bing Webmaster verification code here
  },

  // Social media links (add your profiles here)
  social: {
    twitter: "https://twitter.com/aumentarcapital", // Change to your Twitter/X
    facebook: "https://facebook.com/aumentarcapital", // Change to your Facebook
    instagram: "https://instagram.com/aumentarcapital", // Change to your Instagram
    linkedin: "https://linkedin.com/in/aumentarcapital", // Change to your LinkedIn
  },

  // Hero section configuration
  hero: {
    headline: "Torna-te Financeiramente Independente",
    subheadline: "Guias práticos e ferramentas gratuitas para gerir o teu dinheiro, investir com confiança e construir riqueza em Portugal.",
    ctaPrimary: {
      text: "Começar Agora",
      href: "/artigos/guia-inicial-literacia-financeira"
    },
    ctaSecondary: {
      text: "Ferramentas Grátis",
      href: "/recursos"
    },
    trustIndicators: {
      readers: "5.000",
      guides: "50",
      free: true
    }
  },
} as const;

