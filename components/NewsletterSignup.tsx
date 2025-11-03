"use client";

import { siteConfig } from "@/lib/site.config";
import { useState, useCallback, memo } from "react";
import { trackNewsletterSignup } from "./Analytics";

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  if (!siteConfig.newsletter.enabled) {
    return null;
  }

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
      // TODO: Integrate with your newsletter provider
      // For now, this is a placeholder that simulates success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus("success");
      setMessage("Obrigado por te subscreveres!");
      setEmail("");
      
      // Track newsletter signup
      trackNewsletterSignup(source);
    } catch (error) {
      setStatus("error");
      setMessage("Algo correu mal. Tenta novamente.");
      if (process.env.NODE_ENV === 'development') {
        console.error("Newsletter signup error:", error);
      }
    }
  }, [email]);

  // Example integration with MailerLite or similar:
  // try {
  //   const response = await fetch(siteConfig.newsletter.formAction, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email }),
  //   });
  //   if (response.ok) {
  //     setStatus("success");
  //     setMessage("Obrigado por te subscreveres!");
  //     setEmail("");
  //   } else {
  //     setStatus("error");
  //     setMessage("Algo correu mal. Tenta novamente.");
  //   }
  // } catch (error) {
  //   setStatus("error");
  //   setMessage("Algo correu mal. Tenta novamente.");
  // }

  return (
    <div className="w-full bg-gradient-to-br from-primary-50 to-primary-100/50 border-2 border-primary-200 rounded-2xl p-6 sm:p-8 md:p-10 shadow-soft">
      <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-primary">
        {siteConfig.newsletter.title}
      </h3>
      <p className="text-base sm:text-lg text-primary mb-6 leading-relaxed">
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
          className="flex-1 w-full px-5 py-3.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 bg-white text-base transition-all duration-200"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full sm:w-auto px-8 py-3.5 bg-white border border-primary text-black font-bold rounded-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2 hover:bg-primary-100 hover:text-primary"
        >
          {status === "loading" ? (
            "A enviar..."
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
        <p className="mt-4 text-sm font-medium text-primary-700 bg-white px-4 py-2 rounded-lg">{message}</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-red-700 bg-white px-4 py-2 rounded-lg">{message}</p>
      )}

      <p className="mt-4 text-sm text-primary">
        Ao subscreveres, concordas em receber emails da nossa parte. Podes cancelar a qualquer momento.
      </p>
    </div>
  );
}

export default memo(NewsletterSignup);

