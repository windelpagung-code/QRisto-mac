'use client';
import { useState } from 'react';
import Link from 'next/link';
import { QrCode, Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    await new Promise(r => setTimeout(r, 1000));
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex">
      {/* Left: Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
              <QrCode size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">QRisto</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Bem-vindo de volta</h1>
            <p className="text-slate-400 mt-2">Entre na sua conta para gerir o menu</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="seu@restaurante.com"
              required
              leftIcon={<Mail size={16} />}
            />
            <Input
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              required
              leftIcon={<Lock size={16} />}
              rightIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded" />
                Lembrar-me
              </label>
              <Link href="/forgot-password" className="text-green-400 hover:text-green-300">
                Esqueci a senha
              </Link>
            </div>

            <Button type="submit" fullWidth size="lg" loading={loading} rightIcon={<ArrowRight size={18} />}>
              Entrar
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center">
              <div className="flex-1 border-t border-white/10" />
              <span className="px-4 text-sm text-slate-500">ou continue com</span>
              <div className="flex-1 border-t border-white/10" />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {['Google', 'Apple'].map(provider => (
                <button
                  key={provider}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-slate-300 hover:bg-white/10 transition-colors"
                >
                  {provider}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-slate-400">
            Não tem conta?{' '}
            <Link href="/register" className="text-green-400 hover:text-green-300 font-medium">
              Criar conta grátis
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-500/10 to-blue-500/5 items-center justify-center p-12 border-l border-white/8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="relative text-center max-w-md">
          <div className="w-20 h-20 rounded-3xl bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-8">
            <QrCode size={40} className="text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Menu digital para restaurantes europeus</h2>
          <p className="text-slate-400">QR Code customizável · Analytics avançado · 6 idiomas · PWA</p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { value: '87+', label: 'Restaurantes' },
              { value: '284K', label: 'QR Scans' },
              { value: '6', label: 'Países' },
            ].map(s => (
              <div key={s.label} className="p-4 rounded-2xl bg-white/5 border border-white/8">
                <p className="text-2xl font-bold text-green-400">{s.value}</p>
                <p className="text-xs text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
