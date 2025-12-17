"use client";

import { siteConfig } from "@/lib/site.config";
import { useState, useCallback, memo } from "react";
import { trackNewsletterSignup } from "./Analytics";

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Por favor, insere um email válido.");
      return;
    }

    setStatus("loading");
    setMessage("");

    // Determine the source based on the page location
    const source = typeof window !== 'undefined' 
      ? window.location.pathname.includes('/artigos/') 
        ? 'article_page' 
        : window.location.pathname === '/' 
        ? 'homepage' 
        : 'other'
      : 'unknown';

    try {
      // Newsletter integration
      // If formAction is configured, use it; otherwise simulate success for demo
      const formAction = String(siteConfig.newsletter.formAction || '');
      if (formAction.trim() !== '') {
        const response = await fetch(formAction, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        
        if (response.ok) {
          setStatus("success");
          setMessage("Obrigado por te subscreveres! Verifica o teu email para confirmar.");
          setEmail("");
          trackNewsletterSignup(source);
        } else {
          const errorData = await response.json().catch(() => ({}));
          setStatus("error");
          setMessage(errorData.message || "Não foi possível processar a subscrição. Tenta novamente mais tarde.");
        }
      } else {
        // Demo mode: simulate successful subscription
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatus("success");
        setMessage("Obrigado por te subscreveres! (Modo demonstração - configura o formAction em site.config.ts)");
        setEmail("");
        trackNewsletterSignup(source);
      }
    } catch (error) {
      setStatus("error");
      setMessage("Erro de ligação. Verifica a tua ligação à internet e tenta novamente.");
      if (process.env.NODE_ENV === 'development') {
        console.error("Newsletter signup error:", error);
      }
    }
  }, [email]);

  // Early return after hooks to follow Rules of Hooks
  if (!siteConfig.newsletter.enabled) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-br from-cyan-50 via-blue-50 to-white border-2 border-cyan-100/50 rounded-2xl p-8 sm:p-10 md:p-12 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative">
        <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-neutral-900">
          {siteConfig.newsletter.title}
        </h3>
        <p className="text-base sm:text-lg text-neutral-700 mb-8 leading-relaxed">
          {siteConfig.newsletter.description}
        </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="O teu email"
          required
          disabled={status === "loading"}
          className="flex-1 w-full px-5 py-4 border-2 border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 disabled:opacity-50 bg-white/80 backdrop-blur-sm text-base transition-all duration-200 shadow-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2 hover:from-cyan-600 hover:to-cyan-700 hover:shadow-lg hover:scale-105 active:scale-100"
        >
          {status === "loading" ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              A enviar...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Subscrever
            </>
          )}
        </button>
      </form>

      {status === "success" && (
        <div className="mt-4 text-sm font-medium text-cyan-700 bg-cyan-50 border border-cyan-200 px-4 py-3 rounded-xl flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{message}</span>
        </div>
      )}
      {status === "error" && (
        <div className="mt-4 text-sm font-medium text-error bg-white px-4 py-2 rounded-lg border-2 border-error/30 flex items-start gap-2">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{message}</span>
        </div>
      )}

      <p className="mt-4 text-sm text-cyan-700">
        Ao subscreveres, concordas em receber emails da nossa parte. Podes cancelar a qualquer momento.
      </p>
      </div>
    </div>
  );
}

export default memo(NewsletterSignup);

