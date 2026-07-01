import { useNavigate } from 'react-router-dom';
import { Wallet, Sparkles, TrendingUp, Shield, ArrowRight, Bot, BarChart3, Users } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI驱动模拟',
    description: '基于蒙特卡洛算法的智能财务预测',
  },
  {
    icon: TrendingUp,
    title: '资产可视化',
    description: '直观展示未来十年资产变化趋势',
  },
  {
    icon: Shield,
    title: '风险分析',
    description: '智能识别潜在财务风险并提供建议',
  },
  {
    icon: Bot,
    title: 'What-if场景',
    description: '模拟各种假设场景对财务的影响',
  },
];

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-secondary-500/10 border border-secondary-500/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-secondary-400" />
              <span className="text-secondary-400 text-sm font-medium">AI Financial Twin</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">
              <span className="bg-gradient-to-r from-secondary-400 via-accent-400 to-secondary-400 bg-clip-text text-transparent">
                FinTwin
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto">
              每个人拥有一个自己的AI Financial Twin，<br className="hidden md:block" />
              模拟未来几年的人生财富变化
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="btn-primary flex items-center justify-center gap-2">
                创建您的分身
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary flex items-center justify-center gap-2" onClick={() => navigate('/dashboard')}>
                体验演示
              </button>
            </div>
            
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="glass-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">AI Financial Twin</p>
                      <p className="text-white/50 text-sm">正在分析您的财务状况...</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-secondary-400">¥1.2M</p>
                    <p className="text-white/50 text-xs mt-1">预测资产</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-accent-400">¥35K</p>
                    <p className="text-white/50 text-xs mt-1">月收入</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-green-400">55岁</p>
                    <p className="text-white/50 text-xs mt-1">退休年龄</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-blue-400">3年</p>
                    <p className="text-white/50 text-xs mt-1">购房能力</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
              核心功能
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              FinTwin 不仅仅是记账软件，而是您的AI财务顾问
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-6 hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-secondary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-secondary-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4 bg-primary-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">
                模拟各种人生场景
              </h2>
              <p className="text-white/60 mb-8">
                无论是失业、加薪、购房还是AI替代职业，FinTwin都能帮您模拟这些场景对财务的影响，让您提前做好准备。
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                    <span className="text-red-400 font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">如果明年失业？</p>
                    <p className="text-white/50 text-sm">模拟失业期间的财务状况</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <span className="text-green-400 font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">如果工资上涨20%？</p>
                    <p className="text-white/50 text-sm">模拟收入增长带来的变化</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent-500/10 rounded-xl flex items-center justify-center">
                    <span className="text-accent-400 font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">如果AI替代您的职业？</p>
                    <p className="text-white/50 text-sm">评估职业风险和应对策略</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card p-8">
                <BarChart3 className="w-full h-64 text-secondary-400 opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                      <Bot className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-white font-semibold">AI驱动的蒙特卡洛模拟</p>
                    <p className="text-white/50 text-sm">1000+次迭代预测</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
              开始您的财务规划之旅
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              创建您的AI Financial Twin，开启智能财务规划
            </p>
          </div>
          
          <div className="text-center">
            <button className="btn-primary text-lg px-10 py-4" onClick={() => navigate('/profile')}>
              创建我的FinTwin
            </button>
          </div>
        </div>
      </section>
      
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FinTwin</span>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">About</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Features</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Terms</a>
            </div>
            
            <div className="flex items-center gap-4">
              <Users className="w-5 h-5 text-white/40" />
              <span className="text-white/40 text-sm">10,000+ 用户信赖</span>
            </div>
          </div>
          
          <div className="mt-8 text-center text-white/40 text-sm">
            © 2026 FinTwin. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
