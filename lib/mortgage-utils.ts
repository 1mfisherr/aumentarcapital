/**
 * MORTGAGE AMORTIZATION UTILITIES
 * 
 * Calculation functions for mortgage amortization simulations.
 * Helps users understand the impact of extra payments on their mortgage.
 */

export interface MortgageInput {
  principal: number;        // Capital em Dívida (€)
  remainingMonths: number;  // Prazo Restante (meses)
  annualRate: number;       // Taxa de Juro Anual (TAN %)
  extraPayment: number;     // Valor da Amortização Extra (€)
}

export interface MortgageResult {
  // Current scenario (without extra payment)
  currentMonthlyPayment: number;
  totalPaymentWithout: number;
  totalInterestWithout: number;
  
  // New scenario (with extra payment)
  newPrincipal: number;
  newMonthlyPayment: number;        // If keeping same term
  totalPaymentWith: number;
  totalInterestWith: number;
  
  // Savings
  interestSaved: number;
  monthlyPaymentReduction: number;
  
  // Time saved (if keeping same monthly payment)
  monthsSaved: number;
  newRemainingMonths: number;
}

export interface AmortizationChartData {
  label: string;
  withoutAmortization: number;
  withAmortization: number;
}

/**
 * Calculate monthly payment using the standard amortization formula
 * PMT = P * [r(1+r)^n] / [(1+r)^n - 1]
 * 
 * @param principal - Loan amount
 * @param monthlyRate - Monthly interest rate (annual rate / 12 / 100)
 * @param months - Number of months
 */
export function calculateMonthlyPayment(
  principal: number,
  monthlyRate: number,
  months: number
): number {
  if (monthlyRate === 0) {
    return principal / months;
  }
  
  const factor = Math.pow(1 + monthlyRate, months);
  return principal * (monthlyRate * factor) / (factor - 1);
}

/**
 * Calculate the number of months needed to pay off a loan
 * Given principal, monthly payment, and interest rate
 * 
 * n = -log(1 - (P * r / PMT)) / log(1 + r)
 */
export function calculateRemainingMonths(
  principal: number,
  monthlyPayment: number,
  monthlyRate: number
): number {
  if (monthlyRate === 0) {
    return Math.ceil(principal / monthlyPayment);
  }
  
  // Check if payment is enough to cover interest
  const interestOnly = principal * monthlyRate;
  if (monthlyPayment <= interestOnly) {
    return Infinity; // Payment doesn't cover interest
  }
  
  const numerator = -Math.log(1 - (principal * monthlyRate / monthlyPayment));
  const denominator = Math.log(1 + monthlyRate);
  
  return Math.ceil(numerator / denominator);
}

/**
 * Calculate total interest paid over the life of the loan
 */
export function calculateTotalInterest(
  principal: number,
  monthlyPayment: number,
  months: number
): number {
  return (monthlyPayment * months) - principal;
}

/**
 * Main calculation function for mortgage amortization simulation
 */
export function calculateMortgageAmortization(input: MortgageInput): MortgageResult {
  const { principal, remainingMonths, annualRate, extraPayment } = input;
  
  const monthlyRate = annualRate / 12 / 100;
  
  // Current scenario (without extra payment)
  const currentMonthlyPayment = calculateMonthlyPayment(principal, monthlyRate, remainingMonths);
  const totalPaymentWithout = currentMonthlyPayment * remainingMonths;
  const totalInterestWithout = calculateTotalInterest(principal, currentMonthlyPayment, remainingMonths);
  
  // New scenario (with extra payment)
  const newPrincipal = Math.max(0, principal - extraPayment);
  
  // Option 1: Keep same term, reduce monthly payment
  const newMonthlyPayment = newPrincipal > 0 
    ? calculateMonthlyPayment(newPrincipal, monthlyRate, remainingMonths)
    : 0;
  const totalPaymentWith = newMonthlyPayment * remainingMonths;
  const totalInterestWith = newPrincipal > 0 
    ? calculateTotalInterest(newPrincipal, newMonthlyPayment, remainingMonths)
    : 0;
  
  // Calculate savings
  const interestSaved = totalInterestWithout - totalInterestWith;
  const monthlyPaymentReduction = currentMonthlyPayment - newMonthlyPayment;
  
  // Option 2: Keep same monthly payment, reduce term
  let monthsSaved = 0;
  let newRemainingMonths = remainingMonths;
  
  if (newPrincipal > 0 && currentMonthlyPayment > 0) {
    newRemainingMonths = calculateRemainingMonths(newPrincipal, currentMonthlyPayment, monthlyRate);
    if (newRemainingMonths !== Infinity) {
      monthsSaved = remainingMonths - newRemainingMonths;
    }
  } else if (newPrincipal === 0) {
    monthsSaved = remainingMonths;
    newRemainingMonths = 0;
  }
  
  return {
    currentMonthlyPayment,
    totalPaymentWithout,
    totalInterestWithout,
    newPrincipal,
    newMonthlyPayment,
    totalPaymentWith,
    totalInterestWith,
    interestSaved,
    monthlyPaymentReduction,
    monthsSaved: Math.max(0, monthsSaved),
    newRemainingMonths: Math.max(0, newRemainingMonths),
  };
}

/**
 * Generate chart data for comparing interest with and without amortization
 */
export function generateAmortizationChartData(result: MortgageResult): AmortizationChartData[] {
  return [
    {
      label: "Total de Juros",
      withoutAmortization: Math.round(result.totalInterestWithout),
      withAmortization: Math.round(result.totalInterestWith),
    },
  ];
}

/**
 * Format time in months to a readable string in Portuguese
 */
export function formatMonthsToTime(months: number): string {
  if (months <= 0) return "0 meses";
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) {
    return `${remainingMonths} ${remainingMonths === 1 ? "mês" : "meses"}`;
  }
  
  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? "ano" : "anos"}`;
  }
  
  return `${years} ${years === 1 ? "ano" : "anos"} e ${remainingMonths} ${remainingMonths === 1 ? "mês" : "meses"}`;
}

/**
 * Convert years to months
 */
export function yearsToMonths(years: number): number {
  return Math.round(years * 12);
}

/**
 * Convert months to years (for display)
 */
export function monthsToYears(months: number): number {
  return months / 12;
}
