"use client";

import { ReactNode, useEffect, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

  // Check if mobile on mount and window resize
  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle body scroll lock and focus trap
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      
      // Focus the modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
      
      // Return focus to previous element
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Modal/Drawer Container */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`
          relative z-10 bg-white shadow-2xl
          w-full max-h-[90vh] overflow-hidden
          flex flex-col
          transition-all duration-300 ease-out
          ${isMobile
            ? "rounded-t-3xl max-w-full animate-slide-up"
            : "rounded-2xl max-w-4xl mx-4 animate-scale-in"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-neutral-200 bg-white sticky top-0 z-10">
          {/* Mobile drag indicator */}
          {isMobile && (
            <div 
              className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-neutral-300 rounded-full"
              aria-hidden="true"
            />
          )}
          
          <h2 
            id="modal-title" 
            className={`text-lg sm:text-xl font-bold text-neutral-900 pr-4 ${isMobile ? "mt-2" : ""}`}
          >
            {title}
          </h2>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Reset Button - Larger touch target on mobile */}
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 px-3 sm:px-4 py-2 sm:py-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 rounded-xl sm:rounded-lg transition-colors duration-200 flex items-center justify-center touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                aria-label="Limpar campos"
              >
                <span className="hidden sm:inline">Limpar</span>
                <svg 
                  className="w-5 h-5 sm:hidden" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  />
                </svg>
              </button>
            )}
            
            {/* Close Button - Larger touch target on mobile (minimum 44x44px) */}
            <button
              type="button"
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 p-2.5 sm:p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 rounded-xl sm:rounded-lg transition-colors duration-200 flex items-center justify-center touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
              aria-label="Fechar"
            >
              <svg 
                className="w-6 h-6" 
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
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render modal at document body level
  return createPortal(modalContent, document.body);
}
