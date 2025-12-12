/**
 * Form utility functions for consistent form handling across the site
 */

export interface FormError {
  field?: string;
  message: string;
}

export interface FormResult {
  success: boolean;
  message: string;
  errors?: FormError[];
}

/**
 * Validates email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates required fields
 */
export function validateRequired(fields: Record<string, string>): FormError[] {
  const errors: FormError[] = [];
  
  for (const [field, value] of Object.entries(fields)) {
    if (!value || value.trim() === '') {
      errors.push({
        field,
        message: `O campo ${field} é obrigatório.`,
      });
    }
  }
  
  return errors;
}

/**
 * Sanitizes form input
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(message: string, errors?: FormError[]): FormResult {
  return {
    success: false,
    message,
    errors,
  };
}

/**
 * Creates a standardized success response
 */
export function createSuccessResponse(message: string): FormResult {
  return {
    success: true,
    message,
  };
}

