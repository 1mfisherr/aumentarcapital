"use client";

import { siteConfig } from "@/lib/site.config";
import { useState } from "react";

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

    // TODO: Integrate with your contact form handler
    // For now, this is a placeholder
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);

    // Example integration:
    // try {
    //   const response = await fetch("/api/contact", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });
    //   if (response.ok) {
    //     setStatus("success");
    //     setFormData({ name: "", email: "", subject: "", message: "" });
    //   } else {
    //     setStatus("error");
    //   }
    // } catch (error) {
    //   setStatus("error");
    // }
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
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-neutral-900 tracking-tight">
        Contacta-nos
      </h1>

      <p className="text-lg sm:text-xl text-neutral-600 mb-12 leading-relaxed max-w-3xl">
        Tens alguma pergunta, sugestão ou feedback? Adoraríamos ouvir-te!
        Preenche o formulário abaixo e entraremos em contacto contigo brevemente.
      </p>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10">
        <div className="bg-white border-2 border-neutral-200 rounded-2xl p-6 lg:p-8">
          <h2 className="text-2xl font-bold mb-6 text-neutral-900">
            Informação de Contacto
          </h2>
          <div className="space-y-5 text-neutral-700">
            <div>
              <p className="text-sm font-bold text-neutral-500 uppercase tracking-wide mb-2">Email</p>
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="text-lg font-medium text-primary-600 hover:text-green-800 transition-colors duration-200"
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
                    className="px-4 py-2 bg-neutral-100 border border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:border-green-800 hover:text-green-800 transition-colors duration-200 rounded-lg font-medium text-sm capitalize"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 border-2 border-primary-200 rounded-2xl p-6 lg:p-8">
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

      <form onSubmit={handleSubmit} className="bg-white border-2 border-neutral-200 rounded-2xl p-6 lg:p-8 space-y-6">
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
            className="w-full px-5 py-3.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-base"
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
            className="w-full px-5 py-3.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-base"
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
            className="w-full px-5 py-3.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-base"
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
            className="w-full px-5 py-3.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-base resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-8 py-4 bg-primary-600 text-white font-bold text-lg rounded-xl hover:bg-green-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "A enviar..." : "Enviar Mensagem"}
        </button>

        {status === "success" && (
          <div className="p-5 bg-primary-50 border-2 border-primary-200 text-primary-800 rounded-xl font-medium">
            ✅ Mensagem enviada com sucesso! Entraremos em contacto em breve.
          </div>
        )}

        {status === "error" && (
          <div className="p-5 bg-red-50 border-2 border-red-200 text-red-800 rounded-xl font-medium">
            ❌ Algo correu mal. Por favor, tenta novamente ou envia-nos um email diretamente.
          </div>
        )}
      </form>
    </main>
  );
}

