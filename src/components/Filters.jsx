import React from 'react';
import useStore from '../store/useStore';
import { Filter, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Filters = () => {
  const { filters, setFilters, resetFilters } = useStore();

  const categories = ['All', 'Zomato', 'Swiggy', 'Amazon', 'Ola', 'Rent', 'Salary', 'Cashback', 'Freelance', 'Netflix', 'Shopping', 'UPI Payments'];
  const types = ['All', 'Income', 'Expense'];

  const activeFiltersCount = (filters.type !== 'All' ? 1 : 0) + (filters.category !== 'All' ? 1 : 0) + (filters.search !== '' ? 1 : 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card p-5 mb-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg shadow-neon-cyan">
            <SlidersHorizontal size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text">Filter Transactions</h3>
            <p className="text-xs text-text-muted">
              {activeFiltersCount > 0 ? `${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active` : 'No filters applied'}
            </p>
          </div>
        </div>
        
        <AnimatePresence>
          {activeFiltersCount > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetFilters}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <RotateCcw size={12} />
              Reset All
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted uppercase tracking-wider font-medium">Type:</span>
          <div className="flex gap-1">
            {types.map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilters({ type })}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                  filters.type === type
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-neon-cyan'
                    : 'bg-surface/50 text-text-muted border border-white/10 hover:border-primary/30'
                }`}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted uppercase tracking-wider font-medium">Category:</span>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ category: e.target.value })}
            className="bg-surface/50 text-xs text-text border border-white/10 rounded-lg px-3 py-1.5 outline-none focus:border-primary/50 transition-colors cursor-pointer hover:bg-surface"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Active Filter Tags */}
        <AnimatePresence mode="wait">
          {activeFiltersCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 ml-auto"
            >
              <span className="text-xs text-text-muted">Active:</span>
              <div className="flex gap-1">
                {filters.type !== 'All' && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="px-2 py-1 text-xs bg-primary/10 text-primary border border-primary/20 rounded-md flex items-center gap-1"
                  >
                    {filters.type}
                    <button 
                      onClick={() => setFilters({ type: 'All' })}
                      className="hover:text-white transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </motion.span>
                )}
                {filters.category !== 'All' && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="px-2 py-1 text-xs bg-secondary/10 text-secondary border border-secondary/20 rounded-md flex items-center gap-1"
                  >
                    {filters.category}
                    <button 
                      onClick={() => setFilters({ category: 'All' })}
                      className="hover:text-white transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </motion.span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Filters;
