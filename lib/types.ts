/**
 * Type Definitions for Aumentar Capital
 * 
 * Central type definitions for the website.
 */

// =================================================================
// ARTICLE TYPES
// =================================================================

export type CategoryType = 
  | "Finanças Pessoais" 
  | "Investimentos" 
  | "Empreendedorismo" 
  | "Poupança" 
  | "Fazer Dinheiro Online"
  | "Literacia Financeira";

export type ArticleType = "foundation" | "supporting";
export type IntentTag = "saving" | "investing" | "debt" | "budgeting" | "emergency" | "income";

/** ISO 8601 date string format (YYYY-MM-DD) */
export type ISODateString = `${number}-${number}-${number}`;

export interface ArticleMeta {
  title: string;
  slug: string;
  /** Publication date in ISO 8601 format (YYYY-MM-DD) */
  date: string;
  /** Last modification date in ISO 8601 format (YYYY-MM-DD) */
  lastModified?: string;
  author: string;
  category: CategoryType | CategoryType[];
  categories?: CategoryType[];
  tags: string[];
  description: string;
  image: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  lang: "pt-PT";
  readingTime?: number;
  type?: ArticleType;
  trail?: string[];
  intent?: IntentTag | IntentTag[];
}

export interface ArticleData extends ArticleMeta {
  contentHtml: string;
}

// =================================================================
// SITE CONFIG TYPES
// =================================================================

export interface SiteAuthor {
  name: string;
  email: string;
}

export interface SiteSocial {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export interface SiteNewsletter {
  enabled: boolean;
  provider: "mailerlite" | "buttondown" | "convertkit";
  formAction: string;
  title: string;
  description: string;
}

export interface SiteAds {
  enabled: boolean;
  adsenseClientId?: string;
}

export interface SiteAnalytics {
  enabled: boolean;
  plausibleDomain?: string;
  googleAnalyticsId?: string;
}

export interface SiteSEO {
  googleSiteVerification?: string;
  bingSiteVerification?: string;
}

export interface SiteHero {
  headline: string;
  subheadline: string;
  ctaPrimary: {
    text: string;
    href: string;
  };
  ctaSecondary: {
    text: string;
    href: string;
  };
  trustIndicators: {
    readers: string;
    guides: string;
    free: boolean;
  };
}

export interface NavItem {
  href: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  locale: "pt-PT";
  url: string;
  author: SiteAuthor;
  nav: NavItem[];
  newsletter: SiteNewsletter;
  ads: SiteAds;
  analytics: SiteAnalytics;
  seo: SiteSEO;
  social: SiteSocial;
  hero: SiteHero;
}

// =================================================================
// UTILITY TYPES
// =================================================================

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// =================================================================
// VALIDATION UTILITIES
// =================================================================

/**
 * Validates if a string is in ISO 8601 date format (YYYY-MM-DD)
 */
export function isValidISODate(date: string): boolean {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoDateRegex.test(date)) return false;
  
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
}

/**
 * Validates article metadata
 */
export function validateArticleMeta(meta: Partial<ArticleMeta>): string[] {
  const errors: string[] = [];
  
  if (!meta.title?.trim()) {
    errors.push("Title is required");
  }
  
  if (!meta.slug?.trim()) {
    errors.push("Slug is required");
  }
  
  if (!meta.date) {
    errors.push("Date is required");
  } else if (!isValidISODate(meta.date)) {
    errors.push("Date must be in ISO 8601 format (YYYY-MM-DD)");
  }
  
  if (meta.lastModified && !isValidISODate(meta.lastModified)) {
    errors.push("Last modified date must be in ISO 8601 format (YYYY-MM-DD)");
  }
  
  if (!meta.author?.trim()) {
    errors.push("Author is required");
  }
  
  if (!meta.description?.trim()) {
    errors.push("Description is required");
  }
  
  if (!meta.image?.trim()) {
    errors.push("Image is required");
  }
  
  return errors;
}

/**
 * Type guard for checking if a category is valid
 */
export function isValidCategory(category: string): category is CategoryType {
  const validCategories: CategoryType[] = [
    "Finanças Pessoais",
    "Investimentos",
    "Empreendedorismo",
    "Poupança",
    "Fazer Dinheiro Online",
    "Literacia Financeira",
  ];
  return validCategories.includes(category as CategoryType);
}