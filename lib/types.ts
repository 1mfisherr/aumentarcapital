type CategoryType = "Finanças Pessoais" | "Investimentos" | "Empreendedorismo" | "Poupança" | "Fazer Dinheiro Online";

export type ArticleType = "foundation" | "supporting";
export type IntentTag = "saving" | "investing" | "debt" | "budgeting" | "emergency" | "income";

export interface ArticleMeta {
  title: string;
  slug: string;
  date: string;
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