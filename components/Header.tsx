"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site.config";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
            <Image
              src="/images/aumentarcapital_logo.svg"
              alt={siteConfig.name}
              width={180}
              height={45}
              priority
              className="h-8 sm:h-10 w-auto"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/contacto"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 border-2 border-green-600 text-green-600 text-sm font-semibold rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 group"
            >
              <span>Subscrever</span>
              <svg 
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" 
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
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-green-50 transition-colors"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
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
          <nav className="md:hidden border-t border-gray-200 py-4 space-y-1">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 mx-4 px-4 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-full hover:bg-green-700 transition-all duration-300 justify-center group"
            >
              <span>Subscrever</span>
              <svg 
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" 
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
          </nav>
        )}
      </div>
    </header>
  );
}
