"use client";

import { lazy, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorErrorBoundary from "@/components/CalculatorErrorBoundary";
import type { ToolId } from "@/lib/tools.config";
import { TOOLS_META } from "@/lib/tools.config";
import { IconArrowRight } from "@/components/icons/ShellIcons";

const CashFlowVisualizer = lazy(() => import("@/components/CashFlowVisualizer"));
const EmergencyFundCalculator = lazy(() => import("@/components/EmergencyFundCalculator"));
const CompoundInterestCalculator = lazy(() => import("@/components/CompoundInterestCalculator"));
const MortgageAmortizationCalculator = lazy(() => import("@/components/MortgageAmortizationCalculator"));

function CalculatorLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div
        className="w-12 h-12 border-4 border-[var(--color-border)] border-t-[var(--color-primary)] rounded-full animate-spin mb-4"
        aria-hidden
      />
      <p className="text-[var(--color-ink-secondary)] font-medium">A carregar ferramenta...</p>
    </div>
  );
}

function CalculatorSwitch({ toolId }: { toolId: ToolId }) {
  switch (toolId) {
    case "cash-flow":
      return <CashFlowVisualizer />;
    case "emergency-fund":
      return <EmergencyFundCalculator />;
    case "compound-interest":
      return <CompoundInterestCalculator />;
    case "mortgage-amortization":
      return <MortgageAmortizationCalculator />;
    default:
      return null;
  }
}

export default function ToolPageContent({ toolId }: { toolId: ToolId }) {
  const meta = TOOLS_META[toolId];

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <section className="w-full py-8 sm:py-12 lg:py-16">
        <div className="content-container">
          <Breadcrumbs
            items={[
              { label: "Início", href: "/" },
              { label: "Recursos", href: "/recursos" },
              { label: meta.title, href: `/recursos/${toolId}` },
            ]}
          />

          <motion.header
            className="max-w-3xl mt-6 sm:mt-8 mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-ink)] tracking-tight leading-tight mb-3 sm:mb-4">
              {meta.title}
            </h1>
            <p className="text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed mb-4">
              {meta.shortDescription}
            </p>
            <p className="text-sm text-[var(--color-ink-muted)]">
              Um passo em direção à tua independência financeira. Usa a ferramenta abaixo — é grátis e sem registo.
            </p>
          </motion.header>

          <CalculatorErrorBoundary>
            <Suspense fallback={<CalculatorLoading />}>
              <CalculatorSwitch toolId={toolId} />
            </Suspense>
          </CalculatorErrorBoundary>

          <motion.div
            className="mt-12 sm:mt-16 pt-8 border-t border-[var(--color-border)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Link
              href="/recursos"
              className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold transition-colors group"
            >
              <IconArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" aria-hidden />
              Voltar a todas as ferramentas
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
