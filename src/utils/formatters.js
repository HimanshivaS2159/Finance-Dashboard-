/**
 * Utility functions for the Finance Dashboard
 * Premium fintech-grade formatting and calculations
 */

/**
 * Format amount in Indian Rupees (INR)
 * @param {number} amount - The amount to format
 * @param {boolean} showSymbol - Whether to show the ₹ symbol
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted amount string
 */
export const formatINR = (amount, showSymbol = true, decimals = 0) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'INR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  return formatter.format(amount);
};

/**
 * Format number with Indian numbering system (lakhs, crores)
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatIndianNumber = (num) => {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(2) + ' Cr';
  } else if (num >= 100000) {
    return (num / 100000).toFixed(2) + ' L';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + ' K';
  }
  return num.toString();
};

/**
 * Calculate percentage change between two values
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {number} Percentage change
 */
export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'relative')
 * @returns {string} Formatted date
 */
export const formatDate = (date, format = 'short') => {
  const d = new Date(date);
  
  if (format === 'short') {
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } else if (format === 'long') {
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } else if (format === 'relative') {
    const now = new Date();
    const diff = now - d;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  }
  
  return d.toISOString().split('T')[0];
};

/**
 * Get greeting based on time of day
 * @returns {string} Time-appropriate greeting
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 30) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Group transactions by category
 * @param {Array} transactions - Array of transactions
 * @returns {Object} Grouped transactions
 */
export const groupByCategory = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(transaction);
    return acc;
  }, {});
};

/**
 * Calculate total by type
 * @param {Array} transactions - Array of transactions
 * @param {string} type - Transaction type ('Income' or 'Expense')
 * @returns {number} Total amount
 */
export const calculateTotalByType = (transactions, type) => {
  return transactions
    .filter((t) => t.type === type)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);
};

/**
 * Get trend indicator (up/down arrow with color)
 * @param {number} value - Percentage value
 * @returns {Object} Trend indicator config
 */
export const getTrendIndicator = (value) => {
  if (value > 0) {
    return { icon: '↑', color: 'text-emerald-400', label: 'Increase' };
  } else if (value < 0) {
    return { icon: '↓', color: 'text-red-400', label: 'Decrease' };
  }
  return { icon: '→', color: 'text-text-muted', label: 'No change' };
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return crypto.randomUUID ? crypto.randomUUID() : 
    Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Get category icon and color
 * @param {string} category - Category name
 * @returns {Object} Icon and color config
 */
export const getCategoryConfig = (category) => {
  const configs = {
    'Zomato': { emoji: '🍔', color: 'orange', bgColor: 'bg-orange-500/20' },
    'Swiggy': { emoji: '🍕', color: 'orange', bgColor: 'bg-orange-500/20' },
    'Amazon': { emoji: '📦', color: 'blue', bgColor: 'bg-blue-500/20' },
    'Ola': { emoji: '🚗', color: 'yellow', bgColor: 'bg-yellow-500/20' },
    'Rent': { emoji: '🏠', color: 'purple', bgColor: 'bg-purple-500/20' },
    'Salary': { emoji: '💰', color: 'emerald', bgColor: 'bg-emerald-500/20' },
    'Cashback': { emoji: '💸', color: 'emerald', bgColor: 'bg-emerald-500/20' },
    'Freelance': { emoji: '💻', color: 'cyan', bgColor: 'bg-cyan-500/20' },
    'Netflix': { emoji: '🎬', color: 'red', bgColor: 'bg-red-500/20' },
    'Shopping': { emoji: '🛍️', color: 'pink', bgColor: 'bg-pink-500/20' },
    'UPI Payments': { emoji: '📱', color: 'cyan', bgColor: 'bg-cyan-500/20' },
  };
  
  return configs[category] || { emoji: '💳', color: 'gray', bgColor: 'bg-gray-500/20' };
};
