"use client";

import { siteConfig } from "@/lib/site.config";
import { useState } from "react";
import { trackNewsletterSignup } from "./Analytics";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  if (!siteConfig.newsletter.enabled) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Determine the source based on the page location
    const source = typeof window !== 'undefined' 
      ? window.location.pathname.includes('/artigos/') 
        ? 'article_page' 
        : window.location.pathname === '/' 
        ? 'homepage' 
        : 'other'
      : 'unknown';

    // TODO: Integrate with your newsletter provider
    // For now, this is a placeholder that simulates success
    setTimeout(() => {
      setStatus("success");
      setMessage("Obrigado por te subscreveres!");
      setEmail("");
      
      // Track newsletter signup
      trackNewsletterSignup(source);
    }, 1000);

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
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-2xl p-6 sm:p-8 md:p-10 shadow-soft">
      <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-neutral-900">
        {siteConfig.newsletter.title}
      </h3>
      <p className="text-base sm:text-lg text-neutral-600 mb-6 leading-relaxed">
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
          className="flex-1 w-full px-5 py-3.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 disabled:opacity-50 bg-white text-base transition-all duration-200"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full sm:w-auto px-8 py-3.5 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === "loading" ? "A enviar..." : "Subscrever"}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-4 text-sm font-medium text-blue-700 bg-white px-4 py-2 rounded-lg">{message}</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-red-700 bg-white px-4 py-2 rounded-lg">{message}</p>
      )}

      <p className="mt-4 text-sm text-neutral-600">
        Ao subscreveres, concordas em receber emails da nossa parte. Podes cancelar a qualquer momento.
      </p>
    </div>
  );
}

