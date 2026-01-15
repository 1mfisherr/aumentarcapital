/**
 * JSON-LD Schema Utilities
 * 
 * Consolidated schema generators for SEO structured data.
 * These functions generate Google-compliant JSON-LD markup.
 */

import { ArticleData, ArticleMeta } from "./types";

export interface SiteConfigForSchema {
  name: string;
  description: string;
  url: string;
  locale?: string;
  author: {
    name: string;
    email: string;
  };
  social: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

/**
 * Generate Article schema for blog posts
 * @see https://schema.org/Article
 */
export function generateArticleSchema(
  post: ArticleData,
  siteConfig: SiteConfigForSchema,
  wordCount?: number
) {
  const categoryForSchema = Array.isArray(post.category) 
    ? post.category[0] 
    : post.category;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: {
      "@type": "ImageObject",
      url: post.image.startsWith("http") 
        ? post.image 
        : `${siteConfig.url}${post.image}`,
      width: post.imageWidth || 1200,
      height: post.imageHeight || 628,
      ...(post.imageAlt && { caption: post.imageAlt }),
    },
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/aumentarcapital_logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/artigos/${post.slug}`,
    },
    ...(categoryForSchema && { articleSection: categoryForSchema }),
    ...(post.tags && post.tags.length > 0 && { keywords: post.tags.join(", ") }),
    ...(wordCount && { wordCount }),
    ...(post.readingTime && { timeRequired: `PT${post.readingTime}M` }),
    inLanguage: "pt-PT",
    isAccessibleForFree: true,
  };
}

/**
 * Generate BreadcrumbList schema
 * @see https://schema.org/BreadcrumbList
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  siteConfig: SiteConfigForSchema
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * Generate FAQPage schema for FAQ sections
 * @see https://schema.org/FAQPage
 */
export function generateFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Organization schema for the brand
 * @see https://schema.org/Organization
 */
export function generateOrganizationSchema(siteConfig: SiteConfigForSchema) {
  const socialLinks = [
    siteConfig.social.twitter,
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.linkedin,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/opengraph-image`,
    description: siteConfig.description,
    sameAs: socialLinks,
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.author.email,
      contactType: "customer service",
    },
  };
}

/**
 * Generate WebSite schema with search action
 * @see https://schema.org/WebSite
 */
export function generateWebSiteSchema(siteConfig: SiteConfigForSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "pt-PT",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/artigos?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate HowTo schema for tutorial articles
 * @see https://schema.org/HowTo
 */
export function generateHowToSchema(
  title: string,
  description: string,
  steps: { name: string; text: string }[],
  siteConfig: SiteConfigForSchema,
  image?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description: description,
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
      },
    }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Generate FinancialProduct schema for calculator tools
 * @see https://schema.org/SoftwareApplication
 */
export function generateToolSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  };
}

/**
 * Helper to safely stringify schema for injection
 */
export function stringifySchema(schema: object): string {
  return JSON.stringify(schema, null, 0);
}
