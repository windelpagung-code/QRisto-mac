'use client';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { Users, DollarSign, QrCode, Activity, Crown, Shield, ToggleLeft } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatsCard } from '@/components/ui/StatsCard';
import { Button } from '@/components/ui/Button';
import { mockAdminStats, mockAdminRestaurants } from '@/lib/mock-data';
import { formatNumber } from '@/lib/utils';

const STATUS_BADGES: Record<string, 'primary' | 'muted' | 'accent' | 'danger'> = {
  active: 'primary',
  inactive: 'muted',
  trialing: 'accent',
  canceled: 'danger',
};

const STATUS_LABELS: Record<string, string> = {
  active: 'Ativo',
  inactive: 'Inativo',
  trialing: 'Trial',
  canceled: 'Cancelado',
};

export default function AdminPage() {
  const stats = mockAdminStats;

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
          <p className="text-slate-400 text-sm mt-1">Visão global da plataforma QRisto</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs text-purple-400 font-medium">Admin Master</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Restaurantes"
          value={stats.totalRestaurants}
          change={15}
          icon={Users}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/15"
        />
        <StatsCard
          title="MRR"
          value={`€${formatNumber(stats.totalMrr)}`}
          change={22.5}
          icon={DollarSign}
          iconColor="text-green-400"
          iconBg="bg-green-500/15"
        />
        <StatsCard
          title="QR Scans Totais"
          value={formatNumber(stats.totalQrScans)}
          change={18.2}
          icon={QrCode}
          iconColor="text-purple-400"
          iconBg="bg-purple-500/15"
        />
        <StatsCard
          title="Taxa de Ativação"
          value={`${Math.round((stats.activeRestaurants / stats.totalRestaurants) * 100)}%`}
          change={3.1}
          icon={Activity}
          iconColor="text-orange-400"
          iconBg="bg-orange-500/15"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue chart */}
        <Card>
          <CardTitle className="mb-6">Crescimento do MRR</CardTitle>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={stats.revenueOverTime} margin={{ left: -15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                formatter={(v) => [`€${v ?? 0}`, 'MRR']}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={{ fill: '#22c55e', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Plan distribution */}
        <Card>
          <CardTitle className="mb-5">Distribuição de Planos</CardTitle>
          <div className="space-y-5">
            {[
              {
                label: 'Elite',
                count: stats.eliteCount,
                total: stats.totalRestaurants,
                color: 'bg-yellow-500',
                mrr: stats.eliteCount * 39,
                icon: <Crown size={14} className="text-yellow-400" />,
              },
              {
                label: 'Starter',
                count: stats.starterCount,
                total: stats.totalRestaurants,
                color: 'bg-blue-500',
                mrr: stats.starterCount * 19,
                icon: null,
              },
            ].map((plan) => (
              <div key={plan.label}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    {plan.icon}
                    <span className="text-sm font-medium text-white">{plan.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">{plan.count} restaurantes</span>
                    <span className="text-xs text-green-400 font-semibold">€{plan.mrr}/mês</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${plan.color} rounded-full`}
                    style={{ width: `${(plan.count / plan.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/8 grid grid-cols-3 gap-3">
            {[
              { label: 'MRR Total', value: `€${stats.totalMrr}`, color: 'text-green-400' },
              { label: 'Contas Ativas', value: stats.activeRestaurants, color: 'text-white' },
              { label: 'Em Trial', value: mockAdminRestaurants.filter(r => r.planStatus === 'trialing').length, color: 'text-orange-400' },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 rounded-xl bg-white/5">
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Restaurants table */}
      <Card padding="none">
        <div className="flex items-center justify-between p-6 border-b border-white/8">
          <div>
            <CardTitle>Restaurantes Cadastrados</CardTitle>
            <p className="text-sm text-slate-400 mt-1">Últimos registos e status de pagamento</p>
          </div>
          <Button variant="outline" size="sm">Exportar CSV</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8">
                {['Restaurante', 'País', 'Plano', 'Status', 'QR Scans', 'MRR', 'Ações'].map((h) => (
                  <th
                    key={h}
                    className={`text-xs font-semibold text-slate-400 uppercase tracking-wider py-3 ${
                      h === 'Ações' || h === 'MRR' || h === 'QR Scans' ? 'text-right pr-6' : 'text-left pl-6'
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockAdminRestaurants.map((r) => (
                <tr key={r.id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{r.name}</p>
                      <p className="text-xs text-slate-400">{r.city}</p>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-slate-300">{r.country}</td>
                  <td className="px-3 py-4">
                    <span className={`font-medium text-sm ${r.plan === 'elite' ? 'text-yellow-400' : 'text-blue-400'}`}>
                      {r.plan === 'elite' ? (
                        <span className="flex items-center gap-1"><Crown size={12} /> Elite</span>
                      ) : (
                        '🔹 Starter'
                      )}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <Badge variant={STATUS_BADGES[r.planStatus] || 'muted'}>
                      {STATUS_LABELS[r.planStatus] || r.planStatus}
                    </Badge>
                  </td>
                  <td className="px-3 py-4 text-right text-slate-300">
                    {formatNumber(r.totalQrScans)}
                  </td>
                  <td className="px-3 py-4 text-right font-semibold text-green-400">
                    {r.mrr > 0 ? `€${r.mrr}` : '—'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Ver detalhes"
                      >
                        <Activity size={14} />
                      </button>
                      <button
                        className={`p-1.5 rounded-lg transition-colors ${
                          r.planStatus === 'active'
                            ? 'text-green-400 hover:text-red-400 hover:bg-red-500/10'
                            : 'text-slate-500 hover:text-green-400 hover:bg-green-500/10'
                        }`}
                        title={r.planStatus === 'active' ? 'Bloquear' : 'Ativar'}
                      >
                        <ToggleLeft size={14} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Configurações"
                      >
                        <Shield size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
