"use client";

import { ReactNode } from "react";

export interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

export default function ToolCard({
  id,
  title,
  description,
  icon,
  onClick,
  isActive = false,
}: ToolCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative w-full text-left
        bg-white rounded-2xl p-6 sm:p-8
        transition-all duration-300 ease-out
        hover:scale-[1.02]
        active:scale-[0.98]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A261F] focus-visible:ring-offset-2
        touch-manipulation
        ${isActive ? "ring-2 ring-[#0A261F]" : ""}
      `}
      style={{ 
        boxShadow: isActive 
          ? '0 14px 38px rgba(5, 27, 17, 0.10)' 
          : '0 10px 30px rgba(5, 27, 17, 0.07)' 
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 14px 38px rgba(5, 27, 17, 0.10)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = isActive ? '0 14px 38px rgba(5, 27, 17, 0.10)' : '0 10px 30px rgba(5, 27, 17, 0.07)'}
      aria-label={`Abrir ${title}`}
      aria-pressed={isActive}
      data-tool-id={id}
    >
      {/* Subtle hover effect */}
      <div 
        className={`
          absolute inset-0 rounded-2xl opacity-0 
          group-hover:opacity-100 transition-opacity duration-300
          bg-[#E8EBE5]/30
          pointer-events-none
        `}
        aria-hidden="true"
      />

      <div className="relative">
        {/* Icon - Prepared for minimalist SVG replacement */}
        <div 
          className="text-4xl sm:text-5xl mb-4 sm:mb-5 transform transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          {icon}
        </div>

        {/* Title - Anchor, heavy */}
        <h2 className="text-lg sm:text-xl font-black text-[#051B11] mb-3 group-hover:text-[#0A261F] transition-colors duration-200">
          {title}
        </h2>

        {/* Description */}
        <p className="text-[#0A261F] mb-5 text-xs sm:text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* CTA - deep green */}
        <div className="text-[#0A261F] font-semibold text-xs sm:text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
          Usar ferramenta
          <svg 
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
