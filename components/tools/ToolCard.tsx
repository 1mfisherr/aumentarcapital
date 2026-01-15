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
        bg-white border rounded-2xl p-5 sm:p-6
        transition-all duration-300 ease-out
        hover:scale-[1.02] hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
        touch-manipulation
        ${isActive 
          ? "border-primary shadow-lg shadow-primary/10" 
          : "border-neutral-200/60 hover:border-primary/40"
        }
      `}
      aria-label={`Abrir ${title}`}
      data-tool-id={id}
    >
      {/* Glow effect on hover */}
      <div 
        className={`
          absolute inset-0 rounded-2xl opacity-0 
          group-hover:opacity-100 transition-opacity duration-300
          bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5
          pointer-events-none
        `}
        aria-hidden="true"
      />
      
      {/* Border glow effect */}
      <div 
        className={`
          absolute -inset-[1px] rounded-2xl opacity-0 
          group-hover:opacity-100 transition-opacity duration-300
          bg-gradient-to-br from-primary/20 via-transparent to-cyan-500/20
          -z-10 blur-sm
        `}
        aria-hidden="true"
      />

      <div className="relative">
        {/* Icon */}
        <div 
          className="text-4xl sm:text-5xl mb-3 sm:mb-4 transform transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          {icon}
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors duration-200">
          {title}
        </h2>

        {/* Description */}
        <p className="text-neutral-600 mb-4 text-xs sm:text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* CTA */}
        <div className="text-primary font-semibold text-xs sm:text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
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
