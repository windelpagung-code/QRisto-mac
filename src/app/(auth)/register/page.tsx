'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { QrCode, ArrowRight, Mail, Lock, User, Building2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { COUNTRIES } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', password: '',
    restaurantName: '', country: '', city: '', plan: 'elite',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }

    setLoading(true);
    setError('');

    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.name,
          restaurant_name: formData.restaurantName,
          country: formData.country,
          city: formData.city,
          plan: formData.plan,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user && !data.session) {
      // Email confirmation required
      router.push('/login?confirm=true');
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-10 justify-center">
          <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
            <QrCode size={16} className="text-white" />
          </div>
          <span className="text-xl font-bold text-white">QRisto</span>
        </Link>

        <div className="flex gap-2 mb-8">
          {[1, 2].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-all ${s <= step ? 'bg-green-500' : 'bg-white/10'}`} />
          ))}
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            {step === 1 ? 'Criar conta grátis' : 'Sobre seu restaurante'}
          </h1>
          <p className="text-slate-400 mt-2">
            {step === 1 ? '14 dias grátis, sem cartão de crédito' : 'Vamos configurar seu menu digital'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 && (
            <>
              <Input name="name" label="Nome completo" type="text" placeholder="Giovanni Rossi" required leftIcon={<User size={16} />} value={formData.name} onChange={handleChange} />
              <Input name="email" label="Email" type="email" placeholder="seu@restaurante.com" required leftIcon={<Mail size={16} />} value={formData.email} onChange={handleChange} />
              <Input name="password" label="Senha" type="password" placeholder="Mínimo 8 caracteres" required leftIcon={<Lock size={16} />} hint="Use pelo menos 8 caracteres, letras e números" value={formData.password} onChange={handleChange} />
            </>
          )}

          {step === 2 && (
            <>
              <Input name="restaurantName" label="Nome do Restaurante" type="text" placeholder="La Bella Italia" required leftIcon={<Building2 size={16} />} value={formData.restaurantName} onChange={handleChange} />
              <Select
                name="country"
                label="País"
                options={[{ value: '', label: 'Selecione o país' }, ...COUNTRIES.map(c => ({ value: c.code, label: `${c.flag} ${c.label}` }))]}
                value={formData.country}
                onChange={handleChange}
              />
              <Input name="city" label="Cidade" type="text" placeholder="Milano" leftIcon={<Globe size={16} />} value={formData.city} onChange={handleChange} />
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Plano</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'starter', name: 'Starter', price: '€19/mês', features: '1 restaurante' },
                    { id: 'elite', name: 'Elite', price: '€39/mês', features: 'Filiais + IA', highlight: true },
                  ].map(plan => (
                    <label key={plan.id} className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.plan === plan.id ? 'border-green-500 bg-green-500/10' : 'border-white/10 bg-white/5'}`}>
                      <input type="radio" name="plan" value={plan.id} className="hidden" checked={formData.plan === plan.id} onChange={handleChange} />
                      <p className="font-semibold text-white text-sm">{plan.name}</p>
                      <p className="text-green-400 text-sm font-bold mt-1">{plan.price}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{plan.features}</p>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <Button type="submit" fullWidth size="lg" loading={loading} rightIcon={<ArrowRight size={18} />}>
            {step === 1 ? 'Continuar' : 'Criar Minha Conta'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Já tem conta?{' '}
          <Link href="/login" className="text-green-400 hover:text-green-300 font-medium">Entrar</Link>
        </p>

        <p className="mt-4 text-center text-xs text-slate-500">
          Ao criar conta, você concorda com os{' '}
          <a href="#" className="text-slate-400 hover:text-white">Termos</a> e{' '}
          <a href="#" className="text-slate-400 hover:text-white">Política de Privacidade</a>
        </p>
      </div>
    </div>
  );
}
