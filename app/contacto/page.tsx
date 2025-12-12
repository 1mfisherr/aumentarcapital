"use client";

import { siteConfig } from "@/lib/site.config";
import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Contact form integration
      // You can create an API route at /app/api/contact/route.ts to handle submissions
      // For now, this simulates a successful submission
      
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
        setStatus("error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setStatus("error");
        return;
      }

      // Simulate API call (replace with actual API route when ready)
      // Uncomment and configure when you have an API route:
      /*
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
      */

      // Demo mode: simulate successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // In production, you would send an email or save to database here
      // Consider using services like Resend, SendGrid, or Formspree
    } catch (error) {
      setStatus("error");
      if (process.env.NODE_ENV === 'development') {
        console.error("Contact form error:", error);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Contacto", href: "/contacto" },
        ]}
      />
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-neutral-900 tracking-tight">
        Contacta-nos
      </h1>

      <p className="text-lg sm:text-xl text-neutral-600 mb-12 leading-relaxed max-w-3xl">
        Tens alguma pergunta, sugestão ou feedback? Adoraríamos ouvir-te!
        Preenche o formulário abaixo e entraremos em contacto contigo brevemente.
      </p>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-6 text-neutral-900">
            Informação de Contacto
          </h2>
          <div className="space-y-5 text-neutral-700">
            <div>
              <p className="text-sm font-bold text-neutral-500 uppercase tracking-wide mb-2">Email</p>
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="text-lg font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                {siteConfig.author.email}
              </a>
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-500 uppercase tracking-wide mb-3">Redes Sociais</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(siteConfig.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-neutral-100 border border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:border-primary hover:text-primary transition-colors duration-200 rounded-lg font-medium text-sm capitalize"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary-50 via-primary-50/80 to-white border border-primary-200/60 rounded-2xl p-6 lg:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/30 rounded-full blur-2xl" />
          <div className="relative">
            <div className="text-4xl mb-4">⏱️</div>
            <h3 className="text-2xl font-bold mb-3 text-neutral-900">
              Tempo de Resposta
            </h3>
            <p className="text-neutral-700 leading-relaxed">
              Respondemos a todas as mensagens dentro de <strong>24-48 horas</strong> (dias úteis).
              Obrigado pela tua paciência!
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-neutral-200/60 rounded-2xl p-6 lg:p-8 space-y-6 shadow-sm">
        <div>
          <label htmlFor="name" className="block text-base font-bold text-neutral-900 mb-2">
            Nome <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-5 py-3.5 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-base shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-base font-bold text-neutral-900 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-3.5 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-base shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-base font-bold text-neutral-900 mb-2">
            Assunto <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-5 py-3.5 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-base shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-base font-bold text-neutral-900 mb-2">
            Mensagem <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-5 py-3.5 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-base resize-none shadow-sm"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-8 py-4 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary-800 hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              A enviar...
            </>
          ) : (
            "Enviar Mensagem"
          )}
        </button>

        {status === "success" && (
          <div className="p-5 bg-primary-50 border-2 border-primary-200 text-primary-800 rounded-xl font-medium">
            ✅ Mensagem enviada com sucesso! Entraremos em contacto em breve.
          </div>
        )}

        {status === "error" && (
          <div className="p-5 bg-error/10 border-2 border-error/30 text-error rounded-xl font-medium flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-bold mb-1">Erro ao enviar mensagem</p>
              <p className="text-sm">Algo correu mal. Por favor, verifica os campos ou envia-nos um email diretamente para {siteConfig.author.email}.</p>
            </div>
          </div>
        )}
      </form>
    </main>
  );
}

