import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialTransactions } from '../data/mockData';

const useStore = create(
  persist(
    (set) => ({
      transactions: initialTransactions,
      role: 'Viewer', // 'Admin' or 'Viewer'
      theme: 'dark', // 'dark' or 'light'
      currentTab: 'Dashboard', // 'Dashboard', 'Transactions', 'Insights'
      
      filters: {
        search: '',
        type: 'All', // 'All', 'Income', 'Expense'
        category: 'All',
        sortBy: 'dateOptions', // 'dateOptions' or 'amountOptions'
        sortOrder: 'desc', // 'desc' or 'asc'
      },

      addTransaction: (tx) => {
        set((state) => ({
          transactions: [{ ...tx, id: crypto.randomUUID(), type: tx.amount < 0 ? 'Expense' : 'Income' }, ...state.transactions]
        }));
        // Show success toast
        if (window.showToast) {
          window.showToast('Transaction added successfully!', 'success');
        }
      },
      
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter(t => t.id !== id)
        }));
        // Show success toast
        if (window.showToast) {
          window.showToast('Transaction deleted successfully!', 'success');
        }
      },
      
      updateTransaction: (id, updatedTx) => {
        set((state) => ({
          transactions: state.transactions.map(t => t.id === id ? { ...t, ...updatedTx, type: updatedTx.amount < 0 ? 'Expense' : 'Income' } : t)
        }));
        // Show success toast
        if (window.showToast) {
          window.showToast('Transaction updated successfully!', 'success');
        }
      },

      setRole: (role) => set({ role }),
      setCurrentTab: (tab) => set({ currentTab: tab }),
      
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),

      resetFilters: () => set((state) => ({
        filters: {
          search: '',
          type: 'All',
          category: 'All',
          sortBy: 'dateOptions',
          sortOrder: 'desc',
        }
      })),
    }),
    {
      name: 'finance-dashboard-storage',
    }
  )
);

export default useStore;
