import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const COLORS = ['#00F5FF', '#7C3AED', '#F59E0B', '#22C55E', '#EF4444', '#8B5CF6', '#EC4899'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="premium-card p-4 border border-white/10 shadow-neon-cyan">
        <p className="text-text-muted text-sm mb-1">{label}</p>
        <p className="text-primary font-bold text-lg">
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const PieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="premium-card p-4 border border-white/10 shadow-neon-violet">
        <p className="text-secondary font-bold text-lg">{payload[0].name}</p>
        <p className="text-text font-semibold">
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(payload[0].value)}
        </p>
        <p className="text-text-muted text-sm">
          {((payload[0].payload.percent || 0) * 100).toFixed(1)}% of expenses
        </p>
      </div>
    );
  }
  return null;
};

const Charts = () => {
  const { transactions } = useStore();
  const [activePieIndex, setActivePieIndex] = useState(null);

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  const sortedTx = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  let currentBalance = 0;
  const chartData = sortedTx.map(tx => {
    currentBalance += tx.amount;
    return {
      date: new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance: currentBalance,
    };
  });

  const expenses = transactions.filter(t => t.type === 'Expense');
  const totalExpenses = expenses.reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
  
  const expenseByCategory = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Math.abs(curr.amount);
    return acc;
  }, {});
  
  const pieData = Object.keys(expenseByCategory).map(key => ({
    name: key,
    value: expenseByCategory[key],
    percent: expenseByCategory[key] / totalExpenses,
  }));

  const onPieEnter = (_, index) => {
    setActivePieIndex(index);
  };

  const onPieLeave = () => {
    setActivePieIndex(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Balance Area Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="premium-card p-6 lg:col-span-2 group"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-text glow-text">Balance Overview</h3>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span className="w-3 h-3 rounded-full bg-primary shadow-neon-cyan"></span>
            Real-time balance
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00F5FF" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00F5FF"/>
                  <stop offset="100%" stopColor="#7C3AED"/>
                </linearGradient>
                <filter id="neonGlow" height="300%" width="300%" x="-75%" y="-75%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.3)" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                dy={10} 
              />
              <YAxis 
                stroke="rgba(255,255,255,0.3)" 
                fontSize={11} 
                tickFormatter={(val) => `₹${(val/1000).toFixed(0)}k`} 
                tickLine={false} 
                axisLine={false} 
                dx={-10} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="url(#strokeGradient)" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorBalance)" 
                filter="url(#neonGlow)"
                animationDuration={1500}
                animationBegin={300}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Expense Breakdown Donut Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="premium-card p-6"
      >
        <h3 className="text-xl font-bold text-text glow-text mb-6">Expense Breakdown</h3>
        <div className="h-[280px] w-full relative">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<PieTooltip />} />
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  animationBegin={400}
                  animationDuration={1000}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      stroke="rgba(0,0,0,0.3)"
                      strokeWidth={2}
                      style={{
                        filter: activePieIndex === index ? 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' : 'none',
                        transform: activePieIndex === index ? 'scale(1.05)' : 'scale(1)',
                        transformOrigin: 'center',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
             <div className="text-text-muted flex items-center justify-center w-full h-full">No expenses yet</div>
          )}
          
          {/* Center Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-text-muted text-xs uppercase tracking-wider">Total</p>
            <p className="text-2xl font-bold text-text glow-text">
              {formatCurrency(totalExpenses)}
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {pieData.slice(0, 4).map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-text-muted truncate">{entry.name}</span>
              <span className="text-text font-medium ml-auto">
                {((entry.percent || 0) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Charts;
