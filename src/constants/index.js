/**
 * Application Constants and Configuration
 * Premium Finance Dashboard - CRED-grade fintech
 */

// Color Palette - Neon Glow System
export const COLORS = {
  // Primary Glow Colors
  primary: '#00F5FF',      // Neon Cyan
  secondary: '#7C3AED',  // Violet
  accent: '#F59E0B',      // Gold
  
  // Status Colors
  success: '#22C55E',     // Emerald Green
  error: '#EF4444',       // Red
  warning: '#F59E0B',     // Amber
  info: '#3B82F6',        // Blue
  
  // Background Colors
  background: '#050816',    // Deep Navy
  surface: '#0c122b',      // Card Background
  surfaceLight: '#140c2b', // Lighter Surface
  
  // Text Colors
  text: '#f8fafc',        // Primary Text
  textMuted: '#64748b',  // Secondary Text
  textDisabled: '#475569', // Disabled Text
};

// Indian Fintech Categories with Icons
export const CATEGORIES = {
  // Food & Dining
  ZOMATO: { id: 'Zomato', label: 'Zomato', icon: '🍔', color: 'orange', type: 'expense' },
  SWIGGY: { id: 'Swiggy', label: 'Swiggy', icon: '🍕', color: 'orange', type: 'expense' },
  
  // Shopping
  AMAZON: { id: 'Amazon', label: 'Amazon', icon: '📦', color: 'blue', type: 'expense' },
  SHOPPING: { id: 'Shopping', label: 'Shopping', icon: '🛍️', color: 'pink', type: 'expense' },
  
  // Transport
  OLA: { id: 'Ola', label: 'Ola', icon: '🚗', color: 'yellow', type: 'expense' },
  
  // Bills & Rent
  RENT: { id: 'Rent', label: 'Rent', icon: '🏠', color: 'purple', type: 'expense' },
  UPI_PAYMENTS: { id: 'UPI Payments', label: 'UPI', icon: '📱', color: 'cyan', type: 'expense' },
  
  // Income
  SALARY: { id: 'Salary', label: 'Salary', icon: '💰', color: 'emerald', type: 'income' },
  CASHBACK: { id: 'Cashback', label: 'Cashback', icon: '💸', color: 'emerald', type: 'income' },
  FREELANCE: { id: 'Freelance', label: 'Freelance', icon: '💻', color: 'cyan', type: 'income' },
  
  // Entertainment
  NETFLIX: { id: 'Netflix', label: 'Netflix', icon: '🎬', color: 'red', type: 'expense' },
};

// Transaction Types
export const TRANSACTION_TYPES = {
  INCOME: 'Income',
  EXPENSE: 'Expense',
};

// Sort Options
export const SORT_OPTIONS = {
  DATE: 'dateOptions',
  AMOUNT: 'amountOptions',
};

// Chart Colors
export const CHART_COLORS = [
  '#00F5FF', // Cyan
  '#7C3AED', // Violet
  '#F59E0B', // Gold
  '#22C55E', // Emerald
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan Dark
];

// Animation Durations
export const ANIMATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  spring: { type: 'spring', stiffness: 300, damping: 30 },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TRANSACTIONS: 'finance-dashboard-transactions',
  THEME: 'finance-dashboard-theme',
  USER_ROLE: 'finance-dashboard-role',
  FILTERS: 'finance-dashboard-filters',
};

// Date Formats
export const DATE_FORMATS = {
  SHORT: { day: 'numeric', month: 'short' },
  LONG: { day: 'numeric', month: 'long', year: 'numeric' },
  COMPACT: { day: '2-digit', month: '2-digit', year: '2-digit' },
  ISO: 'yyyy-MM-dd',
};

// Currency Configuration
export const CURRENCY = {
  CODE: 'INR',
  SYMBOL: '₹',
  LOCALE: 'en-IN',
  DECIMALS: 0,
};

// Navigation Items
export const NAV_ITEMS = [
  { id: 'Dashboard', label: 'Dashboard', icon: 'Home', description: 'Overview & Analytics' },
  { id: 'Transactions', label: 'Transactions', icon: 'List', description: 'Manage your expenses' },
  { id: 'Insights', label: 'Insights', icon: 'PieChart', description: 'Smart analysis' },
];

// User Roles
export const USER_ROLES = {
  VIEWER: 'Viewer',
  ADMIN: 'Admin',
};

// Role Permissions
export const ROLE_PERMISSIONS = {
  [USER_ROLES.VIEWER]: {
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canExport: true,
  },
  [USER_ROLES.ADMIN]: {
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canExport: true,
  },
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
};

// App Configuration
export const APP_CONFIG = {
  name: 'FinDash',
  tagline: 'Premium Finance Dashboard',
  version: '2.0.0',
  author: 'Himanshi Sharma',
  maxTransactions: 1000,
  paginationLimit: 50,
};

// Toast Configuration
export const TOAST_CONFIG = {
  duration: 4000,
  position: 'top-right',
  maxToasts: 3,
};

// Skeleton Loading Config
export const SKELETON_CONFIG = {
  cards: 3,
  tableRows: 5,
  chartBars: 7,
};

// Default Values
export const DEFAULTS = {
  theme: 'dark',
  role: USER_ROLES.VIEWER,
  tab: 'Dashboard',
  category: 'All',
  type: 'All',
  sortBy: SORT_OPTIONS.DATE,
  sortOrder: 'desc',
};
