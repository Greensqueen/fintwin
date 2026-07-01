import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Briefcase, Wallet, Home, Bot, Play, ChevronLeft, RefreshCw, Sparkles } from 'lucide-react';
import { useSimulationStore } from '@/store/simulationStore';
import { runSimulation } from '@/utils/simulationEngine';
import { scenarios } from '@/data/scenarios';
import { ComparisonChart } from '@/components/Charts';
import { StatCard } from '@/components/StatCard';
import { ScenarioType } from '@/types';

const iconMap: Record<string, typeof TrendingUp> = {
  TrendingUp,
  Briefcase,
  Wallet,
  Home,
  Bot,
};

export const Scenarios = () => {
  const navigate = useNavigate();
  const { profile, results, currentResult, addResult, isSimulating, setIsSimulating } = useSimulationStore();
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>('unemployment');
  const [scenarioParams, setScenarioParams] = useState<Record<string, number | string | boolean>>({});
  const [scenarioResult, setScenarioResult] = useState<typeof currentResult>(null);
  const [showComparison, setShowComparison] = useState(false);

  const currentScenario = scenarios.find(s => s.type === selectedScenario);

  const handleParamChange = (name: string, value: number | boolean) => {
    setScenarioParams(prev => ({ ...prev, [name]: value }));
  };

  const handleRunScenario = () => {
    if (!profile) return;
    setIsSimulating(true);
    
    setTimeout(() => {
      const params = currentScenario?.params.reduce((acc, param) => {
        const val = scenarioParams[param.name] ?? param.defaultValue;
        acc[param.name] = typeof val === 'boolean' ? Number(val) : val;
        return acc;
      }, {} as Record<string, number | string>) || {};
      
      const result = runSimulation(profile, selectedScenario, params);
      setScenarioResult(result);
      setShowComparison(true);
      setIsSimulating(false);
    }, 1500);
  };

  const handleApplyToDashboard = () => {
    if (scenarioResult) {
      addResult(scenarioResult);
      navigate('/dashboard');
    }
  };

  const baselineResult = results.find(r => r.scenarioType === 'baseline') || currentResult;

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-white/60 hover:text-white flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            返回仪表盘
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white font-serif mb-2">What-if场景模拟</h1>
          <p className="text-white/60">模拟各种假设场景对您财务状况的影响</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <h2 className="text-white font-semibold text-lg mb-4">选择场景</h2>
            <div className="space-y-3">
              {scenarios.filter(s => s.type !== 'baseline').map(scenario => {
                const IconComponent = iconMap[scenario.icon];
                return (
                  <button
                    key={scenario.type}
                    onClick={() => {
                      setSelectedScenario(scenario.type as ScenarioType);
                      setScenarioParams({});
                      setShowComparison(false);
                      setScenarioResult(null);
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-4 ${
                      selectedScenario === scenario.type
                        ? 'bg-secondary-500/20 border border-secondary-500/50'
                        : 'glass-card hover:bg-white/15'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedScenario === scenario.type
                        ? 'bg-secondary-500/30'
                        : 'bg-white/10'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        selectedScenario === scenario.type ? 'text-secondary-400' : 'text-white/60'
                      }`} />
                    </div>
                    <div>
                      <p className={`font-semibold ${
                        selectedScenario === scenario.type ? 'text-secondary-400' : 'text-white'
                      }`}>
                        {scenario.name}
                      </p>
                      <p className="text-white/50 text-sm">{scenario.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            {currentScenario && (
              <div className="glass-card p-6">
                <div className="flex items-center gap-4 mb-6">
                  {(() => {
                    const IconComponent = iconMap[currentScenario.icon];
                    return (
                      <div className="w-14 h-14 bg-gradient-to-br from-secondary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-7 h-7 text-secondary-400" />
                      </div>
                    );
                  })()}
                  <div>
                    <h2 className="text-xl font-semibold text-white">{currentScenario.name}</h2>
                    <p className="text-white/60">{currentScenario.description}</p>
                  </div>
                </div>

                {currentScenario.params.length > 0 && (
                  <div className="space-y-6 mb-8">
                    {currentScenario.params.map(param => (
                      <div key={param.name}>
                        <label className="block text-white/60 text-sm mb-3">
                          {param.label}
                          <span className="text-secondary-400 ml-2">
                            {typeof scenarioParams[param.name] !== 'undefined' 
                              ? scenarioParams[param.name] 
                              : param.defaultValue}
                          </span>
                        </label>
                        {param.type === 'slider' && (
                          <input
                            type="range"
                            min={param.min}
                            max={param.max}
                            step={param.step || 1}
                            value={(typeof scenarioParams[param.name] !== 'undefined' ? scenarioParams[param.name] : param.defaultValue) as number}
                            onChange={(e) => handleParamChange(param.name, parseInt(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #00d4aa 0%, #00d4aa ${(((typeof scenarioParams[param.name] !== 'undefined' ? scenarioParams[param.name] : param.defaultValue) as number) - param.min!) / (param.max! - param.min!) * 100}%, rgba(255,255,255,0.1) ${(((typeof scenarioParams[param.name] !== 'undefined' ? scenarioParams[param.name] : param.defaultValue) as number) - param.min!) / (param.max! - param.min!) * 100}%, rgba(255,255,255,0.1) 100%)`
                            }}
                          />
                        )}
                        {param.type === 'number' && (
                          <input
                            type="number"
                            min={param.min}
                            max={param.max}
                            value={(typeof scenarioParams[param.name] !== 'undefined' ? scenarioParams[param.name] : param.defaultValue) as number}
                            onChange={(e) => handleParamChange(param.name, parseInt(e.target.value))}
                            className="input-field"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleRunScenario}
                  disabled={isSimulating}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      模拟中...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      运行场景模拟
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {showComparison && scenarioResult && baselineResult && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white font-serif">场景对比分析</h2>
              <button
                onClick={handleApplyToDashboard}
                className="btn-primary flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                应用到仪表盘
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="基准总资产"
                value={`¥${(baselineResult.assets[baselineResult.assets.length - 1] / 10000).toFixed(1)}万`}
                icon="wallet"
              />
              <StatCard
                title="场景总资产"
                value={`¥${(scenarioResult.assets[scenarioResult.assets.length - 1] / 10000).toFixed(1)}万`}
                icon="wallet"
                change={((scenarioResult.assets[scenarioResult.assets.length - 1] - baselineResult.assets[baselineResult.assets.length - 1]) / baselineResult.assets[baselineResult.assets.length - 1] * 100).toFixed(1) as unknown as number}
              />
              <StatCard
                title="基准退休年龄"
                value={`${baselineResult.retirementAge}岁`}
                icon="clock"
              />
              <StatCard
                title="场景退休年龄"
                value={`${scenarioResult.retirementAge}岁`}
                icon="clock"
                change={((scenarioResult.retirementAge - baselineResult.retirementAge) / baselineResult.retirementAge * 100).toFixed(1) as unknown as number}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <ComparisonChart
                title="资产变化对比"
                baselineData={baselineResult.assets}
                scenarioData={scenarioResult.assets}
                baselineLabel="基准"
                scenarioLabel={currentScenario?.name}
              />
              <ComparisonChart
                title="收入变化对比"
                baselineData={baselineResult.income}
                scenarioData={scenarioResult.income}
                baselineLabel="基准"
                scenarioLabel={currentScenario?.name}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <ComparisonChart
                title="现金流对比"
                baselineData={baselineResult.cashFlow}
                scenarioData={scenarioResult.cashFlow}
                baselineLabel="基准"
                scenarioLabel={currentScenario?.name}
              />
              <div className="glass-card p-6">
                <h3 className="text-white font-semibold text-lg mb-4">场景影响总结</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      scenarioResult.assets[scenarioResult.assets.length - 1] >= baselineResult.assets[baselineResult.assets.length - 1]
                        ? 'bg-green-500/10'
                        : 'bg-red-500/10'
                    }`}>
                      <span className={`text-xl ${
                        scenarioResult.assets[scenarioResult.assets.length - 1] >= baselineResult.assets[baselineResult.assets.length - 1]
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}>
                        {scenarioResult.assets[scenarioResult.assets.length - 1] >= baselineResult.assets[baselineResult.assets.length - 1] ? '↑' : '↓'}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">总资产变化</p>
                      <p className={`text-sm ${
                        scenarioResult.assets[scenarioResult.assets.length - 1] >= baselineResult.assets[baselineResult.assets.length - 1]
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}>
                        {((scenarioResult.assets[scenarioResult.assets.length - 1] - baselineResult.assets[baselineResult.assets.length - 1]) / 10000).toFixed(1)}万
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      scenarioResult.retirementAge <= baselineResult.retirementAge
                        ? 'bg-green-500/10'
                        : 'bg-red-500/10'
                    }`}>
                      <span className={`text-xl ${
                        scenarioResult.retirementAge <= baselineResult.retirementAge
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}>
                        {scenarioResult.retirementAge <= baselineResult.retirementAge ? '↑' : '↓'}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">退休年龄变化</p>
                      <p className={`text-sm ${
                        scenarioResult.retirementAge <= baselineResult.retirementAge
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}>
                        {scenarioResult.retirementAge - baselineResult.retirementAge > 0 ? '+' : ''}
                        {scenarioResult.retirementAge - baselineResult.retirementAge}岁
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      scenarioResult.houseAffordability <= baselineResult.houseAffordability
                        ? 'bg-green-500/10'
                        : 'bg-red-500/10'
                    }`}>
                      <span className={`text-xl ${
                        scenarioResult.houseAffordability <= baselineResult.houseAffordability
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}>
                        {scenarioResult.houseAffordability <= baselineResult.houseAffordability ? '↑' : '↓'}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">购房能力变化</p>
                      <p className={`text-sm ${
                        scenarioResult.houseAffordability <= baselineResult.houseAffordability
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}>
                        {scenarioResult.houseAffordability - baselineResult.houseAffordability > 0 ? '+' : ''}
                        {scenarioResult.houseAffordability - baselineResult.houseAffordability}年
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
