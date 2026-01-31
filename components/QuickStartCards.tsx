"use client";

import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";
import {
  IconWrench,
  IconBookOpen,
  IconTrendingUp,
  IconArrowRight,
} from "@/components/icons/ShellIcons";

/** Tools first-class: Ferramentas is the hero block, then Começar + Investir */
const quickStartOptions = [
  {
    Icon: IconWrench,
    title: "Ferramentas",
    description: "Calculadoras de orçamento, juros compostos, fundo de emergência e crédito à habitação. Grátis.",
    href: "/recursos",
    bentoSize: "feature" as const,
  },
  {
    Icon: IconBookOpen,
    title: "Começar do Zero",
    description: "Nunca geriste o teu dinheiro? Começa aqui.",
    href: "/artigos/guia-inicial-literacia-financeira",
    bentoSize: "small" as const,
  },
  {
    Icon: IconTrendingUp,
    title: "Investir",
    description: "Aprende a fazer o teu dinheiro crescer.",
    href: "/artigos/comecar-a-investir",
    bentoSize: "small" as const,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.35 },
  }),
};

function QuickStartCards() {
  return (
    <section className="w-full mb-16 lg:mb-24" aria-label="Começar">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {quickStartOptions.map((option, index) => (
          <motion.div
            key={option.href}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Link
              href={option.href}
              className={`group block relative overflow-hidden rounded-2xl p-8 lg:p-10 h-full border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-ink-muted)] hover:shadow-[var(--shadow-md)] ${
                option.bentoSize === "feature"
                  ? "md:col-span-2 min-h-[200px] lg:min-h-[220px]"
                  : "min-h-[180px] lg:min-h-[200px]"
              }`}
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div
                  className={`mb-5 text-[var(--color-primary)] ${option.bentoSize === "feature" ? "lg:mb-6" : ""}`}
                  aria-hidden
                >
                  <option.Icon
                    className={option.bentoSize === "feature" ? "w-11 h-11 lg:w-12 lg:h-12" : "w-10 h-10 lg:w-11 lg:h-11"}
                  />
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] mb-2 lg:mb-3 transition-colors duration-200 tracking-tight">
                  {option.title}
                </h3>

                <p className="text-sm lg:text-base text-[var(--color-ink-secondary)] leading-relaxed flex-1">
                  {option.description}
                </p>

                <div className="flex items-center gap-2 text-[var(--color-primary)] font-semibold text-sm mt-5">
                  <span>Explorar</span>
                  <IconArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default memo(QuickStartCards);
