import React from 'react';
import useStore from '../store/useStore';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SummaryCards = () => {
  const { transactions } = useStore();

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Calculate totals for current month
  const currentMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const totalIncome = currentMonthTransactions
    .filter((t) => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = currentMonthTransactions
    .filter((t) => t.type === 'Expense')
    .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  const totalBalance = transactions
    .filter((t) => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0) - 
    transactions.filter((t) => t.type === 'Expense')
    .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  // Calculate trends (mock comparison)
  const incomeTrend = 12;
  const expenseTrend = -4;
  const balanceTrend = 2.5;

  const cards = [
    {
      id: 'income',
      title: 'Monthly Income',
      amount: totalIncome,
      icon: <TrendingUp size={24} className="text-emerald-400" />,
      iconBg: 'bg-emerald-500/20',
      trend: `${incomeTrend > 0 ? '+' : ''}${incomeTrend}%`,
      trendColor: 'text-emerald-400',
      glowColor: 'shadow-neon-green',
      borderColor: 'border-emerald-500/30',
      gradient: 'from-emerald-500/10 to-transparent'
    },
    {
      id: 'expense',
      title: 'Monthly Expenses',
      amount: totalExpenses,
      icon: <TrendingDown size={24} className="text-red-400" />,
      iconBg: 'bg-red-500/20',
      trend: `${expenseTrend > 0 ? '+' : ''}${expenseTrend}%`,
      trendColor: expenseTrend > 0 ? 'text-red-400' : 'text-emerald-400',
      glowColor: 'shadow-neon-red',
      borderColor: 'border-red-500/30',
      gradient: 'from-red-500/10 to-transparent'
    },
  ];

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Premium Credit Card Style Balance Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
        whileHover={{ scale: 1.02 }}
        className="premium-card p-6 relative overflow-hidden group col-span-1 border-white/10 bg-gradient-to-br from-[#0c122b]/80 to-[#140c2b]/90 animate-glow-pulse"
      >
        {/* Decorative Elements */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute -left-10 -top-10 w-32 h-32 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-2xl"></div>
        
        {/* Card Network Logo */}
        <div className="absolute top-4 right-6 text-white/30 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20"></div>
          <div className="w-8 h-8 rounded-full bg-white/20 -ml-4"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Wallet size={18} className="text-primary" />
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">Total Balance</p>
          </div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-black text-white tracking-tight glow-text mb-2"
          >
            {formatCurrency(totalBalance)}
          </motion.h3>
          
          <div className="flex items-center gap-2 mb-8">
            <span className={`text-xs font-medium ${balanceTrend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {balanceTrend >= 0 ? '+' : ''}{balanceTrend}%
            </span>
            <span className="text-white/40 text-xs">vs last month</span>
          </div>

          {/* Card Details */}
          <div className="flex justify-between items-end mt-auto">
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Card Holder</p>
              <p className="text-white font-medium text-sm tracking-widest">HIMANSHI SHARMA</p>
            </div>
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Expires</p>
              <p className="text-white font-medium text-sm tracking-widest">12/28</p>
            </div>
          </div>
        </div>

        {/* Holographic Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </motion.div>

      {/* Income and Expense Cards */}
      <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.5, delay: 0.2 + (index * 0.1), type: 'spring' }}
            className={`premium-card p-6 relative overflow-hidden group ${card.borderColor} border-t-2`}
          >
            {/* Background Gradient */}
            <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            {/* Floating Icon */}
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
              {card.id === 'income' ? (
                <ArrowUpRight size={60} className="text-emerald-400" />
              ) : (
                <ArrowDownRight size={60} className="text-red-400" />
              )}
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-text-muted text-sm font-semibold mb-1 uppercase tracking-wider">{card.title}</p>
                  <h3 className="text-3xl font-bold text-text">{formatCurrency(card.amount)}</h3>
                </div>
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className={`p-3 rounded-2xl ${card.iconBg} shadow-lg`}
                >
                  {card.icon}
                </motion.div>
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center gap-2 text-sm bg-surface/50 px-3 py-2 rounded-xl border border-white/5 w-fit">
                  <span className={`${card.trendColor} font-bold text-xs flex items-center gap-1`}>
                    {card.id === 'expense' && card.trend.includes('-') ? (
                      <ArrowDownRight size={12} />
                    ) : card.id === 'expense' ? (
                      <ArrowUpRight size={12} />
                    ) : card.trend.includes('+') ? (
                      <ArrowUpRight size={12} />
                    ) : (
                      <ArrowDownRight size={12} />
                    )}
                    {card.trend}
                  </span>
                  <span className="text-text-muted/60 text-xs">vs last month</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
