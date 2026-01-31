"use client";

import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site.config";
import {
  IconArrowRight,
  IconWrench,
  IconUsers,
  IconBookOpen,
  IconCheckCircle,
} from "@/components/icons/ShellIcons";

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  }),
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

function HeroValueProp() {
  return (
    <section className="w-full mb-12 lg:mb-16 pt-14 sm:pt-18 lg:pt-24 pb-14 sm:pb-18 lg:pb-24 relative overflow-hidden">
      {/* Light-first background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-0 right-0 w-[70%] sm:w-[55%] lg:w-[45%] h-[60%] rounded-bl-[30%] -z-10"
          style={{ backgroundColor: "var(--color-background-subtle)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[35%] sm:w-[28%] h-[35%] rounded-tr-[25%] -z-10"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 4%, transparent)" }}
        />
      </div>

      <motion.div
        className="relative"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={item}
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--color-ink)] mb-5 lg:mb-6 leading-tight max-w-4xl tracking-tight"
        >
          {siteConfig.hero.headline}
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg sm:text-xl lg:text-2xl text-[var(--color-ink-secondary)] mb-10 lg:mb-12 max-w-3xl leading-relaxed"
        >
          {siteConfig.hero.subheadline}
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-10"
        >
          <Link
            href={siteConfig.hero.ctaPrimary.href}
            className="btn-primary inline-flex items-center gap-2.5 group"
          >
            <span>{siteConfig.hero.ctaPrimary.text}</span>
            <IconArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
          <Link
            href={siteConfig.hero.ctaSecondary.href}
            className="btn-secondary inline-flex items-center gap-2.5"
          >
            <IconWrench className="w-5 h-5 flex-shrink-0" />
            <span>{siteConfig.hero.ctaSecondary.text}</span>
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-wrap items-center gap-6 lg:gap-8 text-sm text-[var(--color-ink-secondary)]"
        >
          <div className="flex items-center gap-2">
            <IconUsers className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" aria-hidden />
            <span className="font-medium">+{siteConfig.hero.trustIndicators.readers} leitores mensais</span>
          </div>
          <div className="flex items-center gap-2">
            <IconBookOpen className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" aria-hidden />
            <span className="font-medium">+{siteConfig.hero.trustIndicators.guides} guias práticos</span>
          </div>
          {siteConfig.hero.trustIndicators.free && (
            <div className="flex items-center gap-2">
              <IconCheckCircle className="w-5 h-5 text-[var(--color-success)] flex-shrink-0" aria-hidden />
              <span className="font-medium">100% gratuito</span>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(HeroValueProp);
