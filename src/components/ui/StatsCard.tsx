import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changePeriod?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  description?: string;
}

export function StatsCard({ title, value, change, changePeriod = 'vs mês anterior', icon: Icon, iconColor = 'text-green-400', iconBg = 'bg-green-500/15', description }: StatsCardProps) {
  const isPositive = change !== undefined && change >= 0;
  return (
    <div className="rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-slate-400 font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={cn('p-3 rounded-xl', iconBg)}>
          <Icon size={20} className={iconColor} />
        </div>
      </div>
      {(change !== undefined || description) && (
        <div className="flex items-center gap-2">
          {change !== undefined && (
            <>
              {isPositive ? (
                <TrendingUp size={14} className="text-green-400" />
              ) : (
                <TrendingDown size={14} className="text-red-400" />
              )}
              <span className={cn('text-sm font-medium', isPositive ? 'text-green-400' : 'text-red-400')}>
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className="text-sm text-slate-500">{changePeriod}</span>
            </>
          )}
          {description && <span className="text-sm text-slate-500">{description}</span>}
        </div>
      )}
    </div>
  );
}
