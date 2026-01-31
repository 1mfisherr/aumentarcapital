"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { formatCurrency } from "@/lib/calculator-utils";
import { validateCurrencyInput, validatePercentageInput } from "@/lib/input-validation";
import {
  calculateMortgageAmortization,
  formatMonthsToTime,
  yearsToMonths,
  type MortgageResult,
} from "@/lib/mortgage-utils";

// Custom tooltip for the bar chart
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string; fill: string }>;
  label?: string;
}

function ChartTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 shadow-[var(--shadow-lg)]">
        <div className="space-y-2 text-sm">
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.fill }}>
              <span className="font-medium">{entry.name}:</span> {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

// Info Tooltip Component
function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="relative group ml-1.5 inline-flex items-center">
      <span
        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[var(--color-border)] hover:bg-[var(--color-primary)]/10 text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] text-xs sm:text-sm flex items-center justify-center cursor-help transition-colors duration-200 font-medium touch-manipulation"
        aria-label="Informação"
      >
        i
      </span>
      <span className="absolute left-6 sm:left-7 top-1/2 -translate-y-1/2 z-20 hidden sm:group-hover:block w-56 sm:w-64 p-3 text-xs bg-[var(--color-ink)] text-[var(--color-ink-inverse)] rounded-lg shadow-xl leading-relaxed pointer-events-none">
        <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-[var(--color-ink)]" />
        {text}
      </span>
      <span className="sm:hidden fixed bottom-4 left-4 right-4 z-30 bg-[var(--color-ink)] text-[var(--color-ink-inverse)] p-4 rounded-lg shadow-2xl text-sm leading-relaxed opacity-0 pointer-events-none group-active:opacity-100 transition-opacity">
        {text}
      </span>
    </span>
  );
}

// Error Message Component
function ErrorMessage({ message }: { message: string | undefined }) {
  if (!message) return null;
  return (
    <div className="mt-2 flex items-start gap-2 text-sm text-red-600 animate-fade-in" role="alert">
      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

// Format Y-axis values
function formatYAxisValue(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M€`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k€`;
  return `${value}€`;
}

export default function MortgageAmortizationCalculator() {
  // Form state
  const [principal, setPrincipal] = useState<string>("");
  const [termValue, setTermValue] = useState<string>("");
  const [termUnit, setTermUnit] = useState<"years" | "months">("years");
  const [interestRate, setInterestRate] = useState<string>("");
  const [extraPayment, setExtraPayment] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [touched, setTouched] = useState<{
    principal: boolean;
    termValue: boolean;
    interestRate: boolean;
    extraPayment: boolean;
  }>({
    principal: false,
    termValue: false,
    interestRate: false,
    extraPayment: false,
  });

  // Validate inputs
  const principalValidation = useMemo(
    () => validateCurrencyInput(principal, { required: true, min: 1000, fieldName: "Capital em dívida" }),
    [principal]
  );

  const termValidation = useMemo(() => {
    const maxValue = termUnit === "years" ? 50 : 600;
    const minValue = termUnit === "years" ? 1 : 12;
    return validateCurrencyInput(termValue, { 
      required: true, 
      min: minValue, 
      max: maxValue,
      fieldName: `Prazo (${termUnit === "years" ? "anos" : "meses"})` 
    });
  }, [termValue, termUnit]);

  const interestRateValidation = useMemo(
    () => validatePercentageInput(interestRate, { required: true, min: 0.1, max: 20, fieldName: "Taxa de juro" }),
    [interestRate]
  );

  const extraPaymentValidation = useMemo(
    () => validateCurrencyInput(extraPayment, { required: true, min: 100, fieldName: "Amortização extra" }),
    [extraPayment]
  );

  // Calculate remaining months
  const remainingMonths = useMemo(() => {
    if (!termValidation.isValid) return 0;
    return termUnit === "years" ? yearsToMonths(termValidation.value) : termValidation.value;
  }, [termValidation, termUnit]);

  // Calculate results
  const result: MortgageResult | null = useMemo(() => {
    if (
      !principalValidation.isValid ||
      !termValidation.isValid ||
      !interestRateValidation.isValid ||
      !extraPaymentValidation.isValid
    ) {
      return null;
    }

    // Validate that extra payment doesn't exceed principal
    if (extraPaymentValidation.value > principalValidation.value) {
      return null;
    }

    return calculateMortgageAmortization({
      principal: principalValidation.value,
      remainingMonths,
      annualRate: interestRateValidation.value,
      extraPayment: extraPaymentValidation.value,
    });
  }, [principalValidation, termValidation, interestRateValidation, extraPaymentValidation, remainingMonths]);

  // Generate chart data (use CSS vars for theme consistency)
  const chartData = useMemo(() => {
    if (!result) return [];
    return [
      {
        name: "Sem Amortização",
        value: Math.round(result.totalInterestWithout),
        fill: "var(--color-ink-muted)",
      },
      {
        name: "Com Amortização",
        value: Math.round(result.totalInterestWith),
        fill: "var(--color-primary)",
      },
    ];
  }, [result]);

  const hasValidInput =
    principalValidation.isValid &&
    termValidation.isValid &&
    interestRateValidation.isValid &&
    extraPaymentValidation.isValid &&
    extraPaymentValidation.value <= principalValidation.value;

  const handleCalculate = useCallback(() => {
    if (hasValidInput) {
      setShowResults(true);
      // Track calculator usage
      if (typeof window !== "undefined" && (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag("event", "calculator_used", {
          calculator_type: "mortgage_amortization",
        });
      }
      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById("results-section-mortgage");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [hasValidInput]);

  const handleReset = useCallback(() => {
    setPrincipal("");
    setTermValue("");
    setTermUnit("years");
    setInterestRate("");
    setExtraPayment("");
    setShowResults(false);
    setTouched({
      principal: false,
      termValue: false,
      interestRate: false,
      extraPayment: false,
    });
  }, []);

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputChange = (
    field: keyof typeof touched,
    value: string
  ) => {
    switch (field) {
      case "principal":
        setPrincipal(value);
        break;
      case "termValue":
        setTermValue(value);
        break;
      case "interestRate":
        setInterestRate(value);
        break;
      case "extraPayment":
        setExtraPayment(value);
        break;
    }
    if (!touched[field] && value.length > 0) {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }
  };

  const handleSavePDF = useCallback(() => {
    if (!result) return;

    // Remove any existing print root
    const existing = document.getElementById("mortgage-print-root");
    if (existing) existing.remove();

    // Build isolated print HTML inside current document
    const container = document.createElement("div");
    container.id = "mortgage-print-root";
    container.innerHTML = `
      <style>
        @media print {
          body > *:not(#mortgage-print-root) { display: none !important; }
          #mortgage-print-root { display: block !important; }
          @page { size: A4; margin: 15mm; }
        }
        #mortgage-print-root {
          position: fixed;
          inset: 0;
          background: white;
          padding: 20px;
          font-family: Arial, sans-serif;
          font-size: 12px;
          color: #111;
          line-height: 1.4;
          display: none;
          overflow: auto;
          z-index: 999999;
        }
        #mortgage-print-root * { box-sizing: border-box; }
        .p-header { text-align: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #0d9488; }
        .p-header h1 { font-size: 18px; color: #0d9488; margin: 0 0 4px; }
        .p-header p { color: #57534e; font-size: 11px; margin: 0; }
        .p-summary { background: #f5f3f0; padding: 10px; border-radius: 6px; margin-bottom: 16px; }
        .p-summary h3 { font-size: 11px; font-weight: 600; margin: 0 0 6px; color: #1c1917; }
        .p-summary .row { display: flex; justify-content: space-between; font-size: 11px; padding: 4px 0; border-bottom: 1px solid #e7e5e4; }
        .p-summary .row:last-child { border-bottom: none; }
        .p-highlight { background: #0d9488; color: white; padding: 12px; border-radius: 8px; text-align: center; margin-bottom: 16px; }
        .p-highlight .label { font-size: 11px; margin-bottom: 3px; }
        .p-highlight .value { font-size: 22px; font-weight: 700; }
        .p-section { margin-bottom: 12px; }
        .p-section-title { font-size: 12px; font-weight: 600; color: #1c1917; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid #e7e5e4; }
        .p-grid { display: flex; gap: 8px; }
        .p-grid > div { flex: 1; }
        .p-card { background: #f5f3f0; padding: 10px; border-radius: 6px; border: 1px solid #e7e5e4; }
        .p-card .label { font-size: 10px; color: #57534e; margin-bottom: 3px; }
        .p-card .value { font-size: 15px; font-weight: 600; color: #1c1917; }
        .p-card .sub { font-size: 10px; color: #0d9488; margin-top: 3px; }
        .p-card.accent { border-color: #0d9488; background: #f0fdfa; }
        .p-card.accent .value { color: #0d9488; }
        .p-time { background: #fef3c7; border: 1px solid #d97706; padding: 10px; border-radius: 6px; margin-bottom: 12px; }
        .p-time .label { font-size: 10px; color: #92400e; margin-bottom: 2px; }
        .p-time .value { font-size: 13px; font-weight: 600; color: #92400e; }
        .p-footer { margin-top: 14px; padding-top: 10px; border-top: 1px solid #e7e5e4; text-align: center; color: #78716c; font-size: 9px; }
      </style>
      <div class="p-header">
        <h1>Simulação de Amortização de Crédito Habitação</h1>
        <p>Gerado em ${new Date().toLocaleDateString("pt-PT")} • aumentarcapital.com</p>
      </div>
      <div class="p-summary">
        <h3>Dados da Simulação</h3>
        <div class="row"><span>Capital em Dívida</span><span>${formatCurrency(principalValidation.value)}</span></div>
        <div class="row"><span>Prazo Restante</span><span>${formatMonthsToTime(remainingMonths)}</span></div>
        <div class="row"><span>Taxa de Juro (TAN)</span><span>${interestRateValidation.value}%</span></div>
        <div class="row"><span>Amortização Extra</span><span>${formatCurrency(extraPaymentValidation.value)}</span></div>
      </div>
      <div class="p-highlight">
        <div class="label">Poupança Total em Juros</div>
        <div class="value">${formatCurrency(result.interestSaved)}</div>
      </div>
      <div class="p-section">
        <div class="p-section-title">Comparação de Prestações</div>
        <div class="p-grid">
          <div><div class="p-card"><div class="label">Prestação Atual</div><div class="value">${formatCurrency(result.currentMonthlyPayment)}</div><div class="sub">/mês</div></div></div>
          <div><div class="p-card accent"><div class="label">Nova Prestação</div><div class="value">${formatCurrency(result.newMonthlyPayment)}</div><div class="sub">-${formatCurrency(result.monthlyPaymentReduction)}/mês</div></div></div>
        </div>
      </div>
      ${result.monthsSaved > 0 ? `<div class="p-time"><div class="label">⏱️ Tempo Poupado (mantendo prestação atual)</div><div class="value">${formatMonthsToTime(result.monthsSaved)}</div></div>` : ""}
      <div class="p-section">
        <div class="p-section-title">Total de Juros</div>
        <div class="p-grid">
          <div><div class="p-card"><div class="label">Sem Amortização</div><div class="value">${formatCurrency(result.totalInterestWithout)}</div></div></div>
          <div><div class="p-card accent"><div class="label">Com Amortização</div><div class="value">${formatCurrency(result.totalInterestWith)}</div></div></div>
        </div>
      </div>
      <div class="p-footer">
        <p>Simulação efetuada em aumentarcapital.com • Os valores são meramente indicativos.</p>
      </div>
    `;

    document.body.appendChild(container);

    // Show only print root, then trigger print
    const triggerPrint = () => {
      container.style.display = "block";
      setTimeout(() => {
        window.print();
        // Cleanup after short delay to allow dialog to open
        setTimeout(() => {
          container.remove();
        }, 500);
      }, 50);
    };

    triggerPrint();
  }, [result, principalValidation.value, remainingMonths, interestRateValidation.value, extraPaymentValidation.value]);

  return (
    <>
      {/* Calculator Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 lg:p-8 shadow-[var(--shadow-lg)] print:shadow-none print:border-none">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Inputs Column */}
            <div className="space-y-6 no-print">
              {/* Principal */}
              <div>
                <label htmlFor="principal" className="flex items-center text-base font-bold text-[var(--color-ink)] mb-2">
                  Capital em Dívida <span className="text-[var(--color-error)]">*</span>
                  <InfoTooltip text="O valor total que ainda deves ao banco pelo teu crédito habitação. Encontras este valor no extrato do empréstimo ou na app do banco." />
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-ink-secondary)] font-medium">€</span>
                  <input
                    type="text"
                    id="principal"
                    value={principal}
                    onChange={(e) => handleInputChange("principal", e.target.value)}
                    onBlur={() => handleBlur("principal")}
                    placeholder="Ex: 150000"
                    className={`w-full pl-8 pr-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base shadow-sm bg-[var(--color-surface)] ${
                      (touched.principal || principal.length > 0) && !principalValidation.isValid
                        ? "border-[var(--color-error)] focus:ring-[var(--color-error)]/50 focus:border-[var(--color-error)]"
                        : "border-[var(--color-border)] focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]"
                    }`}
                    aria-required="true"
                    aria-label="Capital em dívida em euros"
                    aria-invalid={(touched.principal || principal.length > 0) && !principalValidation.isValid}
                  />
                </div>
                {(touched.principal || principal.length > 0) && <ErrorMessage message={principalValidation.error} />}
              </div>

              {/* Term */}
              <div>
                <label htmlFor="term-value" className="flex items-center text-base font-bold text-[var(--color-ink)] mb-2">
                  Prazo Restante <span className="text-red-500">*</span>
                  <InfoTooltip text="Quantos anos ou meses faltam para terminar de pagar o empréstimo. Podes consultar no contrato ou extrato do banco." />
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      id="term-value"
                      value={termValue}
                      onChange={(e) => handleInputChange("termValue", e.target.value)}
                      onBlur={() => handleBlur("termValue")}
                      placeholder={termUnit === "years" ? "Ex: 25" : "Ex: 300"}
                      className={`w-full px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base shadow-sm ${
                        (touched.termValue || termValue.length > 0) && !termValidation.isValid
                          ? "border-red-300 focus:ring-red-500/50 focus:border-red-500"
                          : "border-[var(--color-border)] focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]"
                      }`}
                      aria-required="true"
                      aria-label={`Prazo restante em ${termUnit === "years" ? "anos" : "meses"}`}
                      aria-invalid={(touched.termValue || termValue.length > 0) && !termValidation.isValid}
                    />
                  </div>
                  <select
                    value={termUnit}
                    onChange={(e) => setTermUnit(e.target.value as "years" | "months")}
                    className="px-4 py-3.5 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all duration-200 text-base bg-[var(--color-surface)] shadow-sm"
                    aria-label="Unidade de tempo"
                  >
                    <option value="years">Anos</option>
                    <option value="months">Meses</option>
                  </select>
                </div>
                {(touched.termValue || termValue.length > 0) && <ErrorMessage message={termValidation.error} />}
              </div>

              {/* Interest Rate */}
              <div>
                <label htmlFor="interest-rate" className="flex items-center text-base font-bold text-neutral-900 mb-2">
                  Taxa de Juro (TAN) <span className="text-red-500">*</span>
                  <InfoTooltip text="Taxa Anual Nominal - a taxa de juro base do teu crédito, sem incluir outros custos como seguros. Encontras no contrato ou extrato do empréstimo." />
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="interest-rate"
                    value={interestRate}
                    onChange={(e) => handleInputChange("interestRate", e.target.value)}
                    onBlur={() => handleBlur("interestRate")}
                    placeholder="Ex: 3.5"
                    className={`w-full px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base shadow-sm ${
                      (touched.interestRate || interestRate.length > 0) && !interestRateValidation.isValid
                        ? "border-red-300 focus:ring-red-500/50 focus:border-red-500"
                        : "border-[var(--color-border)] focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]"
                    }`}
                    aria-required="true"
                    aria-label="Taxa de juro anual em percentagem"
                    aria-invalid={(touched.interestRate || interestRate.length > 0) && !interestRateValidation.isValid}
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--color-ink-secondary)] font-medium">%</span>
                </div>
                {(touched.interestRate || interestRate.length > 0) && <ErrorMessage message={interestRateValidation.error} />}
                {/* Quick rate presets */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {[2.5, 3.5, 4.5, 5.5].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => {
                        setInterestRate(rate.toString());
                        setTouched((prev) => ({ ...prev, interestRate: true }));
                      }}
                      className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 touch-manipulation ${
                        parseFloat(interestRate) === rate
                          ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/50 text-[var(--color-primary)]"
                          : "bg-[var(--color-background-subtle)] border-[var(--color-border)] text-[var(--color-ink-secondary)] hover:bg-[var(--color-border)] hover:border-[var(--color-ink-muted)]"
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Payment */}
              <div>
                <label htmlFor="extra-payment" className="flex items-center text-base font-bold text-[var(--color-ink)] mb-2">
                  Amortização Extra <span className="text-[var(--color-error)]">*</span>
                  <InfoTooltip text="Pagamento adicional que queres fazer para reduzir o capital em dívida. Ao amortizar, pagas menos juros no futuro." />
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-ink-secondary)] font-medium">€</span>
                  <input
                    type="text"
                    id="extra-payment"
                    value={extraPayment}
                    onChange={(e) => handleInputChange("extraPayment", e.target.value)}
                    onBlur={() => handleBlur("extraPayment")}
                    placeholder="Ex: 10000"
                    className={`w-full pl-8 pr-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base shadow-sm bg-[var(--color-surface)] ${
                      (touched.extraPayment || extraPayment.length > 0) && !extraPaymentValidation.isValid
                        ? "border-[var(--color-error)] focus:ring-[var(--color-error)]/50 focus:border-[var(--color-error)]"
                        : "border-[var(--color-border)] focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)]"
                    }`}
                    aria-required="true"
                    aria-label="Valor da amortização extra em euros"
                    aria-invalid={(touched.extraPayment || extraPayment.length > 0) && !extraPaymentValidation.isValid}
                  />
                </div>
                {(touched.extraPayment || extraPayment.length > 0) && <ErrorMessage message={extraPaymentValidation.error} />}
                {extraPaymentValidation.value > principalValidation.value && principalValidation.isValid && (
                  <ErrorMessage message="A amortização não pode exceder o capital em dívida" />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCalculate}
                  disabled={!hasValidInput}
                  className="flex-1 px-6 py-3.5 sm:py-4 bg-[var(--color-primary)] text-[var(--color-ink-inverse)] font-bold rounded-xl hover:bg-[var(--color-primary-hover)] hover:shadow-[var(--shadow-md)] hover:scale-[1.02] active:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none text-base sm:text-lg touch-manipulation"
                  aria-label="Simular amortização"
                >
                  Simular
                  <svg className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 sm:flex-none px-6 py-3 border border-[var(--color-border)] text-[var(--color-ink-secondary)] font-bold rounded-xl hover:bg-[var(--color-background-subtle)] hover:border-[var(--color-ink-muted)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 touch-manipulation"
                  aria-label="Limpar todos os campos"
                >
                  Limpar
                </button>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:pl-8 lg:border-l-2 lg:border-[var(--color-border)] mt-8 lg:mt-0">
              <div
                id="results-section-mortgage"
                className="bg-gradient-to-br from-[var(--color-primary)]/5 via-[var(--color-primary)]/5 to-[var(--color-surface)] border border-[var(--color-primary)]/20 rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm relative overflow-hidden min-h-[320px] sm:min-h-[380px] print:min-h-0 print:bg-white print:border-[var(--color-border)]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-2xl print:hidden" />
                <div className="relative">
                  <div className="flex flex-col gap-2 mb-6">
                    <h2 className="text-2xl font-bold text-[var(--color-ink)]">Resultados</h2>
                    {showResults && result && (
                      <button
                        type="button"
                        onClick={handleSavePDF}
                        className="no-print inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]/80 hover:text-[var(--color-primary)] hover:underline underline-offset-4 transition-all duration-150 ease-out self-start"
                        aria-label="Guardar como PDF"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Guardar PDF</span>
                      </button>
                    )}
                  </div>

                  {showResults && result ? (
                    <div className="space-y-6 animate-fade-in">
                      <div className="bg-[var(--color-primary)] rounded-xl p-4 text-[var(--color-ink-inverse)]">
                        <p className="text-sm font-medium opacity-90 mb-1">Poupança em Juros</p>
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                          {formatCurrency(result.interestSaved)}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[var(--color-surface)]/80 rounded-xl p-4 border border-[var(--color-border)]">
                          <p className="text-xs font-medium text-[var(--color-ink-muted)] mb-1">Prestação Atual</p>
                          <p className="text-lg font-bold text-[var(--color-ink-secondary)]">
                            {formatCurrency(result.currentMonthlyPayment)}
                          </p>
                          <p className="text-xs text-[var(--color-ink-muted)]">/mês</p>
                        </div>
                        <div className="bg-[var(--color-surface)]/80 rounded-xl p-4 border border-[var(--color-primary)]/30">
                          <p className="text-xs font-medium text-[var(--color-ink-muted)] mb-1">Nova Prestação</p>
                          <p className="text-lg font-bold text-[var(--color-primary)]">
                            {formatCurrency(result.newMonthlyPayment)}
                          </p>
                          <p className="text-xs text-[var(--color-primary)]">-{formatCurrency(result.monthlyPaymentReduction)}/mês</p>
                        </div>
                      </div>

                      {result.monthsSaved > 0 && (
                        <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-xl p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">⏱️</span>
                            <div>
                              <p className="text-sm font-medium text-[var(--color-ink-secondary)]">
                                Tempo poupado (mantendo prestação atual)
                              </p>
                              <p className="text-lg font-bold text-[var(--color-accent)]">
                                {formatMonthsToTime(result.monthsSaved)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <p className="text-xs font-medium text-[var(--color-ink-muted)] mb-1">Juros sem amortização</p>
                          <p className="text-base font-bold text-[var(--color-ink-secondary)]">
                            {formatCurrency(result.totalInterestWithout)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[var(--color-ink-muted)] mb-1">Juros com amortização</p>
                          <p className="text-base font-bold text-[var(--color-primary)]">
                            {formatCurrency(result.totalInterestWith)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12" role="status" aria-live="polite">
                      <div className="text-5xl mb-4" aria-hidden="true">🏠</div>
                      <p className="text-[var(--color-ink-secondary)] font-medium mb-2">Preenche os dados para simular</p>
                      <p className="text-sm text-[var(--color-ink-muted)]">
                        Descobre quanto podes poupar ao amortizar o teu crédito habitação
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          {showResults && result && chartData.length > 0 && (
            <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-neutral-200 animate-fade-in no-print">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-4 sm:mb-6">Comparação de Juros</h3>
              <div className="h-[250px] sm:h-[300px] bg-gradient-to-b from-white to-neutral-50/50 rounded-xl p-3 sm:p-4 border border-neutral-100">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={true} vertical={false} />
                    <XAxis
                      type="number"
                      tickFormatter={formatYAxisValue}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                      tickLine={false}
                      axisLine={{ stroke: "#E5E7EB" }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                      tickLine={false}
                      axisLine={false}
                      width={90}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={40}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[var(--color-ink-muted)] text-center px-4">
                A diferença representa os <span className="font-semibold text-[var(--color-primary)]">juros que poupas</span> ao fazer a amortização extra
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Information Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 no-print">
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 sm:mb-4">O Que É Amortização de Crédito?</h2>
          <div className="prose prose-neutral max-w-none prose-sm sm:prose-base">
            <p className="text-neutral-600 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
              A <strong>amortização antecipada</strong> é um pagamento extra que fazes ao banco para reduzir o capital em dívida do teu crédito habitação. 
              Ao reduzires o capital, pagas menos juros ao longo do tempo.
            </p>
            <p className="text-[var(--color-ink-secondary)] leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
              Em Portugal, os bancos são obrigados por lei a aceitar amortizações antecipadas. Para créditos com taxa variável, 
              a comissão máxima é de <strong>0,5%</strong> do valor amortizado. Para taxa fixa, pode chegar a <strong>2%</strong>.
            </p>
            
            {/* Tip box */}
            <div className="bg-primary-50 border border-primary-200/60 rounded-xl p-4 sm:p-5 my-4 sm:my-6">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <span>💡</span> Dica
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-0">
                Ao amortizar, podes escolher entre <strong>reduzir a prestação mensal</strong> (mantendo o prazo) 
                ou <strong>reduzir o prazo</strong> (mantendo a prestação). A segunda opção geralmente poupa mais juros a longo prazo.
              </p>
            </div>

            <p className="text-[var(--color-ink-secondary)] leading-relaxed text-sm sm:text-base">
              Antes de amortizar, certifica-te que tens o teu <strong>fundo de emergência</strong> completo. 
              A liquidez é importante — uma vez amortizado, não consegues recuperar esse dinheiro facilmente.
            </p>
          </div>
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              href="/artigos/fundacao-fundo-emergencia"
              className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold transition-colors duration-200 group text-sm sm:text-base touch-manipulation"
            >
              <span>Aprende sobre fundo de emergência</span>
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/artigos/fundacao-como-sair-de-dividas"
              className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold transition-colors duration-200 group text-sm sm:text-base touch-manipulation"
            >
              <span>Estratégias para sair de dívidas</span>
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
