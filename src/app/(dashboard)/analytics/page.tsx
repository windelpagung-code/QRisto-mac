'use client';
import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Download, Crown, Filter, TrendingUp } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatsCard } from '@/components/ui/StatsCard';
import { Eye, QrCode, BarChart3, Clock } from 'lucide-react';
import { mockDashboardStats, mockRestaurant, allMockItems } from '@/lib/mock-data';
import { formatNumber } from '@/lib/utils';

const PERIODS = ['7 dias', '30 dias', '3 meses', '1 ano'];
const COLORS = ['#22c55e', '#3b82f6', '#f97316', '#8b5cf6', '#ec4899', '#06b6d4'];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30 dias');
  const stats = mockDashboardStats;
  const isElite = mockRestaurant.plan === 'elite';

  if (!isElite) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="p-6 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 max-w-md">
          <Crown size={48} className="text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Analytics Avançado</h2>
          <p className="text-slate-400 mb-6">
            Aceda a mapas de calor, ranking detalhado de produtos, filtros avançados e exportação CSV com o plano Elite.
          </p>
          <Button variant="premium" leftIcon={<Crown size={16} />}>
            Fazer Upgrade para Elite
          </Button>
        </div>
      </div>
    );
  }

  const chartData = stats.viewsOverTime.slice(-30).map(d => ({
    date: new Date(d.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' }),
    views: d.views,
    scans: d.scans,
  }));

  const topItemsData = stats.topItems.map(item => ({
    name: item.name.length > 15 ? item.name.slice(0, 15) + '...' : item.name,
    views: item.views,
  }));

  // Heatmap data (24h x 7 days)
  const heatmapData = Array.from({ length: 7 }, (_, day) =>
    Array.from({ length: 24 }, (_, hour) => ({
      day,
      hour,
      value: Math.floor(Math.random() * 100),
    }))
  ).flat();

  const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const heatmapGrid = DAYS.map((dayLabel, dayIdx) => ({
    day: dayLabel,
    hours: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      value: heatmapData.find(d => d.day === dayIdx && d.hour === h)?.value || 0,
    })),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Avançado</h1>
          <p className="text-slate-400 text-sm mt-1">Insights detalhados do seu menu</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
            {PERIODS.map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  period === p ? 'bg-green-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>
            CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Visualizações" value={formatNumber(stats.totalViews)} change={12.5} icon={Eye} iconColor="text-blue-400" iconBg="bg-blue-500/15" />
        <StatsCard title="QR Scans" value={formatNumber(stats.totalQrScans)} change={8.3} icon={QrCode} iconColor="text-green-400" iconBg="bg-green-500/15" />
        <StatsCard title="Horário de Pico" value="20h–22h" icon={Clock} iconColor="text-orange-400" iconBg="bg-orange-500/15" description="maior tráfego" />
        <StatsCard title="Conversão" value="26.6%" change={-2.1} icon={TrendingUp} iconColor="text-purple-400" iconBg="bg-purple-500/15" />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views over time */}
        <Card>
          <CardTitle className="mb-6">Visualizações ao Longo do Tempo</CardTitle>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
              <Line type="monotone" dataKey="views" stroke="#22c55e" strokeWidth={2} dot={false} name="Visualizações" />
              <Line type="monotone" dataKey="scans" stroke="#60a5fa" strokeWidth={2} dot={false} name="QR Scans" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top items bar chart */}
        <Card>
          <CardTitle className="mb-6">Ranking de Pratos</CardTitle>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topItemsData} layout="vertical" margin={{ left: 0, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
              <Bar dataKey="views" fill="#22c55e" radius={[0, 4, 4, 0]} name="Visualizações" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Heatmap */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <CardTitle>Mapa de Calor — Horários de Acesso</CardTitle>
            <p className="text-xs text-slate-400 mt-1">Visualizações por hora e dia da semana</p>
          </div>
          <Badge variant="premium"><Crown size={10} /> Elite</Badge>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Hour labels */}
            <div className="flex gap-0.5 mb-1 pl-10">
              {Array.from({ length: 24 }, (_, h) => (
                <div key={h} className="flex-1 text-center text-xs text-slate-500">
                  {h % 4 === 0 ? `${h}h` : ''}
                </div>
              ))}
            </div>
            {heatmapGrid.map(({ day, hours }) => (
              <div key={day} className="flex items-center gap-0.5 mb-0.5">
                <div className="w-10 text-right pr-2 text-xs text-slate-400 flex-shrink-0">{day}</div>
                {hours.map(({ hour, value }) => (
                  <div
                    key={hour}
                    className="flex-1 h-6 rounded-sm transition-all"
                    style={{
                      background: `rgba(34, 197, 94, ${value / 100})`,
                      minWidth: '16px',
                    }}
                    title={`${day} ${hour}h: ${value} acessos`}
                  />
                ))}
              </div>
            ))}
            {/* Legend */}
            <div className="flex items-center gap-2 mt-3 justify-end">
              <span className="text-xs text-slate-500">Menos</span>
              {[0.1, 0.3, 0.5, 0.7, 0.9].map(opacity => (
                <div key={opacity} className="w-4 h-4 rounded-sm" style={{ background: `rgba(34, 197, 94, ${opacity})` }} />
              ))}
              <span className="text-xs text-slate-500">Mais</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Category & Language distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardTitle className="mb-6">Por Categoria</CardTitle>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={stats.viewsByCategory}
                dataKey="views"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
              >
                {stats.viewsByCategory.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
              <Legend iconType="circle" iconSize={8} formatter={(value) => <span className="text-xs text-slate-300">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Ranking table */}
        <Card>
          <CardTitle className="mb-4">Top Itens Detalhado</CardTitle>
          <div className="space-y-2">
            {allMockItems.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)).slice(0, 6).map((item, i) => (
              <div key={item.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  i === 0 ? 'bg-yellow-500 text-black' : i === 1 ? 'bg-slate-400 text-black' : i === 2 ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{item.name}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-slate-200">{formatNumber(item.viewCount || 0)}</p>
                  <p className="text-xs text-slate-500">views</p>
                </div>
                <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden flex-shrink-0">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${((item.viewCount || 0) / 892) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
