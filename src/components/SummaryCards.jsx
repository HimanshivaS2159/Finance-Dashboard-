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
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Credit Card View for Total Balance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
        className="glass-panel p-6 relative overflow-hidden group col-span-1 border-white/10 bg-gradient-to-br from-[#0c122b]/80 to-[#140c2b]/90 shadow-neon-cyan hover:shadow-neon-cyan transition-shadow duration-300 rounded-3xl animate-glow-pulse"
      >
         <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 ease-in-out"></div>
         <div className="absolute top-4 right-6 text-white/50">
             <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity="0.5"/>
                <circle cx="28" cy="12" r="12" fill="currentColor" fillOpacity="0.5"/>
             </svg>
         </div>

         <div className="mb-8">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Available Balance</p>
            <h3 className="text-4xl font-black text-white tracking-tight">{formatCurrency(totalBalance)}</h3>
         </div>

         <div className="flex justify-between items-end mt-auto">
            <div>
               <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Card Holder</p>
               <p className="text-white font-medium text-sm tracking-widest">JOHN DOE</p>
            </div>
            <div>
               <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Expires</p>
               <p className="text-white font-medium text-sm tracking-widest">12/30</p>
            </div>
         </div>
      </motion.div>

      {/* Income and Expense Cards */}
      <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.slice(1).map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.4, delay: 0.2 + (index * 0.1), type: 'spring' }}
            className={`glass-panel p-6 border-t-2 ${card.border.replace('border-l-4', '')} relative overflow-hidden group flex flex-col justify-between hover:border-primary/50 hover:shadow-neon-violet`}
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500 ease-out"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-text-muted text-sm font-semibold mb-1 uppercase tracking-wider">{card.title}</p>
                <h3 className="text-3xl font-bold text-text">{formatCurrency(card.amount)}</h3>
              </div>
              <div className={`p-4 rounded-2xl ${card.bg}`}>{card.icon}</div>
            </div>
            
            <div className="flex items-center text-sm bg-surface/30 px-3 py-2 rounded-xl border border-white/5 self-start">
              <span className={`${card.trendColor} font-bold mr-2 text-xs`}>{card.trend}</span>
              <span className="text-text-muted/60 text-xs">from last month</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
