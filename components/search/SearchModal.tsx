"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Fuse, { IFuseOptions, FuseResult } from "fuse.js";
import type { SearchIndexItem } from "@/lib/search";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Fuse.js configuration with weighted fields
const fuseOptions: IFuseOptions<SearchIndexItem> = {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "tags", weight: 0.3 },
    { name: "description", weight: 0.15 },
    { name: "categories", weight: 0.05 },
  ],
  threshold: 0.4, // Lower = stricter matching
  includeMatches: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
};

// Highlight matching text in search results
function highlightMatch(text: string, indices: readonly [number, number][] | undefined): React.ReactNode {
  if (!indices || indices.length === 0) {
    return text;
  }

  const result: React.ReactNode[] = [];
  let lastIndex = 0;

  indices.forEach(([start, end], i) => {
    // Add non-matching text before this match
    if (start > lastIndex) {
      result.push(text.slice(lastIndex, start));
    }
    // Add matching text with highlight
    result.push(
      <mark
        key={i}
        className="bg-[var(--color-background)]/80 text-[var(--color-primary)] font-medium rounded-sm px-0.5"
      >
        {text.slice(start, end + 1)}
      </mark>
    );
    lastIndex = end + 1;
  });

  // Add remaining text after last match
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}

// Group results by category
function groupResultsByCategory(
  results: FuseResult<SearchIndexItem>[]
): Map<string, FuseResult<SearchIndexItem>[]> {
  const grouped = new Map<string, FuseResult<SearchIndexItem>[]>();

  results.forEach((result) => {
    const category = result.item.categories[0] || "Outros";
    if (!grouped.has(category)) {
      grouped.set(category, []);
    }
    grouped.get(category)!.push(result);
  });

  return grouped;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState<SearchIndexItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Create Fuse instance when search index is loaded
  const fuse = useMemo(() => {
    if (searchIndex.length === 0) return null;
    return new Fuse(searchIndex, fuseOptions);
  }, [searchIndex]);

  // Search results
  const results = useMemo(() => {
    if (!fuse || !query.trim()) return [];
    return fuse.search(query.trim()).slice(0, 10); // Limit to 10 results
  }, [fuse, query]);

  // Grouped results for display
  const groupedResults = useMemo(() => {
    return groupResultsByCategory(results);
  }, [results]);

  // Flat list for keyboard navigation
  const flatResults = useMemo(() => {
    return results;
  }, [results]);

  // Fetch search index on first open
  useEffect(() => {
    if (!isOpen || searchIndex.length > 0) return;

    const fetchSearchIndex = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/search");
        if (!response.ok) {
          throw new Error("Failed to fetch search index");
        }
        const data = await response.json();
        setSearchIndex(data);
      } catch (err) {
        console.error("Error fetching search index:", err);
        setError("Erro ao carregar a pesquisa. Tenta novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchIndex();
  }, [isOpen, searchIndex.length]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to allow animation to start
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Navigate to selected result
  const navigateToResult = useCallback(
    (result: FuseResult<SearchIndexItem>) => {
      router.push(`/artigos/${result.item.slug}`);
      onClose();
    },
    [router, onClose]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < flatResults.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          if (flatResults[selectedIndex]) {
            navigateToResult(flatResults[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, flatResults, selectedIndex, navigateToResult, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    if (!resultsRef.current) return;

    const selectedElement = resultsRef.current.querySelector(
      `[data-index="${selectedIndex}"]`
    );
    if (selectedElement) {
      selectedElement.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] sm:pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Pesquisar artigos"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl mx-4 bg-[var(--color-surface)] rounded-2xl shadow-2xl 
                   overflow-hidden animate-scale-in-modal border border-[var(--color-border)]"
        role="combobox"
        aria-expanded={results.length > 0}
        aria-haspopup="listbox"
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-[var(--color-border)]">
          {/* Search Icon */}
          <svg
            className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0"
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

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar artigos, tópicos ou palavras-chave..."
            className="flex-1 text-base text-text-primary placeholder:text-[var(--color-ink-muted)] 
                       bg-transparent border-none outline-none focus:ring-0"
            aria-label="Campo de pesquisa"
            aria-autocomplete="list"
            aria-controls="search-results"
          />

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-[var(--color-primary)] animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}

          {/* Clear Button */}
          {query && !isLoading && (
            <button
              onClick={() => setQuery("")}
              className="flex-shrink-0 p-1 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] 
                         rounded-lg hover:bg-[var(--color-background-subtle)] transition-colors duration-200"
              aria-label="Limpar pesquisa"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Escape hint */}
          <kbd
            className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] 
                       font-medium text-[var(--color-ink-muted)] bg-[var(--color-background-subtle)] border border-[var(--color-border)] 
                       rounded-md"
          >
            Esc
          </kbd>
        </div>

        {/* Results Area */}
        <div
          ref={resultsRef}
          id="search-results"
          className="max-h-[60vh] overflow-y-auto"
          role="listbox"
          aria-label="Resultados da pesquisa"
        >
          {/* Error State */}
          {error && (
            <div className="px-4 py-8 text-center">
              <p className="text-error text-sm">{error}</p>
              <button
                onClick={() => {
                  setSearchIndex([]);
                  setError(null);
                }}
                className="mt-2 text-sm text-[var(--color-primary)] hover:underline"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {/* Initial State - No query */}
          {!error && !query && !isLoading && (
            <div className="px-4 py-8 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[var(--color-primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <p className="text-[var(--color-ink-secondary)] text-sm">
                Escreve para começar a pesquisar
              </p>
              <p className="text-[var(--color-ink-muted)] text-xs mt-1">
                Usa ↑↓ para navegar, Enter para selecionar
              </p>
            </div>
          )}

          {/* No Results */}
          {!error && query && !isLoading && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-[var(--color-background-subtle)] rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[var(--color-ink-muted)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-[var(--color-ink-secondary)] text-sm">
                Nenhum resultado para &quot;{query}&quot;
              </p>
              <p className="text-[var(--color-ink-muted)] text-xs mt-1">
                Tenta outros termos ou verifica a ortografia
              </p>
            </div>
          )}

          {/* Results Grouped by Category */}
          {!error && results.length > 0 && (
            <div className="py-2">
              {Array.from(groupedResults.entries()).map(
                ([category, categoryResults]) => (
                  <div key={category} className="mb-2">
                    {/* Category Header */}
                    <div className="px-4 py-2">
                      <span className="text-xs font-semibold text-[var(--color-ink-muted)] uppercase tracking-wider">
                        {category}
                      </span>
                    </div>

                    {/* Category Results */}
                    {categoryResults.map((result) => {
                      const globalIndex = flatResults.findIndex(
                        (r) => r.item.slug === result.item.slug
                      );
                      const isSelected = globalIndex === selectedIndex;

                      // Find title match highlights
                      const titleMatch = result.matches?.find(
                        (m) => m.key === "title"
                      );

                      return (
                        <button
                          key={result.item.slug}
                          data-index={globalIndex}
                          onClick={() => navigateToResult(result)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`w-full flex items-start gap-3 px-4 py-3 text-left 
                                     transition-colors duration-150 cursor-pointer
                                     ${
                                       isSelected
                                         ? "bg-[var(--color-primary)]/5 border-l-2 border-[var(--color-primary)]"
                                         : "hover:bg-[var(--color-background-subtle)] border-l-2 border-transparent"
                                     }`}
                          role="option"
                          aria-selected={isSelected}
                        >
                          {/* Article Icon */}
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                                       ${
                                         isSelected
                                           ? "bg-[var(--color-primary)] text-[var(--color-ink-inverse)]"
                                           : "bg-[var(--color-background-subtle)] text-[var(--color-ink-muted)]"
                                       }`}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-medium truncate
                                         ${
                                           isSelected
                                             ? "text-[var(--color-primary)]"
                                             : "text-text-primary"
                                         }`}
                            >
                              {highlightMatch(
                                result.item.title,
                                titleMatch?.indices
                              )}
                            </p>
                            <p className="text-xs text-[var(--color-ink-muted)] line-clamp-1 mt-0.5">
                              {result.item.description}
                            </p>

                            {/* Tags */}
                            {result.item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {result.item.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-flex text-[10px] px-1.5 py-0.5 
                                               bg-[var(--color-background-subtle)] text-[var(--color-ink-muted)] rounded-md"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Reading Time */}
                          {result.item.readingTime && (
                            <span className="flex-shrink-0 text-[10px] text-[var(--color-ink-muted)]">
                              {result.item.readingTime} min
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Footer with navigation hints */}
        {results.length > 0 && (
          <div
            className="flex items-center justify-between px-4 py-3 border-t border-[var(--color-border)] 
                       bg-[var(--color-background-subtle)]/50 text-[11px] text-[var(--color-ink-muted)]"
          >
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-[10px]">
                  ↑
                </kbd>
                <kbd className="px-1 py-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-[10px]">
                  ↓
                </kbd>
                <span className="ml-1">navegar</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-[10px]">
                  Enter
                </kbd>
                <span className="ml-1">selecionar</span>
              </span>
            </div>
            <span>
              {results.length} resultado{results.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

