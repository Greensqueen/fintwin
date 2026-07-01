import { create } from 'zustand';
import { UserProfile, SimulationResult, ScenarioType, SimulationState } from '@/types';

const initialState: SimulationState = {
  profile: null,
  results: [],
  currentResult: null,
  isSimulating: false,
  selectedScenario: 'baseline',
  scenarioParams: {},
};

export const useSimulationStore = create<SimulationState & {
  setProfile: (profile: UserProfile) => void;
  addResult: (result: SimulationResult) => void;
  setCurrentResult: (result: SimulationResult | null) => void;
  setIsSimulating: (isSimulating: boolean) => void;
  setSelectedScenario: (scenario: ScenarioType) => void;
  setScenarioParams: (params: Record<string, number | string>) => void;
  reset: () => void;
}>((set) => ({
  ...initialState,
  setProfile: (profile) => set({ profile }),
  addResult: (result) => set((state) => ({ 
    results: [...state.results, result],
    currentResult: result,
  })),
  setCurrentResult: (result) => set({ currentResult: result }),
  setIsSimulating: (isSimulating) => set({ isSimulating }),
  setSelectedScenario: (scenario) => set({ selectedScenario: scenario }),
  setScenarioParams: (params) => set({ scenarioParams: params }),
  reset: () => set(initialState),
}));
