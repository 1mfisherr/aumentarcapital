import { ReactNode } from "react";

type SectionSpacing = "default" | "lg" | "xl" | "none";

interface SectionProps {
  children: ReactNode;
  spacing?: SectionSpacing;
  className?: string;
  as?: "section" | "div" | "aside";
}

const spacingClasses: Record<SectionSpacing, string> = {
  default: "py-14 lg:py-20",
  lg: "py-20 lg:py-24",
  xl: "py-24 lg:py-28",
  none: "",
};

export function Section({
  children,
  spacing = "default",
  className = "",
  as: Component = "section",
}: SectionProps) {
  const spacingClass = spacingClasses[spacing];
  return (
    <Component className={spacingClass ? `${spacingClass} ${className}`.trim() : className.trim()}>
      {children}
    </Component>
  );
}
