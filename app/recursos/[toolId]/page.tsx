import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site.config";
import { isToolId, TOOLS_META, type ToolId } from "@/lib/tools.config";
import ToolPageContent from "./ToolPageContent";

type Props = { params: Promise<{ toolId: string }> };

export async function generateStaticParams() {
  return [
    { toolId: "cash-flow" },
    { toolId: "emergency-fund" },
    { toolId: "compound-interest" },
    { toolId: "mortgage-amortization" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { toolId } = await params;
  if (!isToolId(toolId)) return { title: "Ferramenta" };
  const meta = TOOLS_META[toolId as ToolId];
  const canonicalUrl = `${siteConfig.url}/recursos/${toolId}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${meta.title} | ${siteConfig.name}`,
      description: meta.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} | ${siteConfig.name}`,
      description: meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ToolPage({ params }: Props) {
  const { toolId } = await params;
  if (!isToolId(toolId)) notFound();
  return <ToolPageContent toolId={toolId as ToolId} />;
}
