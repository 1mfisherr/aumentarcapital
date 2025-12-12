import { Metadata } from "next";
import EmergencyFundCalculator from "@/components/EmergencyFundCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Fundo de Emergência - Aumentar Capital",
  description: "Descubra quanto deve poupar para emergências e quanto tempo levará a construir o seu fundo de segurança financeira.",
};

export default function RecursosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-neutral-900">
              Calculadora de Fundo de Emergência
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
              Descubra quanto deve poupar para emergências e quanto tempo levará a construir o seu fundo de segurança financeira.
            </p>
          </div>
        </div>
      </section>

      <EmergencyFundCalculator />
    </main>
  );
}
