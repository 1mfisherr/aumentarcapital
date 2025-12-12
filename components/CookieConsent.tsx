"use client";

import { useState, useEffect, useCallback } from "react";
import { siteConfig } from "@/lib/site.config";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted to prevent hydration mismatch
    setMounted(true);
    
    // Check if user has already accepted cookies
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = useCallback(() => {
    try {
      localStorage.setItem("cookie-consent", "accepted");
      setShowBanner(false);
      // Reload to enable analytics if they're configured
      if (siteConfig.analytics.enabled) {
        window.location.reload();
      }
    } catch (error) {
      // Handle localStorage errors (e.g., in private browsing)
      if (process.env.NODE_ENV === 'development') {
        console.error("Cookie consent error:", error);
      }
    }
  }, []);

  const declineCookies = useCallback(() => {
    try {
      localStorage.setItem("cookie-consent", "declined");
      setShowBanner(false);
    } catch (error) {
      // Handle localStorage errors (e.g., in private browsing)
      if (process.env.NODE_ENV === 'development') {
        console.error("Cookie consent error:", error);
      }
      setShowBanner(false);
    }
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted || !showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1 w-full md:w-auto">
          <h3 className="font-semibold mb-1 text-gray-900">Este site utiliza cookies</h3>
          <p className="text-sm text-gray-600">
            Utilizamos cookies para melhorar a tua experiência, analisar o tráfego do site
            e personalizar conteúdo. Ao continuar a navegar, aceitas a nossa utilização de cookies.{" "}
            <a
              href="/politica-privacidade"
              className="text-primary-500 hover:text-primary transition-colors duration-200 font-medium"
            >
              Sabe mais
            </a>
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto flex-shrink-0">
          <button
            onClick={declineCookies}
            className="flex-1 md:flex-none px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Recusar
          </button>
          <button
            onClick={acceptCookies}
            className="flex-1 md:flex-none px-6 py-2.5 text-sm font-medium text-white bg-slate-900 border-2 border-slate-900 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 shadow-sm"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}

