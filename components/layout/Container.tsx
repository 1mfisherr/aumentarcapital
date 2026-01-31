import { ReactNode } from "react";

type ContainerVariant = "page" | "content" | "narrow";

interface ContainerProps {
  children: ReactNode;
  variant?: ContainerVariant;
  className?: string;
  as?: "div" | "main" | "section" | "article";
}

const variantClasses: Record<ContainerVariant, string> = {
  page: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  content: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",
  narrow: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
};

export function Container({
  children,
  variant = "page",
  className = "",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component className={`w-full ${variantClasses[variant]} ${className}`.trim()}>
      {children}
    </Component>
  );
}
