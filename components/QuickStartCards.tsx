"use client";

import Link from "next/link";
import { memo } from "react";
import { IconWallet, IconChart, IconTrendingUp } from "@/components/icons/ExecutiveIcons";

const quickStartOptions = [
  {
    Icon: IconWallet,
    title: "Começar do Zero",
    description: "Nunca geriste o teu dinheiro? Começa aqui.",
    href: "/artigos/guia-inicial-literacia-financeira",
  },
  {
    Icon: IconChart,
    title: "Ferramentas Grátis",
    description: "Calculadoras de orçamento, investimentos e mais.",
    href: "/recursos",
  },
  {
    Icon: IconTrendingUp,
    title: "Investir Agora",
    description: "Aprende a fazer o teu dinheiro crescer.",
    href: "/artigos/comecar-a-investir",
  },
];

function QuickStartCards() {
  return (
    <section className="w-full mb-14 lg:mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-8">
        {quickStartOptions.map((option, index) => (
          <Link
            key={index}
            href={option.href}
            className="group relative overflow-hidden rounded-2xl p-8 lg:p-10 bg-white hover:bg-[#E8EBE5]/30 transition-all duration-300 premium-shadow-card"
          >
            {/* Content */}
            <div className="relative z-10">
              {/* Minimalist line icon - deep green */}
              <div className="mb-5 transform transition-transform duration-300 group-hover:scale-105 text-[#0A261F]">
                <option.Icon />
              </div>
              
              {/* Title - Anchor with forest hover */}
              <h3 className="text-xl lg:text-2xl font-black text-[#051B11] group-hover:text-[#0A261F] mb-3 transition-colors duration-300">
                {option.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm lg:text-base text-[#0A261F] mb-5 transition-colors duration-300">
                {option.description}
              </p>
              
              {/* Arrow - deep green */}
              <div className="flex items-center gap-2 text-[#0A261F] font-semibold text-sm transition-colors duration-300">
                <span>Explorar</span>
                <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default memo(QuickStartCards);
