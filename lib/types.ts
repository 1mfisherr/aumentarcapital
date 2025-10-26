export interface ArticleMeta {
  title: string;
  slug: string;
  date: string;
  author: string;
  category: "Finanças pessoais" | "Investimentos" | "Empreendedorismo" | "Poupança" | "Dívidas";
  tags: string[];
  description: string;
  image: string;
  lang: "pt-PT";
  readingTime?: number;
}
