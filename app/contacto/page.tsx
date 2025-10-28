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
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-heading font-bold mb-6 text-primary">
        Contacta-nos
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        Tens alguma pergunta, sugestão ou feedback? Adoraríamos ouvir-te!
        Preenche o formulário abaixo e entraremos em contacto contigo brevemente.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-heading font-semibold mb-4">
            Informação de Contacto
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="text-primary hover:underline"
              >
                {siteConfig.author.email}
              </a>
            </p>
            <div>
              <strong>Redes Sociais:</strong>
              <div className="flex gap-3 mt-2">
                {Object.entries(siteConfig.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark transition-colors capitalize"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold mb-2">
            Tempo de Resposta
          </h3>
          <p className="text-gray-700 text-sm">
            Respondemos a todas as mensagens dentro de 24-48 horas (dias úteis).
            Obrigado pela tua paciência!
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nome <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Assunto <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Mensagem <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "A enviar..." : "Enviar Mensagem"}
        </button>

        {status === "success" && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            Mensagem enviada com sucesso! Entraremos em contacto em breve.
          </div>
        )}

        {status === "error" && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            Algo correu mal. Por favor, tenta novamente ou envia-nos um email diretamente.
          </div>
        )}
      </form>
    </main>
  );
}

