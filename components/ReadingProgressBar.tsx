"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Reading Progress Bar Component
 * 
 * Displays a progress bar at the top of the page that fills
 * as the user scrolls through an article.
 */
export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const calculateProgress = useCallback(() => {
    // Get the article element or fallback to document body
    const article = document.querySelector("article") || document.body;
    const articleTop = article.getBoundingClientRect().top + window.scrollY;
    const articleHeight = article.scrollHeight;
    
    // Calculate how much of the article has been scrolled
    const windowHeight = window.innerHeight;
    const scrolled = window.scrollY - articleTop + windowHeight * 0.3;
    const total = articleHeight - windowHeight * 0.3;
    
    // Calculate percentage
    const percentage = Math.min(Math.max((scrolled / total) * 100, 0), 100);
    
    setProgress(percentage);
    
    // Only show progress bar after scrolling past the header
    setIsVisible(window.scrollY > 100);
  }, []);

  useEffect(() => {
    // Calculate initial progress
    calculateProgress();

    // Add scroll listener with passive option for better performance
    window.addEventListener("scroll", calculateProgress, { passive: true });
    
    // Add resize listener to recalculate on window resize
    window.addEventListener("resize", calculateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
    };
  }, [calculateProgress]);

  // Don't render if not visible or no progress
  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-1 z-[60] bg-[var(--color-border)]/80 backdrop-blur-sm"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progresso de leitura"
    >
      <div
        className="h-full bg-[var(--color-primary)] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
      <div
        className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent to-[var(--color-primary)]/40 blur-sm transition-all duration-150"
        style={{ left: `calc(${progress}% - 2rem)` }}
        aria-hidden="true"
      />
    </div>
  );
}
