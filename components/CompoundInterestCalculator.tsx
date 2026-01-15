"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  formatCurrency,
  parseInput,
  calculateCompoundInterest,
  generateGrowthData,
  PORTUGAL_PRESETS,
  type CompoundFrequency,
} from "@/lib/calculator-utils";
import { validateCurrencyInput, validatePercentageInput } from "@/lib/input-validation";

// Custom tooltip component for the chart (must be outside main component)
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}

function ChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const totalValue = payload.find(p => p.name === "Valor Total")?.value || 0;
    const invested = payload.find(p => p.name === "Total Investido")?.value || 0;
    const interest = totalValue - invested;
    
    return (
      <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-lg">
        <p className="font-bold text-neutral-900 mb-2">{label}</p>
        <div className="space-y-1 text-sm">
          <p className="text-cyan-700">
            <span className="font-medium">Valor Total:</span> {formatCurrency(totalValue)}
          </p>
          <p className="text-neutral-600">
            <span className="font-medium">Investido:</span> {formatCurrency(invested)}
          </p>
          <p className="text-cyan-600">
            <span className="font-medium">Juros Ganhos:</span> {formatCurrency(interest)}
          </p>
        </div>
      </div>
    );
  }
  return null;
}

// Format Y-axis values (must be outside main component)
function formatYAxisValue(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
  return value.toString();
}

// Info Tooltip Component
function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="relative group ml-1.5 inline-flex items-center">
      <span 
        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-neutral-200 hover:bg-cyan-100 text-neutral-500 hover:text-cyan-600 text-xs sm:text-sm flex items-center justify-center cursor-help transition-colors duration-200 font-medium touch-manipulation"
        aria-label="Informação"
      >
        i
      </span>
      <span className="absolute left-6 sm:left-7 top-1/2 -translate-y-1/2 z-20 hidden sm:group-hover:block w-56 sm:w-64 p-3 text-xs bg-neutral-800 text-white rounded-lg shadow-xl leading-relaxed pointer-events-none">
        <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-neutral-800" />
        {text}
      </span>
      {/* Mobile tooltip - shows on tap */}
      <span className="sm:hidden fixed bottom-4 left-4 right-4 z-30 bg-neutral-800 text-white p-4 rounded-lg shadow-2xl text-sm leading-relaxed opacity-0 pointer-events-none group-active:opacity-100 transition-opacity">
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

export default function CompoundInterestCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("");
  const [annualRate, setAnnualRate] = useState<string>("7");
  const [years, setYears] = useState<number>(20);
  const [frequency, setFrequency] = useState<CompoundFrequency>("monthly");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [touched, setTouched] = useState<{
    initialInvestment: boolean;
    monthlyContribution: boolean;
    annualRate: boolean;
  }>({
    initialInvestment: false,
    monthlyContribution: false,
    annualRate: false,
  });

  // Validate inputs
  const initialInvestmentValidation = useMemo(
    () => validateCurrencyInput(initialInvestment, { min: 0, fieldName: "Capital inicial" }),
    [initialInvestment]
  );

  const monthlyContributionValidation = useMemo(
    () => validateCurrencyInput(monthlyContribution, { min: 0, fieldName: "Contribuição mensal" }),
    [monthlyContribution]
  );

  const annualRateValidation = useMemo(
    () => validatePercentageInput(annualRate, { min: 0, max: 30, fieldName: "Taxa de juro" }),
    [annualRate]
  );

  // Parse input values
  const principal = initialInvestmentValidation.value;
  const monthly = monthlyContributionValidation.value;
  const rate = annualRateValidation.value;

  // Calculate results
  const result = useMemo(() => {
    return calculateCompoundInterest(principal, monthly, rate, years, frequency);
  }, [principal, monthly, rate, years, frequency]);

  // Generate chart data
  const chartData = useMemo(() => {
    if (principal <= 0 && monthly <= 0) return [];
    return generateGrowthData(principal, monthly, rate, years, frequency);
  }, [principal, monthly, rate, years, frequency]);

  const hasValidInput =
    (principal > 0 || monthly > 0) &&
    initialInvestmentValidation.isValid &&
    monthlyContributionValidation.isValid &&
    annualRateValidation.isValid;

  const handleCalculate = useCallback(() => {
    if (hasValidInput) {
      setShowResults(true);
      // Track calculator usage
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "calculator_used", {
          calculator_type: "compound_interest",
        });
      }
      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById("results-section-compound");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [hasValidInput]);

  const handleReset = useCallback(() => {
    setInitialInvestment("");
    setMonthlyContribution("");
    setAnnualRate("7");
    setYears(20);
    setFrequency("monthly");
    setShowResults(false);
    setTouched({
      initialInvestment: false,
      monthlyContribution: false,
      annualRate: false,
    });
  }, []);

  const handleBlur = (field: "initialInvestment" | "monthlyContribution" | "annualRate") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Show validation errors immediately after first interaction
  const handleInputChange = (
    field: "initialInvestment" | "monthlyContribution" | "annualRate",
    value: string
  ) => {
    if (field === "initialInvestment") {
      setInitialInvestment(value);
      if (!touched.initialInvestment && value.length > 0) {
        setTouched((prev) => ({ ...prev, initialInvestment: true }));
      }
    } else if (field === "monthlyContribution") {
      setMonthlyContribution(value);
      if (!touched.monthlyContribution && value.length > 0) {
        setTouched((prev) => ({ ...prev, monthlyContribution: true }));
      }
    } else if (field === "annualRate") {
      setAnnualRate(value);
      if (!touched.annualRate && value.length > 0) {
        setTouched((prev) => ({ ...prev, annualRate: true }));
      }
    }
  };

  const handlePresetClick = (presetRate: number) => {
    setAnnualRate(presetRate.toString());
  };

  return (
    <>
      {/* Calculator Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 lg:p-8 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Inputs Column */}
            <div className="space-y-6">
              {/* Initial Investment */}
              <div>
                <label htmlFor="initial-investment" className="flex items-center text-base font-bold text-neutral-900 mb-2">
                  Capital Inicial <span className="text-neutral-500 text-sm font-normal ml-1">(opcional)</span>
                  <InfoTooltip text="O montante que tens disponível para começar a investir hoje. Pode ser zero se preferires apenas contribuições mensais." />
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 font-medium">€</span>
                  <input
                    type="text"
                    id="initial-investment"
                    value={initialInvestment}
                    onChange={(e) => handleInputChange("initialInvestment", e.target.value)}
                    onBlur={() => handleBlur("initialInvestment")}
                    placeholder="Ex: 1000"
                    className={`w-full pl-8 pr-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base shadow-sm ${
                      (touched.initialInvestment || initialInvestment.length > 0) && !initialInvestmentValidation.isValid
                        ? "border-red-300 focus:ring-red-500/50 focus:border-red-500"
                        : "border-neutral-200/60 focus:ring-cyan-500/50 focus:border-cyan-500"
                    }`}
                    aria-label="Capital inicial em euros"
                    aria-invalid={(touched.initialInvestment || initialInvestment.length > 0) && !initialInvestmentValidation.isValid}
                  />
                </div>
                {(touched.initialInvestment || initialInvestment.length > 0) && <ErrorMessage message={initialInvestmentValidation.error} />}
              </div>

              {/* Monthly Contribution */}
              <div>
                <label htmlFor="monthly-contribution" className="flex items-center text-base font-bold text-neutral-900 mb-2">
                  Contribuição Mensal <span className="text-neutral-500 text-sm font-normal ml-1">(opcional)</span>
                  <InfoTooltip text="Valor que vais adicionar ao investimento todos os meses. A consistência é mais importante que o valor — pequenas quantias regulares fazem grande diferença." />
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 font-medium">€</span>
                  <input
                    type="text"
                    id="monthly-contribution"
                    value={monthlyContribution}
                    onChange={(e) => handleInputChange("monthlyContribution", e.target.value)}
                    onBlur={() => handleBlur("monthlyContribution")}
                    placeholder="Ex: 200"
                    className={`w-full pl-8 pr-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base shadow-sm ${
                      (touched.monthlyContribution || monthlyContribution.length > 0) && !monthlyContributionValidation.isValid
                        ? "border-red-300 focus:ring-red-500/50 focus:border-red-500"
                        : "border-neutral-200/60 focus:ring-cyan-500/50 focus:border-cyan-500"
                    }`}
                    aria-label="Contribuição mensal em euros"
                    aria-invalid={(touched.monthlyContribution || monthlyContribution.length > 0) && !monthlyContributionValidation.isValid}
                  />
                </div>
                {(touched.monthlyContribution || monthlyContribution.length > 0) && <ErrorMessage message={monthlyContributionValidation.error} />}
              </div>

              {/* Annual Interest Rate */}
              <div>
                <label htmlFor="annual-rate" className="flex items-center text-base font-bold text-neutral-900 mb-2">
                  Taxa de Juro Anual
                  <InfoTooltip text="Retorno anual esperado do investimento. Valores históricos típicos: ETFs globais ~7%, PPR equilibrado ~5%, Certificados de Aforro ~2.5%." />
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="annual-rate"
                    value={annualRate}
                    onChange={(e) => handleInputChange("annualRate", e.target.value)}
                    onBlur={() => handleBlur("annualRate")}
                    placeholder="Ex: 7"
                    className={`w-full px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base shadow-sm ${
                      (touched.annualRate || annualRate.length > 0) && !annualRateValidation.isValid
                        ? "border-red-300 focus:ring-red-500/50 focus:border-red-500"
                        : "border-neutral-200/60 focus:ring-cyan-500/50 focus:border-cyan-500"
                    }`}
                    aria-label="Taxa de juro anual em percentagem"
                    aria-invalid={(touched.annualRate || annualRate.length > 0) && !annualRateValidation.isValid}
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-600 font-medium">%</span>
                </div>
                {(touched.annualRate || annualRate.length > 0) && <ErrorMessage message={annualRateValidation.error} />}
                {/* Presets */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {PORTUGAL_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handlePresetClick(preset.rate)}
                      className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 touch-manipulation ${
                        parseFloat(annualRate) === preset.rate
                          ? "bg-cyan-50 border-cyan-300 text-cyan-700"
                          : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:border-neutral-300"
                      }`}
                      title={preset.description}
                    >
                      {preset.label} ({preset.rate}%)
                    </button>
                  ))}
                </div>
              </div>

              {/* Investment Period */}
              <div>
                <label htmlFor="years" className="flex items-center text-base font-bold text-neutral-900 mb-2">
                  Período de Investimento
                  <InfoTooltip text="Número de anos que planeias manter o investimento. Quanto maior o período, mais beneficias do efeito dos juros compostos." />
                </label>
                <select
                  id="years"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full px-5 py-3.5 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200 text-base bg-white shadow-sm"
                  aria-label="Período de investimento em anos"
                >
                  {[5, 10, 15, 20, 25, 30, 35, 40].map((y) => (
                    <option key={y} value={y}>
                      {y} anos
                    </option>
                  ))}
                </select>
              </div>

              {/* Compound Frequency */}
              <div>
                <label htmlFor="frequency" className="flex items-center text-base font-bold text-neutral-900 mb-2">
                  Frequência de Capitalização
                  <InfoTooltip text="Com que frequência os juros são calculados e adicionados ao capital. Mensal é o mais comum em produtos financeiros." />
                </label>
                <select
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as CompoundFrequency)}
                  className="w-full px-5 py-3.5 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200 text-base bg-white shadow-sm"
                  aria-label="Frequência de capitalização dos juros"
                >
                  <option value="monthly">Mensal</option>
                  <option value="quarterly">Trimestral</option>
                  <option value="annually">Anual</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCalculate}
                  disabled={!hasValidInput}
                  className="flex-1 px-6 py-3.5 sm:py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-bold rounded-xl hover:from-cyan-700 hover:to-cyan-800 hover:shadow-lg hover:scale-[1.02] active:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none text-base sm:text-lg touch-manipulation"
                  aria-label="Calcular resultados"
                >
                  Ver Resultados
                  <svg className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 sm:flex-none px-6 py-3 border border-neutral-300 text-neutral-700 font-bold rounded-xl hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 touch-manipulation"
                  aria-label="Limpar todos os campos"
                >
                  Limpar
                </button>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:pl-8 lg:border-l-2 lg:border-neutral-200 mt-8 lg:mt-0">
              <div
                id="results-section-compound"
                className="bg-gradient-to-br from-primary-50 via-primary-50/80 to-white border border-primary-200/60 rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm relative overflow-hidden min-h-[280px] sm:min-h-[320px]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/30 rounded-full blur-2xl" />
                <div className="relative">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Resultados</h2>

                  {showResults && hasValidInput ? (
                    <div className="space-y-6 animate-fade-in">
                      {/* Final Amount */}
                      <div>
                        <p className="text-sm font-medium text-neutral-600 mb-2">Valor Final após {years} anos</p>
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-700">
                          {formatCurrency(result.finalAmount)}
                        </p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="bg-white/60 rounded-xl p-4 border border-neutral-200/40">
                          <p className="text-xs font-medium text-neutral-500 mb-1">Total Investido</p>
                          <p className="text-lg font-bold text-neutral-700">
                            {formatCurrency(result.totalInvested)}
                          </p>
                        </div>
                        <div className="bg-white/60 rounded-xl p-4 border border-accent/20">
                          <p className="text-xs font-medium text-neutral-500 mb-1">Juros Ganhos</p>
                          <p className="text-lg font-bold text-accent">
                            {formatCurrency(result.totalInterest)}
                          </p>
                        </div>
                      </div>

                      {/* Growth Multiplier */}
                      {result.totalInvested > 0 && (
                        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">📈</span>
                            <div>
                              <p className="text-sm font-medium text-neutral-700">
                                O teu dinheiro multiplicou{" "}
                                <span className="font-bold text-accent">
                                  {(result.finalAmount / result.totalInvested).toFixed(2)}x
                                </span>
                              </p>
                              <p className="text-xs text-neutral-500">
                                {((result.totalInterest / result.totalInvested) * 100).toFixed(1)}% de retorno total
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12" role="status" aria-live="polite">
                      <div className="text-5xl mb-4" aria-hidden="true">📊</div>
                      <p className="text-neutral-700 font-medium mb-2">Preenche os dados acima</p>
                      <p className="text-sm text-neutral-500">
                        Clica em &quot;Ver Resultados&quot; para descobrires o poder dos juros compostos
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          {showResults && hasValidInput && chartData.length > 0 && (
            <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-neutral-200 animate-fade-in">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-4 sm:mb-6">Evolução do Investimento</h3>
              <div className="h-[280px] sm:h-[350px] lg:h-[400px] bg-gradient-to-b from-white to-neutral-50/50 rounded-xl p-3 sm:p-4 border border-neutral-100">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 15, right: 10, left: 5, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-brand-primary)" stopOpacity={0.4} />
                        <stop offset="50%" stopColor="var(--color-brand-secondary)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="var(--color-brand-secondary)" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-text-secondary)" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="var(--color-text-secondary)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 10, fill: "#6B7280" }}
                      tickLine={false}
                      axisLine={{ stroke: "#E5E7EB" }}
                      dy={8}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tickFormatter={formatYAxisValue}
                      tick={{ fontSize: 10, fill: "#6B7280" }}
                      tickLine={false}
                      axisLine={false}
                      width={45}
                      dx={-3}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend
                      wrapperStyle={{ paddingTop: "24px" }}
                      iconType="circle"
                      iconSize={10}
                      formatter={(value) => <span className="text-sm text-neutral-600">{value}</span>}
                    />
                    <Area
                      type="monotone"
                      dataKey="invested"
                      name="Total Investido"
                      stroke="#94A3B8"
                      strokeWidth={2}
                      fill="url(#colorInvested)"
                      strokeDasharray="6 4"
                    />
                    <Area
                      type="monotone"
                      dataKey="totalValue"
                      name="Valor Total"
                      stroke="var(--color-brand-primary)"
                      strokeWidth={3}
                      fill="url(#colorTotal)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-neutral-500 text-center px-4">
                A diferença entre as linhas representa os <span className="font-semibold text-cyan-600">juros compostos</span> acumulados ao longo do tempo
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Information Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 sm:mb-4">O Que São Juros Compostos?</h2>
          <div className="prose prose-neutral max-w-none prose-sm sm:prose-base">
            <p className="text-neutral-600 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
              Os <strong>juros compostos</strong> são frequentemente chamados de &quot;a oitava maravilha do mundo&quot;. 
              Ao contrário dos juros simples, onde ganhas apenas sobre o capital inicial, nos juros compostos 
              ganhas <strong>juros sobre os juros</strong> anteriores.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
              Isto cria um efeito de &quot;bola de neve&quot; — quanto mais tempo o dinheiro está investido, 
              mais rápido cresce. É por isso que começar cedo é tão importante: mesmo pequenas 
              quantias podem transformar-se em valores significativos ao longo de décadas.
            </p>
            
            {/* Rule of 72 */}
            <div className="bg-cyan-50 border border-cyan-200/60 rounded-xl p-4 sm:p-5 my-4 sm:my-6">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <span>🧮</span> Regra dos 72
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-0">
                Uma forma rápida de calcular quanto tempo demora a duplicar o teu dinheiro: 
                divide 72 pela taxa de juro. Por exemplo, a 7% ao ano, o teu dinheiro duplica 
                em aproximadamente <strong>72 ÷ 7 ≈ 10 anos</strong>.
              </p>
            </div>

            <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
              A chave para maximizar os juros compostos é <strong>tempo</strong>, <strong>consistência</strong> e 
              <strong> paciência</strong>. Mesmo que não tenhas um grande capital inicial, contribuições 
              mensais regulares podem construir riqueza significativa ao longo do tempo.
            </p>
          </div>
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              href="/artigos/comecar-a-investir"
              className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold transition-colors duration-200 group text-sm sm:text-base touch-manipulation"
            >
              <span>Aprende a começar a investir</span>
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
              href="/artigos/criar-primeira-estrategia-investimento"
              className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold transition-colors duration-200 group text-sm sm:text-base touch-manipulation"
            >
              <span>Cria a tua estratégia de investimento</span>
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
