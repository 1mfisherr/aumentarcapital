"use client";

import { useState, useCallback, useEffect, lazy, Suspense, useMemo, ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ToolCard, ToolModal } from "@/components/tools";
import CalculatorErrorBoundary from "@/components/CalculatorErrorBoundary";
import { IconCash, IconWallet, IconTrendingUp, IconHome, IconChart } from "@/components/icons/ExecutiveIcons";

// Lazy load calculator components for better initial page performance
const CashFlowVisualizer = lazy(() => import("@/components/CashFlowVisualizer"));
const EmergencyFundCalculator = lazy(() => import("@/components/EmergencyFundCalculator"));
const CompoundInterestCalculator = lazy(() => import("@/components/CompoundInterestCalculator"));
const MortgageAmortizationCalculator = lazy(() => import("@/components/MortgageAmortizationCalculator"));

// Tool definitions
type ToolId = "cash-flow" | "emergency-fund" | "compound-interest" | "mortgage-amortization";
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
  const className = "w-full h-full text-[#0A261F]";
  switch (key) {
    case "cash": return <IconCash className={className} />;
    case "wallet": return <IconWallet className={className} />;
    case "trending": return <IconTrendingUp className={className} />;
    case "home": return <IconHome className={className} />;
  }
}

function getCategoryIcon(key: CategoryIconKey): ReactNode {
  const className = "w-5 h-5 text-[#0A261F] flex-shrink-0";
  switch (key) {
    case "chart": return <IconChart className={className} />;
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

// Loading fallback for lazy-loaded calculators
function CalculatorLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
      <p className="text-neutral-600 font-medium">A carregar calculadora...</p>
    </div>
  );
}

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
          ? "bg-[#0A261F] text-white shadow-md"
          : "bg-white border border-[#D8DCD3] text-[#051B11] hover:border-[#0A261F]/40 hover:text-[#0A261F]"
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
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get active tool from URL
  const toolParam = searchParams.get("tool") as ToolId | null;
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  
  // Filter state
  const [activeCategory, setActiveCategory] = useState<ToolCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Reset key to force calculator remount on reset
  const [resetKey, setResetKey] = useState(0);

  // Sync URL param with state
  useEffect(() => {
    if (toolParam && TOOLS.some(t => t.id === toolParam)) {
      setActiveTool(toolParam);
    } else {
      setActiveTool(null);
    }
  }, [toolParam]);

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

  // Open a tool (update URL)
  const openTool = useCallback((toolId: ToolId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tool", toolId);
    router.push(`/recursos?${params.toString()}`, { scroll: false });
    
    // Track tool open event
    if (typeof window !== "undefined" && (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag("event", "tool_opened", {
        tool_id: toolId,
      });
    }
  }, [router, searchParams]);

  // Close tool (remove from URL)
  const closeTool = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tool");
    const newUrl = params.toString() ? `/recursos?${params.toString()}` : "/recursos";
    router.push(newUrl, { scroll: false });
  }, [router, searchParams]);

  // Reset the active calculator
  const handleReset = useCallback(() => {
    setResetKey(prev => prev + 1);
  }, []);

  // Get the active tool data
  const activeToolData = activeTool ? TOOLS.find(t => t.id === activeTool) : null;

  // Render the active calculator component
  const renderCalculator = () => {
    if (!activeTool) return null;

    switch (activeTool) {
      case "cash-flow":
        return <CashFlowVisualizer key={`cash-flow-${resetKey}`} />;
      case "emergency-fund":
        return <EmergencyFundCalculator key={`emergency-fund-${resetKey}`} />;
      case "compound-interest":
        return <CompoundInterestCalculator key={`compound-interest-${resetKey}`} />;
      case "mortgage-amortization":
        return <MortgageAmortizationCalculator key={`mortgage-amortization-${resetKey}`} />;
      default:
        return null;
    }
  };

  // Check if any filters are active
  const hasActiveFilters = activeCategory !== null || searchQuery.trim() !== "";

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Hero Section */}
      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Início", href: "/" },
              { label: "Recursos", href: "/recursos" },
            ]}
          />
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-neutral-900 px-4">
              Calculadoras Financeiras Gratuitas
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed mb-3 sm:mb-4 px-4">
              Ferramentas práticas e calculadoras para te ajudar a gerir melhor as tuas finanças pessoais e tomar decisões informadas.
            </p>
            <p className="text-sm sm:text-base text-neutral-500 px-4">
              Todas as calculadoras são 100% gratuitas, sem registo necessário, e funcionam diretamente no teu navegador.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mb-8 sm:mb-10 px-4 sm:px-0">
            <div className="bg-white border border-neutral-200/60 rounded-2xl p-4 sm:p-5 shadow-sm">
              {/* Search Input */}
              <div className="relative mb-4">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar ferramentas..."
                  className="w-full pl-12 pr-4 py-3 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-base"
                  aria-label="Pesquisar ferramentas"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
                    aria-label="Limpar pesquisa"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
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

          {/* Tools by Category */}
          <div className="space-y-10 sm:space-y-12 mb-12 sm:mb-16 px-4 sm:px-0">
            {filteredTools.length === 0 ? (
              // No results state
              <div className="text-center py-12 bg-white border border-neutral-200/60 rounded-2xl">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-neutral-700 font-medium mb-2">Nenhuma ferramenta encontrada</p>
                <p className="text-sm text-neutral-500 mb-4">
                  Tenta ajustar os filtros ou a pesquisa
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory(null);
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 text-sm font-medium text-primary hover:text-primary-800 transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            ) : hasActiveFilters ? (
              // Filtered view - flat grid
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-neutral-500">
                    {filteredTools.length} {filteredTools.length === 1 ? "ferramenta encontrada" : "ferramentas encontradas"}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory(null);
                      setSearchQuery("");
                    }}
                    className="text-sm font-medium text-primary hover:text-primary-800 transition-colors"
                  >
                    Limpar filtros
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      id={tool.id}
                      title={tool.title}
                      description={tool.description}
                      icon={getToolIcon(tool.iconKey)}
                      onClick={() => openTool(tool.id)}
                      isActive={activeTool === tool.id}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Default view - grouped by category
              sortedCategories.map((categoryKey) => {
                const categoryTools = toolsByCategory[categoryKey];
                if (categoryTools.length === 0) return null;
                
                const category = TOOL_CATEGORIES[categoryKey];
                
                return (
                  <section key={categoryKey}>
                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                      {getCategoryIcon(category.iconKey)}
                      <h2 className="text-xl sm:text-2xl font-black text-[#051B11]">
                        {category.label}
                      </h2>
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-500 rounded-full">
                        {categoryTools.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {categoryTools.map((tool) => (
                        <ToolCard
                          key={tool.id}
                          id={tool.id}
                          title={tool.title}
                          description={tool.description}
                          icon={getToolIcon(tool.iconKey)}
                          onClick={() => openTool(tool.id)}
                          isActive={activeTool === tool.id}
                        />
                      ))}
                    </div>
                  </section>
                );
              })
            )}
          </div>

          {/* Additional Resources Section */}
          <div className="px-4 sm:px-0">
            <div className="bg-gradient-to-br from-primary-50 via-primary-50/80 to-white border border-primary-200/60 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-100/30 rounded-full blur-3xl" />
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 sm:mb-4">Mais Recursos</h2>
                <p className="text-base sm:text-lg text-neutral-700 mb-5 sm:mb-6 leading-relaxed">
                  Além das calculadoras, temos artigos detalhados sobre finanças pessoais, investimentos e empreendedorismo.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <a
                    href="/artigos"
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-800 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm sm:text-base touch-manipulation"
                    aria-label="Ver todos os artigos sobre finanças pessoais"
                  >
                    Ver todos os artigos
                    <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    href="/artigos/fundacao-fundo-emergencia"
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-white border border-primary text-primary font-bold rounded-xl hover:bg-primary-50 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm sm:text-base touch-manipulation"
                    aria-label="Ler artigo sobre fundo de emergência"
                  >
                    Ler sobre fundo de emergência
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Modal */}
      <ToolModal
        isOpen={!!activeTool}
        onClose={closeTool}
        onReset={handleReset}
        title={activeToolData?.title || ""}
      >
        <CalculatorErrorBoundary onReset={handleReset}>
          <Suspense fallback={<CalculatorLoading />}>
            {renderCalculator()}
          </Suspense>
        </CalculatorErrorBoundary>
      </ToolModal>
    </main>
  );
}
