"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("");
  const [monthsToCover, setMonthsToCover] = useState<number>(6);
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [monthlySavings, setMonthlySavings] = useState<string>("");

  // Format number with Portuguese locale
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Parse input value to number
  const parseInput = (value: string): number => {
    const cleaned = value.replace(/[^\d,.-]/g, "").replace(",", ".");
    return parseFloat(cleaned) || 0;
  };

  // Calculations
  const calculations = useMemo(() => {
    const expenses = parseInput(monthlyExpenses);
    const savings = parseInput(currentSavings);
    const monthly = parseInput(monthlySavings);

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
      hasValidInput: expenses > 0,
    };
  }, [monthlyExpenses, monthsToCover, currentSavings, monthlySavings]);

  const handleReset = () => {
    setMonthlyExpenses("");
    setMonthsToCover(6);
    setCurrentSavings("");
    setMonthlySavings("");
  };

  return (
    <>
      {/* Calculator Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="bg-white border-2 border-neutral-200 rounded-2xl p-6 lg:p-8 shadow-soft">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Inputs Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="monthly-expenses" className="block text-base font-bold text-neutral-900 mb-2">
                  Despesas Essenciais Mensais <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 font-medium">€</span>
                  <input
                    type="text"
                    id="monthly-expenses"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(e.target.value)}
                    placeholder="Ex: 900"
                    className="w-full pl-8 pr-5 py-3.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-base"
                    aria-required="true"
                    aria-label="Despesas essenciais mensais em euros"
                  />
                </div>
                <p className="mt-2 text-sm text-neutral-600">
                  Inclua renda, alimentação, transportes, saúde e contas básicas
                </p>
              </div>

              <div>
                <label htmlFor="months-to-cover" className="block text-base font-bold text-neutral-900 mb-2">
                  Meses a Cobrir
                </label>
                <select
                  id="months-to-cover"
                  value={monthsToCover}
                  onChange={(e) => setMonthsToCover(Number(e.target.value))}
                  className="w-full px-5 py-3.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-base bg-white"
                  aria-label="Número de meses a cobrir"
                >
                  <option value={3}>3 meses</option>
                  <option value={4}>4 meses</option>
                  <option value={5}>5 meses</option>
                  <option value={6}>6 meses (recomendado)</option>
                </select>
                <p className="mt-2 text-sm text-neutral-600">
                  A DECO PROTESTE recomenda 4 a 6 meses de despesas essenciais
                </p>
              </div>

              <div>
                <label htmlFor="current-savings" className="block text-base font-bold text-neutral-900 mb-2">
                  Poupanças Atuais <span className="text-neutral-500 text-sm font-normal">(opcional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 font-medium">€</span>
                  <input
                    type="text"
                    id="current-savings"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(e.target.value)}
                    placeholder="Ex: 500"
                    className="w-full pl-8 pr-5 py-3.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-base"
                    aria-label="Poupanças atuais em euros"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="monthly-savings" className="block text-base font-bold text-neutral-900 mb-2">
                  Poupança Mensal <span className="text-neutral-500 text-sm font-normal">(opcional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 font-medium">€</span>
                  <input
                    type="text"
                    id="monthly-savings"
                    value={monthlySavings}
                    onChange={(e) => setMonthlySavings(e.target.value)}
                    placeholder="Ex: 200"
                    className="w-full pl-8 pr-5 py-3.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-base"
                    aria-label="Poupança mensal em euros"
                  />
                </div>
                <p className="mt-2 text-sm text-neutral-600">
                  Quanto consegue poupar por mês para o fundo de emergência
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-bold rounded-xl hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200"
              >
                Limpar Campos
              </button>
            </div>

            {/* Results Column */}
            <div className="lg:pl-8 lg:border-l-2 lg:border-neutral-200">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 border-2 border-primary-200 rounded-2xl p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Resultados</h2>
                
                {calculations.hasValidInput ? (
                  <div className="space-y-6">
                    {/* Target Fund */}
                    <div>
                      <p className="text-sm font-medium text-neutral-600 mb-2">Fundo de Emergência Recomendado</p>
                      <p className="text-3xl lg:text-4xl font-bold text-primary-700">
                        {formatCurrency(calculations.targetFund)}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    {parseInput(currentSavings) > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-neutral-600">Progresso</p>
                          <p className="text-sm font-bold text-primary-700">
                            {calculations.progressPercentage.toFixed(1)}%
                          </p>
                        </div>
                        <div className="w-full h-4 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 transition-all duration-500 ease-out"
                            style={{ width: `${Math.min(calculations.progressPercentage, 100)}%` }}
                            role="progressbar"
                            aria-valuenow={calculations.progressPercentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <p className="mt-2 text-xs text-neutral-600">
                          Já tem: {formatCurrency(parseInput(currentSavings))}
                        </p>
                      </div>
                    )}

                    {/* Amount Still Needed */}
                    {parseInput(currentSavings) > 0 && (
                      <div>
                        <p className="text-sm font-medium text-neutral-600 mb-2">Ainda Precisa de Poupar</p>
                        <p className="text-2xl lg:text-3xl font-bold text-primary-700">
                          {formatCurrency(Math.max(0, calculations.amountNeeded))}
                        </p>
                      </div>
                    )}

                    {/* Time to Reach Goal */}
                    {parseInput(monthlySavings) > 0 && calculations.amountNeeded > 0 && (
                      <div>
                        <p className="text-sm font-medium text-neutral-600 mb-2">Tempo para Alcançar o Objetivo</p>
                        <p className="text-2xl lg:text-3xl font-bold text-primary-700">
                          {calculations.timeDisplay}
                        </p>
                        <p className="mt-2 text-xs text-neutral-600">
                          Poupança mensal de {formatCurrency(parseInput(monthlySavings))}
                        </p>
                      </div>
                    )}

                    {parseInput(monthlySavings) > 0 && calculations.amountNeeded <= 0 && (
                      <div className="bg-accent/10 border-2 border-accent/30 rounded-xl p-4">
                        <p className="text-sm font-bold text-accent">
                          🎉 Parabéns! Já tem o fundo de emergência completo!
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-neutral-600">
                      Preencha as suas despesas mensais para ver os resultados
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <div className="bg-white border-2 border-neutral-200 rounded-2xl p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Sobre o Fundo de Emergência</h2>
          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-600 leading-relaxed mb-4">
              Um fundo de emergência é uma reserva financeira criada exclusivamente para lidar com situações inesperadas, 
              como despesas médicas, avarias no carro ou perda de emprego. Não é para férias ou compras planeadas.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-4">
              A <strong>DECO PROTESTE</strong> recomenda guardar entre <strong>4 a 6 meses</strong> de despesas essenciais. 
              Para quem tem rendimento irregular ou dependentes, pode ser sensato apontar ainda mais alto.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              O fundo deve estar num lugar seguro e acessível, como uma conta poupança de fácil mobilização ou 
              depósitos a prazo curtos. Evite produtos voláteis como ações ou criptomoedas.
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/artigos/fundacao-fundo-emergencia"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200 group"
            >
              <span>Ler artigo completo sobre fundo de emergência</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

