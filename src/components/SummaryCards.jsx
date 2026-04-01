import React from 'react';
import useStore from '../store/useStore';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const SummaryCards = () => {
  const { transactions } = useStore();

  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  const totalBalance = totalIncome - totalExpenses;

  const cards = [
    {
      title: 'Total Balance',
      amount: totalBalance,
      icon: <Wallet size={24} className="text-blue-400" />,
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      trend: '+2.5% vs last month',
      trendColor: 'text-green-400'
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: <TrendingUp size={24} className="text-green-400" />,
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      trend: '+12% vs last month',
      trendColor: 'text-green-400'
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: <TrendingDown size={24} className="text-red-400" />,
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      trend: '-4% vs last month',
      trendColor: 'text-green-400'
    },
  ];

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`glass-panel p-6 border-l-4 ${card.border} relative overflow-hidden group`}
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-text-muted text-sm font-medium mb-1">{card.title}</p>
              <h3 className="text-3xl font-bold text-text">{formatCurrency(card.amount)}</h3>
            </div>
            <div className={`p-3 rounded-2xl ${card.bg}`}>{card.icon}</div>
          </div>
          
          <div className="flex items-center text-sm">
            <span className={`${card.trendColor} font-medium mr-2`}>{card.trend}</span>
            <span className="text-text-muted/60 text-xs text-nowrap">from last month</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryCards;
