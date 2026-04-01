/**
 * Export utilities for downloading data
 * Supports CSV and JSON formats
 */

// Convert transactions to CSV
export const exportToCSV = (transactions, filename = 'transactions') => {
  if (!transactions || transactions.length === 0) {
    throw new Error('No transactions to export');
  }

  // CSV Headers
  const headers = ['Date', 'Type', 'Category', 'Amount (INR)', 'Description'];
  
  // Convert transactions to CSV rows
  const rows = transactions.map(t => [
    new Date(t.date).toLocaleDateString('en-IN'),
    t.type,
    t.category,
    Math.abs(t.amount),
    `"${t.description || ''}"`, // Wrap description in quotes
  ]);
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Create and download file
  downloadFile(csvContent, `${filename}_${getTimestamp()}.csv`, 'text/csv');
};

// Export to JSON
export const exportToJSON = (data, filename = 'data') => {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, `${filename}_${getTimestamp()}.json`, 'application/json');
};

// Helper to download file
const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Generate timestamp for filenames
const getTimestamp = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

// Generate summary report
export const generateSummaryReport = (transactions) => {
  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const expense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const categories = {};
  transactions.forEach(t => {
    const amount = Math.abs(t.amount);
    categories[t.category] = (categories[t.category] || 0) + amount;
  });
  
  return {
    generatedAt: new Date().toISOString(),
    summary: {
      totalTransactions: transactions.length,
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense,
    },
    categoryBreakdown: categories,
  };
};

// Export summary report
export const exportSummaryReport = (transactions) => {
  const report = generateSummaryReport(transactions);
  exportToJSON(report, 'financial_summary_report');
};
