"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { validateCurrencyInput } from "@/lib/input-validation";

// Info Tooltip Component
function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="relative group ml-1.5 inline-flex items-center">
      <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[var(--color-background-subtle)] hover:bg-[var(--color-primary)]/10 text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] text-xs sm:text-sm flex items-center justify-center cursor-help transition-colors duration-200 font-medium touch-manipulation" aria-label="Informação">i</span>
      <span className="absolute left-6 sm:left-7 top-1/2 -translate-y-1/2 z-20 hidden sm:group-hover:block w-56 sm:w-64 p-3 text-xs bg-[var(--color-ink)] text-white rounded-xl shadow-[var(--shadow-lg)] leading-relaxed pointer-events-none">
        <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-[var(--color-ink)]" />
        {text}
      </span>
      <span className="sm:hidden fixed bottom-4 left-4 right-4 z-30 bg-[var(--color-ink)] text-white p-4 rounded-xl shadow-[var(--shadow-xl)] text-sm leading-relaxed opacity-0 pointer-events-none group-active:opacity-100 transition-opacity">{text}</span>
    </span>
  );
}

// Error Message Component
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

export default function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("");
  const [monthsToCover, setMonthsToCover] = useState<number>(6);
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [monthlySavings, setMonthlySavings] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [touched, setTouched] = useState<{
    monthlyExpenses: boolean;
    currentSavings: boolean;
    monthlySavings: boolean;
  }>({
    monthlyExpenses: false,
    currentSavings: false,
    monthlySavings: false,
  });

  // Show validation errors immediately after first interaction
  const handleInputChange = (field: "monthlyExpenses" | "currentSavings" | "monthlySavings", value: string) => {
    if (field === "monthlyExpenses") {
      setMonthlyExpenses(value);
      if (!touched.monthlyExpenses && value.length > 0) {
        setTouched((prev) => ({ ...prev, monthlyExpenses: true }));
      }
    } else if (field === "currentSavings") {
      setCurrentSavings(value);
      if (!touched.currentSavings && value.length > 0) {
        setTouched((prev) => ({ ...prev, currentSavings: true }));
      }
    } else if (field === "monthlySavings") {
      setMonthlySavings(value);
      if (!touched.monthlySavings && value.length > 0) {
        setTouched((prev) => ({ ...prev, monthlySavings: true }));
      }
    }
  };

  // Format number with Portuguese locale
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Validate inputs
  const monthlyExpensesValidation = useMemo(
    () => validateCurrencyInput(monthlyExpenses, { required: true, min: 1, fieldName: "Despesas mensais" }),
    [monthlyExpenses]
  );

  const currentSavingsValidation = useMemo(
    () => validateCurrencyInput(currentSavings, { min: 0, fieldName: "Poupanças atuais" }),
    [currentSavings]
  );

  const monthlySavingsValidation = useMemo(
    () => validateCurrencyInput(monthlySavings, { min: 0, fieldName: "Poupança mensal" }),
    [monthlySavings]
  );

  // Calculations
  const calculations = useMemo(() => {
    const expenses = monthlyExpensesValidation.value;
    const savings = currentSavingsValidation.value;
    const monthly = monthlySavingsValidation.value;

    const targetFund = expenses * monthsToCover;
    const amountNeeded = targetFund - savings;
    const timeToReach = monthly > 0 ? amountNeeded / monthly : 0;
    const progressPercentage = targetFund > 0 ? Math.min((savings / targetFund) * 100, 100) : 0;

    let timeDisplay = "";
    if (timeToReach > 0) {
      const months = Math.ceil(timeToReach);
      if (months >= 12) {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        if (remainingMonths > 0) {
          timeDisplay = `${years} ${years === 1 ? "ano" : "anos"} e ${remainingMonths} ${remainingMonths === 1 ? "mês" : "meses"}`;
        } else {
          timeDisplay = `${years} ${years === 1 ? "ano" : "anos"}`;
        }
      } else {
        timeDisplay = `${months} ${months === 1 ? "mês" : "meses"}`;
      }
    }

    return {
      targetFund,
      amountNeeded,
      timeToReach,
      timeDisplay,
      progressPercentage,
      hasValidInput: expenses > 0 && monthlyExpensesValidation.isValid,
    };
  }, [monthlyExpensesValidation, monthsToCover, currentSavingsValidation, monthlySavingsValidation]);

  const handleCalculate = useCallback(() => {
    if (calculations.hasValidInput) {
      setShowResults(true);
      // Track calculator usage
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "calculator_used", {
          calculator_type: "emergency_fund",
        });
      }
      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById("results-section-emergency");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [calculations.hasValidInput]);

  const handleReset = useCallback(() => {
    setMonthlyExpenses("");
    setMonthsToCover(6);
    setCurrentSavings("");
    setMonthlySavings("");
    setShowResults(false);
    setTouched({
      monthlyExpenses: false,
      currentSavings: false,
      monthlySavings: false,
    });
  }, []);

  const handleBlur = (field: "monthlyExpenses" | "currentSavings" | "monthlySavings") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <>
      {/* Calculator Section */}
      <section className="max-w-5xl mx-auto pb-8 sm:pb-10">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 lg:p-8 shadow-[var(--shadow-sm)]">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="monthly-expenses" className="flex items-center text-base font-semibold text-[var(--color-ink)] mb-2">
                  Despesas Essenciais Mensais <span className="text-[var(--color-error)]" aria-hidden>*</span>
                  <InfoTooltip text="O valor total das tuas despesas essenciais mensais: renda, alimentação, transportes, saúde e contas básicas. Este é o valor mínimo que precisas para viver." />
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)] font-medium">€</span>
                  <input
                    type="text"
                    id="monthly-expenses"
                    value={monthlyExpenses}
                    onChange={(e) => handleInputChange("monthlyExpenses", e.target.value)}
                    onBlur={() => handleBlur("monthlyExpenses")}
                    placeholder="Ex: 900"
                    className={`w-full pl-8 pr-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base shadow-sm bg-[var(--color-surface)] ${
                      (touched.monthlyExpenses || monthlyExpenses.length > 0) && !monthlyExpensesValidation.isValid
                        ? "border-[var(--color-error)] focus:ring-[var(--color-error)]/50 focus:border-[var(--color-error)]"
                        : "border-[var(--color-border)] focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                    }`}
                    aria-required="true"
                    aria-label="Despesas essenciais mensais em euros"
                    aria-invalid={(touched.monthlyExpenses || monthlyExpenses.length > 0) && !monthlyExpensesValidation.isValid}
                    aria-describedby="monthly-expenses-help monthly-expenses-error"
                  />
                </div>
                {(touched.monthlyExpenses || monthlyExpenses.length > 0) && (
                  <ErrorMessage message={monthlyExpensesValidation.error} />
                )}
                <p id="monthly-expenses-help" className="mt-2 text-sm text-[var(--color-ink-muted)]">
                  Inclua renda, alimentação, transportes, saúde e contas básicas
                </p>
              </div>

              <div>
                <label htmlFor="months-to-cover" className="flex items-center text-base font-semibold text-[var(--color-ink)] mb-2">
                  Meses a Cobrir
                  <InfoTooltip text="Número de meses de despesas que o fundo de emergência deve cobrir. A DECO PROTESTE recomenda 4 a 6 meses. Para rendimentos irregulares ou com dependentes, considere mais meses." />
                </label>
                <select
                  id="months-to-cover"
                  value={monthsToCover}
                  onChange={(e) => setMonthsToCover(Number(e.target.value))}
                  className="w-full px-5 py-3.5 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all duration-200 text-base bg-[var(--color-background)] text-[var(--color-ink)]"
                  aria-label="Número de meses a cobrir"
                  aria-describedby="months-to-cover-help"
                >
                  <option value={3}>3 meses</option>
                  <option value={4}>4 meses</option>
                  <option value={5}>5 meses</option>
                  <option value={6}>6 meses (recomendado)</option>
                  <option value={9}>9 meses</option>
                  <option value={12}>12 meses</option>
                </select>
                <p id="months-to-cover-help" className="mt-2 text-sm text-[var(--color-ink-muted)]">
                  A DECO PROTESTE recomenda 4 a 6 meses de despesas essenciais
                </p>
              </div>

              <div>
                <label htmlFor="current-savings" className="flex items-center text-base font-semibold text-[var(--color-ink)] mb-2">
                  Poupanças Atuais <span className="text-[var(--color-ink-muted)] text-sm font-normal ml-1">(opcional)</span>
                  <InfoTooltip text="O valor que já tens guardado para emergências. Se ainda não tens, deixa em branco ou coloca 0." />
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)] font-medium">€</span>
                  <input
                    type="text"
                    id="current-savings"
                    value={currentSavings}
                    onChange={(e) => handleInputChange("currentSavings", e.target.value)}
                    onBlur={() => handleBlur("currentSavings")}
                    placeholder="Ex: 500"
                    className={`w-full pl-8 pr-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base bg-[var(--color-background)] text-[var(--color-ink)] ${
                      (touched.currentSavings || currentSavings.length > 0) && !currentSavingsValidation.isValid
                        ? "border-[var(--color-error)] focus:ring-[var(--color-error)]/30 focus:border-[var(--color-error)]"
                        : "border-[var(--color-border)] focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                    }`}
                    aria-label="Poupanças atuais em euros (opcional)"
                    aria-invalid={(touched.currentSavings || currentSavings.length > 0) && !currentSavingsValidation.isValid}
                  />
                </div>
                {(touched.currentSavings || currentSavings.length > 0) && <ErrorMessage message={currentSavingsValidation.error} />}
              </div>

              <div>
                <label htmlFor="monthly-savings" className="flex items-center text-base font-semibold text-[var(--color-ink)] mb-2">
                  Poupança Mensal <span className="text-[var(--color-ink-muted)] text-sm font-normal ml-1">(opcional)</span>
                  <InfoTooltip text="Quanto consegues poupar por mês especificamente para o fundo de emergência. Isto ajuda a calcular quanto tempo levarás a atingir o objetivo." />
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)] font-medium">€</span>
                  <input
                    type="text"
                    id="monthly-savings"
                    value={monthlySavings}
                    onChange={(e) => handleInputChange("monthlySavings", e.target.value)}
                    onBlur={() => handleBlur("monthlySavings")}
                    placeholder="Ex: 200"
                    className={`w-full pl-8 pr-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base bg-[var(--color-background)] text-[var(--color-ink)] ${
                      (touched.monthlySavings || monthlySavings.length > 0) && !monthlySavingsValidation.isValid
                        ? "border-[var(--color-error)] focus:ring-[var(--color-error)]/30 focus:border-[var(--color-error)]"
                        : "border-[var(--color-border)] focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                    }`}
                    aria-label="Poupança mensal em euros (opcional)"
                    aria-invalid={(touched.monthlySavings || monthlySavings.length > 0) && !monthlySavingsValidation.isValid}
                    aria-describedby="monthly-savings-help"
                  />
                </div>
                {(touched.monthlySavings || monthlySavings.length > 0) && <ErrorMessage message={monthlySavingsValidation.error} />}
                <p id="monthly-savings-help" className="mt-2 text-sm text-[var(--color-ink-muted)]">
                  Quanto consegue poupar por mês para o fundo de emergência
                </p>
              </div>

              {/* Calculate Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCalculate}
                  disabled={!calculations.hasValidInput}
                  className="w-full px-6 py-3.5 sm:py-4 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-primary-hover)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] active:scale-[0.99] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg touch-manipulation"
                  aria-label="Calcular resultados do fundo de emergência"
                >
                  Ver Resultados
                  <svg className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full px-6 py-3 border border-[var(--color-border)] text-[var(--color-ink)] font-semibold rounded-xl hover:bg-[var(--color-background-subtle)] hover:border-[var(--color-ink-muted)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                  aria-label="Limpar todos os campos do formulário"
                >
                  Limpar Campos
                </button>
              </div>
            </div>

            <div className="lg:pl-8 lg:border-l-2 lg:border-[var(--color-border)] mt-8 lg:mt-0">
              <div id="results-section-emergency" className="bg-[var(--color-background-subtle)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6 lg:p-8 relative overflow-hidden min-h-[300px] sm:min-h-[400px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-2xl" aria-hidden />
                <div className="relative">
                  <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6 tracking-tight">Resultados</h2>

                  {showResults && calculations.hasValidInput ? (
                    <div className="space-y-6 animate-fade-in" role="region" aria-label="Resultados do fundo de emergência">
                      <div>
                        <p className="text-sm font-medium text-[var(--color-ink-secondary)] mb-2">Fundo de Emergência Recomendado</p>
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-primary)]">{formatCurrency(calculations.targetFund)}</p>
                        <p className="mt-1 text-xs text-[var(--color-ink-muted)]">{monthsToCover} meses × {formatCurrency(monthlyExpensesValidation.value)}</p>
                      </div>
                      {currentSavingsValidation.value > 0 && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-[var(--color-ink-secondary)]">Progresso</p>
                            <p className="text-sm font-bold text-[var(--color-primary)]">{calculations.progressPercentage.toFixed(1)}%</p>
                          </div>
                          <div className="w-full h-4 bg-[var(--color-border)] rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--color-primary)] transition-all duration-500 ease-out" style={{ width: `${Math.min(calculations.progressPercentage, 100)}%` }} role="progressbar" aria-valuenow={calculations.progressPercentage} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                          <p className="mt-2 text-xs text-[var(--color-ink-muted)]">Já tem: {formatCurrency(currentSavingsValidation.value)}</p>
                        </div>
                      )}
                      {currentSavingsValidation.value > 0 && calculations.amountNeeded > 0 && (
                        <div>
                          <p className="text-sm font-medium text-[var(--color-ink-secondary)] mb-2">Ainda Precisa de Poupar</p>
                          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-primary)]">{formatCurrency(calculations.amountNeeded)}</p>
                        </div>
                      )}
                      {monthlySavingsValidation.value > 0 && calculations.amountNeeded > 0 && (
                        <div>
                          <p className="text-sm font-medium text-[var(--color-ink-secondary)] mb-2">Tempo para Alcançar o Objetivo</p>
                          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-primary)]">{calculations.timeDisplay}</p>
                          <p className="mt-2 text-xs text-[var(--color-ink-muted)]">Poupança mensal de {formatCurrency(monthlySavingsValidation.value)}</p>
                        </div>
                      )}
                      {monthlySavingsValidation.value > 0 && calculations.amountNeeded <= 0 && (
                        <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-xl p-4">
                          <p className="text-sm font-bold text-[var(--color-primary)]">🎉 Parabéns! Já tem o fundo de emergência completo!</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12" role="status" aria-live="polite">
                      <div className="text-5xl mb-4" aria-hidden>📊</div>
                      <p className="text-[var(--color-ink)] font-medium mb-2">Preenche os dados acima</p>
                      <p className="text-sm text-[var(--color-ink-muted)]">Clica em &quot;Ver Resultados&quot; para descobrires quanto precisas de poupar</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto pb-8 sm:pb-10">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6 lg:p-8 shadow-[var(--shadow-sm)]">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)] mb-3 sm:mb-4 tracking-tight">Sobre o Fundo de Emergência</h2>
          <div className="prose max-w-none text-sm sm:text-base">
            <p className="text-[var(--color-ink-secondary)] leading-relaxed mb-3 sm:mb-4">
              Um fundo de emergência é uma reserva financeira criada exclusivamente para lidar com situações inesperadas,
              como despesas médicas, avarias no carro ou perda de emprego. Não é para férias ou compras planeadas.
            </p>
            <p className="text-[var(--color-ink-secondary)] leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
              A <strong>DECO PROTESTE</strong> recomenda guardar entre <strong>4 a 6 meses</strong> de despesas essenciais.
              Para quem tem rendimento irregular ou dependentes, pode ser sensato apontar ainda mais alto.
            </p>
            <p className="text-[var(--color-ink-secondary)] leading-relaxed text-sm sm:text-base">
              O fundo deve estar num lugar seguro e acessível, como uma conta poupança de fácil mobilização ou
              depósitos a prazo curtos. Evite produtos voláteis como ações ou criptomoedas.
            </p>
          </div>
          <div className="mt-5 sm:mt-6">
            <Link
              href="/artigos/fundacao-fundo-emergencia"
              className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold transition-colors duration-200 group text-sm sm:text-base touch-manipulation"
            >
              <span>Ler artigo completo sobre fundo de emergência</span>
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
