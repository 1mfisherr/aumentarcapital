/**
 * Shared utility functions for financial calculators
 * This module provides reusable calculation and formatting functions
 * for compound interest, currency formatting, and chart data generation.
 */

// Types for compound interest calculations
export interface CompoundInterestResult {
  finalAmount: number;
  totalInvested: number;
  totalInterest: number;
  effectiveRate: number;
}

export interface ChartDataPoint {
  year: number;
  label: string;
  totalValue: number;
  invested: number;
  interest: number;
}

export type CompoundFrequency = 'monthly' | 'quarterly' | 'annually';

// Compound frequency multipliers
const FREQUENCY_MAP: Record<CompoundFrequency, number> = {
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

/**
 * Format number as Portuguese currency (EUR)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format number as Portuguese currency with decimals
 */
export function formatCurrencyDetailed(value: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format percentage for display
 */
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

/**
 * Parse input string to number (handles Portuguese formatting)
 */
export function parseInput(value: string): number {
  const cleaned = value.replace(/[^\d,.-]/g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}

/**
 * Calculate compound interest with optional monthly contributions
 * 
 * Formula: A = P(1 + r/n)^(nt) + PMT × (((1 + r/n)^(nt) - 1) / (r/n))
 * Where:
 * - A = final amount
 * - P = principal (initial investment)
 * - r = annual interest rate (decimal)
 * - n = number of times interest compounds per year
 * - t = time in years
 * - PMT = monthly contribution
 */
export function calculateCompoundInterest(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number,
  frequency: CompoundFrequency = 'monthly'
): CompoundInterestResult {
  const n = FREQUENCY_MAP[frequency];
  const r = annualRate / 100;
  const t = years;

  // Compound interest on principal
  const principalGrowth = principal * Math.pow(1 + r / n, n * t);

  // Future value of annuity (monthly contributions)
  // Adjust monthly contribution to match compound frequency
  const contributionPerPeriod = monthlyContribution * (12 / n);
  let contributionsGrowth = 0;

  if (r > 0) {
    contributionsGrowth = contributionPerPeriod * 
      ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
  } else {
    // If rate is 0, just sum contributions
    contributionsGrowth = monthlyContribution * 12 * t;
  }

  const finalAmount = principalGrowth + contributionsGrowth;
  const totalInvested = principal + (monthlyContribution * 12 * t);
  const totalInterest = finalAmount - totalInvested;
  const effectiveRate = totalInvested > 0 ? (totalInterest / totalInvested) * 100 : 0;

  return {
    finalAmount,
    totalInvested,
    totalInterest,
    effectiveRate,
  };
}

/**
 * Generate chart data points for each year
 */
export function generateGrowthData(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number,
  frequency: CompoundFrequency = 'monthly'
): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];

  // Add starting point (year 0)
  data.push({
    year: 0,
    label: 'Início',
    totalValue: principal,
    invested: principal,
    interest: 0,
  });

  // Calculate for each year
  for (let year = 1; year <= years; year++) {
    const result = calculateCompoundInterest(
      principal,
      monthlyContribution,
      annualRate,
      year,
      frequency
    );

    data.push({
      year,
      label: `Ano ${year}`,
      totalValue: Math.round(result.finalAmount),
      invested: Math.round(result.totalInvested),
      interest: Math.round(result.totalInterest),
    });
  }

  return data;
}

/**
 * Format time display in Portuguese
 */
export function formatTimeDisplay(months: number): string {
  if (months < 12) {
    return `${months} ${months === 1 ? "mês" : "meses"}`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths > 0) {
    return `${years} ${years === 1 ? "ano" : "anos"} e ${remainingMonths} ${remainingMonths === 1 ? "mês" : "meses"}`;
  }
  
  return `${years} ${years === 1 ? "ano" : "anos"}`;
}

/**
 * Preset interest rates for Portugal context
 */
export const PORTUGAL_PRESETS = [
  { label: 'Certificados de Aforro', rate: 2.5, description: 'Taxa segura, garantida pelo Estado' },
  { label: 'PPR Conservador', rate: 3.5, description: 'Plano poupança reforma de baixo risco' },
  { label: 'PPR Equilibrado', rate: 5.5, description: 'Plano poupança reforma misto' },
  { label: 'ETF Global', rate: 7.0, description: 'Média histórica de mercados globais' },
  { label: 'ETF Ações', rate: 9.0, description: 'Mercado de ações diversificado' },
] as const;
