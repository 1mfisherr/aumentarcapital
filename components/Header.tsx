"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { siteConfig } from "@/lib/site.config";
import { SearchBar } from "@/components/search";

const artigosCategorias = [
  { label: "Finanças Pessoais", href: "/artigos?categoria=financas-pessoais" },
  { label: "Investimentos", href: "/artigos?categoria=investimentos" },
  { label: "Poupança", href: "/artigos?categoria=poupanca" },
  { label: "Empreendedorismo", href: "/artigos?categoria=empreendedorismo" },
  { label: "Fazer Dinheiro Online", href: "/artigos?categoria=fazer-dinheiro-online" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [artigosDropdownOpen, setArtigosDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mark component as mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll position to shrink header on mobile
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      // Shrink header after scrolling 50px
      setIsScrolled(window.scrollY > 50);
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  // Check if a nav item is active
  const isActive = useCallback((href: string) => {
    if (!mounted) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/") || pathname.startsWith(href + "?");
  }, [pathname, mounted]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Add padding to prevent layout shift from scrollbar removal
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Get the scroll position before we remove fixed positioning
      const scrollY = document.body.style.top;
      
      // Re-enable scrolling
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';
      
      // Restore scroll position
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';
    };
  }, [mobileMenuOpen]);

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
    <>
    <header 
      className={`w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "shadow-md" 
          : "shadow-sm"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled 
              ? "h-14 lg:h-16" 
              : "h-16 lg:h-20"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 inline-flex items-center gap-2 sm:gap-2.5 group transition-transform duration-300">
            {/* Modern Logo Icon */}
            <div 
              className={`logo-gradient flex items-center justify-center rounded-xl shadow-md transition-all duration-300 ${
                isScrolled 
                  ? "w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" 
                  : "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
              }`}
            >
              <svg
                className={`text-white flex-shrink-0 transition-all duration-300 ${
                  isScrolled 
                    ? "w-4 h-4 sm:w-5 sm:h-5" 
                    : "w-5 h-5 sm:w-6 sm:h-6"
                }`}
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
              <span 
                className={`font-semibold tracking-wide leading-none text-brand-primary group-hover:text-brand-secondary transition-all duration-300 ${
                  isScrolled 
                    ? "text-sm sm:text-base md:text-lg" 
                    : "text-base sm:text-lg md:text-xl"
                }`}
              >
                Aumentar
              </span>
              <span 
                className={`font-medium tracking-wider leading-none mt-0.5 opacity-75 uppercase text-brand-primary transition-all duration-300 ${
                  isScrolled 
                    ? "text-[8px] sm:text-[10px] md:text-xs" 
                    : "text-[10px] sm:text-xs md:text-sm"
                }`}
              >
                Capital.com
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-end flex-1 gap-4 md:gap-6 lg:gap-8 ml-4">
            {/* Inline Search Bar */}
            <SearchBar placeholder="Pesquisar..." />
            
            {/* Navigation - fixed alignment */}
            <nav className="flex items-center flex-nowrap gap-4 md:gap-6 lg:gap-8">
              {/* Começa Aqui - Standout Link */}
              <Link
                href="/artigos/guia-inicial-literacia-financeira"
                className={`text-sm md:text-base font-semibold transition-colors duration-300 ease-in-out whitespace-nowrap ${
                  isActive("/artigos/guia-inicial-literacia-financeira")
                    ? "text-brand-primary"
                    : "text-secondary hover:text-cyan-600"
                }`}
              >
                Começa Aqui
              </Link>
              
              {siteConfig.nav.map((item) => {
                const itemIsActive = isActive(item.href);
                
                // Special handling for Artigos with dropdown
                if (item.href === "/artigos") {
                  return (
                    <div key={item.href} className="relative flex items-center" ref={dropdownRef}>
                      <button
                        onClick={() => setArtigosDropdownOpen(!artigosDropdownOpen)}
                        className={`inline-flex items-center gap-1 text-sm md:text-base font-medium transition-colors duration-300 ease-in-out whitespace-nowrap ${
                          itemIsActive
                            ? "text-brand-primary font-semibold"
                            : "text-secondary hover:text-cyan-600"
                        }`}
                        aria-expanded={mounted ? artigosDropdownOpen : false}
                        aria-haspopup="true"
                        aria-label={`${item.label} menu`}
                      >
                        {item.label}
                        {/* Active indicator dot */}
                        {itemIsActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary ml-1" aria-hidden="true" />
                        )}
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
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-cyan-100/50 py-2 animate-slide-up z-50"
                          role="menu"
                          aria-label={`${item.label} submenu`}
                        >
                          <Link
                            href="/artigos"
                            onClick={() => setArtigosDropdownOpen(false)}
                            className={`block px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out rounded-lg mx-1 ${
                              pathname === "/artigos"
                                ? "text-brand-primary bg-cyan-50"
                                : "text-secondary hover:text-cyan-600 hover:bg-cyan-50"
                            }`}
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
                              className={`block px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out rounded-lg mx-1 ${
                                pathname?.includes(categoria.href.split("=")[1] || "")
                                  ? "text-brand-primary bg-cyan-50"
                                  : "text-secondary hover:text-cyan-600 hover:bg-cyan-50"
                              }`}
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
                    className={`text-sm md:text-base font-medium transition-colors duration-300 ease-in-out whitespace-nowrap relative ${
                      itemIsActive
                        ? "text-brand-primary font-semibold"
                        : "text-secondary hover:text-cyan-600"
                    }`}
                    aria-current={itemIsActive ? "page" : undefined}
                  >
                    {item.label}
                    {/* Active indicator underline */}
                    {itemIsActive && (
                      <span 
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-primary rounded-full" 
                        aria-hidden="true" 
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button - Desktop/Tablet */}
            <div className="flex items-center flex-shrink-0">
              <Link
                href="/contacto"
                className="btn-secondary inline-flex items-center gap-2 whitespace-nowrap group"
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
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-secondary hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-300 ease-in-out flex-shrink-0"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              type="button"
            >
            <svg
              className="w-6 h-6 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

      {/* Mobile Navigation - Full Screen Overlay */}
      <div 
        className={`lg:hidden fixed left-0 right-0 bottom-0 w-full bg-white/98 backdrop-blur-md overflow-y-auto transition-all duration-300 ${
          mobileMenuOpen ? 'z-[100] opacity-100 visible' : 'z-[-1] opacity-0 invisible'
        }`}
        style={{ top: isScrolled ? '56px' : '64px' }}
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
                className={`group relative block px-4 py-3.5 text-base font-semibold transition-all duration-300 ease-in-out mb-4 rounded-xl ${
                  isActive("/artigos/guia-inicial-literacia-financeira")
                    ? "text-brand-primary bg-cyan-50"
                    : "text-secondary hover:text-cyan-600 hover:bg-cyan-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  Começa Aqui
                  {isActive("/artigos/guia-inicial-literacia-financeira") && (
                    <span className="w-2 h-2 rounded-full bg-brand-primary" aria-hidden="true" />
                  )}
                </span>
              </Link>
              
              {siteConfig.nav.map((item) => {
                const itemIsActive = isActive(item.href);
                
                // Special handling for Artigos with dropdown in mobile
                if (item.href === "/artigos") {
                  return (
                    <div key={item.href} className="mb-2">
                      <button
                        onClick={() => setArtigosDropdownOpen(!artigosDropdownOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-300 ease-in-out ${
                          itemIsActive
                            ? "text-brand-primary bg-cyan-50 font-semibold"
                            : "text-secondary hover:text-cyan-600 hover:bg-cyan-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {item.label}
                          {itemIsActive && (
                            <span className="w-2 h-2 rounded-full bg-brand-primary" aria-hidden="true" />
                          )}
                        </span>
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
                            className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ease-in-out ${
                              pathname === "/artigos"
                                ? "text-brand-primary bg-cyan-50"
                                : "text-foreground-muted hover:text-cyan-600 hover:bg-cyan-50"
                            }`}
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
                              className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ease-in-out ${
                                pathname?.includes(categoria.href.split("=")[1] || "")
                                  ? "text-brand-primary bg-cyan-50"
                                  : "text-foreground-muted hover:text-cyan-600 hover:bg-cyan-50"
                              }`}
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
                    className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-300 ease-in-out ${
                      itemIsActive
                        ? "text-brand-primary bg-cyan-50 font-semibold"
                        : "text-secondary hover:text-cyan-600 hover:bg-cyan-50"
                    }`}
                    aria-current={itemIsActive ? "page" : undefined}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {itemIsActive && (
                        <span className="w-2 h-2 rounded-full bg-brand-primary" aria-hidden="true" />
                      )}
                    </span>
                  </Link>
                );
              })}
              
              {/* Subscribe Button - Prominent in Mobile Menu */}
              <div className="pt-4 mt-4 border-t border-neutral-200">
                <Link
                  href="/contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-secondary flex items-center justify-center gap-2 w-full group"
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
                </Link>
              </div>
            </nav>
        </div>
    </>
  );
}
