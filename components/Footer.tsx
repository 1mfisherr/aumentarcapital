"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site.config";
import {
  IconArrowRight,
  IconTwitter,
  IconLinkedin,
  IconInstagram,
  IconFacebook,
  IconShield,
} from "@/components/icons/ShellIcons";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  twitter: IconTwitter,
  facebook: IconFacebook,
  instagram: IconInstagram,
  linkedin: IconLinkedin,
};

const container = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  }),
};

const item = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function Footer() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer
      className="w-full mt-24 lg:mt-28 overflow-x-hidden border-t border-[var(--color-border)]"
      style={{
        backgroundColor: "var(--color-background-subtle)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.04)",
      }}
    >
      <div className="content-container py-14 lg:py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-14"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Brand + description */}
          <motion.div className="md:col-span-5 lg:col-span-6" variants={item}>
            <Link href="/" className="inline-block text-[var(--color-ink)] mb-4">
              <span className="text-xl font-bold tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="text-[var(--color-ink-secondary)] text-base leading-relaxed max-w-md mb-4">
              {siteConfig.description}
            </p>
            <p className="text-sm text-[var(--color-ink-muted)]">
              Ajudamos portugueses a tomar melhores decisões financeiras.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div className="md:col-span-4 lg:col-span-3" variants={item}>
            <h3 className="text-sm font-semibold text-[var(--color-ink)] uppercase tracking-wider mb-6">
              Navegação
            </h3>
            <ul className="space-y-3">
              {siteConfig.nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-ink-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 inline-flex items-center gap-2 group text-sm font-medium"
                  >
                    <span>{link.label}</span>
                    <IconArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/politica-privacidade"
                  className="text-[var(--color-ink-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 inline-flex items-center gap-2 group text-sm font-medium"
                >
                  <span>Política de Privacidade</span>
                  <IconArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div className="md:col-span-3 lg:col-span-3" variants={item}>
            <h3 className="text-sm font-semibold text-[var(--color-ink)] uppercase tracking-wider mb-6">
              Redes Sociais
            </h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(siteConfig.social).map(([platform, url]) => {
                const Icon = socialIcons[platform];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-ink)] hover:text-[var(--color-primary)] hover:border-[var(--color-ink-muted)] transition-all duration-200 hover:shadow-[var(--shadow-sm)]"
                    style={{ boxShadow: "var(--shadow-xs)" }}
                    aria-label={platform}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-[var(--color-border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm text-[var(--color-ink-muted)]">
            © {currentYear}{" "}
            <span className="font-semibold text-[var(--color-ink)]">{siteConfig.name}</span>. Todos os
            direitos reservados.
          </p>
          <p className="text-sm text-[var(--color-ink-muted)] inline-flex items-center gap-1.5">
            <IconShield className="w-4 h-4 opacity-70" aria-hidden />
            Feito com cuidado para ajudar pessoas
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
