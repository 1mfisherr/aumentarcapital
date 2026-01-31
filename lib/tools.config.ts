/**
 * Shared tool IDs and metadata for Recursos (calculators).
 * Used by /recursos listing and /recursos/[toolId] full-page routes.
 */

export const TOOL_IDS = [
  "cash-flow",
  "emergency-fund",
  "compound-interest",
  "mortgage-amortization",
] as const;

export type ToolId = (typeof TOOL_IDS)[number];

export function isToolId(slug: string): slug is ToolId {
  return TOOL_IDS.includes(slug as ToolId);
}

export const TOOLS_META: Record<
  ToolId,
  { title: string; description: string; shortDescription: string }
> = {
  "cash-flow": {
    title: "Visualizador de Fluxo de Caixa",
    description:
      "Descobre para onde vai o teu dinheiro e se tens excedente ou défice. O primeiro passo para controlo financeiro.",
    shortDescription: "O primeiro passo para a tua independência financeira.",
  },
  "emergency-fund": {
    title: "Calculadora de Fundo de Emergência",
    description:
      "Calcula quanto deves poupar para emergências e quanto tempo levará a construir o teu fundo de segurança.",
    shortDescription: "Constrói o teu colchão de segurança, passo a passo.",
  },
  "compound-interest": {
    title: "Simulador de Juros Compostos",
    description:
      "Simula o crescimento do teu investimento ao longo do tempo e vê o poder dos juros compostos em ação.",
    shortDescription: "Vê o teu dinheiro crescer ao longo do tempo.",
  },
  "mortgage-amortization": {
    title: "Simulador de Amortização de Crédito Habitação",
    description:
      "Calcula quanto poupas em juros ao fazer amortizações extra no crédito habitação e vê o impacto na prestação.",
    shortDescription: "Descobre quanto podes poupar ao amortizar o crédito.",
  },
};
