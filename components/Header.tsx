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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setArtigosDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border-b border-slate-300 sticky top-0 z-50 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 inline-flex items-center gap-1">
            <span className="text-blue-700 text-lg sm:text-xl md:text-2xl font-bold leading-none tracking-tighter">
              ↑↑
            </span>
            <span className="text-gray-900 text-base sm:text-lg md:text-xl font-bold tracking-tight">
              aumentarcapital<span className="text-blue-700">.com</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {siteConfig.nav.map((item) => {
              // Special handling for Artigos with dropdown
              if (item.href === "/artigos") {
                return (
                  <div key={item.href} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setArtigosDropdownOpen(!artigosDropdownOpen)}
                      className="inline-flex items-center gap-1 text-sm lg:text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          artigosDropdownOpen ? "rotate-180" : ""
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
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 animate-slide-up">
                        <Link
                          href="/artigos"
                          onClick={() => setArtigosDropdownOpen(false)}
                          className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        >
                          Todos os Artigos
                        </Link>
                        <div className="border-t border-slate-200 my-2"></div>
                        {artigosCategorias.map((categoria) => (
                          <Link
                            key={categoria.href}
                            href={categoria.href}
                            onClick={() => setArtigosDropdownOpen(false)}
                            className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
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
                  className="text-sm lg:text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/contacto"
              className="hidden sm:inline-flex items-center px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 bg-blue-700 text-white text-sm lg:text-base font-semibold rounded-full hover:bg-blue-900 transition-colors duration-200"
            >
              <span>Subscrever</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-gray-700 hover:text-blue-600 transition-colors duration-200"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
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
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-slate-300 py-4 space-y-1 animate-slide-up">
            {siteConfig.nav.map((item) => {
              // Special handling for Artigos with dropdown in mobile
              if (item.href === "/artigos") {
                return (
                  <div key={item.href}>
                    <button
                      onClick={() => setArtigosDropdownOpen(!artigosDropdownOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 rounded-xl transition-colors duration-200"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          artigosDropdownOpen ? "rotate-180" : ""
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
                      <div className="pl-4 space-y-1 mt-1">
                        <Link
                          href="/artigos"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setArtigosDropdownOpen(false);
                          }}
                          className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 rounded-xl transition-colors duration-200"
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
                            className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 rounded-xl transition-colors duration-200"
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
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 rounded-xl transition-colors duration-200"
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 px-4">
              <Link
                href="/contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-5 py-3.5 bg-blue-700 text-white text-base font-semibold rounded-full hover:bg-blue-900 transition-colors duration-200 justify-center"
              >
                <span>Subscrever</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
