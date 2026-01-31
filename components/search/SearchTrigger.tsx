"use client";

import { useEffect, useState } from "react";

interface SearchTriggerProps {
  onClick: () => void;
}

export default function SearchTrigger({ onClick }: SearchTriggerProps) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Detect OS for showing correct keyboard shortcut
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  return (
    <button
      onClick={onClick}
      type="button"
      aria-label="Pesquisar artigos (Cmd+K ou Ctrl+K)"
      className="group flex items-center gap-2 px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] 
                 rounded-xl text-[var(--color-ink-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] 
                 transition-all duration-300 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] min-w-[160px] lg:min-w-[200px]"
    >
      {/* Search Icon */}
      <svg
        className="w-4 h-4 text-[var(--color-ink-muted)] group-hover:text-[var(--color-primary)] transition-colors duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {/* Placeholder Text */}
      <span className="text-sm text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink-secondary)] transition-colors duration-300 hidden sm:inline">
        Pesquisar...
      </span>

      {/* Keyboard Shortcut Hint */}
      <kbd
        className="ml-auto hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 
                   text-[10px] font-medium text-[var(--color-ink-muted)] bg-[var(--color-background-subtle)] border border-[var(--color-border)] 
                   rounded-md group-hover:border-[var(--color-primary)]/30 group-hover:text-[var(--color-primary)] 
                   transition-all duration-300"
      >
        {isMac ? "⌘" : "Ctrl"}
        <span className="text-[9px]">K</span>
      </kbd>
    </button>
  );
}

