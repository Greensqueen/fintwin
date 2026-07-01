import { UserProfile, SimulationResult, ScenarioType } from '@/types';

const MONTE_CARLO_ITERATIONS = 1000;
const SIMULATION_YEARS = 10;

const getMarketReturn = (riskPreference: string, year: number): number => {
  const baseReturns = {
    conservative: { mean: 0.03, std: 0.02 },
    moderate: { mean: 0.07, std: 0.05 },
    aggressive: { mean: 0.12, std: 0.10 },
  };
  
  const { mean, std } = baseReturns[riskPreference as keyof typeof baseReturns] || baseReturns.moderate;
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return mean + z0 * std;
};

const getInflationRate = (year: number): number => {
  return 0.02 + Math.random() * 0.02;
};

const getIncomeGrowth = (industry: string, scenario: ScenarioType, params: Record<string, number | string>): number => {
  const baseGrowth: Record<string, number> = {
    'technology': 0.08,
    'finance': 0.06,
    'healthcare': 0.05,
    'education': 0.03,
    'retail': 0.02,
    'manufacturing': 0.02,
    'real estate': 0.04,
    'entertainment': 0.05,
    'other': 0.03,
  };
  
  let growth = baseGrowth[industry.toLowerCase()] || 0.03;
  
  switch (scenario) {
    case 'raise':
      growth += (params.raisePercent as number) / 100;
      break;
    case 'unemployment':
      growth = -0.4;
      break;
    case 'ai_replace':
      growth = -0.15;
      break;
    default:
      break;
  }
  
  return growth;
};

const generateInvestmentAdvice = (profile: UserProfile, result: Partial<SimulationResult>): string => {
  const riskMap = {
    conservative: '保守型',
    moderate: '稳健型',
    aggressive: '进取型',
  };
  
  const habitMap = {
    none: '不投资',
    savings: '储蓄为主',
    stocks: '股票投资',
    mixed: '混合投资',
  };
  
  const hasGoodSavings = (profile.income - profile.monthlyExpense * 12) > profile.income * 0.2;
  const canInvest = (profile.income - profile.monthlyExpense * 12) > profile.income * 0.1;
  
  let advice = `根据您的财务状况（${riskMap[profile.riskPreference]}风险偏好，${habitMap[profile.investmentHabit]}习惯），AI助手为您提供以下建议：\n\n`;
  
  if (hasGoodSavings) {
    advice += '✅ 您的储蓄率健康，建议继续保持。';
  } else {
    advice += '⚠️ 建议优化支出结构，提高储蓄率。';
  }
  
  if (canInvest) {
    advice += `\n💡 考虑将每月结余的${profile.riskPreference === 'conservative' ? '30%' : '50%'}用于投资，根据您的风险偏好推荐${profile.riskPreference === 'aggressive' ? '股票基金' : profile.riskPreference === 'moderate' ? '混合基金' : '债券基金'}。`;
  }
  
  advice += `\n\n🏠 预计${result.houseAffordability}年后您具备购房能力。`;
  advice += `\n👴 预计${result.retirementAge}岁可以实现财务自由。`;
  
  return advice;
};

const generateRiskAnalysis = (profile: UserProfile, scenario: ScenarioType): string => {
  let analysis = `风险分析报告 - ${scenario === 'baseline' ? '基准场景' : 
    scenario === 'unemployment' ? '失业场景' : 
    scenario === 'raise' ? '加薪场景' :
    scenario === 'housing' ? '购房场景' : 'AI替代场景'}\n\n`;
  
  const risks: string[] = [];
  
  if (profile.riskPreference === 'aggressive' && profile.age < 30) {
    risks.push('📈 年轻+高风险偏好：您可以承担较高风险，建议长期持有。');
  } else if (profile.riskPreference === 'aggressive' && profile.age > 45) {
    risks.push('⚠️ 年龄较大+高风险偏好：建议适当降低风险敞口。');
  }
  
  if (profile.monthlyExpense * 12 > profile.income * 0.8) {
    risks.push('💸 高支出风险：月支出占收入比例过高，抗风险能力较弱。');
  }
  
  if (profile.investmentHabit === 'none') {
    risks.push('💰 零投资风险：资金未能实现增值，长期购买力会下降。');
  }
  
  if (scenario === 'unemployment') {
    risks.push('🚨 失业风险：建议准备至少6个月的应急储备金。');
  }
  
  if (scenario === 'ai_replace') {
    const aiRiskIndustries = ['technology', 'finance', 'retail'];
    if (aiRiskIndustries.includes(profile.industry.toLowerCase())) {
      risks.push('🤖 AI替代风险：您所在行业面临较高的AI替代风险，建议提升不可替代技能。');
    }
  }
  
  if (risks.length === 0) {
    analysis += '✅ 您的财务状况稳健，风险可控。';
  } else {
    analysis += risks.join('\n');
  }
  
  return analysis;
};

export const runSimulation = (
  profile: UserProfile,
  scenario: ScenarioType = 'baseline',
  scenarioParams: Record<string, number | string> = {}
): SimulationResult => {
  const currentYear = new Date().getFullYear();
  const results: { assets: number[]; income: number[]; cashFlow: number[] }[] = [];
  
  for (let i = 0; i < MONTE_CARLO_ITERATIONS; i++) {
    const assets: number[] = [];
    const income: number[] = [];
    const cashFlow: number[] = [];
    
    let currentAssets = (profile.income - profile.monthlyExpense * 12) * 2;
    let currentIncome = profile.income;
    
    for (let year = 0; year < SIMULATION_YEARS; year++) {
      const marketReturn = getMarketReturn(profile.riskPreference, year);
      const inflation = getInflationRate(year);
      const incomeGrowth = getIncomeGrowth(profile.industry, scenario, scenarioParams);
      
      let investmentReturn = 0;
      if (profile.investmentHabit !== 'none') {
        const investmentRatio = profile.investmentHabit === 'savings' ? 0.3 : 
                               profile.investmentHabit === 'stocks' ? 0.7 : 0.5;
        investmentReturn = currentAssets * investmentRatio * marketReturn;
      }
      
      currentIncome *= (1 + incomeGrowth);
      
      if (scenario === 'unemployment') {
        const unemploymentMonths = scenarioParams.unemploymentMonths as number || 6;
        if (year === 0) {
          currentIncome *= (12 - unemploymentMonths) / 12;
        }
      }
      
      const mortgageExpense = scenario === 'housing' ? ((scenarioParams.mortgage as number) || 5000) : 0;
      const monthlyExpense = profile.monthlyExpense + mortgageExpense;
      
      const expenses = monthlyExpense * 12 * Math.pow(1 + inflation, year);
      const annualCashFlow = currentIncome - expenses + investmentReturn;
      
      currentAssets += annualCashFlow;
      currentAssets = Math.max(0, currentAssets);
      
      assets.push(currentAssets);
      income.push(currentIncome);
      cashFlow.push(annualCashFlow);
    }
    
    results.push({ assets, income, cashFlow });
  }
  
  const avgAssets = results.reduce((acc, r) => r.assets.map((a, i) => acc[i] + a), new Array(SIMULATION_YEARS).fill(0))
    .map(a => a / MONTE_CARLO_ITERATIONS);
  
  const avgIncome = results.reduce((acc, r) => r.income.map((a, i) => acc[i] + a), new Array(SIMULATION_YEARS).fill(0))
    .map(a => a / MONTE_CARLO_ITERATIONS);
  
  const avgCashFlow = results.reduce((acc, r) => r.cashFlow.map((a, i) => acc[i] + a), new Array(SIMULATION_YEARS).fill(0))
    .map(a => a / MONTE_CARLO_ITERATIONS);
  
  const retirementAge = calculateRetirementAge(profile, avgAssets);
  const houseAffordability = calculateHouseAffordability(profile, avgAssets, profile.city);
  
  const result: SimulationResult = {
    id: `sim-${Date.now()}`,
    userId: profile.userId,
    profileId: profile.id,
    scenarioType: scenario,
    scenarioParams,
    year: currentYear,
    assets: avgAssets,
    income: avgIncome,
    cashFlow: avgCashFlow,
    investmentAdvice: generateInvestmentAdvice(profile, { retirementAge, houseAffordability }),
    riskAnalysis: generateRiskAnalysis(profile, scenario),
    retirementAge,
    houseAffordability,
    createdAt: new Date(),
  };
  
  return result;
};

const calculateRetirementAge = (profile: UserProfile, assets: number[]): number => {
  const targetRetirementFund = profile.monthlyExpense * 12 * 25;
  const currentYear = new Date().getFullYear();
  
  for (let i = 0; i < assets.length; i++) {
    if (assets[i] >= targetRetirementFund) {
      return profile.age + i;
    }
  }
  
  return profile.age + assets.length + 5;
};

const calculateHouseAffordability = (profile: UserProfile, assets: number[], city: string): number => {
  const cityPriceMultiplier: Record<string, number> = {
    '北京': 8,
    '上海': 7,
    '深圳': 7,
    '广州': 4,
    '杭州': 4,
    '成都': 2,
    '武汉': 2,
    '西安': 1.5,
  };
  
  const multiplier = cityPriceMultiplier[city] || 3;
  const targetHouseFund = profile.income * multiplier;
  const currentYear = new Date().getFullYear();
  
  for (let i = 0; i < assets.length; i++) {
    if (assets[i] >= targetHouseFund * 0.3) {
      return i + 1;
    }
  }
  
  return assets.length + 3;
};
