"use client";

import Link from "next/link";
import { memo } from "react";

const quickStartOptions = [
  {
    icon: "💰",
    title: "Começar do Zero",
    description: "Nunca geriste o teu dinheiro? Começa aqui.",
    href: "/artigos/guia-inicial-literacia-financeira",
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:from-blue-600 hover:to-blue-700"
  },
  {
    icon: "📊",
    title: "Ferramentas Grátis",
    description: "Calculadoras de orçamento, investimentos e mais.",
    href: "/recursos",
    color: "from-emerald-500 to-emerald-600",
    hoverColor: "hover:from-emerald-600 hover:to-emerald-700"
  },
  {
    icon: "📈",
    title: "Investir Agora",
    description: "Aprende a fazer o teu dinheiro crescer.",
    href: "/artigos/comecar-a-investir",
    color: "from-purple-500 to-purple-600",
    hoverColor: "hover:from-purple-600 hover:to-purple-700"
  },
];

function QuickStartCards() {
  return (
    <section className="w-full mb-12 lg:mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        {quickStartOptions.map((option, index) => (
          <Link
            key={index}
            href={option.href}
            className="group relative overflow-hidden rounded-2xl p-6 lg:p-8 bg-white border border-neutral-200/60 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {option.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 group-hover:text-white mb-2 transition-colors duration-300">
                {option.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm lg:text-base text-neutral-600 group-hover:text-white/90 mb-4 transition-colors duration-300">
                {option.description}
              </p>
              
              {/* Arrow */}
              <div className="flex items-center gap-2 text-primary group-hover:text-white font-semibold text-sm transition-colors duration-300">
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
