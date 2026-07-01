export type RiskPreference = 'conservative' | 'moderate' | 'aggressive';
export type InvestmentHabit = 'none' | 'savings' | 'stocks' | 'mixed';
export type ScenarioType = 'baseline' | 'unemployment' | 'raise' | 'housing' | 'ai_replace';

export interface UserProfile {
  id: string;
  userId: string;
  age: number;
  income: number;
  monthlyExpense: number;
  riskPreference: RiskPreference;
  city: string;
  investmentHabit: InvestmentHabit;
  industry: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SimulationResult {
  id: string;
  userId: string;
  profileId: string;
  scenarioType: ScenarioType;
  scenarioParams?: Record<string, number | string>;
  year: number;
  assets: number[];
  income: number[];
  cashFlow: number[];
  investmentAdvice: string;
  riskAnalysis: string;
  retirementAge: number;
  houseAffordability: number;
  createdAt: Date;
}

export interface ScenarioConfig {
  type: ScenarioType;
  name: string;
  description: string;
  icon: string;
  params: {
    name: string;
    label: string;
    type: 'number' | 'slider' | 'toggle';
    defaultValue: number | boolean;
    min?: number;
    max?: number;
    step?: number;
  }[];
}

export interface ChartDataPoint {
  year: number;
  value: number;
  label?: string;
}

export interface SimulationState {
  profile: UserProfile | null;
  results: SimulationResult[];
  currentResult: SimulationResult | null;
  isSimulating: boolean;
  selectedScenario: ScenarioType;
  scenarioParams: Record<string, number | string>;
}
