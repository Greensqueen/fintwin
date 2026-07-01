import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartDataPoint } from '@/types';

interface FinancialChartProps {
  title: string;
  data: number[];
  type: 'line' | 'bar' | 'area';
  color?: string;
  gradientId?: string;
  unit?: string;
}

export const FinancialChart = ({ title, data, type, color = '#00d4aa', gradientId = 'gradient', unit = '¥' }: FinancialChartProps) => {
  const currentYear = new Date().getFullYear();
  const chartData: ChartDataPoint[] = data.map((value, index) => ({
    year: currentYear + index,
    value,
    label: `${currentYear + index}`,
  }));

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { value: number; payload: ChartDataPoint }[] }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary-800/95 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 shadow-xl">
          <p className="text-white/60 text-sm">{payload[0].payload.year}年</p>
          <p className="text-white font-semibold text-lg">{unit}{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value: number) => {
    if (value >= 10000) {
      return `${(value / 10000).toFixed(0)}万`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-white font-semibold text-lg mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' && (
            <LineChart data={chartData}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} tickFormatter={formatYAxis} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3}
                dot={{ fill: color, strokeWidth: 2 }}
                activeDot={{ fill: color, strokeWidth: 0, r: 6 }}
              />
            </LineChart>
          )}
          {type === 'bar' && (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} tickFormatter={formatYAxis} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill={color} radius={[8, 8, 0, 0]} />
            </BarChart>
          )}
          {type === 'area' && (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} tickFormatter={formatYAxis} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke={color} fillOpacity={1} fill={`url(#${gradientId})`} />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

interface ComparisonChartProps {
  title: string;
  baselineData: number[];
  scenarioData: number[];
  baselineLabel?: string;
  scenarioLabel?: string;
}

export const ComparisonChart = ({ title, baselineData, scenarioData, baselineLabel = '基准', scenarioLabel = '场景' }: ComparisonChartProps) => {
  const currentYear = new Date().getFullYear();
  const data = baselineData.map((value, index) => ({
    year: currentYear + index,
    baseline: value,
    scenario: scenarioData[index] || 0,
  }));

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { value: number; name: string; payload: { year: number; baseline: number; scenario: number } }[] }) => {
    if (active && payload && payload.length) {
      const { year, baseline, scenario } = payload[0].payload;
      return (
        <div className="bg-primary-800/95 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 shadow-xl">
          <p className="text-white/60 text-sm">{year}年</p>
          <p className="text-secondary-400 text-sm">{baselineLabel}: ¥{baseline.toLocaleString()}</p>
          <p className="text-accent-400 text-sm">{scenarioLabel}: ¥{scenario.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value: number) => {
    if (value >= 10000) {
      return `${(value / 10000).toFixed(0)}万`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-white font-semibold text-lg mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d4aa" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00d4aa" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="scenarioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffd700" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ffd700" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} tickFormatter={formatYAxis} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="baseline" name={baselineLabel} stroke="#00d4aa" strokeWidth={3} dot={{ fill: '#00d4aa' }} />
            <Line type="monotone" dataKey="scenario" name={scenarioLabel} stroke="#ffd700" strokeWidth={3} dot={{ fill: '#ffd700' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
