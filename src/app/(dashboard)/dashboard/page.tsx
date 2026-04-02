'use client';
import { Eye, QrCode, UtensilsCrossed, TrendingUp, Crown, ArrowRight, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { StatsCard } from '@/components/ui/StatsCard';
import { Card, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockDashboardStats, mockRestaurant } from '@/lib/mock-data';
import { formatNumber } from '@/lib/utils';
import Link from 'next/link';

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-white/10 rounded-xl p-3 shadow-xl text-sm">
        <p className="text-slate-400 mb-2">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }} className="font-medium">
            {p.name === 'views' ? 'Visualizações' : 'QR Scans'}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const stats = mockDashboardStats;
  const restaurant = mockRestaurant;
  const isElite = restaurant.plan === 'elite';

  // Last 14 days for chart
  const chartData = stats.viewsOverTime.slice(-14).map(d => ({
    date: new Date(d.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' }),
    views: d.views,
    scans: d.scans,
  }));

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Bem-vindo, {restaurant.name} 👋</p>
        </div>
        <div className="flex items-center gap-2">
          {isElite && (
            <Badge variant="premium" size="md">
              <Crown size={12} /> Elite
            </Badge>
          )}
          <Link href={`/menu/${restaurant.slug}`} target="_blank">
            <Button variant="outline" size="sm">Ver Menu</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Visualizações Totais"
          value={formatNumber(stats.totalViews)}
          change={12.5}
          icon={Eye}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/15"
        />
        <StatsCard
          title="QR Scans"
          value={formatNumber(stats.totalQrScans)}
          change={8.3}
          icon={QrCode}
          iconColor="text-green-400"
          iconBg="bg-green-500/15"
        />
        <StatsCard
          title="Itens Ativos"
          value={stats.activeItems}
          icon={UtensilsCrossed}
          iconColor="text-orange-400"
          iconBg="bg-orange-500/15"
          description="no seu cardápio"
        />
        <StatsCard
          title="Taxa de Conversão"
          value="26.6%"
          change={-2.1}
          icon={TrendingUp}
          iconColor="text-purple-400"
          iconBg="bg-purple-500/15"
        />
      </div>

      {/* Chart + Top Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Views Chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <CardTitle>Acessos ao Menu</CardTitle>
              <p className="text-sm text-slate-400 mt-1">Últimos 14 dias</p>
            </div>
            <div className="flex gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-green-400 inline-block rounded" /> Visualizações</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-400 inline-block rounded" /> QR Scans</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="views" stroke="#22c55e" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#22c55e' }} />
              <Line type="monotone" dataKey="scans" stroke="#60a5fa" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#60a5fa' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Items */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Top Pratos</CardTitle>
            <Star size={16} className="text-yellow-400" />
          </div>
          <div className="space-y-3">
            {stats.topItems.slice(0, 5).map((item, i) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  i === 0 ? 'bg-yellow-500 text-black' : i === 1 ? 'bg-slate-400 text-black' : i === 2 ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.category}</p>
                </div>
                <span className="text-sm font-semibold text-slate-300">{formatNumber(item.views)}</span>
              </div>
            ))}
          </div>
          <Link href="/analytics">
            <Button variant="ghost" size="sm" fullWidth className="mt-4" rightIcon={<ArrowRight size={14} />}>
              Ver Analytics
            </Button>
          </Link>
        </Card>
      </div>

      {/* Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="mb-6">
            <CardTitle>Visualizações por Categoria</CardTitle>
            <p className="text-sm text-slate-400 mt-1">Distribuição de acessos</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={stats.viewsByCategory} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#22c55e' }}
              />
              <Bar dataKey="views" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Plan Banner */}
        {!isElite ? (
          <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-transparent p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-yellow-500/20">
                <Crown size={24} className="text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">Mude para Elite</h3>
                <p className="text-sm text-slate-400 mt-1 mb-4">
                  Analytics avançado, filiais ilimitadas, QR Code personalizado, vídeos YouTube e muito mais.
                </p>
                <div className="space-y-2 mb-5">
                  {['Analytics com mapa de calor', 'Múltiplas filiais', 'QR Code customizado', 'Vídeos nos pratos'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/pricing">
                  <Button variant="premium" size="md" leftIcon={<Crown size={14} />}>
                    Upgrade para Elite — €39/mês
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <Card>
            <CardTitle className="mb-3">Atividade Recente</CardTitle>
            <div className="space-y-3">
              {[
                { text: 'Novo QR scan em Milano Centro', time: 'há 2 min', color: 'bg-green-400' },
                { text: 'Item "Margherita DOP" visualizado', time: 'há 5 min', color: 'bg-blue-400' },
                { text: 'Idioma alterado para Inglês', time: 'há 12 min', color: 'bg-purple-400' },
                { text: 'QR scan em Roma Trastevere', time: 'há 18 min', color: 'bg-green-400' },
                { text: '"Tiramisù" adicionado aos favoritos', time: 'há 31 min', color: 'bg-yellow-400' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${activity.color}`} />
                  <p className="text-sm text-slate-300 flex-1">{activity.text}</p>
                  <span className="text-xs text-slate-500 flex-shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
