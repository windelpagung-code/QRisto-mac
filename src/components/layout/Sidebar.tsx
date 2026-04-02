'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, UtensilsCrossed, QrCode, BarChart3,
  Building2, Settings, LogOut, Crown, ChevronRight, Zap, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockRestaurant } from '@/lib/mock-data';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/menu', icon: UtensilsCrossed, label: 'Menus' },
  { href: '/qrcode', icon: QrCode, label: 'QR Code' },
  { href: '/analytics', icon: BarChart3, label: 'Analytics', elite: true },
  { href: '/branches', icon: Building2, label: 'Filiais', elite: true },
  { href: '/settings', icon: Settings, label: 'Configurações' },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const restaurant = mockRestaurant;
  const isElite = restaurant.plan === 'elite';

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 h-full w-64 bg-[#0a1628] border-r border-white/8 flex flex-col z-50 transition-transform duration-300',
        'lg:translate-x-0 lg:static lg:z-auto',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-white/8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
              <QrCode size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">QRisto</span>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1 text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Restaurant Info */}
        <div className="p-4 mx-3 mt-3 rounded-xl bg-white/5 border border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🍕</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{restaurant.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                {isElite ? (
                  <span className="flex items-center gap-1 text-xs text-yellow-400">
                    <Crown size={10} /> Elite
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">Starter</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {navItems.map(({ href, icon: Icon, label, elite }) => {
            const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
            const locked = elite && !isElite;

            return (
              <Link
                key={href}
                href={locked ? '/settings' : href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                  active
                    ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                    : locked
                    ? 'text-slate-500 cursor-not-allowed'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon size={18} className={active ? 'text-green-400' : ''} />
                <span className="flex-1">{label}</span>
                {elite && (
                  <span className={cn(
                    'text-xs px-1.5 py-0.5 rounded-full font-medium',
                    isElite ? 'bg-yellow-500/15 text-yellow-400' : 'bg-slate-700 text-slate-500'
                  )}>
                    {isElite ? <Crown size={10} /> : '🔒'}
                  </span>
                )}
                {active && <ChevronRight size={14} className="text-green-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade Banner (Starter only) */}
        {!isElite && (
          <div className="m-3 p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-yellow-400" />
              <span className="text-xs font-semibold text-yellow-400">Upgrade para Elite</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Analytics avançado, filiais, QR customizado e muito mais.</p>
            <Link
              href="/pricing"
              className="block w-full text-center text-xs font-semibold py-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
            >
              Ver Planos
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 border-t border-white/8">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl text-sm transition-colors">
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
