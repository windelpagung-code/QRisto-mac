'use client';
import { Bell, Menu, Globe, ExternalLink, LogOut } from 'lucide-react';
import { getInitials } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useRestaurant } from '@/lib/hooks/useRestaurant';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export function Header({ onMenuClick, title }: HeaderProps) {
  const { restaurant } = useRestaurant();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="h-16 border-b border-white/8 bg-[#0a1628]/80 backdrop-blur-md flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-30">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
      >
        <Menu size={20} />
      </button>

      {title && (
        <h1 className="text-lg font-semibold text-white hidden sm:block">{title}</h1>
      )}

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <Link
          href={restaurant ? `/menu/${restaurant.slug}` : '#'}
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-green-400 hover:bg-green-500/10 border border-white/10 hover:border-green-500/20 transition-all"
        >
          <Globe size={13} />
          Ver Menu
          <ExternalLink size={11} />
        </Link>

        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-green-400 rounded-full" />
        </button>

        {/* Avatar com dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-xs font-bold text-green-400"
          >
            {getInitials(restaurant?.name ?? 'R')}
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-10 z-50 w-44 rounded-xl bg-slate-800 border border-white/10 shadow-xl overflow-hidden">
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Configurações
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={14} />
                  Sair
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
