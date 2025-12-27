/**
 * INPUT VALIDATION UTILITIES
 * 
 * Shared validation functions for calculator inputs with user-friendly error messages
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  value: number;
}

/**
 * Validates a currency input string and returns parsed value with error message
 */
export function validateCurrencyInput(
  input: string,
  options: {
    required?: boolean;
    min?: number;
    max?: number;
    fieldName?: string;
  } = {}
): ValidationResult {
  const { required = false, min, max, fieldName = "Valor" } = options;

  // Empty input
  if (!input || input.trim() === "") {
    if (required) {
      return {
        isValid: false,
        error: `${fieldName} é obrigatório`,
        value: 0,
      };
    }
    return { isValid: true, value: 0 };
  }

  // Check if input contains invalid characters (letters mixed with numbers)
  // Allow only digits, spaces, commas, dots, and minus sign
  const hasInvalidChars = /[^\d\s,.-]/.test(input);
  if (hasInvalidChars) {
    return {
      isValid: false,
      error: `${fieldName} contém caracteres inválidos. Use apenas números`,
      value: 0,
    };
  }

  // Remove all non-numeric characters except comma, dot, and minus
  const cleaned = input.replace(/[^\d,.-]/g, "").replace(",", ".");
  
  // Check if cleaned string is empty or only contains invalid characters
  if (cleaned === "" || cleaned === "-" || cleaned === ".") {
    return {
      isValid: false,
      error: `${fieldName} contém caracteres inválidos. Use apenas números`,
      value: 0,
    };
  }

  const parsed = parseFloat(cleaned);

  // Check if parsing resulted in NaN
  if (isNaN(parsed)) {
    return {
      isValid: false,
      error: `${fieldName} não é um número válido`,
      value: 0,
    };
  }

  // Check if negative
  if (parsed < 0) {
    return {
      isValid: false,
      error: `${fieldName} não pode ser negativo`,
      value: 0,
    };
  }

  // Check minimum value
  if (min !== undefined && parsed < min) {
    return {
      isValid: false,
      error: `${fieldName} deve ser pelo menos ${formatCurrency(min)}`,
      value: parsed,
    };
  }

  // Check maximum value
  if (max !== undefined && parsed > max) {
    return {
      isValid: false,
      error: `${fieldName} não pode exceder ${formatCurrency(max)}`,
      value: parsed,
    };
  }

  return { isValid: true, value: parsed };
}

/**
 * Validates a percentage input string
 */
export function validatePercentageInput(
  input: string,
  options: {
    required?: boolean;
    min?: number;
    max?: number;
    fieldName?: string;
  } = {}
): ValidationResult {
  const { required = false, min = 0, max = 100, fieldName = "Percentagem" } = options;

  if (!input || input.trim() === "") {
    if (required) {
      return {
        isValid: false,
        error: `${fieldName} é obrigatório`,
        value: 0,
      };
    }
    return { isValid: true, value: 0 };
  }

  // Check if input contains invalid characters (letters mixed with numbers)
  // Allow only digits, spaces, commas, dots, and minus sign
  const hasInvalidChars = /[^\d\s,.-]/.test(input);
  if (hasInvalidChars) {
    return {
      isValid: false,
      error: `${fieldName} contém caracteres inválidos. Use apenas números`,
      value: 0,
    };
  }

  const cleaned = input.replace(/[^\d,.-]/g, "").replace(",", ".");
  
  if (cleaned === "" || cleaned === "-" || cleaned === ".") {
    return {
      isValid: false,
      error: `${fieldName} contém caracteres inválidos. Use apenas números`,
      value: 0,
    };
  }

  const parsed = parseFloat(cleaned);

  if (isNaN(parsed)) {
    return {
      isValid: false,
      error: `${fieldName} não é um número válido`,
      value: 0,
    };
  }

  if (parsed < min) {
    return {
      isValid: false,
      error: `${fieldName} deve ser pelo menos ${min}%`,
      value: parsed,
    };
  }

  if (parsed > max) {
    return {
      isValid: false,
      error: `${fieldName} não pode exceder ${max}%`,
      value: parsed,
    };
  }

  return { isValid: true, value: parsed };
}

/**
 * Format currency for error messages
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Parse input to number (for backward compatibility)
 */
export function parseInput(value: string): number {
  if (!value || typeof value !== "string") return 0;
  const cleaned = value.replace(/[^\d,.-]/g, "").replace(",", ".");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : Math.max(0, parsed);
}

