"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6" aria-hidden="true">⚠️</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-4">
          Algo correu mal
        </h1>
        <p className="text-lg text-[var(--color-ink-secondary)] mb-8">
          Pedimos desculpa, ocorreu um erro inesperado. Por favor, tenta novamente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-[var(--color-primary)] text-[var(--color-ink-inverse)] font-semibold rounded-xl hover:bg-[var(--color-primary-hover)] transition-all duration-200 hover:shadow-[var(--shadow-lg)]"
          >
            Tentar novamente
          </button>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-[var(--color-border)] text-[var(--color-ink-secondary)] font-semibold rounded-xl hover:bg-[var(--color-background-subtle)] transition-all duration-200"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
