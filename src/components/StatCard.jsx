import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'navy', trend, trendLabel, delay = 0 }) {
  const colors = {
    navy: { bg: 'bg-navy-50', icon: 'text-navy-600', iconBg: 'bg-navy-100' },
    gold: { bg: 'bg-gold-50', icon: 'text-gold-600', iconBg: 'bg-gold-100' },
    emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', iconBg: 'bg-emerald-100' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', iconBg: 'bg-purple-100' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-600', iconBg: 'bg-orange-100' },
    red: { bg: 'bg-red-50', icon: 'text-red-600', iconBg: 'bg-red-100' },
  };

  const c = colors[color] || colors.navy;

  return (
    <div
      className="card animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide font-body mb-1">{title}</p>
          <p className="font-display font-bold text-2xl text-navy-900 leading-none mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 font-body">{subtitle}</p>}
        </div>
        <div className={`w-11 h-11 ${c.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 ml-3`}>
          <Icon size={20} className={c.icon} />
        </div>
      </div>

      {trend !== undefined && (
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
          {trend >= 0 ? (
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <TrendingUp size={12} />+{trend}%
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs font-semibold text-red-500">
              <TrendingDown size={12} />{trend}%
            </span>
          )}
          {trendLabel && <span className="text-xs text-gray-400 font-body">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}
