import { siteConfig } from "@/lib/site.config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade do Aumentar Capital. Saiba como tratamos e protegemos os seus dados pessoais.",
  alternates: {
    canonical: `${siteConfig.url}/politica-privacidade`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PoliticaPrivacidadeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
