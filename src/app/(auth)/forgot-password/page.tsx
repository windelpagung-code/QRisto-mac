'use client';
import { useState } from 'react';
import Link from 'next/link';
import { QrCode, Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
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

        {!sent ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white">Recuperar senha</h1>
              <p className="text-slate-400 mt-2">Enviaremos um link de redefinição para o seu email</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input label="Email" type="email" placeholder="seu@restaurante.com" required leftIcon={<Mail size={16} />} />
              <Button type="submit" fullWidth size="lg" loading={loading} rightIcon={<ArrowRight size={18} />}>
                Enviar Link
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={36} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Email enviado!</h2>
            <p className="text-slate-400 mb-8">Verifique a sua caixa de entrada e clique no link para redefinir a senha.</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={14} />
            Voltar para login
          </Link>
        </div>
      </div>
    </div>
  );
}
