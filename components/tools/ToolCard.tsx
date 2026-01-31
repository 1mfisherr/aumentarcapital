"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowRight } from "@/components/icons/ShellIcons";

export interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  /** When provided, card navigates to this URL (full-page tool). Otherwise use onClick. */
  href?: string;
  /** Used when href is not provided (e.g. legacy modal). */
  onClick?: () => void;
  isActive?: boolean;
  /** Optional: use for bento hero block (larger card) */
  featured?: boolean;
}

const cardClassName = (featured: boolean, isActive: boolean) =>
  `group relative w-full text-left rounded-2xl p-6 sm:p-8
   border transition-all duration-300 touch-manipulation
   focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2
   ${featured ? "sm:p-8 lg:p-10 min-h-[200px] lg:min-h-[220px]" : "min-h-[180px]"}
   ${isActive
     ? "border-[var(--color-primary)] bg-[var(--color-surface)] shadow-[var(--shadow-md)]"
     : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-ink-muted)] hover:shadow-[var(--shadow-md)]"
   }`;

const cardContent = (
  title: string,
  description: string,
  icon: ReactNode,
  featured: boolean
) => (
  <div className="relative flex flex-col h-full">
    <div
      className={`text-[var(--color-primary)] mb-4 transition-transform duration-300 group-hover:scale-105 ${featured ? "sm:mb-5" : ""}`}
      aria-hidden
    >
      <span className={featured ? "inline-block w-12 h-12 sm:w-14 sm:h-14" : "inline-block w-10 h-10 sm:w-11 sm:h-11"}>
        {icon}
      </span>
    </div>
    <h2 className={`font-bold text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-200 ${featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}>
      {title}
    </h2>
    <p className={`text-[var(--color-ink-secondary)] leading-relaxed line-clamp-3 flex-1 ${featured ? "text-sm sm:text-base mb-5" : "text-xs sm:text-sm mb-4"}`}>
      {description}
    </p>
    <span className="text-[var(--color-primary)] font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 group-hover:gap-2 transition-all mt-auto">
      Usar ferramenta
      <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
    </span>
  </div>
);

export default function ToolCard({
  id,
  title,
  description,
  icon,
  href,
  onClick,
  isActive = false,
  featured = false,
}: ToolCardProps) {
  const motionProps = {
    initial: false as const,
    whileHover: { y: -2 },
    whileTap: { scale: 0.99 },
    className: cardClassName(featured, isActive),
    style: { boxShadow: isActive ? "var(--shadow-md)" : "var(--shadow-sm)" },
    "data-tool-id": id,
  };

  if (href) {
    return (
      <motion.div {...motionProps}>
        <Link
          href={href}
          className="block w-full h-full"
          aria-label={`Abrir ${title}`}
        >
          {cardContent(title, description, icon, featured)}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      {...motionProps}
      aria-label={`Abrir ${title}`}
      aria-pressed={isActive}
    >
      {cardContent(title, description, icon, featured)}
    </motion.button>
  );
}
