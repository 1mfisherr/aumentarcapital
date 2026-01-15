"use client";

import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ToolCard, ToolModal } from "@/components/tools";
import CalculatorErrorBoundary from "@/components/CalculatorErrorBoundary";

// Lazy load calculator components for better initial page performance
const CashFlowVisualizer = lazy(() => import("@/components/CashFlowVisualizer"));
const EmergencyFundCalculator = lazy(() => import("@/components/EmergencyFundCalculator"));
const CompoundInterestCalculator = lazy(() => import("@/components/CompoundInterestCalculator"));

// Tool definitions
type ToolId = "cash-flow" | "emergency-fund" | "compound-interest";

interface Tool {
  id: ToolId;
  title: string;
  description: string;
  icon: string;
  ctaText: string;
}

const TOOLS: Tool[] = [
  {
    id: "cash-flow",
    title: "Visualizador de Fluxo de Caixa",
    description: "Descobre para onde vai o teu dinheiro e se tens excedente ou défice. O primeiro passo para controlo financeiro.",
    icon: "💸",
    ctaText: "Usar ferramenta",
  },
  {
    id: "emergency-fund",
    title: "Calculadora de Fundo de Emergência",
    description: "Calcula quanto deves poupar para emergências e quanto tempo levará a construir o teu fundo de segurança.",
    icon: "💰",
    ctaText: "Usar calculadora",
  },
  {
    id: "compound-interest",
    title: "Simulador de Juros Compostos",
    description: "Simula o crescimento do teu investimento ao longo do tempo e vê o poder dos juros compostos em ação.",
    icon: "📈",
    ctaText: "Usar calculadora",
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

export default function RecursosClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get active tool from URL
  const toolParam = searchParams.get("tool") as ToolId | null;
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  
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
      default:
        return null;
    }
  };

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

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 px-4 sm:px-0">
            {TOOLS.map((tool) => (
              <ToolCard
                key={tool.id}
                id={tool.id}
                title={tool.title}
                description={tool.description}
                icon={<span>{tool.icon}</span>}
                onClick={() => openTool(tool.id)}
                isActive={activeTool === tool.id}
              />
            ))}
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
