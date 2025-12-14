"use client";

import { useState, useMemo } from "react";
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

export default function CompoundInterestCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("");
  const [annualRate, setAnnualRate] = useState<string>("7");
  const [years, setYears] = useState<number>(20);
  const [frequency, setFrequency] = useState<CompoundFrequency>("monthly");

  // Parse input values
  const principal = parseInput(initialInvestment);
  const monthly = parseInput(monthlyContribution);
  const rate = parseFloat(annualRate) || 0;

  // Calculate results
  const result = useMemo(() => {
    return calculateCompoundInterest(principal, monthly, rate, years, frequency);
  }, [principal, monthly, rate, years, frequency]);

  // Generate chart data
  const chartData = useMemo(() => {
    if (principal <= 0 && monthly <= 0) return [];
    return generateGrowthData(principal, monthly, rate, years, frequency);
  }, [principal, monthly, rate, years, frequency]);

  const hasValidInput = principal > 0 || monthly > 0;

  const handleReset = () => {
    setInitialInvestment("");
    setMonthlyContribution("");
    setAnnualRate("7");
    setYears(20);
    setFrequency("monthly");
  };

  const handlePresetClick = (presetRate: number) => {
    setAnnualRate(presetRate.toString());
  };

  // Custom tooltip for chart
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      const totalValue = payload.find(p => p.name === "Valor Total")?.value || 0;
      const invested = payload.find(p => p.name === "Total Investido")?.value || 0;
      const interest = totalValue - invested;
      
      return (
        <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-lg">
          <p className="font-bold text-neutral-900 mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <p className="text-primary-700">
              <span className="font-medium">Valor Total:</span> {formatCurrency(totalValue)}
            </p>
            <p className="text-neutral-600">
              <span className="font-medium">Investido:</span> {formatCurrency(invested)}
            </p>
            <p className="text-accent">
              <span className="font-medium">Juros Ganhos:</span> {formatCurrency(interest)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Format Y-axis values
  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
    return value.toString();
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
                <label htmlFor="initial-investment" className="block text-base font-bold text-neutral-900 mb-2">
                  Capital Inicial <span className="text-neutral-500 text-sm font-normal">(opcional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 font-medium">€</span>
                  <input
                    type="text"
                    id="initial-investment"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                    placeholder="Ex: 1000"
                    className="w-full pl-8 pr-5 py-3.5 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-base shadow-sm"
                    aria-label="Capital inicial em euros"
                  />
                </div>
                <p className="mt-2 text-sm text-neutral-600">
                  Montante que tens disponível para investir agora
                </p>
              </div>

              {/* Monthly Contribution */}
              <div>
                <label htmlFor="monthly-contribution" className="block text-base font-bold text-neutral-900 mb-2">
                  Contribuição Mensal <span className="text-neutral-500 text-sm font-normal">(opcional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 font-medium">€</span>
                  <input
                    type="text"
                    id="monthly-contribution"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    placeholder="Ex: 200"
                    className="w-full pl-8 pr-5 py-3.5 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-base shadow-sm"
                    aria-label="Contribuição mensal em euros"
                  />
                </div>
                <p className="mt-2 text-sm text-neutral-600">
                  Quanto podes investir todos os meses
                </p>
              </div>

              {/* Annual Interest Rate */}
              <div>
                <label htmlFor="annual-rate" className="block text-base font-bold text-neutral-900 mb-2">
                  Taxa de Juro Anual
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="annual-rate"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(e.target.value)}
                    min="0"
                    max="30"
                    step="0.5"
                    className="w-full px-5 py-3.5 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-base shadow-sm"
                    aria-label="Taxa de juro anual em percentagem"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-600 font-medium">%</span>
                </div>
                {/* Presets */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {PORTUGAL_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handlePresetClick(preset.rate)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                        parseFloat(annualRate) === preset.rate
                          ? "bg-primary-50 border-primary-300 text-primary-700"
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
                <label htmlFor="years" className="block text-base font-bold text-neutral-900 mb-2">
                  Período de Investimento
                </label>
                <select
                  id="years"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full px-5 py-3.5 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-base bg-white shadow-sm"
                  aria-label="Período de investimento em anos"
                >
                  {[5, 10, 15, 20, 25, 30, 35, 40].map((y) => (
                    <option key={y} value={y}>
                      {y} anos
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-neutral-600">
                  Quanto mais tempo, maior o poder dos juros compostos
                </p>
              </div>

              {/* Compound Frequency */}
              <div>
                <label htmlFor="frequency" className="block text-base font-bold text-neutral-900 mb-2">
                  Frequência de Capitalização
                </label>
                <select
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as CompoundFrequency)}
                  className="w-full px-5 py-3.5 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-base bg-white shadow-sm"
                  aria-label="Frequência de capitalização dos juros"
                >
                  <option value="monthly">Mensal</option>
                  <option value="quarterly">Trimestral</option>
                  <option value="annually">Anual</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                type="button"
                onClick={handleReset}
                className="w-full px-6 py-3 border border-neutral-300 text-neutral-700 font-bold rounded-xl hover:bg-neutral-50 hover:border-neutral-400 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                aria-label="Limpar todos os campos"
              >
                Limpar Campos
              </button>
            </div>

            {/* Results Column */}
            <div className="lg:pl-8 lg:border-l-2 lg:border-neutral-200">
              <div className="bg-gradient-to-br from-primary-50 via-primary-50/80 to-white border border-primary-200/60 rounded-2xl p-6 lg:p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/30 rounded-full blur-2xl" />
                <div className="relative">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Resultados</h2>

                  {hasValidInput ? (
                    <div className="space-y-6">
                      {/* Final Amount */}
                      <div>
                        <p className="text-sm font-medium text-neutral-600 mb-2">Valor Final após {years} anos</p>
                        <p className="text-3xl lg:text-4xl font-bold text-primary-700">
                          {formatCurrency(result.finalAmount)}
                        </p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4">
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
                    <div className="text-center py-8" role="status" aria-live="polite">
                      <div className="text-4xl mb-4" aria-hidden="true">💡</div>
                      <p className="text-neutral-600 font-medium mb-2">
                        Preencha o capital inicial ou contribuição mensal
                      </p>
                      <p className="text-sm text-neutral-500">
                        Veja o poder dos juros compostos no crescimento do seu investimento
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          {hasValidInput && chartData.length > 0 && (
            <div className="mt-10 pt-10 border-t border-neutral-200">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Evolução do Investimento</h3>
              <div className="h-[350px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#64748B" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#64748B" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                      tickLine={false}
                      axisLine={{ stroke: "#E5E7EB" }}
                    />
                    <YAxis
                      tickFormatter={formatYAxis}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                      tickLine={false}
                      axisLine={{ stroke: "#E5E7EB" }}
                      width={60}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ paddingTop: "20px" }}
                      iconType="circle"
                    />
                    <Area
                      type="monotone"
                      dataKey="invested"
                      name="Total Investido"
                      stroke="#64748B"
                      strokeWidth={2}
                      fill="url(#colorInvested)"
                      strokeDasharray="5 5"
                    />
                    <Area
                      type="monotone"
                      dataKey="totalValue"
                      name="Valor Total"
                      stroke="#1E3A8A"
                      strokeWidth={2.5}
                      fill="url(#colorTotal)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-4 text-sm text-neutral-500 text-center">
                A diferença entre as linhas representa os <span className="font-medium text-accent">juros compostos</span> acumulados ao longo do tempo
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Information Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 lg:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">O Que São Juros Compostos?</h2>
          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-600 leading-relaxed mb-4">
              Os <strong>juros compostos</strong> são frequentemente chamados de "a oitava maravilha do mundo". 
              Ao contrário dos juros simples, onde ganhas apenas sobre o capital inicial, nos juros compostos 
              ganhas <strong>juros sobre os juros</strong> anteriores.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Isto cria um efeito de "bola de neve" — quanto mais tempo o dinheiro está investido, 
              mais rápido cresce. É por isso que começar cedo é tão importante: mesmo pequenas 
              quantias podem transformar-se em valores significativos ao longo de décadas.
            </p>
            
            {/* Rule of 72 */}
            <div className="bg-primary-50 border border-primary-200/60 rounded-xl p-5 my-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <span>🧮</span> Regra dos 72
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-0">
                Uma forma rápida de calcular quanto tempo demora a duplicar o teu dinheiro: 
                divide 72 pela taxa de juro. Por exemplo, a 7% ao ano, o teu dinheiro duplica 
                em aproximadamente <strong>72 ÷ 7 ≈ 10 anos</strong>.
              </p>
            </div>

            <p className="text-neutral-600 leading-relaxed">
              A chave para maximizar os juros compostos é <strong>tempo</strong>, <strong>consistência</strong> e 
              <strong> paciência</strong>. Mesmo que não tenhas um grande capital inicial, contribuições 
              mensais regulares podem construir riqueza significativa ao longo do tempo.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/artigos/comecar-a-investir"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200 group"
            >
              <span>Aprende a começar a investir</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/artigos/criar-primeira-estrategia-investimento"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200 group"
            >
              <span>Cria a tua estratégia de investimento</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
