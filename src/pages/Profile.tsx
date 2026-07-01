import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Wallet, MapPin, Briefcase, Target, TrendingUp, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useSimulationStore } from '@/store/simulationStore';
import { runSimulation } from '@/utils/simulationEngine';
import { riskPreferences, investmentHabits, industries, cities } from '@/data/scenarios';
import { UserProfile, RiskPreference, InvestmentHabit } from '@/types';

type Step = 1 | 2 | 3 | 4;

export const Profile = () => {
  const navigate = useNavigate();
  const { setProfile, addResult, setIsSimulating } = useSimulationStore();
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    monthlyExpense: '',
    riskPreference: 'moderate' as RiskPreference,
    city: 'Beijing',
    investmentHabit: 'mixed' as InvestmentHabit,
    industry: 'Technology',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const profile: UserProfile = {
      id: `profile-${Date.now()}`,
      userId: 'demo-user',
      age: parseInt(formData.age),
      income: parseInt(formData.income),
      monthlyExpense: parseInt(formData.monthlyExpense),
      riskPreference: formData.riskPreference,
      city: formData.city,
      investmentHabit: formData.investmentHabit,
      industry: formData.industry,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProfile(profile);
    setIsSimulating(true);

    setTimeout(() => {
      const result = runSimulation(profile);
      addResult(result);
      setIsSimulating(false);
      navigate('/dashboard');
    }, 2000);
  };

  const steps = [
    { number: 1, title: '基本信息', icon: User },
    { number: 2, title: '财务状况', icon: Wallet },
    { number: 3, title: '投资偏好', icon: Target },
    { number: 4, title: '生活环境', icon: MapPin },
  ];

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <button 
            onClick={() => navigate('/')}
            className="text-white/60 hover:text-white mb-4 flex items-center gap-2 mx-auto"
          >
            <ChevronLeft className="w-5 h-5" />
            返回首页
          </button>
          <h1 className="text-3xl font-bold text-white font-serif mb-2">创建您的FinTwin</h1>
          <p className="text-white/60">填写以下信息，让AI为您生成专属财务分身</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= s.number 
                    ? 'bg-gradient-to-br from-secondary-500 to-accent-500 text-white' 
                    : 'bg-white/10 text-white/40'
                }`}>
                  {step > s.number ? <Check className="w-6 h-6" /> : <s.icon className="w-6 h-6" />}
                </div>
                <p className={`text-sm ml-2 ${step >= s.number ? 'text-white' : 'text-white/40'}`}>
                  {s.title}
                </p>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 rounded-full ${step > s.number ? 'bg-secondary-500' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">基本信息</h2>
              
              <div>
                <label className="block text-white/60 text-sm mb-2">年龄</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="请输入您的年龄"
                  className="input-field"
                  min="18"
                  max="80"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">工作行业</label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="select-field"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry} className="bg-primary-800">
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 btn-secondary"
                >
                  上一步
                </button>
                <button 
                  onClick={() => setStep(2)}
                  className="flex-1 btn-primary"
                >
                  下一步
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">财务状况</h2>
              
              <div>
                <label className="block text-white/60 text-sm mb-2">年收入 (元)</label>
                <input
                  type="number"
                  value={formData.income}
                  onChange={(e) => handleInputChange('income', e.target.value)}
                  placeholder="请输入您的年收入"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">月支出 (元)</label>
                <input
                  type="number"
                  value={formData.monthlyExpense}
                  onChange={(e) => handleInputChange('monthlyExpense', e.target.value)}
                  placeholder="请输入您的月支出"
                  className="input-field"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 btn-secondary"
                >
                  上一步
                </button>
                <button 
                  onClick={() => setStep(3)}
                  className="flex-1 btn-primary"
                >
                  下一步
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">投资偏好</h2>
              
              <div>
                <label className="block text-white/60 text-sm mb-3">风险偏好</label>
                <div className="grid grid-cols-3 gap-3">
                  {riskPreferences.map(rp => (
                    <button
                      key={rp.value}
                      onClick={() => handleInputChange('riskPreference', rp.value)}
                      className={`p-4 rounded-xl text-center transition-all duration-300 ${
                        formData.riskPreference === rp.value
                          ? 'bg-secondary-500/20 border border-secondary-500/50 text-secondary-400'
                          : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      <p className="font-semibold">{rp.label}</p>
                      <p className="text-xs mt-1 opacity-70">{rp.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-3">投资习惯</label>
                <div className="grid grid-cols-2 gap-3">
                  {investmentHabits.map(ih => (
                    <button
                      key={ih.value}
                      onClick={() => handleInputChange('investmentHabit', ih.value)}
                      className={`p-4 rounded-xl text-center transition-all duration-300 ${
                        formData.investmentHabit === ih.value
                          ? 'bg-accent-500/20 border border-accent-500/50 text-accent-400'
                          : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      <p className="font-semibold">{ih.label}</p>
                      <p className="text-xs mt-1 opacity-70">{ih.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setStep(2)}
                  className="flex-1 btn-secondary"
                >
                  上一步
                </button>
                <button 
                  onClick={() => setStep(4)}
                  className="flex-1 btn-primary"
                >
                  下一步
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">生活环境</h2>
              
              <div>
                <label className="block text-white/60 text-sm mb-2">所在城市</label>
                <select
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="select-field"
                >
                  {cities.map(city => (
                    <option key={city} value={city} className="bg-primary-800">
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-white/5 rounded-xl p-4 mt-6">
                <h3 className="text-white font-semibold mb-3">您的信息摘要</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">年龄</span>
                    <span className="text-white">{formData.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">行业</span>
                    <span className="text-white">{formData.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">年收入</span>
                    <span className="text-white">¥{formData.income}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">月支出</span>
                    <span className="text-white">¥{formData.monthlyExpense}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">风险偏好</span>
                    <span className="text-white">{riskPreferences.find(r => r.value === formData.riskPreference)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">投资习惯</span>
                    <span className="text-white">{investmentHabits.find(h => h.value === formData.investmentHabit)?.label}</span>
                  </div>
                  <div className="flex justify-between col-span-2">
                    <span className="text-white/60">城市</span>
                    <span className="text-white">{formData.city}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setStep(3)}
                  className="flex-1 btn-secondary"
                >
                  上一步
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-5 h-5" />
                  生成我的FinTwin
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
