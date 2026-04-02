'use client';
import { Bell, Menu, Search, Globe, ExternalLink } from 'lucide-react';
import { mockRestaurant } from '@/lib/mock-data';
import { getInitials } from '@/lib/utils';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export function Header({ onMenuClick, title }: HeaderProps) {
  const restaurant = mockRestaurant;

  return (
    <header className="h-16 border-b border-white/8 bg-[#0a1628]/80 backdrop-blur-md flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-30">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      {title && (
        <h1 className="text-lg font-semibold text-white hidden sm:block">{title}</h1>
      )}

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* View menu link */}
        <Link
          href={`/menu/${restaurant.slug}`}
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-green-400 hover:bg-green-500/10 border border-white/10 hover:border-green-500/20 transition-all"
        >
          <Globe size={13} />
          Ver Menu
          <ExternalLink size={11} />
        </Link>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-green-400 rounded-full" />
        </button>

        {/* Avatar */}
        <button className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-xs font-bold text-green-400">
          {getInitials(restaurant.name)}
        </button>
      </div>
    </header>
  );
}
