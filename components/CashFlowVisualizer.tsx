"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import WaterfallChart from "./WaterfallChart";
import {
  formatCurrency,
  formatCurrencyWithSign,
  formatPercentage,
  calculateCashFlow,
  generateInsights,
  generateWaterfallData,
  getStatusInfo,
  addCategory,
  removeCategory,
  updateCategoryAmount,
  updateCategoryName,
  DEFAULT_CATEGORIES,
  type ExpenseCategory,
} from "@/lib/cashflow-utils";
import { validateCurrencyInput } from "@/lib/input-validation";

// ========================================
// LOCALSTORAGE KEY
// ========================================

const STORAGE_KEY = "cashflow-visualizer-data-v1";

// ========================================
// INFO TOOLTIP COMPONENT
// ========================================

function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="relative group ml-1.5 inline-flex items-center">
      <span
        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[var(--color-background-subtle)] hover:bg-[var(--color-primary)]/10 text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] text-xs sm:text-sm flex items-center justify-center cursor-help transition-colors duration-200 font-medium touch-manipulation"
        aria-label="Informação"
      >
        i
      </span>
      <span className="absolute left-6 sm:left-7 top-1/2 -translate-y-1/2 z-20 hidden sm:group-hover:block w-56 sm:w-64 p-3 text-xs bg-[var(--color-ink)] text-white rounded-xl shadow-[var(--shadow-lg)] leading-relaxed pointer-events-none">
        <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-[var(--color-ink)]" />
        {text}
      </span>
      <span className="sm:hidden fixed bottom-4 left-4 right-4 z-30 bg-[var(--color-ink)] text-white p-4 rounded-xl shadow-[var(--shadow-xl)] text-sm leading-relaxed opacity-0 pointer-events-none group-active:opacity-100 transition-opacity">
        {text}
      </span>
    </span>
  );
}

// ========================================
// ERROR MESSAGE COMPONENT
// ========================================

function ErrorMessage({ message }: { message: string | undefined }) {
  if (!message) return null;
  return (
    <div className="mt-2 flex items-start gap-2 text-sm text-[var(--color-error)] animate-fade-in" role="alert">
      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

// ========================================
// MAIN COMPONENT
// ========================================

export default function CashFlowVisualizer() {
  const [income, setIncome] = useState<string>("");
  const [categories, setCategories] = useState<ExpenseCategory[]>(DEFAULT_CATEGORIES);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [incomeTouched, setIncomeTouched] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setIncome(data.income || "");
        setCategories(data.categories || DEFAULT_CATEGORIES);
        // Don't auto-show results, let user click button
        setShowResults(false);
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
  }, []);

  // Save to localStorage with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ income, categories })
        );
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [income, categories]);

  // Calculate results
  const result = useMemo(() => {
    return calculateCashFlow(income, categories);
  }, [income, categories]);

  const insights = useMemo(() => {
    return generateInsights(result);
  }, [result]);

  const chartData = useMemo(() => {
    if (result.totalIncome === 0) return [];
    return generateWaterfallData(result);
  }, [result]);

  const statusInfo = useMemo(() => {
    return getStatusInfo(result.status);
  }, [result.status]);

  // Validate income input
  const incomeValidation = useMemo(
    () => validateCurrencyInput(income, { required: true, min: 1, fieldName: "Rendimento mensal" }),
    [income]
  );

  // Handle calculate button click
  const handleCalculate = useCallback(() => {
    if (result.totalIncome > 0 && incomeValidation.isValid) {
      setShowResults(true);
      // Track calculator usage
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "calculator_used", {
          calculator_type: "cash_flow",
        });
      }
      // Scroll to results smoothly
      setTimeout(() => {
        const resultsElement = document.getElementById("results-section");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [result.totalIncome, incomeValidation.isValid]);

  // Category handlers
  const handleAddCategory = useCallback((type: 'fixed' | 'variable') => {
    const defaultName = type === 'fixed' ? 'Nova despesa fixa' : 'Nova despesa variável';
    setCategories(prev => addCategory(prev, defaultName, type));
  }, []);

  const handleRemoveCategory = useCallback((categoryId: string) => {
    setCategories(prev => removeCategory(prev, categoryId));
  }, []);

  const handleUpdateAmount = useCallback((categoryId: string, amount: string) => {
    setCategories(prev => updateCategoryAmount(prev, categoryId, amount));
  }, []);

  const handleUpdateName = useCallback((categoryId: string, name: string) => {
    setCategories(prev => updateCategoryName(prev, categoryId, name));
  }, []);

  const handleReset = useCallback(() => {
    setIncome("");
    setCategories(DEFAULT_CATEGORIES);
    setShowResults(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const fixedCategories = categories.filter(cat => cat.type === 'fixed');
  const variableCategories = categories.filter(cat => cat.type === 'variable');

  return (
    <>
      <section className="max-w-5xl mx-auto pb-8 sm:pb-10">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 lg:p-8 shadow-[var(--shadow-sm)]">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="income" className="flex items-center text-base font-semibold text-[var(--color-ink)] mb-2">
                  Rendimento Mensal Líquido <span className="text-[var(--color-error)]">*</span>
                  <InfoTooltip text="O teu salário líquido mensal após impostos e descontos. É o dinheiro que realmente recebes na conta." />
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)] font-medium">€</span>
                  <input
                    type="text"
                    id="income"
                    value={income}
                    onChange={(e) => {
                      setIncome(e.target.value);
                      if (!incomeTouched && e.target.value.length > 0) setIncomeTouched(true);
                    }}
                    onBlur={() => setIncomeTouched(true)}
                    placeholder="Ex: 1200"
                    className={`w-full pl-8 pr-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base bg-[var(--color-background)] text-[var(--color-ink)] ${
                      (incomeTouched || income.length > 0) && !incomeValidation.isValid
                        ? "border-[var(--color-error)] focus:ring-[var(--color-error)]/30 focus:border-[var(--color-error)]"
                        : "border-[var(--color-border)] focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                    }`}
                    aria-label="Rendimento mensal líquido em euros"
                    aria-required="true"
                    aria-invalid={(incomeTouched || income.length > 0) && !incomeValidation.isValid}
                  />
                </div>
                {(incomeTouched || income.length > 0) && <ErrorMessage message={incomeValidation.error} />}
              </div>

              <div className="border-t border-[var(--color-border)] pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-[var(--color-ink)] flex items-center">
                    Gastos Fixos
                    <InfoTooltip text="Despesas que se repetem todos os meses com valores previsíveis: renda, contas, transportes, subscrições." />
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleAddCategory('fixed')}
                    className="text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors flex items-center gap-1"
                    aria-label="Adicionar categoria de gasto fixo"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Adicionar
                  </button>
                </div>
                
                <div className="space-y-3">
                  {fixedCategories.map((category) => (
                    <div key={category.id} className="flex flex-col sm:flex-row gap-2">
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={category.name}
                          onChange={(e) => handleUpdateName(category.id, e.target.value)}
                          placeholder="Nome da despesa"
                          className="w-full px-3 py-2.5 sm:py-2 text-sm border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-ink)] transition-all"
                          aria-label={`Nome da categoria: ${category.name}`}
                        />
                      </div>
                      <div className="relative w-full sm:w-28 flex-shrink-0">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)] text-xs font-medium">€</span>
                        <input
                          type="text"
                          value={category.amount}
                          onChange={(e) => handleUpdateAmount(category.id, e.target.value)}
                          placeholder="0"
                          className="w-full pl-6 pr-2 py-2.5 sm:py-2 text-sm border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-ink)] transition-all"
                          aria-label={`Valor de ${category.name}`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(category.id)}
                        className="p-2.5 sm:p-2 text-[var(--color-ink-muted)] hover:text-[var(--color-error)] transition-colors flex-shrink-0 self-start sm:self-auto"
                        aria-label={`Remover ${category.name}`}
                      >
                        <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {fixedCategories.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex justify-between items-center">
                    <span className="text-sm font-medium text-[var(--color-ink-secondary)]">Total Fixo:</span>
                    <span className="text-base font-bold text-[var(--color-ink)]">
                      {formatCurrency(result.totalFixedExpenses)}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-[var(--color-border)] pt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-[var(--color-ink)] flex items-center">
                    Gastos Variáveis
                    <InfoTooltip text="Despesas que mudam de mês para mês: alimentação, lazer, compras não essenciais." />
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleAddCategory('variable')}
                    className="text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors flex items-center gap-1"
                    aria-label="Adicionar categoria de gasto variável"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Adicionar
                  </button>
                </div>
                
                <div className="space-y-3">
                  {variableCategories.map((category) => (
                    <div key={category.id} className="flex flex-col sm:flex-row gap-2">
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={category.name}
                          onChange={(e) => handleUpdateName(category.id, e.target.value)}
                          placeholder="Nome da despesa"
                          className="w-full px-3 py-2.5 sm:py-2 text-sm border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-ink)] transition-all"
                          aria-label={`Nome da categoria: ${category.name}`}
                        />
                      </div>
                      <div className="relative w-full sm:w-28 flex-shrink-0">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)] text-xs font-medium">€</span>
                        <input
                          type="text"
                          value={category.amount}
                          onChange={(e) => handleUpdateAmount(category.id, e.target.value)}
                          placeholder="0"
                          className="w-full pl-6 pr-2 py-2.5 sm:py-2 text-sm border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] bg-[var(--color-background)] text-[var(--color-ink)] transition-all"
                          aria-label={`Valor de ${category.name}`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(category.id)}
                        className="p-2.5 sm:p-2 text-[var(--color-ink-muted)] hover:text-[var(--color-error)] transition-colors flex-shrink-0 self-start sm:self-auto"
                        aria-label={`Remover ${category.name}`}
                      >
                        <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {variableCategories.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex justify-between items-center">
                    <span className="text-sm font-medium text-[var(--color-ink-secondary)]">Total Variável:</span>
                    <span className="text-base font-bold text-[var(--color-ink)]">
                      {formatCurrency(result.totalVariableExpenses)}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleCalculate}
                  disabled={result.totalIncome <= 0 || !incomeValidation.isValid}
                  className="w-full px-6 py-3.5 sm:py-4 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-primary-hover)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] active:scale-[0.99] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-base sm:text-lg touch-manipulation"
                  aria-label="Calcular resultados"
                >
                  Ver Resultados
                  <svg className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full px-6 py-3 border border-[var(--color-border)] text-[var(--color-ink)] font-semibold rounded-xl hover:bg-[var(--color-background-subtle)] hover:border-[var(--color-ink-muted)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                  aria-label="Limpar todos os campos"
                >
                  Limpar Tudo
                </button>
              </div>
            </div>

            <div className="lg:pl-8 lg:border-l-2 lg:border-[var(--color-border)] mt-8 lg:mt-0">
              <div id="results-section" className="bg-[var(--color-background-subtle)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6 lg:p-8 relative overflow-hidden min-h-[300px] sm:min-h-[400px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-2xl" aria-hidden />
                <div className="relative">
                  <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6 tracking-tight">Situação Financeira</h2>

                  {showResults && result.totalIncome > 0 ? (
                    <div className="space-y-6 animate-fade-in" role="region" aria-label="Resultados da análise financeira">
                      <div className="flex items-start gap-3 p-4 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]" role="status" aria-live="polite">
                        <span className="text-3xl" aria-hidden>{statusInfo.badge}</span>
                        <div>
                          <p className="font-bold text-[var(--color-ink)] mb-1">{statusInfo.title}</p>
                          <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed">{statusInfo.description}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--color-ink-secondary)] mb-2">Saldo Mensal</p>
                        <p className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${result.monthlyBalance >= 0 ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
                          {formatCurrencyWithSign(result.monthlyBalance)}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border)]">
                          <p className="text-xs font-medium text-[var(--color-ink-muted)] mb-1">Total de Gastos</p>
                          <p className="text-lg font-bold text-[var(--color-ink)]">{formatCurrency(result.totalExpenses)}</p>
                          <p className="text-xs text-[var(--color-ink-muted)] mt-1">{formatPercentage(result.ratios.expenseToIncome)} do rendimento</p>
                        </div>
                        <div className="bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-border)]">
                          <p className="text-xs font-medium text-[var(--color-ink-muted)] mb-1">Gastos Fixos</p>
                          <p className="text-lg font-bold text-[var(--color-ink)]">{formatPercentage(result.ratios.fixedPercentage)}</p>
                          <p className="text-xs text-[var(--color-ink-muted)] mt-1">{formatCurrency(result.totalFixedExpenses)}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12" role="status" aria-live="polite">
                      <div className="text-5xl mb-4" aria-hidden>📊</div>
                      <p className="text-[var(--color-ink)] font-medium mb-2">Preenche os dados acima</p>
                      <p className="text-sm text-[var(--color-ink-muted)]">Clica em &quot;Ver Resultados&quot; para descobrires a tua situação financeira</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {showResults && result.totalIncome > 0 && chartData.length > 0 && (
            <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-[var(--color-border)] animate-fade-in">
              <h3 className="text-lg sm:text-xl font-bold text-[var(--color-ink)] mb-4 sm:mb-6 tracking-tight">Fluxo de Dinheiro</h3>
              <WaterfallChart data={chartData} />
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[var(--color-ink-muted)] text-center px-4">
                Visualiza como o teu rendimento é distribuído pelas diferentes categorias de despesas
              </p>
            </div>
          )}

          {showResults && result.totalIncome > 0 && insights.length > 0 && (
            <div className="mt-10 pt-10 border-t border-[var(--color-border)] animate-fade-in" role="region" aria-label="Análise e recomendações">
              <h3 className="text-xl font-bold text-[var(--color-ink)] mb-4 tracking-tight">O Que Isto Significa</h3>
              <div className="space-y-3" role="list">
                {insights.map((insight) => (
                  <div
                    key={insight.id}
                    role="listitem"
                    className={`p-4 rounded-xl border ${
                      insight.type === "success"
                        ? "bg-[var(--color-success)]/10 border-[var(--color-success)]/30"
                        : insight.type === "warning"
                        ? "bg-[var(--color-warning)]/10 border-[var(--color-warning)]/30"
                        : "bg-[var(--color-accent)]/10 border-[var(--color-accent)]/30"
                    }`}
                  >
                    <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed">{insight.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {showResults && result.totalIncome > 0 && result.status !== "unknown" && (
        <section className="max-w-5xl mx-auto pb-8 sm:pb-10 animate-fade-in" role="region" aria-label="Próximos passos recomendados">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6 lg:p-8 shadow-[var(--shadow-sm)]">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)] mb-3 sm:mb-4 tracking-tight">Próximo Passo</h2>
            <p className="text-sm sm:text-base text-[var(--color-ink-secondary)] leading-relaxed mb-5 sm:mb-6">{statusInfo.ctaText}</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href={statusInfo.ctaLink}
                className="inline-flex items-center justify-center px-5 sm:px-6 py-3 sm:py-3.5 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-primary-hover)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] active:scale-[0.99] transition-all duration-200 text-sm sm:text-base touch-manipulation"
              >
                {statusInfo.ctaTitle}
                <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center justify-center px-5 sm:px-6 py-3 sm:py-3.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-ink)] font-semibold rounded-xl hover:bg-[var(--color-background-subtle)] hover:border-[var(--color-ink-muted)] transition-all duration-200 text-sm sm:text-base touch-manipulation"
              >
                Voltar e Ajustar
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
