"use client";

import { ReactNode, useEffect, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IconX, IconRotateCcw } from "@/components/icons/ShellIcons";

export interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
  title: string;
  children: ReactNode;
}

export default function ToolModal({
  isOpen,
  onClose,
  onReset,
  title,
  children,
}: ToolModalProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => modalRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-[var(--color-ink)]/40 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden
      />

      <div
        ref={modalRef}
        tabIndex={-1}
        className={`
          relative z-10 w-full max-h-[90vh] overflow-hidden flex flex-col
          bg-[var(--color-surface)] border border-[var(--color-border)]
          transition-all duration-300
          ${isMobile ? "rounded-t-2xl max-w-full" : "rounded-2xl max-w-4xl mx-4 shadow-[var(--shadow-xl)]"}
        `}
      >
        <div className={`flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] sticky top-0 z-10 ${isMobile ? "pt-5" : ""}`}>
          {isMobile && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-[var(--color-border)]" aria-hidden />
          )}
          <h2 id="modal-title" className={`text-lg sm:text-xl font-bold text-[var(--color-ink)] pr-4 tracking-tight ${isMobile ? "mt-1" : ""}`}>
            {title}
          </h2>
          <div className="flex items-center gap-1 sm:gap-2">
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 px-3 sm:px-4 py-2 sm:py-1.5 text-sm font-medium text-[var(--color-ink-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background-subtle)] rounded-xl sm:rounded-lg transition-colors duration-200 flex items-center justify-center touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
                aria-label="Limpar campos"
              >
                <span className="hidden sm:inline">Limpar</span>
                <IconRotateCcw className="w-5 h-5 sm:hidden" aria-hidden />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 p-2.5 sm:p-2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-background-subtle)] rounded-xl sm:rounded-lg transition-colors duration-200 flex items-center justify-center touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
              aria-label="Fechar"
            >
              <IconX className="w-6 h-6" aria-hidden />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
