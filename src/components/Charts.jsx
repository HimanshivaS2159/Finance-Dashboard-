import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const Charts = () => {
  const { transactions } = useStore();

  // Prepare data for line chart (Balance over time)
  // Sort by date ascending
  const sortedTx = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  let currentBalance = 0;
  const areaData = sortedTx.map(tx => {
    currentBalance += tx.amount;
    return {
      date: new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance: currentBalance,
    };
  });

  // Prepare data for pie chart (Expense breakdown)
  const expenses = transactions.filter(t => t.type === 'Expense');
  const expenseByCategory = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Math.abs(curr.amount);
    return acc;
  }, {});
  
  const pieData = Object.keys(expenseByCategory).map(key => ({
    name: key,
    value: expenseByCategory[key],
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 border-white/10 !bg-surface/90">
          <p className="text-text-muted text-xs mb-1">{label}</p>
          <p className="font-bold text-primary">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Balance Area Chart */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-panel lg:col-span-2 p-6"
      >
        <h3 className="text-lg font-semibold text-text mb-6">Balance Overview</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Expense Breakdown Pie Chart */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-panel p-6 flex flex-col"
      >
        <h3 className="text-lg font-semibold text-text mb-2">Expense Breakdown</h3>
        <div className="flex-1 min-h-[300px] w-full relative flex items-center justify-center">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}/>
              </PieChart>
            </ResponsiveContainer>
          ) : (
             <div className="text-text-muted flex items-center justify-center w-full h-full">No expenses yet</div>
          )}
          {pieData.length > 0 && (
            <div className="absolute inset-0 flex items-center justify-center pb-8 pointer-events-none">
              <span className="text-2xl font-bold text-text-muted/50">#</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Charts;
