'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { QrCode, LayoutDashboard, Users, DollarSign, Settings, LogOut } from 'lucide-react';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Painel' },
  { href: '/admin/restaurants', icon: Users, label: 'Restaurantes' },
  { href: '/admin/finances', icon: DollarSign, label: 'Finanças' },
  { href: '/admin/settings', icon: Settings, label: 'Configurações' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a]">
      {/* Admin Sidebar */}
      <aside className="w-56 bg-[#0a1628] border-r border-white/8 flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-white/8">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500 flex items-center justify-center">
              <QrCode size={13} className="text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">QRisto</span>
              <span className="text-xs text-purple-400">Admin Master</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/8">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl text-sm transition-colors"
          >
            <LogOut size={16} />
            Sair do Admin
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-y-auto p-6">
        {children}
      </div>
    </div>
  );
}
