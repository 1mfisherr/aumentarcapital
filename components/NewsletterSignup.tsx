"use client";

import { siteConfig } from "@/lib/site.config";
import { useState } from "react";

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

    // TODO: Integrate with your newsletter provider
    // For now, this is a placeholder that simulates success
    setTimeout(() => {
      setStatus("success");
      setMessage("Obrigado por te subscreveres!");
      setEmail("");
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
    <div className="bg-green-50 border border-green-200 rounded-lg p-5 sm:p-6 md:p-8">
      <h3 className="text-xl sm:text-2xl font-heading font-semibold mb-2">
        {siteConfig.newsletter.title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 mb-4">
        {siteConfig.newsletter.description}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="O teu email"
          required
          disabled={status === "loading"}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === "loading" ? "A enviar..." : "Subscrever"}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-3 text-sm text-green-600">{message}</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">{message}</p>
      )}

      <p className="mt-3 text-xs text-gray-600">
        Ao subscreveres, concordas em receber emails da nossa parte. Podes cancelar a qualquer momento.
      </p>
    </div>
  );
}

