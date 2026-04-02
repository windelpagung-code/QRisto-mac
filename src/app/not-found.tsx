import Link from 'next/link';
import { QrCode, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-center p-8">
      <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        <QrCode size={36} className="text-green-400" />
      </div>
      <h1 className="text-6xl font-bold text-white mb-2">404</h1>
      <p className="text-xl text-slate-400 mb-8">Esta página não existe</p>
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar ao início
      </Link>
    </div>
  );
}
