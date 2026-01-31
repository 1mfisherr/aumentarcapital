"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Fuse, { IFuseOptions, FuseResult } from "fuse.js";
import type { SearchIndexItem } from "@/lib/search";

// Fuse.js configuration with weighted fields
const fuseOptions: IFuseOptions<SearchIndexItem> = {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "tags", weight: 0.3 },
    { name: "description", weight: 0.15 },
    { name: "categories", weight: 0.05 },
  ],
  threshold: 0.4,
  includeMatches: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
};

// Highlight matching text - subtle, single highlight for a clean look
function highlightMatch(
  text: string,
  indices: readonly [number, number][] | undefined,
  query?: string
): React.ReactNode {
  // If no indices or query, just return the plain text
  if (!indices || indices.length === 0 || !query) {
    return text;
  }

  // Find the query substring directly in the text (case-insensitive)
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const matchStart = lowerText.indexOf(lowerQuery);
  
  // If found, highlight just that exact match
  if (matchStart >= 0) {
    const matchEnd = matchStart + query.length;
    return (
      <>
        {text.slice(0, matchStart)}
        <span className="text-[var(--color-primary)] font-medium">
          {text.slice(matchStart, matchEnd)}
        </span>
        {text.slice(matchEnd)}
      </>
    );
  }

  // Fallback: no highlight if exact query not found
  return text;
}

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

// Maximum number of visible results - keeps dropdown compact
const MAX_RESULTS = 5;

export default function SearchBar({ 
  className = "", 
  placeholder = "Pesquisar..." 
}: SearchBarProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchIndex, setSearchIndex] = useState<SearchIndexItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMac, setIsMac] = useState(false);

  // Detect OS for keyboard shortcut hint
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  // Create Fuse instance when search index is loaded
  const fuse = useMemo(() => {
    if (searchIndex.length === 0) return null;
    return new Fuse(searchIndex, fuseOptions);
  }, [searchIndex]);

  // Search results - limited for compact dropdown
  const results = useMemo(() => {
    if (!fuse || !query.trim()) return [];
    return fuse.search(query.trim()).slice(0, MAX_RESULTS);
  }, [fuse, query]);

  // Show dropdown when focused and has query
  const showDropdown = isFocused && query.length > 0;

  // Fetch search index on first focus
  useEffect(() => {
    if (!isFocused || searchIndex.length > 0) return;

    const fetchSearchIndex = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/search");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setSearchIndex(data);
      } catch (err) {
        console.error("Error fetching search index:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchIndex();
  }, [isFocused, searchIndex.length]);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigate to selected result
  const navigateToResult = useCallback(
    (result: FuseResult<SearchIndexItem>) => {
      router.push(`/artigos/${result.item.slug}`);
      setQuery("");
      setIsFocused(false);
      inputRef.current?.blur();
    },
    [router]
  );

  // Keyboard navigation within dropdown
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showDropdown || results.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => 
            prev > 0 ? prev - 1 : results.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            navigateToResult(results[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsFocused(false);
          inputRef.current?.blur();
          break;
      }
    },
    [showDropdown, results, selectedIndex, navigateToResult]
  );

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

  return (
    <div ref={containerRef} className={`relative min-w-[200px] ${className}`}>
      {/* Search Input */}
      <div
        className={`flex items-center gap-2 px-3 py-2 bg-white border rounded-xl 
                   transition-all duration-200 shadow-sm
                   ${
                     isFocused
                       ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20 shadow-md"
                       : "border-[var(--color-border)] hover:border-[var(--color-primary)]/50"
                   }`}
      >
        {/* Search Icon */}
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
            isFocused ? "text-[var(--color-primary)]" : "text-[var(--color-ink-muted)]"
          }`}
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

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 min-w-[120px] lg:min-w-[160px] text-sm text-text-primary 
                     placeholder:text-[var(--color-ink-muted)] bg-transparent border-none outline-none"
          aria-label="Campo de pesquisa"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />

        {/* Loading Spinner */}
        {isLoading && (
          <svg
            className="w-4 h-4 text-[var(--color-primary)] animate-spin flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
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
        )}

        {/* Clear Button */}
        {query && !isLoading && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="p-0.5 text-[var(--color-ink-muted)] hover:text-text-primary rounded transition-colors"
            aria-label="Limpar pesquisa"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Keyboard Shortcut Hint */}
        {!isFocused && !query && (
          <kbd
            className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 
                       text-[10px] font-medium text-[var(--color-ink-muted)] bg-[var(--color-background-subtle)] border 
                       border-[var(--color-border)] rounded-md"
          >
            {isMac ? "⌘" : "Ctrl"}
            <span className="text-[9px]">K</span>
          </kbd>
        )}
      </div>

      {/* Dropdown Results */}
      {showDropdown && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl 
                     border border-[var(--color-border)] overflow-hidden z-50 animate-scale-in-dropdown
                     min-w-[280px] w-max max-w-[400px]"
          style={{ right: 'auto' }}
          role="listbox"
          aria-label="Resultados da pesquisa"
        >
          {/* Loading State */}
          {isLoading && (
            <div className="px-4 py-3 flex items-center gap-2 text-[var(--color-ink-muted)]">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-sm">A pesquisar...</span>
            </div>
          )}

          {/* No Results */}
          {!isLoading && results.length === 0 && (
            <div className="px-4 py-3 text-center">
              <p className="text-[var(--color-ink-secondary)] text-sm">
                Sem resultados para &quot;{query}&quot;
              </p>
            </div>
          )}

          {/* Results List */}
          {!isLoading && results.length > 0 && (
            <div className="py-1">
              {results.map((result, index) => {
                const isSelected = index === selectedIndex;
                const titleMatch = result.matches?.find(
                  (m) => m.key === "title"
                );

                return (
                  <button
                    key={result.item.slug}
                    data-index={index}
                    onClick={() => navigateToResult(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left 
                               transition-colors duration-100 cursor-pointer
                               ${isSelected ? "bg-brand-primary/8" : ""}`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {/* Arrow indicator for selected */}
                    <span className={`text-[var(--color-primary)] transition-opacity duration-100 ${isSelected ? "opacity-100" : "opacity-0"}`}>
                      →
                    </span>

                    {/* Title with highlight */}
                    <span className={`flex-1 text-sm truncate transition-colors duration-100
                                    ${isSelected ? "text-[var(--color-primary)] font-medium" : "text-text-primary"}`}>
                      {highlightMatch(result.item.title, titleMatch?.indices, query)}
                    </span>

                    {/* Reading Time Badge */}
                    {result.item.readingTime && (
                      <span className={`flex-shrink-0 text-xs px-1.5 py-0.5 rounded-full transition-colors duration-100
                                       ${isSelected ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : "bg-[var(--color-background-subtle)] text-[var(--color-ink-muted)]"}`}>
                        {result.item.readingTime} min
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Footer with keyboard hints */}
              <div className="flex items-center justify-between px-3 py-1.5 mt-1 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-2 text-[10px] text-[var(--color-ink-muted)]">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-[var(--color-background-subtle)] border border-[var(--color-border)] rounded text-[9px]">↑↓</kbd>
                    navegar
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-[var(--color-background-subtle)] border border-[var(--color-border)] rounded text-[9px]">↵</kbd>
                    abrir
                  </span>
                </div>
                <span className="text-[10px] text-[var(--color-ink-muted)]">
                  {results.length} de {searchIndex.length}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
