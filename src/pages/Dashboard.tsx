import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, RefreshCw, Sparkles, TrendingUp, Wallet, Home, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { useSimulationStore } from '@/store/simulationStore';
import { runSimulation } from '@/utils/simulationEngine';
import { FinancialChart } from '@/components/Charts';
import { StatCard, AdviceCard } from '@/components/StatCard';
import { UserProfile } from '@/types';

const defaultProfile: UserProfile = {
  id: 'default-profile',
  userId: 'demo-user',
  age: 28,
  income: 300000,
  monthlyExpense: 15000,
  riskPreference: 'moderate',
  city: 'Beijing',
  investmentHabit: 'mixed',
  industry: 'Technology',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, currentResult, results, setProfile, addResult, isSimulating, setIsSimulating } = useSimulationStore();

  useEffect(() => {
    if (!profile && !currentResult) {
      setProfile(defaultProfile);
      setIsSimulating(true);
      
      setTimeout(() => {
        const result = runSimulation(defaultProfile);
        addResult(result);
        setIsSimulating(false);
      }, 1500);
    }
  }, []);

  const handleReRun = () => {
    if (!profile) return;
    setIsSimulating(true);
    
    setTimeout(() => {
      const result = runSimulation(profile);
      addResult(result);
      setIsSimulating(false);
    }, 1500);
  };

  if (isSimulating) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float">
            <Bot className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">AI正在分析您的财务状况...</h2>
          <p className="text-white/60">蒙特卡洛模拟运行中，1000+次迭代</p>
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!currentResult) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">尚未生成模拟结果</p>
          <button className="btn-primary" onClick={() => navigate('/profile')}>
            创建您的FinTwin
          </button>
        </div>
      </div>
    );
  }

  const finalAssets = currentResult.assets[currentResult.assets.length - 1];
  const finalIncome = currentResult.income[currentResult.income.length - 1];
  const initialAssets = currentResult.assets[0];
  const initialIncome = currentResult.income[0];
  
  const assetChange = ((finalAssets - initialAssets) / initialAssets * 100).toFixed(1);
  const incomeChange = ((finalIncome - initialIncome) / initialIncome * 100).toFixed(1);

  const scenarioNames: Record<string, string> = {
    baseline: '基准场景',
    unemployment: '失业场景',
    raise: '加薪场景',
    housing: '购房场景',
    ai_replace: 'AI替代场景',
  };

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-serif mb-2">财务模拟仪表盘</h1>
            <p className="text-white/60">基于蒙特卡洛算法的AI财务预测结果</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleReRun}
              className="btn-secondary flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              重新模拟
            </button>
            <button 
              onClick={() => navigate('/scenarios')}
              className="btn-primary flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              What-if场景
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="glass-card px-4 py-2 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">当前场景</p>
              <p className="text-secondary-400 text-sm">{scenarioNames[currentResult.scenarioType]}</p>
            </div>
          </div>
          {currentResult.scenarioParams && Object.keys(currentResult.scenarioParams).length > 0 && (
            <div className="glass-card px-4 py-2">
              <p className="text-white/60 text-sm">
                参数: {Object.entries(currentResult.scenarioParams).map(([k, v]) => `${k}: ${v}`).join(', ')}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="预测总资产"
            value={`¥${(finalAssets / 10000).toFixed(1)}万`}
            icon="wallet"
            change={parseFloat(assetChange)}
          />
          <StatCard
            title="预测年收入"
            value={`¥${(finalIncome / 10000).toFixed(1)}万`}
            icon="trendingUp"
            change={parseFloat(incomeChange)}
          />
          <StatCard
            title="预计退休年龄"
            value={`${currentResult.retirementAge}岁`}
            icon="clock"
            subValue={`${currentResult.retirementAge - (profile?.age || 0)}年后`}
          />
          <StatCard
            title="购房能力"
            value={`${currentResult.houseAffordability}年`}
            icon="home"
            subValue="预计可支付首付"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <FinancialChart
            title="资产变化趋势"
            data={currentResult.assets}
            type="line"
            color="#00d4aa"
            gradientId="assetGradient"
          />
          <FinancialChart
            title="收入变化趋势"
            data={currentResult.income}
            type="bar"
            color="#ffd700"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <FinancialChart
            title="现金流变化"
            data={currentResult.cashFlow}
            type="area"
            color="#60a5fa"
            gradientId="cashFlowGradient"
          />
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold text-lg mb-4">财务健康度</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">储蓄率</span>
                  <span className="text-white">{(((profile?.income || 0) - (profile?.monthlyExpense || 0) * 12) / (profile?.income || 1) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(100, (((profile?.income || 0) - (profile?.monthlyExpense || 0) * 12) / (profile?.income || 1) * 100))}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">投资参与度</span>
                  <span className="text-white">{profile?.investmentHabit === 'none' ? '0%' : profile?.investmentHabit === 'savings' ? '30%' : profile?.investmentHabit === 'stocks' ? '70%' : '50%'}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent-500 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${profile?.investmentHabit === 'none' ? 0 : profile?.investmentHabit === 'savings' ? 30 : profile?.investmentHabit === 'stocks' ? 70 : 50}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">风险承受能力</span>
                  <span className="text-white">{profile?.riskPreference === 'conservative' ? '低' : profile?.riskPreference === 'moderate' ? '中' : '高'}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-red-500 rounded-full transition-all duration-1000"
                    style={{ width: `${profile?.riskPreference === 'conservative' ? 33 : profile?.riskPreference === 'moderate' ? 66 : 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <AdviceCard
            title="AI投资建议"
            content={currentResult.investmentAdvice}
            type="advice"
          />
          <AdviceCard
            title="风险分析报告"
            content={currentResult.riskAnalysis}
            type="risk"
          />
        </div>
      </div>
    </div>
  );
};
