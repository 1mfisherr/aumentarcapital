"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site.config";
import { SearchBar } from "@/components/search";
import { Logo } from "@/components/Logo";
import {
  IconMenu,
  IconX,
  IconChevronDown,
  IconMail,
} from "@/components/icons/ShellIcons";

const artigosCategorias = [
  { label: "Finanças Pessoais", href: "/artigos?categoria=financas-pessoais" },
  { label: "Investimentos", href: "/artigos?categoria=investimentos" },
  { label: "Poupança", href: "/artigos?categoria=poupanca" },
  { label: "Empreendedorismo", href: "/artigos?categoria=empreendedorismo" },
  { label: "Fazer Dinheiro Online", href: "/artigos?categoria=fazer-dinheiro-online" },
];

const navVariants = {
  closed: { opacity: 0, x: 16 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.04 * i, duration: 0.25 },
  }),
};

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [artigosDropdownOpen, setArtigosDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  const isActive = useCallback((href: string) => {
    if (!mounted) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/") || pathname.startsWith(href + "?");
  }, [pathname, mounted]);

  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mounted || typeof document === "undefined") return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setArtigosDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mounted]);

  return (
    <>
      <motion.header
        className="w-full sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]"
        initial={false}
        animate={{
          boxShadow: isScrolled ? "var(--shadow-sm)" : "0 0 0 transparent",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="content-container">
          <div
            className={`flex items-center justify-between transition-[height] duration-300 ease-out ${
              isScrolled ? "h-14 lg:h-16" : "h-16 lg:h-20"
            }`}
          >
            <Logo
              variant="full"
              className="flex-shrink-0 text-[var(--color-ink)] transition-opacity hover:opacity-90"
              iconClassName={
                isScrolled
                  ? "h-6 w-full max-w-[140px] sm:h-7 sm:max-w-[180px] md:h-8 md:max-w-[200px]"
                  : "h-7 w-full max-w-[160px] sm:h-8 sm:max-w-[200px] md:h-9 md:max-w-[240px]"
              }
            />

            {/* Desktop */}
            <div className="hidden lg:flex items-center justify-end flex-1 gap-6 xl:gap-8 ml-6">
              <div className="min-w-[200px] w-[240px] flex-shrink-0">
                <SearchBar placeholder="Pesquisar..." />
              </div>

              <nav className="flex items-center gap-6 xl:gap-8" aria-label="Navegação principal">
                <Link
                  href="/artigos/guia-inicial-literacia-financeira"
                  className={`text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                    isActive("/artigos/guia-inicial-literacia-financeira")
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-ink)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  Começa Aqui
                </Link>

                {siteConfig.nav.map((item) => {
                  const itemIsActive = isActive(item.href);

                  if (item.href === "/artigos") {
                    return (
                      <div key={item.href} className="relative flex items-center" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setArtigosDropdownOpen(!artigosDropdownOpen)}
                          className={`inline-flex items-center gap-1 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                            itemIsActive
                              ? "text-[var(--color-primary)]"
                              : "text-[var(--color-ink)] hover:text-[var(--color-primary)]"
                          }`}
                          aria-expanded={mounted ? artigosDropdownOpen : false}
                          aria-haspopup="true"
                          aria-label={`${item.label} menu`}
                        >
                          {item.label}
                          {itemIsActive && (
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] ml-1"
                              aria-hidden
                            />
                          )}
                          <IconChevronDown
                            className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                              mounted && artigosDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {artigosDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -8, scale: 0.98 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 mt-2 w-56 rounded-xl py-2 z-50 border border-[var(--color-border)] bg-[var(--color-surface)]"
                              style={{ boxShadow: "var(--shadow-lg)" }}
                              role="menu"
                              aria-label={`${item.label} submenu`}
                            >
                              <Link
                                href="/artigos"
                                onClick={() => setArtigosDropdownOpen(false)}
                                className={`block px-4 py-2.5 text-sm font-medium rounded-lg mx-1.5 transition-colors duration-200 ${
                                  pathname === "/artigos"
                                    ? "text-[var(--color-primary)] bg-[var(--color-background-subtle)]"
                                    : "text-[var(--color-ink)] hover:bg-[var(--color-background-subtle)]"
                                }`}
                                role="menuitem"
                              >
                                Todos os Artigos
                              </Link>
                              <div className="border-t border-[var(--color-border)] my-2" />
                              {artigosCategorias.map((cat) => (
                                <Link
                                  key={cat.href}
                                  href={cat.href}
                                  onClick={() => setArtigosDropdownOpen(false)}
                                  className={`block px-4 py-2.5 text-sm font-medium rounded-lg mx-1.5 transition-colors duration-200 ${
                                    pathname?.includes(cat.href.split("=")[1] || "")
                                      ? "text-[var(--color-primary)] bg-[var(--color-background-subtle)]"
                                      : "text-[var(--color-ink)] hover:bg-[var(--color-background-subtle)]"
                                  }`}
                                  role="menuitem"
                                >
                                  {cat.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-sm font-medium whitespace-nowrap relative transition-colors duration-200 ${
                        itemIsActive
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--color-ink)] hover:text-[var(--color-primary)]"
                      }`}
                      aria-current={itemIsActive ? "page" : undefined}
                    >
                      {item.label}
                      {itemIsActive && (
                        <span
                          className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[var(--color-primary)]"
                          aria-hidden
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <Link
                href="/contacto"
                className="btn-secondary inline-flex items-center gap-2 whitespace-nowrap"
              >
                <IconMail className="w-4 h-4 flex-shrink-0" />
                <span>Subscrever</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-[var(--color-ink)] hover:bg-[var(--color-background-subtle)] transition-colors duration-200"
                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                {mobileMenuOpen ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-[100] bg-[var(--color-surface)]"
            style={{ paddingTop: isScrolled ? 56 : 64 }}
            onClick={(e) => e.target === e.currentTarget && setMobileMenuOpen(false)}
            aria-hidden
          >
            <motion.nav
              className="py-6 px-4 max-h-full overflow-y-auto"
              aria-label="Navegação principal"
              initial="closed"
              animate="open"
              variants={{ open: { transition: { staggerChildren: 0.04 } } }}
            >
              <motion.div variants={navVariants} custom={0}>
                <Link
                  href="/artigos/guia-inicial-literacia-financeira"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3.5 text-base font-semibold rounded-xl mb-2 transition-colors duration-200 ${
                    isActive("/artigos/guia-inicial-literacia-financeira")
                      ? "text-[var(--color-primary)] bg-[var(--color-background-subtle)]"
                      : "text-[var(--color-ink)] hover:bg-[var(--color-background-subtle)]"
                  }`}
                >
                  Começa Aqui
                </Link>
              </motion.div>

              {siteConfig.nav.map((item, i) => {
                const itemIsActive = isActive(item.href);
                if (item.href === "/artigos") {
                  return (
                    <motion.div key={item.href} variants={navVariants} custom={i + 1} className="mb-2">
                      <button
                        type="button"
                        onClick={() => setArtigosDropdownOpen(!artigosDropdownOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-xl transition-colors duration-200 ${
                          itemIsActive
                            ? "text-[var(--color-primary)] bg-[var(--color-background-subtle)]"
                            : "text-[var(--color-ink)] hover:bg-[var(--color-background-subtle)]"
                        }`}
                      >
                        <span>{item.label}</span>
                        <IconChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            artigosDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {artigosDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-4 overflow-hidden"
                          >
                            <Link
                              href="/artigos"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setArtigosDropdownOpen(false);
                              }}
                              className="block px-4 py-2.5 text-sm font-medium rounded-xl text-[var(--color-ink)] hover:bg-[var(--color-background-subtle)]"
                            >
                              Todos os Artigos
                            </Link>
                            {artigosCategorias.map((cat) => (
                              <Link
                                key={cat.href}
                                href={cat.href}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setArtigosDropdownOpen(false);
                                }}
                                className="block px-4 py-2.5 text-sm font-medium rounded-xl text-[var(--color-ink)] hover:bg-[var(--color-background-subtle)]"
                              >
                                {cat.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }
                return (
                  <motion.div key={item.href} variants={navVariants} custom={i + 1}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-colors duration-200 ${
                        itemIsActive
                          ? "text-[var(--color-primary)] bg-[var(--color-background-subtle)]"
                          : "text-[var(--color-ink)] hover:bg-[var(--color-background-subtle)]"
                      }`}
                      aria-current={itemIsActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div variants={navVariants} custom={siteConfig.nav.length + 2} className="pt-4 mt-4 border-t border-[var(--color-border)]">
                <Link
                  href="/contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-secondary flex items-center justify-center gap-2 w-full"
                >
                  <IconMail className="w-5 h-5 flex-shrink-0" />
                  <span>Subscrever Newsletter</span>
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
