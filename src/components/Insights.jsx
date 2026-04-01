import React from 'react';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';
import { Zap, Target, History, Download } from 'lucide-react';

const Insights = () => {
  const { transactions } = useStore();

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  const getInsights = () => {
    if (transactions.length === 0) return { highestCat: 'N/A', totalSpent: 0 };
    
    // Highest category spending
    const expenses = transactions.filter(t => t.type === 'Expense');
    const expensesByCat = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Math.abs(curr.amount);
      return acc;
    }, {});
    
    let highestCat = 'N/A';
    let maxSpend = 0;
    Object.keys(expensesByCat).forEach(cat => {
      if (expensesByCat[cat] > maxSpend) {
        maxSpend = expensesByCat[cat];
        highestCat = cat;
      }
    });

    return { highestCat, totalSpent: maxSpend };
  };

  const exportTransactions = () => {
    const csvContent = [
      ['Date', 'Description', 'Category', 'Type', 'Amount'],
      ...transactions.map(tx => [
        tx.date,
        tx.description,
        tx.category,
        tx.type,
        tx.amount.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    if (window.showToast) {
      window.showToast('Transactions exported successfully!', 'success');
    }
  };

  const { highestCat, totalSpent } = getInsights();

  return (
    <div className="flex flex-col gap-6">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-6 border-l-4 border-red-500/50 hover:shadow-neon-violet transition-shadow duration-300 relative overflow-hidden"
      >
         <div className="absolute -right-4 -bottom-4 opacity-5 text-accent pointer-events-none">
             <Zap size={140} />
         </div>
         <h4 className="flex items-center text-sm font-semibold text-accent mb-4">
           <Zap size={18} className="mr-2" /> Daily Insights
         </h4>
         <p className="text-text-muted text-sm leading-relaxed mb-4 relative z-10">
           Your highest spending category this month is <strong className="text-text font-bold">{highestCat}</strong>, totaling <strong className="text-primary font-bold">{formatCurrency(totalSpent)}</strong>. Consider setting a budget constraint to improve your savings rate.
         </p>
         <button className="text-xs font-bold text-accent hover:text-green-300 transition-colors uppercase tracking-wider relative z-10">
           Review Budget &rarr;
         </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-panel p-6 border-l-4 border-primary/50 hover:shadow-neon-cyan transition-shadow duration-300 relative overflow-hidden"
      >
         <div className="absolute -right-4 -bottom-4 opacity-5 text-secondary pointer-events-none">
             <Target size={140} />
         </div>
         <h4 className="flex items-center text-sm font-semibold text-secondary mb-4">
           <Target size={18} className="mr-2" /> Savings Goals
         </h4>
         
         <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1 relative z-10">
                <span className="text-text-muted">Emergency Fund</span>
                <span className="text-text">65%</span>
              </div>
              <div className="w-full bg-surface rounded-full h-3 mb-2 shadow-inner border border-white/5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="h-3 rounded-full bg-gradient-to-r from-primary to-secondary shadow-neon-cyan relative"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 animate-pulse rounded-full"></div>
                </motion.div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1 relative z-10">
                <span className="text-text-muted">New Car</span>
                <span className="text-text">30%</span>
              </div>
              <div className="w-full bg-surface rounded-full h-3 mb-2 shadow-inner border border-white/5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '30%' }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.7 }}
                  className="h-3 rounded-full bg-gradient-to-r from-primary to-secondary shadow-neon-cyan relative"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 animate-pulse rounded-full"></div>
                </motion.div>
              </div>
            </div>
         </div>
      </motion.div>


      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-panel p-6 border-white/5 flex flex-col justify-center items-center text-center group cursor-pointer hover:shadow-neon-cyan transition-all duration-300"
        onClick={exportTransactions}
      >
        <div className="w-12 h-12 rounded-full bg-surface/80 flex items-center justify-center text-text-muted group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300 mb-3 border border-white/5">
           <Download size={24} />
        </div>
        <h4 className="text-sm font-semibold text-text mb-1">Export History</h4>
        <p className="text-xs text-text-muted max-w-[150px]">Download your data as CSV for tax tracking.</p>
      </motion.div>
    </div>
  );
};

export default Insights;
