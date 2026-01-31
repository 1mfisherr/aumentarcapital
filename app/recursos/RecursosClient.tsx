"use client";

import { useState, useMemo, useCallback, ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ToolCard } from "@/components/tools";
import {
  IconSearch,
  IconX,
  IconPieChart,
  IconWallet,
  IconTrendingUp,
  IconHome,
  IconArrowRight,
} from "@/components/icons/ShellIcons";
import type { ToolId } from "@/lib/tools.config";

// Tool definitions (metadata for listing; full pages live at /recursos/[toolId])
type ToolCategory = "daily" | "investments" | "credit";
type ToolIconKey = "cash" | "wallet" | "trending" | "home";
type CategoryIconKey = "chart" | "trending" | "home";

interface Tool {
  id: ToolId;
  title: string;
  description: string;
  iconKey: ToolIconKey;
  ctaText: string;
  category: ToolCategory;
}

function getToolIcon(key: ToolIconKey): ReactNode {
  const className = "w-full h-full text-[var(--color-primary)]";
  switch (key) {
    case "cash": return <IconPieChart className={className} />;
    case "wallet": return <IconWallet className={className} />;
    case "trending": return <IconTrendingUp className={className} />;
    case "home": return <IconHome className={className} />;
  }
}

function getCategoryIcon(key: CategoryIconKey): ReactNode {
  const className = "w-5 h-5 text-[var(--color-primary)] flex-shrink-0";
  switch (key) {
    case "chart": return <IconPieChart className={className} />;
    case "trending": return <IconTrendingUp className={className} />;
    case "home": return <IconHome className={className} />;
  }
}

// Category definitions with labels and order
const TOOL_CATEGORIES: Record<ToolCategory, { label: string; iconKey: CategoryIconKey; priority: number }> = {
  daily: { label: "Gestão Diária", iconKey: "chart", priority: 1 },
  investments: { label: "Investimentos", iconKey: "trending", priority: 2 },
  credit: { label: "Crédito & Habitação", iconKey: "home", priority: 3 },
};

const TOOLS: Tool[] = [
  {
    id: "cash-flow",
    title: "Visualizador de Fluxo de Caixa",
    description: "Descobre para onde vai o teu dinheiro e se tens excedente ou défice. O primeiro passo para controlo financeiro.",
    iconKey: "cash",
    ctaText: "Usar ferramenta",
    category: "daily",
  },
  {
    id: "emergency-fund",
    title: "Calculadora de Fundo de Emergência",
    description: "Calcula quanto deves poupar para emergências e quanto tempo levará a construir o teu fundo de segurança.",
    iconKey: "wallet",
    ctaText: "Usar calculadora",
    category: "daily",
  },
  {
    id: "compound-interest",
    title: "Simulador de Juros Compostos",
    description: "Simula o crescimento do teu investimento ao longo do tempo e vê o poder dos juros compostos em ação.",
    iconKey: "trending",
    ctaText: "Usar calculadora",
    category: "investments",
  },
  {
    id: "mortgage-amortization",
    title: "Simulador de Amortização de Crédito Habitação",
    description: "Calcula quanto poupas em juros ao fazer amortizações extra no crédito habitação e vê o impacto na prestação.",
    iconKey: "home",
    ctaText: "Usar simulador",
    category: "credit",
  },
];

// Filter pill component
function FilterPill({
  label,
  isActive,
  onClick,
  icon,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-sm font-medium
        transition-all duration-200 touch-manipulation
        ${isActive
          ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-sm)]"
          : "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-ink-muted)] hover:text-[var(--color-primary)]"
        }
      `}
      aria-pressed={isActive}
    >
      {icon}
      {label}
    </button>
  );
}

export default function RecursosClient() {
  // Filter state
  const [activeCategory, setActiveCategory] = useState<ToolCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter tools based on category and search
  const filteredTools = useMemo(() => {
    let result = TOOLS;
    
    // Filter by category
    if (activeCategory) {
      result = result.filter(t => t.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [activeCategory, searchQuery]);

  // Group tools by category for display
  const toolsByCategory = useMemo(() => {
    const grouped: Record<ToolCategory, Tool[]> = {
      daily: [],
      investments: [],
      credit: [],
    };
    
    filteredTools.forEach(tool => {
      grouped[tool.category].push(tool);
    });
    
    return grouped;
  }, [filteredTools]);

  // Get sorted categories (by priority)
  const sortedCategories = useMemo(() => {
    return Object.entries(TOOL_CATEGORIES)
      .sort(([, a], [, b]) => a.priority - b.priority)
      .map(([key]) => key as ToolCategory);
  }, []);

  // Check if any filters are active
  const hasActiveFilters = activeCategory !== null || searchQuery.trim() !== "";

  const clearFilters = useCallback(() => {
    setActiveCategory(null);
    setSearchQuery("");
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="content-container">
          <Breadcrumbs
            items={[
              { label: "Início", href: "/" },
              { label: "Recursos", href: "/recursos" },
            ]}
          />
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-[var(--color-ink)] tracking-tight px-4">
              Calculadoras Financeiras Gratuitas
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[var(--color-ink-secondary)] leading-relaxed mb-3 sm:mb-4 px-4">
              Ferramentas práticas e calculadoras para te ajudar a gerir melhor as tuas finanças pessoais e tomar decisões informadas.
            </p>
            <p className="text-sm sm:text-base text-[var(--color-ink-muted)] px-4">
              Todas as calculadoras são 100% gratuitas, sem registo necessário, e funcionam diretamente no teu navegador.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mb-10 sm:mb-12">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4 sm:p-5 shadow-[var(--shadow-sm)]">
              <div className="relative mb-4">
                <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-ink-muted)]" aria-hidden />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar ferramentas..."
                  className="w-full pl-12 pr-10 py-3 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all duration-200 text-base text-[var(--color-ink)] bg-[var(--color-background)]"
                  aria-label="Pesquisar ferramentas"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
                    aria-label="Limpar pesquisa"
                  >
                    <IconX className="w-4 h-4" aria-hidden />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <FilterPill
                  label="Todas"
                  isActive={activeCategory === null}
                  onClick={() => setActiveCategory(null)}
                />
                {sortedCategories.map((categoryKey) => (
                  <FilterPill
                    key={categoryKey}
                    label={TOOL_CATEGORIES[categoryKey].label}
                    icon={getCategoryIcon(TOOL_CATEGORIES[categoryKey].iconKey)}
                    isActive={activeCategory === categoryKey}
                    onClick={() => setActiveCategory(activeCategory === categoryKey ? null : categoryKey)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Tools — bento dashboard */}
          <div className="space-y-10 sm:space-y-12 mb-12 sm:mb-16">
            {filteredTools.length === 0 ? (
              <div className="text-center py-14 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl">
                <IconSearch className="w-12 h-12 mx-auto mb-4 text-[var(--color-ink-muted)]" aria-hidden />
                <p className="text-[var(--color-ink)] font-semibold mb-2">Nenhuma ferramenta encontrada</p>
                <p className="text-sm text-[var(--color-ink-muted)] mb-5">
                  Tenta ajustar os filtros ou a pesquisa
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="btn-secondary text-sm"
                >
                  Limpar filtros
                </button>
              </div>
            ) : hasActiveFilters ? (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <p className="text-sm text-[var(--color-ink-muted)]">
                    {filteredTools.length} {filteredTools.length === 1 ? "ferramenta encontrada" : "ferramentas encontradas"}
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
                  >
                    Limpar filtros
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      id={tool.id}
                      title={tool.title}
                      description={tool.description}
                      icon={getToolIcon(tool.iconKey)}
                      href={`/recursos/${tool.id}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Bento hero: first two tools as featured */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 mb-10">
                  {TOOLS.slice(0, 2).map((tool) => (
                    <ToolCard
                      key={tool.id}
                      id={tool.id}
                      title={tool.title}
                      description={tool.description}
                      icon={getToolIcon(tool.iconKey)}
                      href={`/recursos/${tool.id}`}
                      featured
                    />
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
                  {TOOLS.slice(2).map((tool) => (
                    <ToolCard
                      key={tool.id}
                      id={tool.id}
                      title={tool.title}
                      description={tool.description}
                      icon={getToolIcon(tool.iconKey)}
                      href={`/recursos/${tool.id}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Mais Recursos CTA */}
          <div className="bg-[var(--color-background-subtle)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-50 blur-3xl bg-[var(--color-primary)]" style={{ opacity: 0.06 }} aria-hidden />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)] mb-3 sm:mb-4 tracking-tight">Mais Recursos</h2>
              <p className="text-base sm:text-lg text-[var(--color-ink-secondary)] mb-5 sm:mb-6 leading-relaxed">
                Além das calculadoras, temos artigos detalhados sobre finanças pessoais, investimentos e empreendedorismo.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <a
                  href="/artigos"
                  className="btn-primary inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                  aria-label="Ver todos os artigos sobre finanças pessoais"
                >
                  Ver todos os artigos
                  <IconArrowRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden />
                </a>
                <a
                  href="/artigos/fundacao-fundo-emergencia"
                  className="btn-secondary inline-flex items-center justify-center text-sm sm:text-base"
                  aria-label="Ler artigo sobre fundo de emergência"
                >
                  Ler sobre fundo de emergência
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
