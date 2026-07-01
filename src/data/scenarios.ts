import { ScenarioConfig, ScenarioType } from '@/types';

export const scenarios: ScenarioConfig[] = [
  {
    type: 'baseline',
    name: '基准场景',
    description: '基于当前状况的标准财务模拟',
    icon: 'TrendingUp',
    params: [],
  },
  {
    type: 'unemployment',
    name: '失业场景',
    description: '模拟突然失业对财务的影响',
    icon: 'Briefcase',
    params: [
      {
        name: 'unemploymentMonths',
        label: '失业持续月份',
        type: 'slider',
        defaultValue: 6,
        min: 1,
        max: 12,
        step: 1,
      },
    ],
  },
  {
    type: 'raise',
    name: '加薪场景',
    description: '模拟工资上涨对财务的影响',
    icon: 'Wallet',
    params: [
      {
        name: 'raisePercent',
        label: '加薪幅度 (%)',
        type: 'slider',
        defaultValue: 20,
        min: 5,
        max: 50,
        step: 5,
      },
    ],
  },
  {
    type: 'housing',
    name: '购房场景',
    description: '模拟购买房产对财务的影响',
    icon: 'Home',
    params: [
      {
        name: 'mortgage',
        label: '月供金额 (元)',
        type: 'slider',
        defaultValue: 5000,
        min: 2000,
        max: 15000,
        step: 1000,
      },
    ],
  },
  {
    type: 'ai_replace',
    name: 'AI替代场景',
    description: '模拟AI技术替代职业的影响',
    icon: 'Bot',
    params: [
      {
        name: 'incomeReduction',
        label: '收入下降幅度 (%)',
        type: 'slider',
        defaultValue: 30,
        min: 10,
        max: 60,
        step: 10,
      },
    ],
  },
];

export const riskPreferences = [
  { value: 'conservative', label: '保守型', description: '偏好稳定收益，低风险' },
  { value: 'moderate', label: '稳健型', description: '平衡风险与收益' },
  { value: 'aggressive', label: '进取型', description: '追求高收益，能承受高风险' },
];

export const investmentHabits = [
  { value: 'none', label: '不投资', description: '仅储蓄，不参与投资' },
  { value: 'savings', label: '储蓄为主', description: '主要存入银行或购买理财产品' },
  { value: 'stocks', label: '股票投资', description: '主要投资股票或股票基金' },
  { value: 'mixed', label: '混合投资', description: '多元化投资组合' },
];

export const industries = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Retail',
  'Manufacturing',
  'Real Estate',
  'Entertainment',
  'Other',
];

export const cities = [
  'Beijing',
  'Shanghai',
  'Shenzhen',
  'Guangzhou',
  'Hangzhou',
  'Chengdu',
  'Wuhan',
  'Xi\'an',
  'Other',
];

export const getScenarioByType = (type: ScenarioType): ScenarioConfig | undefined => {
  return scenarios.find(s => s.type === type);
};
