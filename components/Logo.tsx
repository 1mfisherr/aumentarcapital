"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

type LogoProps = {
  variant?: "full" | "icon";
  className?: string;
  iconClassName?: string;
};

export function Logo({ variant = "full", className = "", iconClassName = "" }: LogoProps) {
  const svgClassName =
    iconClassName ||
    (variant === "icon"
      ? "h-8 w-auto"
      : "h-7 w-full max-w-[160px] sm:h-8 sm:max-w-[200px] md:h-9 md:max-w-[240px]");

  const logoContent = (
    <svg
      viewBox="0 0 340 56"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${siteConfig.name} logo`}
      className={svgClassName}
      preserveAspectRatio="xMidYMid meet"
      fill="currentColor"
    >
      <g>
        <path d="M6 46 Q14 30 22 46 Z" />
        <path d="M20 46 Q30 24 40 46 Z" />
        <path d="M38 46 Q50 16 62 46 Z" />
        <polygon points="50,10 54,16 50,22 46,16" />
      </g>
      {variant === "full" && (
        <text x="78" y="38" fontFamily="system-ui, sans-serif" fontSize="26">
          <tspan fontWeight="600" letterSpacing="-0.5">
            Aumentar
          </tspan>
          <tspan fontWeight="400" letterSpacing="-0.3">
            {" "}
            Capital
          </tspan>
        </text>
      )}
    </svg>
  );

  return (
    <Link href="/" className={`inline-flex items-center group text-brand-primary ${className}`}>
      {logoContent}
    </Link>
  );
}
