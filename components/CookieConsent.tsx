"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/site.config";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
    // Reload to enable analytics if they're configured
    if (siteConfig.analytics.enabled) {
      window.location.reload();
    }
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Este site utiliza cookies</h3>
          <p className="text-sm text-gray-600">
            Utilizamos cookies para melhorar a tua experiência, analisar o tráfego do site
            e personalizar conteúdo. Ao continuar a navegar, aceitas a nossa utilização de cookies.{" "}
            <a
              href="/politica-privacidade"
              className="text-primary hover:underline"
            >
              Sabe mais
            </a>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Recusar
          </button>
          <button
            onClick={acceptCookies}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}

