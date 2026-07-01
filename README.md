[README.md](https://github.com/user-attachments/files/29538982/README.md)
# FinTwin - AI数字金融分身

每个人拥有一个自己的AI Financial Twin，它可以模拟未来几年的人生财富变化。

![FinTwin](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=FinTwin%20AI%20Financial%20Twin%20dashboard%20with%20dark%20theme%2C%20glass%20morphism%2C%20charts%20and%20financial%20visualizations&image_size=landscape_16_9)

## 🌟 核心功能

### 输入信息
- **年龄** - 您的当前年龄
- **收入** - 年收入
- **消费** - 月支出
- **风险偏好** - 保守型 / 稳健型 / 进取型
- **城市** - 所在城市
- **投资习惯** - 不投资 / 储蓄为主 / 股票投资 / 混合投资
- **工作行业** - 职业领域

### AI自动生成
- **资产变化** - 未来十年资产趋势预测
- **收入变化** - 收入增长预测
- **现金流** - 年度现金流分析
- **投资建议** - AI生成的个性化投资建议
- **风险分析** - 全面的风险评估报告
- **退休预测** - 财务自由年龄预测
- **买房能力预测** - 购房首付能力评估

### What-if场景模拟
- **如果明年失业？** - 模拟失业期间的财务状况
- **如果工资上涨20%？** - 模拟收入增长带来的变化
- **如果房价上涨？** - 模拟购房对财务的影响
- **如果AI替代您的职业？** - 评估职业风险和应对策略

## 🚀 创新点

- **AI模拟人生金融** - 不是预测股票，而是模拟您的整个人生财务轨迹
- **蒙特卡洛算法** - 基于1000+次迭代的概率性预测
- **交互式场景模拟** - 支持多种假设场景的实时模拟
- **可视化展示** - 让复杂财务数据更直观易懂

## 🛠️ 技术栈

- **前端**: React 18 + TypeScript + Vite
- **状态管理**: Zustand
- **图表库**: Recharts
- **样式**: TailwindCSS 3
- **图标**: Lucide React
- **算法**: Monte Carlo Simulation

## 📦 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 🏗️ 项目结构

```
src/
├── components/          # UI组件
│   ├── Charts.tsx      # 图表组件
│   ├── Navbar.tsx      # 导航栏
│   └── StatCard.tsx    # 统计卡片
├── data/               # 数据配置
│   └── scenarios.ts    # 场景配置
├── pages/              # 页面
│   ├── Dashboard.tsx   # 仪表盘
│   ├── Home.tsx        # 主页
│   ├── Profile.tsx     # 个人信息设置
│   └── Scenarios.tsx   # 场景模拟
├── store/              # 状态管理
│   └── simulationStore.ts
├── types/              # TypeScript类型定义
│   └── index.ts
├── utils/              # 工具函数
│   └── simulationEngine.ts  # 模拟引擎
└── App.tsx             # 应用入口
```

## 📊 模拟算法

FinTwin采用蒙特卡洛模拟算法，通过以下步骤生成预测：

1. 根据风险偏好生成随机市场收益率
2. 根据行业和场景计算年度收入增长/下降
3. 基于通货膨胀率预测支出变化
4. 计算资产积累和复利收益
5. 运行1000+次迭代生成概率分布
6. 计算置信区间和百分位数

## 🎯 GitHub关键词

#DigitalTwin #LLM #FinancialPlanning #Simulation #MonteCarlo #Visualization

## 📝 License

MIT License
