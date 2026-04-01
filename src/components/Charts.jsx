import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const COLORS = ['#00F5FF', '#7C3AED', '#F59E0B', '#22C55E', '#EF4444'];

const Charts = () => {
  const { transactions } = useStore();

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(value);

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
  const expenseByCategory = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Math.abs(curr.amount);
    return acc;
  }, {});
  
  const pieData = Object.keys(expenseByCategory).map(key => ({
    name: key,
    value: expenseByCategory[key],
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Balance Area Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-6 lg:col-span-2 group hover:shadow-neon-cyan transition-shadow duration-500"
      >
        <h3 className="text-lg font-bold text-text mb-6">Balance Overview</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00F5FF" stopOpacity={0}/>
                </linearGradient>
                <filter id="neonGlow" height="300%" width="300%" x="-75%" y="-75%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickFormatter={(val) => `₹${val/1000}k`} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgb(5 8 22 / 0.9)', borderColor: 'rgba(0, 245, 255, 0.3)', borderRadius: '12px', boxShadow: '0 0 15px rgba(0, 245, 255, 0.2)' }}
                itemStyle={{ color: '#00F5FF', fontWeight: 'bold' }}
                labelStyle={{ color: '#94a3b8' }}
                formatter={(value) => [formatCurrency(value), 'Balance']}
              />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="#00F5FF" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorBalance)" 
                filter="url(#neonGlow)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Expense Breakdown Pie Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass-panel p-6 group hover:shadow-neon-violet transition-shadow duration-500"
      >
        <h3 className="text-lg font-bold text-text mb-6">Expenses Breakdown</h3>
        <div className="h-[300px] w-full relative">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgb(5 8 22 / 0.9)', borderColor: 'rgba(124, 58, 237, 0.3)', borderRadius: '12px', boxShadow: '0 0 15px rgba(124, 58, 237, 0.2)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="rgba(0,0,0,0.2)"
                  strokeWidth={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      className="hover:opacity-80 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all outline-none"
                    />
                  ))}
                </Pie>
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
