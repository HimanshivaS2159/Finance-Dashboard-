import React, { useState } from 'react';
import useStore from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, ArrowUpRight, ArrowDownRight, ArrowUpDown } from 'lucide-react';
import TransactionModal from './TransactionModal';

const TransactionTable = () => {
  const { transactions, role, filters, setFilters, deleteTransaction } = useStore();
  const [editingTx, setEditingTx] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter transactions
  const filteredTx = transactions.filter((tx) => {
    const searchMatch = tx.description.toLowerCase().includes(filters.search.toLowerCase()) || 
                        tx.category.toLowerCase().includes(filters.search.toLowerCase());
    const typeMatch = filters.type === 'All' || tx.type === 'Income'; // The specific matching requires strict types, but tx.type works globally for now. Wait, strict type checking below:
    const specificTypeMatch = filters.type === 'All' || tx.type === filters.type;
    const categoryMatch = filters.category === 'All' || tx.category === filters.category;
    return searchMatch && specificTypeMatch && categoryMatch;
  });

  // Sort transactions
  const sortedTx = [...filteredTx].sort((a, b) => {
    if (filters.sortBy === 'dateOptions') {
      const diff = new Date(a.date) - new Date(b.date);
      return filters.sortOrder === 'desc' ? -diff : diff;
    } else {
      const diff = a.amount - b.amount;
      return filters.sortOrder === 'desc' ? -diff : diff;
    }
  });

  const handleSort = (field) => {
    if (filters.sortBy === field) {
      setFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
    } else {
      setFilters({ sortBy: field, sortOrder: 'desc' });
    }
  };

  const openModal = (tx = null) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  return (
    <div className="glass-panel w-full overflow-hidden border-white/5 mx-1 flex-1 min-h-[400px]">
      <div className="p-6 border-b border-white/5 flex justify-between items-center">
        <h3 className="text-xl font-bold text-text">Recent Transactions</h3>
        {role === 'Admin' && (
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-primary/90 hover:bg-primary text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 transform hover:scale-105"
          >
            + Add Transaction
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface/30">
              <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider cursor-pointer" onClick={() => handleSort('dateOptions')}>
                <div className="flex items-center">
                  Date <ArrowUpDown size={14} className="ml-1 opacity-50 hover:opacity-100" />
                </div>
              </th>
              <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
              <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
              <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider cursor-pointer text-right" onClick={() => handleSort('amountOptions')}>
                <div className="flex items-center justify-end">
                  Amount <ArrowUpDown size={14} className="ml-1 opacity-50 hover:opacity-100" />
                </div>
              </th>
              {role === 'Admin' && (
                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {sortedTx.length > 0 ? (
                sortedTx.map((tx, index) => (
                  <motion.tr
                    key={tx.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 hover:shadow-lg transition-all duration-200 group relative"
                  >
                    <td className="p-4 text-sm font-medium text-text-muted">
                      {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-xl mr-3 shadow-lg ${tx.type === 'Income' ? 'bg-green-500/20 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500/20 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]'}`}>
                          {tx.type === 'Income' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        </div>
                        <span className="text-sm font-semibold text-text group-hover:text-primary transition-colors">{tx.description}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-surface rounded-full text-xs font-semibold text-text border border-white/10 shadow-sm shadow-black/50">
                        {tx.category}
                      </span>
                    </td>
                    <td className={`p-4 text-sm font-bold text-right tracking-wide ${tx.type === 'Income' ? 'text-green-400' : 'text-text'}`}>
                      {tx.type === 'Income' ? '+' : ''}
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(tx.amount)}
                    </td>
                    {role === 'Admin' && (
                      <td className="p-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => openModal(tx)}
                            className="p-2 text-primary hover:bg-primary/20 hover:shadow-neon-cyan rounded-lg transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteTransaction(tx.id)}
                            className="p-2 text-red-400 hover:bg-red-500/20 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={role === 'Admin' ? 5 : 4} className="p-8 text-center text-text-muted text-sm">
                    No transactions found. Try adjusting filters or search.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <TransactionModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            transaction={editingTx} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransactionTable;
