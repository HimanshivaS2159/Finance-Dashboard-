import React from 'react';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Zap, Download, Brain, Lightbulb } from 'lucide-react';

const Insights = () => {
  const { transactions } = useStore();

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  const getInsights = () => {
    if (transactions.length === 0) return { 
      highestCat: 'N/A', 
      totalSpent: 0, 
      monthlySpending: 0,
      spendingChange: 0,
      savingPotential: 0,
      topCategories: []
    };
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Current month expenses
    const currentMonthExpenses = transactions.filter(t => 
      t.type === 'Expense' && 
      new Date(t.date).getMonth() === currentMonth &&
      new Date(t.date).getFullYear() === currentYear
    );
    
    const monthlySpending = currentMonthExpenses.reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
    
    // Previous month for comparison
    const previousMonthExpenses = transactions.filter(t => 
      t.type === 'Expense' && 
      new Date(t.date).getMonth() === (currentMonth - 1 + 12) % 12 &&
      (new Date(t.date).getFullYear() === currentYear || 
       (currentMonth === 0 && new Date(t.date).getFullYear() === currentYear - 1))
    );
    
    const previousMonthSpending = previousMonthExpenses.reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
    
    const spendingChange = previousMonthSpending > 0 
      ? ((monthlySpending - previousMonthSpending) / previousMonthSpending) * 100 
      : 0;
    
    // Highest category spending
    const expenses = transactions.filter(t => t.type === 'Expense');
    const expensesByCat = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Math.abs(curr.amount);
      return acc;
    }, {});
    
    const topCategories = Object.entries(expensesByCat)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([category, amount]) => ({ category, amount }));
    
    let highestCat = 'N/A';
    let maxSpend = 0;
    Object.keys(expensesByCat).forEach(cat => {
      if (expensesByCat[cat] > maxSpend) {
        maxSpend = expensesByCat[cat];
        highestCat = cat;
      }
    });

    // Calculate saving potential (reduce highest category by 30%)
    const savingPotential = maxSpend * 0.3;

    return { 
      highestCat, 
      totalSpent: maxSpend, 
      monthlySpending,
      spendingChange,
      savingPotential,
      topCategories
    };
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

  const { 
    highestCat, 
    totalSpent, 
    monthlySpending,
    spendingChange,
    savingPotential,
    topCategories 
  } = getInsights();

  const insightCards = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Smart Analysis",
      value: `You spent ${formatCurrency(monthlySpending)} this month`,
      subtitle: spendingChange > 0 ? `(+${spendingChange.toFixed(1)}% vs last month)` : `(${Math.abs(spendingChange).toFixed(1)}% decrease)`,
      color: spendingChange > 0 ? 'red' : 'emerald',
      glow: spendingChange > 0 ? 'neon-red' : 'neon-green',
      delay: 0
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Highest Spending",
      value: highestCat,
      subtitle: `${formatCurrency(totalSpent)} this month`,
      color: 'primary',
      glow: 'neon-cyan',
      delay: 0.1
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Saving Opportunity",
      value: `Save ${formatCurrency(savingPotential)}`,
      subtitle: `By reducing ${highestCat} spending by 30%`,
      color: 'accent',
      glow: 'neon-gold',
      delay: 0.2
    }
  ];

  return (
    <div className="space-y-6">
      {/* Smart Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insightCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: card.delay }}
            className="premium-card p-6 hover:shadow-lg hover:shadow-${card.glow} transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${card.color}/20 text-${card.color} shadow-lg shadow-${card.color}/20 group-hover:scale-110 transition-transform duration-300`}>
                {card.icon}
              </div>
              <div className="flex items-center gap-1">
                {spendingChange > 0 && index === 0 ? (
                  <TrendingUp className="w-4 h-4 text-red-400" />
                ) : index === 0 ? (
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                ) : null}
              </div>
            </div>
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
              {card.title}
            </h3>
            <p className="text-lg font-bold text-text mb-1 glow-text">
              {card.value}
            </p>
            <p className="text-sm text-text-muted">
              {card.subtitle}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Top Categories */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="premium-card p-6"
      >
        <h3 className="text-lg font-bold text-text mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Top Spending Categories
        </h3>
        <div className="space-y-4">
          {topCategories.map((category, index) => {
            const percentage = totalSpent > 0 ? (category.amount / totalSpent) * 100 : 0;
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-text">{category.category}</span>
                  <span className="text-sm font-bold text-primary">{formatCurrency(category.amount)}</span>
                </div>
                <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary shadow-neon-cyan"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Export Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="premium-card p-6 flex flex-col items-center text-center cursor-pointer group hover:shadow-neon-cyan transition-all duration-300"
        onClick={exportTransactions}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary p-[2px] mb-4 group-hover:scale-110 transition-transform duration-300">
          <div className="w-full h-full rounded-full bg-surface flex items-center justify-center">
            <Download className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-text mb-2">Export Your Data</h3>
        <p className="text-sm text-text-muted max-w-[200px]">
          Download your complete transaction history as CSV for tax tracking and analysis
        </p>
      </motion.div>
    </div>
  );
};

export default Insights;
