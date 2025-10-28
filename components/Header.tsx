"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site.config";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <Image
              src="/images/aumentarcapital_logo.svg"
              alt={siteConfig.name}
              width={180}
              height={45}
              priority
              className="h-9 sm:h-10 md:h-11 w-auto transition-transform duration-300 ease-out group-hover:scale-105"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm lg:text-base font-medium text-gray-700 hover:text-green-600 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all after:duration-300 after:ease-out hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/contacto"
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 bg-green-600 text-white text-sm lg:text-base font-semibold rounded-full hover:bg-green-700 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out group"
            >
              <span>Subscrever</span>
              <svg 
                className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 active:scale-95"
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
          <nav className="md:hidden border-t border-gray-200 py-4 space-y-1 animate-slide-up">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-xl transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <Link
                href="/contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-5 py-3.5 bg-green-600 text-white text-base font-semibold rounded-full hover:bg-green-700 hover:shadow-xl transition-all duration-300 ease-out justify-center group active:scale-95"
              >
                <span>Subscrever</span>
                <svg 
                  className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
