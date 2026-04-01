import React, { useState } from 'react';
import useStore from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, ArrowUpRight, ArrowDownRight, ArrowUpDown, Filter, Search, Plus } from 'lucide-react';
import TransactionModal from './TransactionModal';

const categoryColors = {
  'Zomato': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Swiggy': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Amazon': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Ola': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Rent': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Cashback': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Salary': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Freelance': 'bg-primary/20 text-primary border-primary/30',
  'Netflix': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Shopping': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'UPI Payments': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
};

const getCategoryStyle = (category) => {
  return categoryColors[category] || 'bg-surface/50 text-text-muted border-white/10';
};

const TransactionTable = () => {
  const { transactions, role, filters, setFilters, deleteTransaction } = useStore();
  const [editingTx, setEditingTx] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  // Filter transactions
  const filteredTx = transactions.filter((tx) => {
    const searchMatch = tx.description.toLowerCase().includes(filters.search.toLowerCase()) || 
                        tx.category.toLowerCase().includes(filters.search.toLowerCase());
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

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  return (
    <div className="premium-card w-full overflow-hidden flex-1 min-h-[400px]">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-xl shadow-neon-cyan">
            <Filter size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text glow-text">Recent Transactions</h3>
            <p className="text-xs text-text-muted">{sortedTx.length} transactions found</p>
          </div>
        </div>
        {role === 'Admin' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold rounded-xl shadow-neon-cyan hover:shadow-glow-lg transition-all duration-300"
          >
            <Plus size={18} />
            Add Transaction
          </motion.button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface/30">
              <th 
                className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider cursor-pointer hover:text-primary transition-colors" 
                onClick={() => handleSort('dateOptions')}
              >
                <div className="flex items-center gap-2">
                  Date 
                  <motion.div
                    animate={{ rotate: filters.sortBy === 'dateOptions' && filters.sortOrder === 'asc' ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpDown size={14} className="opacity-50 hover:opacity-100" />
                  </motion.div>
                </div>
              </th>
              <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Description</th>
              <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
              <th 
                className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider cursor-pointer hover:text-primary transition-colors text-right" 
                onClick={() => handleSort('amountOptions')}
              >
                <div className="flex items-center justify-end gap-2">
                  Amount
                  <motion.div
                    animate={{ rotate: filters.sortBy === 'amountOptions' && filters.sortOrder === 'asc' ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpDown size={14} className="opacity-50 hover:opacity-100" />
                  </motion.div>
                </div>
              </th>
              {role === 'Admin' && (
                <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="wait">
              {sortedTx.length > 0 ? (
                sortedTx.map((tx, index) => (
                  <motion.tr
                    key={tx.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: index * 0.05 }}
                    onMouseEnter={() => setHoveredRow(tx.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 group relative"
                  >
                    {/* Hover Glow Effect */}
                    <AnimatePresence>
                      {hoveredRow === tx.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none"
                        />
                      )}
                    </AnimatePresence>
                    
                    <td className="p-4 text-sm font-medium text-text-muted relative z-10">
                      {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="p-4 relative z-10">
                      <div className="flex items-center">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className={`p-2.5 rounded-xl mr-3 shadow-lg ${tx.type === 'Income' ? 'bg-emerald-500/20 text-emerald-400 shadow-neon-green' : 'bg-red-500/20 text-red-400 shadow-neon-red'}`}
                        >
                          {tx.type === 'Income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                        </motion.div>
                        <div>
                          <span className="text-sm font-semibold text-text group-hover:text-primary transition-colors block">{tx.description}</span>
                          <span className="text-xs text-text-muted/70">{tx.type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 relative z-10">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getCategoryStyle(tx.category)}`}>
                        {tx.category}
                      </span>
                    </td>
                    <td className={`p-4 text-sm font-bold text-right tracking-wide relative z-10 ${tx.type === 'Income' ? 'text-emerald-400' : 'text-text'}`}>
                      <motion.span
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        className="inline-block"
                      >
                        {tx.type === 'Income' ? '+' : ''}
                        {formatCurrency(tx.amount)}
                      </motion.span>
                    </td>
                    {role === 'Admin' && (
                      <td className="p-4 text-right relative z-10">
                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openModal(tx)}
                            className="p-2 text-primary hover:bg-primary/20 hover:shadow-neon-cyan rounded-lg transition-all"
                          >
                            <Edit2 size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteTransaction(tx.id)}
                            className="p-2 text-red-400 hover:bg-red-500/20 hover:shadow-neon-red rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={role === 'Admin' ? 5 : 4} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-surface/50 flex items-center justify-center">
                        <Search size={24} className="text-text-muted" />
                      </div>
                      <div>
                        <p className="text-text font-semibold mb-1">No transactions found</p>
                        <p className="text-text-muted text-sm">Try adjusting filters or add a new transaction</p>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Modal */}
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
