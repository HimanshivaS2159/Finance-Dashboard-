/**
 * Analytics and reporting utilities
 * For generating insights and reports from transaction data
 */

// Calculate monthly totals
export const calculateMonthlyTotals = (transactions) => {
  const monthly = {};
  
  transactions.forEach(t => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthly[key]) {
      monthly[key] = { income: 0, expense: 0, net: 0 };
    }
    
    const amount = Math.abs(t.amount);
    if (t.type === 'Income') {
      monthly[key].income += amount;
    } else {
      monthly[key].expense += amount;
    }
    monthly[key].net = monthly[key].income - monthly[key].expense;
  });
  
  return monthly;
};

// Calculate spending trends
export const calculateTrends = (transactions, months = 3) => {
  const monthly = calculateMonthlyTotals(transactions);
  const sortedKeys = Object.keys(monthly).sort().slice(-months);
  
  if (sortedKeys.length < 2) return null;
  
  const current = monthly[sortedKeys[sortedKeys.length - 1]];
  const previous = monthly[sortedKeys[sortedKeys.length - 2]];
  
  return {
    expenseChange: ((current.expense - previous.expense) / previous.expense * 100).toFixed(1),
    incomeChange: ((current.income - previous.income) / previous.income * 100).toFixed(1),
    netChange: ((current.net - previous.net) / Math.abs(previous.net || 1) * 100).toFixed(1),
    direction: current.net > previous.net ? 'up' : 'down',
  };
};

// Get top spending categories
export const getTopCategories = (transactions, limit = 5) => {
  const categoryTotals = {};
  
  transactions
    .filter(t => t.type === 'Expense')
    .forEach(t => {
      const amount = Math.abs(t.amount);
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amount;
    });
  
  return Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([category, amount]) => ({ category, amount }));
};

// Calculate savings rate
export const calculateSavingsRate = (transactions) => {
  const totals = transactions.reduce((acc, t) => {
    if (t.type === 'Income') acc.income += Math.abs(t.amount);
    else acc.expense += Math.abs(t.amount);
    return acc;
  }, { income: 0, expense: 0 });
  
  if (totals.income === 0) return 0;
  return ((totals.income - totals.expense) / totals.income * 100).toFixed(1);
};

// Predict future expenses based on average
export const predictExpenses = (transactions, months = 3) => {
  const monthly = calculateMonthlyTotals(transactions);
  const sortedKeys = Object.keys(monthly).sort().slice(-months);
  
  if (sortedKeys.length === 0) return 0;
  
  const avgExpense = sortedKeys.reduce((sum, key) => sum + monthly[key].expense, 0) / sortedKeys.length;
  return Math.round(avgExpense);
};

// Generate financial health score (0-100)
export const calculateHealthScore = (transactions) => {
  let score = 50; // Base score
  
  const monthly = calculateMonthlyTotals(transactions);
  const sortedKeys = Object.keys(monthly).sort().slice(-3);
  
  if (sortedKeys.length === 0) return score;
  
  const current = monthly[sortedKeys[sortedKeys.length - 1]];
  
  // Positive net = +20 points
  if (current.net > 0) score += 20;
  
  // Savings rate above 20% = +15 points
  const savingsRate = (current.net / (current.income || 1)) * 100;
  if (savingsRate > 20) score += 15;
  if (savingsRate > 30) score += 10;
  
  // Diverse income sources = +10 points
  const incomeSources = new Set(
    transactions.filter(t => t.type === 'Income').map(t => t.category)
  ).size;
  if (incomeSources >= 2) score += 10;
  
  // Consistent spending = +10 points
  if (sortedKeys.length >= 2) {
    const variance = sortedKeys.reduce((sum, key) => {
      const diff = monthly[key].expense - current.expense;
      return sum + Math.abs(diff);
    }, 0) / sortedKeys.length;
    
    if (variance < current.expense * 0.3) score += 10;
  }
  
  return Math.min(100, Math.max(0, score));
};
