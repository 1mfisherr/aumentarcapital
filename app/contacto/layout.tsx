import { siteConfig } from "@/lib/site.config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - Entra em Contacto Connosco",
  description: "Tens alguma pergunta, sugestão ou feedback? Contacta a equipa do Aumentar Capital. Respondemos a todas as mensagens dentro de 24-48 horas.",
  alternates: {
    canonical: `${siteConfig.url}/contacto`,
  },
  openGraph: {
    title: "Contacto - Aumentar Capital",
    description: "Tens alguma pergunta, sugestão ou feedback? Contacta a equipa do Aumentar Capital.",
    type: "website",
    url: `${siteConfig.url}/contacto`,
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
