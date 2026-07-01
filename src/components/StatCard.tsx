import { TrendingUp, TrendingDown, Wallet, Home, Clock, AlertTriangle, Sparkles } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: 'trendingUp' | 'trendingDown' | 'wallet' | 'home' | 'clock' | 'alert' | 'sparkles';
  color?: string;
  subValue?: string;
  change?: number;
}

const iconMap = {
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  wallet: Wallet,
  home: Home,
  clock: Clock,
  alert: AlertTriangle,
  sparkles: Sparkles,
};

const colorMap = {
  trendingUp: 'text-green-400 bg-green-500/10',
  trendingDown: 'text-red-400 bg-red-500/10',
  wallet: 'text-secondary-400 bg-secondary-500/10',
  home: 'text-accent-400 bg-accent-500/10',
  clock: 'text-blue-400 bg-blue-500/10',
  alert: 'text-orange-400 bg-orange-500/10',
  sparkles: 'text-purple-400 bg-purple-500/10',
};

export const StatCard = ({ title, value, icon, subValue, change }: StatCardProps) => {
  const IconComponent = iconMap[icon];
  const iconColorClass = colorMap[icon];

  return (
    <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/60 text-sm mb-2">{title}</p>
          <p className="text-white font-bold text-2xl">{value}</p>
          {subValue && (
            <p className="text-white/40 text-xs mt-1">{subValue}</p>
          )}
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${iconColorClass} flex items-center justify-center`}>
          <IconComponent className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

interface AdviceCardProps {
  title: string;
  content: string;
  type?: 'advice' | 'risk';
}

export const AdviceCard = ({ title, content, type = 'advice' }: AdviceCardProps) => {
  const bgColor = type === 'advice' ? 'bg-secondary-500/5' : 'bg-orange-500/5';
  const borderColor = type === 'advice' ? 'border-secondary-500/20' : 'border-orange-500/20';
  const icon = type === 'advice' ? '💡' : '⚠️';

  return (
    <div className={`glass-card ${bgColor} ${borderColor} p-6`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-white font-semibold text-lg">{title}</h3>
      </div>
      <div className="text-white/80 text-sm leading-relaxed whitespace-pre-line">
        {content}
      </div>
    </div>
  );
};
