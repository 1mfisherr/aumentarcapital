"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary for Calculator Components
 * 
 * Catches JavaScript errors in calculator components and displays
 * a user-friendly fallback UI instead of crashing the whole app.
 */
export default class CalculatorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Calculator Error:", error);
      console.error("Error Info:", errorInfo);
    }

    // Track error event if analytics is available
    if (typeof window !== "undefined" && (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag("event", "calculator_error", {
        error_message: error.message,
        error_stack: error.stack?.slice(0, 500),
      });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div 
            className="w-16 h-16 mb-4 rounded-2xl bg-error/10 flex items-center justify-center"
            aria-hidden="true"
          >
            <svg 
              className="w-8 h-8 text-error" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          
          <h3 className="text-lg font-bold text-[var(--color-ink)] mb-2">
            Erro na Calculadora
          </h3>
          
          <p className="text-[var(--color-ink-secondary)] mb-6 max-w-sm">
            Ocorreu um erro inesperado. Por favor, tenta novamente ou recarrega a página.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={this.handleReset}
              className="px-6 py-2.5 bg-[var(--color-primary)] text-[var(--color-ink-inverse)] font-semibold rounded-xl hover:bg-[var(--color-primary-hover)] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
            >
              Tentar novamente
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 border border-[var(--color-border)] text-[var(--color-ink-secondary)] font-semibold rounded-xl hover:bg-[var(--color-background-subtle)] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
            >
              Recarregar página
            </button>
          </div>

          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="mt-6 text-left w-full max-w-lg">
              <summary className="text-sm text-[var(--color-ink-muted)] cursor-pointer hover:text-[var(--color-ink-secondary)]">
                Detalhes do erro (dev only)
              </summary>
              <pre className="mt-2 p-4 bg-[var(--color-background-subtle)] rounded-lg text-xs text-[var(--color-ink-secondary)] overflow-auto max-h-40">
                {this.state.error.message}
                {"\n\n"}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Functional wrapper for easier use with hooks
 */
export function withCalculatorErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundary(props: P) {
    return (
      <CalculatorErrorBoundary fallback={fallback}>
        <WrappedComponent {...props} />
      </CalculatorErrorBoundary>
    );
  };
}
