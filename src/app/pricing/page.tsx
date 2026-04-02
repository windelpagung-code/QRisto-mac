'use client';
import { useState } from 'react';
import { Check, Crown, ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';
import { pricingPlans } from '@/lib/mock-data';

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f172a] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Voltar ao início
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Planos e Preços</h1>
          <p className="text-xl text-slate-400 mb-8">Escolha o plano ideal para o seu restaurante</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 p-1 rounded-2xl bg-white/5 border border-white/10">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${!annual ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'}`}
            >
              Mensal
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all ${annual ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'}`}
            >
              Anual
              {annual && <span className="px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">-17%</span>}
              {!annual && <span className="px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 text-xs">Economize 17%</span>}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-8 rounded-3xl border ${
                plan.highlighted
                  ? 'border-green-500/40 bg-gradient-to-br from-green-500/10 to-transparent'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-green-500 text-white text-sm font-bold shadow-lg shadow-green-500/30">
                  {plan.badge}
                </div>
              )}

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  {plan.id === 'elite' ? <Crown size={20} className="text-yellow-400" /> : <Zap size={20} className="text-blue-400" />}
                  <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-bold text-white">
                    €{annual ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice}
                  </span>
                  <span className="text-slate-400">/mês</span>
                </div>

                {annual && (
                  <p className="text-sm text-green-400 mt-2">
                    €{plan.yearlyPrice}/ano · economize €{plan.monthlyPrice * 12 - plan.yearlyPrice}
                  </p>
                )}
                {!annual && (
                  <p className="text-sm text-slate-400 mt-2">
                    ou €{plan.yearlyPrice}/ano (2 meses grátis)
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-green-400" />
                    </div>
                    <span className="text-sm text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/register"
                className={`block w-full text-center py-4 rounded-2xl font-bold text-base transition-all ${
                  plan.highlighted
                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/25'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
                }`}
              >
                Começar com {plan.name}
                {annual && ' (Anual)'}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-3">✅ 14 dias grátis &nbsp; ✅ Sem cartão de crédito &nbsp; ✅ Cancele quando quiser</p>
          <p className="text-sm text-slate-500">
            Dúvidas?{' '}
            <a href="mailto:hello@qristo.app" className="text-green-400 hover:text-green-300">
              Fale connosco
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
