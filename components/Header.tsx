"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { siteConfig } from "@/lib/site.config";

const artigosCategorias = [
  { label: "Finanças Pessoais", href: "/artigos?categoria=financas-pessoais" },
  { label: "Investimentos", href: "/artigos?categoria=investimentos" },
  { label: "Poupança", href: "/artigos?categoria=poupanca" },
  { label: "Empreendedorismo", href: "/artigos?categoria=empreendedorismo" },
  { label: "Fazer Dinheiro Online", href: "/artigos?categoria=fazer-dinheiro-online" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [artigosDropdownOpen, setArtigosDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mark component as mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    // Only run on client side after mount
    if (!mounted || typeof window === 'undefined' || typeof document === 'undefined') return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setArtigosDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mounted]);

  return (
    <header className="w-full bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="logo-link flex-shrink-0 inline-flex items-center gap-2 sm:gap-2.5 group">
            {/* Modern Logo Icon */}
            <div
              className="logo-icon flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300"
              style={{ backgroundColor: "#4A6FA5" }}
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 text-white flex-shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                {/* Three ascending bars to hint at financial growth */}
                <rect x="5" y="12" width="3" height="7" rx="0.75" />
                <rect x="10.5" y="8" width="3" height="11" rx="0.75" />
                <rect x="16" y="4" width="3" height="15" rx="0.75" />
              </svg>
            </div>
            
            {/* Logo Text */}
            <div className="flex flex-col font-[family-name:var(--font-poppins)]">
              <span className="logo-text text-base sm:text-lg md:text-xl font-semibold tracking-wide leading-none" style={{ color: "#1E3A8A", letterSpacing: "0.02em" }}>
                Aumentar
              </span>
              <span className="logo-domain text-[10px] sm:text-xs md:text-sm font-medium tracking-wider leading-none mt-0.5 opacity-75 uppercase" style={{ color: "#1E3A8A", letterSpacing: "0.08em" }}>
                Capital.com
              </span>
            </div>
          </Link>

          {/* Desktop & Tablet Navigation */}
          <div className="hidden md:flex items-center justify-end flex-1 gap-3 md:gap-4 lg:gap-6 min-w-0 ml-4">
            {/* Navigation - fixed alignment */}
            <nav className="flex items-center flex-nowrap gap-3 md:gap-4 lg:gap-6 xl:gap-8">
              {/* Começa Aqui - Standout Link */}
              <Link
                href="/artigos/guia-inicial-literacia-financeira"
                className="text-sm md:text-base font-semibold text-secondary hover:text-[#4A6FA5] transition-colors duration-300 ease-in-out whitespace-nowrap"
              >
                Começa Aqui
              </Link>
              
              {siteConfig.nav.map((item) => {
                // Special handling for Artigos with dropdown
                if (item.href === "/artigos") {
                  return (
                    <div key={item.href} className="relative flex items-center" ref={dropdownRef}>
                      <button
                        onClick={() => setArtigosDropdownOpen(!artigosDropdownOpen)}
                        className="inline-flex items-center gap-1 text-sm md:text-base font-medium text-secondary hover:text-[#4A6FA5] transition-colors duration-300 ease-in-out whitespace-nowrap"
                        aria-expanded={mounted ? artigosDropdownOpen : false}
                        aria-haspopup="true"
                        aria-label={`${item.label} menu`}
                      >
                        {item.label}
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ease-in-out flex-shrink-0 ${
                            mounted && artigosDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      {artigosDropdownOpen && (
                        <div 
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 animate-slide-up z-50"
                          role="menu"
                          aria-label={`${item.label} submenu`}
                        >
                          <Link
                            href="/artigos"
                            onClick={() => setArtigosDropdownOpen(false)}
                            className="block px-4 py-2.5 text-sm font-medium text-secondary hover:text-[#4A6FA5] hover:bg-primary-50 transition-all duration-300 ease-in-out rounded-lg"
                            role="menuitem"
                          >
                            Todos os Artigos
                          </Link>
                          <div className="border-t border-slate-200 my-2"></div>
                          {artigosCategorias.map((categoria) => (
                            <Link
                              key={categoria.href}
                              href={categoria.href}
                              onClick={() => setArtigosDropdownOpen(false)}
                              className="block px-4 py-2.5 text-sm font-medium text-secondary hover:text-[#4A6FA5] hover:bg-primary-50 transition-all duration-300 ease-in-out rounded-lg"
                              role="menuitem"
                            >
                              {categoria.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // Regular nav items
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm md:text-base font-medium text-secondary hover:text-[#4A6FA5] transition-colors duration-300 ease-in-out whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button - Desktop/Tablet */}
            <div className="flex items-center flex-shrink-0">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-4 lg:px-5 py-2.5 bg-primary text-white text-sm md:text-base font-semibold rounded-xl hover:bg-primary-700 hover:shadow-lg transition-all duration-300 whitespace-nowrap group"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>Subscrever</span>
                <svg
                  className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-secondary hover:text-[#4A6FA5] transition-all duration-300 ease-in-out flex-shrink-0"
            aria-label={mounted && mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mounted ? mobileMenuOpen : false}
            aria-controls="mobile-navigation"
          >
            <svg
              className="w-6 h-6 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-sm z-40 overflow-y-auto mobile-menu-enter"
            onClick={(e) => {
              // Close menu when clicking outside the nav content
              if (e.target === e.currentTarget) {
                setMobileMenuOpen(false);
              }
            }}
          >
            <nav 
              id="mobile-navigation"
              className="border-t border-neutral-200 py-6 px-4 space-y-2 mobile-menu-content"
              aria-label="Navegação principal"
            >
              {/* Começa Aqui - Standout Link in Mobile */}
              <Link
                href="/artigos/guia-inicial-literacia-financeira"
                onClick={() => setMobileMenuOpen(false)}
                className="group relative block px-4 py-3.5 text-base font-semibold text-secondary hover:text-[#4A6FA5] transition-all duration-300 ease-in-out mb-4 inline-block w-auto"
              >
                <span className="relative">
                  Começa Aqui
                  <span className="absolute bottom-2 left-4 right-4 h-0.5 bg-[#4A6FA5] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
                </span>
              </Link>
              
              {siteConfig.nav.map((item) => {
                // Special handling for Artigos with dropdown in mobile
                if (item.href === "/artigos") {
                  return (
                    <div key={item.href} className="mb-2">
                      <button
                        onClick={() => setArtigosDropdownOpen(!artigosDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-base font-medium text-secondary hover:text-[#4A6FA5] hover:bg-primary-50 rounded-xl transition-all duration-300 ease-in-out"
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
                            mounted && artigosDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {artigosDropdownOpen && (
                        <div className="pl-4 space-y-1 mt-2">
                          <Link
                            href="/artigos"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setArtigosDropdownOpen(false);
                            }}
                            className="block px-4 py-2.5 text-sm font-medium text-foreground-muted hover:text-[#4A6FA5] hover:bg-primary-50 rounded-xl transition-all duration-300 ease-in-out"
                          >
                            Todos os Artigos
                          </Link>
                          {artigosCategorias.map((categoria) => (
                            <Link
                              key={categoria.href}
                              href={categoria.href}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setArtigosDropdownOpen(false);
                              }}
                              className="block px-4 py-2.5 text-sm font-medium text-foreground-muted hover:text-[#4A6FA5] hover:bg-primary-50 rounded-xl transition-all duration-300 ease-in-out"
                            >
                              {categoria.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // Regular nav items
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3.5 text-base font-medium text-secondary hover:text-[#4A6FA5] hover:bg-primary-50 rounded-xl transition-all duration-300 ease-in-out"
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              {/* Subscribe Button - Prominent in Mobile Menu */}
              <div className="pt-4 mt-4 border-t border-neutral-200">
                <Link
                  href="/contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center justify-center gap-2 px-5 py-3.5 bg-primary text-white text-base font-semibold rounded-xl hover:bg-primary-700 hover:shadow-lg transition-all duration-300 w-full"
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span>Subscrever Newsletter</span>
                  <svg
                    className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
