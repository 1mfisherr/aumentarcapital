type CategoryType = "Finanças Pessoais" | "Investimentos" | "Empreendedorismo" | "Poupança" | "Fazer Dinheiro Online";

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
}
