import React from 'react';
import useStore from '../store/useStore';
import { Filter, X } from 'lucide-react';

const Filters = () => {
  const { filters, setFilters, resetFilters } = useStore();

  const categories = ['All', 'Food', 'Salary', 'Shopping', 'Bills', 'Travel'];

  return (
    <div className="glass-panel p-4 mb-6 flex flex-wrap gap-4 items-center justify-between border-white/5 mx-1">
      <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
        <div className="flex items-center text-text-muted text-sm mr-2">
          <Filter size={16} className="mr-2" />
          Filters:
        </div>
        
        <select
          value={filters.type}
          onChange={(e) => setFilters({ type: e.target.value })}
          className="bg-surface/50 text-sm text-text border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-primary/50 transition-colors"
        >
          <option value="All">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value })}
          className="bg-surface/50 text-sm text-text border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-primary/50 transition-colors"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-4 items-center w-full md:w-auto justify-end">
        {(filters.type !== 'All' || filters.category !== 'All' || filters.search !== '') && (
          <button
            onClick={resetFilters}
            className="flex items-center text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            <X size={14} className="mr-1" /> Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
