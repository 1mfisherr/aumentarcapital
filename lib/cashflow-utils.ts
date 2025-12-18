/**
 * CASH FLOW CALCULATOR UTILITIES
 * 
 * Pure calculation functions for the Cash Flow Visualizer.
 * All functions are deterministic and side-effect free.
 */

// ========================================
// TYPES & INTERFACES
// ========================================

export interface ExpenseCategory {
  id: string;
  name: string;
  amount: string;
  type: 'fixed' | 'variable';
}

export type FinancialStatus = 'surplus' | 'breakeven' | 'deficit' | 'unknown';

export interface CashFlowResult {
  totalIncome: number;
  totalFixedExpenses: number;
  totalVariableExpenses: number;
  totalExpenses: number;
  monthlyBalance: number;
  status: FinancialStatus;
  ratios: {
    expenseToIncome: number;
    fixedPercentage: number;
    variablePercentage: number;
  };
}

export interface Insight {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success';
}

export interface StatusInfo {
  status: FinancialStatus;
  badge: string;
  title: string;
  description: string;
  ctaTitle: string;
  ctaText: string;
  ctaLink: string;
}

// ========================================
// DEFAULT CATEGORIES
// ========================================

export const DEFAULT_CATEGORIES: ExpenseCategory[] = [
  { id: 'rent', name: 'Renda/Hipoteca', amount: '', type: 'fixed' },
  { id: 'utilities', name: 'Serviços (luz, água, gás)', amount: '', type: 'fixed' },
  { id: 'transport', name: 'Transportes', amount: '', type: 'fixed' },
  { id: 'subscriptions', name: 'Subscrições', amount: '', type: 'fixed' },
  { id: 'food', name: 'Alimentação', amount: '', type: 'variable' },
  { id: 'leisure', name: 'Lazer', amount: '', type: 'variable' },
  { id: 'misc', name: 'Diversos', amount: '', type: 'variable' },
];

// ========================================
// FORMATTING & PARSING
// ========================================

/**
 * Format number as Portuguese currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format number as Portuguese currency with sign
 */
export function formatCurrencyWithSign(value: number): string {
  const formatted = formatCurrency(Math.abs(value));
  if (value > 0) return `+${formatted}`;
  if (value < 0) return `-${formatted}`;
  return formatted;
}

/**
 * Parse input string to number
 * Handles Portuguese number format (comma as decimal separator)
 */
export function parseInput(value: string): number {
  if (!value || typeof value !== 'string') return 0;
  
  // Remove all non-numeric characters except comma, dot, and minus
  const cleaned = value.replace(/[^\d,.-]/g, '').replace(',', '.');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : Math.max(0, parsed);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

// ========================================
// CORE CALCULATIONS
// ========================================

/**
 * Calculate total for a specific expense type
 */
export function calculateExpenseTotal(
  categories: ExpenseCategory[],
  type: 'fixed' | 'variable'
): number {
  return categories
    .filter(cat => cat.type === type)
    .reduce((sum, cat) => sum + parseInput(cat.amount), 0);
}

/**
 * Calculate complete cash flow
 */
export function calculateCashFlow(
  income: string,
  categories: ExpenseCategory[]
): CashFlowResult {
  const totalIncome = parseInput(income);
  const totalFixedExpenses = calculateExpenseTotal(categories, 'fixed');
  const totalVariableExpenses = calculateExpenseTotal(categories, 'variable');
  const totalExpenses = totalFixedExpenses + totalVariableExpenses;
  const monthlyBalance = totalIncome - totalExpenses;

  // Calculate ratios
  const expenseToIncome = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;
  const fixedPercentage = totalIncome > 0 ? (totalFixedExpenses / totalIncome) * 100 : 0;
  const variablePercentage = totalIncome > 0 ? (totalVariableExpenses / totalIncome) * 100 : 0;

  const status = determineFinancialStatus(monthlyBalance, totalIncome);

  return {
    totalIncome,
    totalFixedExpenses,
    totalVariableExpenses,
    totalExpenses,
    monthlyBalance,
    status,
    ratios: {
      expenseToIncome,
      fixedPercentage,
      variablePercentage,
    },
  };
}

/**
 * Determine financial status based on balance and income
 */
export function determineFinancialStatus(
  balance: number,
  income: number
): FinancialStatus {
  if (income === 0) return 'unknown';

  const balancePercentage = (balance / income) * 100;

  if (balancePercentage >= 10) return 'surplus';      // 🟢 Healthy (≥10% surplus)
  if (balancePercentage >= -5) return 'breakeven';    // 🟡 Tight (-5% to 10%)
  return 'deficit';                                    // 🔴 Deficit (<-5%)
}

// ========================================
// STATUS INFORMATION
// ========================================

/**
 * Get complete status information including CTA
 */
export function getStatusInfo(status: FinancialStatus): StatusInfo {
  switch (status) {
    case 'surplus':
      return {
        status: 'surplus',
        badge: '🟢',
        title: 'Excedente Saudável',
        description: 'Tens margem financeira positiva. Este é o momento ideal para planear o futuro.',
        ctaTitle: 'Criar um Orçamento Realista',
        ctaText: 'Tens margem para planear. Aprende a optimizar e poupar de forma consistente.',
        ctaLink: '/artigos/como-criar-um-orcamento-realista',
      };

    case 'breakeven':
      return {
        status: 'breakeven',
        badge: '🟡',
        title: 'Equilibrado',
        description: 'Estás no limite do equilíbrio. Qualquer imprevisto pode criar dificuldades.',
        ctaTitle: 'Priorizar Gastos',
        ctaText: 'Estás no limite. Descobre como priorizar despesas e criar margem de segurança.',
        ctaLink: '/artigos/fundacao-priorizar-gastos',
      };

    case 'deficit':
      return {
        status: 'deficit',
        badge: '🔴',
        title: 'Défice Mensal',
        description: 'Estás a gastar mais do que ganhas. Esta situação é solucionável com os passos certos.',
        ctaTitle: 'Entender o Teu Dinheiro',
        ctaText: 'Estás a gastar mais do que ganhas. Primeiro passo: compreender para onde vai cada euro.',
        ctaLink: '/artigos/entender-teu-dinheiro-onde-vai-salario',
      };

    default:
      return {
        status: 'unknown',
        badge: '💡',
        title: 'Adiciona o Teu Rendimento',
        description: 'Começa por inserir o teu salário líquido mensal para ver a tua situação financeira.',
        ctaTitle: 'Começar Agora',
        ctaText: 'Preenche os campos acima para descobrir para onde vai o teu dinheiro.',
        ctaLink: '#',
      };
  }
}

// ========================================
// INSIGHT GENERATION
// ========================================

/**
 * Generate contextual insights based on financial situation
 */
export function generateInsights(result: CashFlowResult): Insight[] {
  const insights: Insight[] = [];
  const { status, monthlyBalance, ratios, totalIncome } = result;

  // Insight 1: Balance insight
  if (status === 'surplus') {
    insights.push({
      id: 'balance-surplus',
      message: `Tens um excedente mensal de ${formatCurrency(monthlyBalance)} — este é o ponto de partida para construir riqueza.`,
      type: 'success',
    });
  } else if (status === 'deficit') {
    insights.push({
      id: 'balance-deficit',
      message: `Estás a gastar ${formatCurrency(Math.abs(monthlyBalance))} mais do que ganhas por mês. O primeiro passo é identificar onde cortar.`,
      type: 'warning',
    });
  } else if (status === 'breakeven') {
    insights.push({
      id: 'balance-breakeven',
      message: 'Estás em equilíbrio, mas sem margem para imprevistos. Qualquer despesa inesperada pode criar dificuldades.',
      type: 'warning',
    });
  }

  // Insight 2: Fixed expenses ratio
  if (ratios.fixedPercentage > 60 && totalIncome > 0) {
    insights.push({
      id: 'fixed-high',
      message: `Os teus gastos fixos representam ${formatPercentage(ratios.fixedPercentage)} do rendimento. Isto limita a tua flexibilidade financeira.`,
      type: 'info',
    });
  } else if (ratios.fixedPercentage > 0 && ratios.fixedPercentage <= 50 && totalIncome > 0) {
    insights.push({
      id: 'fixed-good',
      message: `Os teus gastos fixos estão em ${formatPercentage(ratios.fixedPercentage)} do rendimento — um nível saudável que permite flexibilidade.`,
      type: 'success',
    });
  }

  // Insight 3: Variable expenses
  if (ratios.variablePercentage > 30 && status === 'deficit') {
    insights.push({
      id: 'variable-high',
      message: `Os gastos variáveis representam ${formatPercentage(ratios.variablePercentage)} do rendimento. Este é o melhor ponto para começar a ajustar.`,
      type: 'info',
    });
  }

  // Insight 4: Total expense ratio
  if (ratios.expenseToIncome > 100) {
    insights.push({
      id: 'expenses-over',
      message: `Estás a gastar ${formatPercentage(ratios.expenseToIncome)} do que ganhas. Isto não é sustentável a longo prazo.`,
      type: 'warning',
    });
  } else if (ratios.expenseToIncome <= 70 && status === 'surplus') {
    insights.push({
      id: 'expenses-good',
      message: `Estás a gastar ${formatPercentage(ratios.expenseToIncome)} do rendimento. Tens boa margem para poupar e investir.`,
      type: 'success',
    });
  }

  // Return max 3 insights, prioritizing warnings
  return insights
    .sort((a, b) => {
      const priority = { warning: 0, info: 1, success: 2 };
      return priority[a.type] - priority[b.type];
    })
    .slice(0, 3);
}

// ========================================
// CATEGORY MANAGEMENT
// ========================================

/**
 * Generate unique ID for new category
 */
export function generateCategoryId(): string {
  return `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Add new category
 */
export function addCategory(
  categories: ExpenseCategory[],
  name: string,
  type: 'fixed' | 'variable'
): ExpenseCategory[] {
  const newCategory: ExpenseCategory = {
    id: generateCategoryId(),
    name,
    amount: '',
    type,
  };

  return [...categories, newCategory];
}

/**
 * Remove category by ID
 */
export function removeCategory(
  categories: ExpenseCategory[],
  categoryId: string
): ExpenseCategory[] {
  return categories.filter(cat => cat.id !== categoryId);
}

/**
 * Update category amount
 */
export function updateCategoryAmount(
  categories: ExpenseCategory[],
  categoryId: string,
  amount: string
): ExpenseCategory[] {
  return categories.map(cat =>
    cat.id === categoryId ? { ...cat, amount } : cat
  );
}

/**
 * Update category name
 */
export function updateCategoryName(
  categories: ExpenseCategory[],
  categoryId: string,
  name: string
): ExpenseCategory[] {
  return categories.map(cat =>
    cat.id === categoryId ? { ...cat, name } : cat
  );
}

// ========================================
// WATERFALL CHART DATA
// ========================================

export interface WaterfallDataPoint {
  name: string;
  value: number;
  start: number;
  end: number;
  fill: string;
  type: 'income' | 'expense' | 'balance';
}

/**
 * Generate data for waterfall chart
 */
export function generateWaterfallData(result: CashFlowResult): WaterfallDataPoint[] {
  const data: WaterfallDataPoint[] = [];
  const { totalIncome, totalFixedExpenses, totalVariableExpenses, monthlyBalance } = result;

  // Income (starting point)
  data.push({
    name: 'Rendimento',
    value: totalIncome,
    start: 0,
    end: totalIncome,
    fill: 'var(--color-success)',
    type: 'income',
  });

  // Fixed expenses (deduction)
  data.push({
    name: 'Gastos Fixos',
    value: totalFixedExpenses,
    start: totalIncome - totalFixedExpenses,
    end: totalIncome,
    fill: '#94A3B8',
    type: 'expense',
  });

  // Variable expenses (deduction)
  data.push({
    name: 'Gastos Variáveis',
    value: totalVariableExpenses,
    start: totalIncome - totalFixedExpenses - totalVariableExpenses,
    end: totalIncome - totalFixedExpenses,
    fill: 'var(--color-warning)',
    type: 'expense',
  });

  // Balance (result)
  const balanceColor = monthlyBalance >= 0 
    ? 'var(--color-success)' 
    : 'var(--color-error)';

  data.push({
    name: monthlyBalance >= 0 ? 'Excedente' : 'Défice',
    value: Math.abs(monthlyBalance),
    start: 0,
    end: Math.abs(monthlyBalance),
    fill: balanceColor,
    type: 'balance',
  });

  return data;
}
