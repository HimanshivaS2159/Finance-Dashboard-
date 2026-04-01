import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const TransactionModal = ({ isOpen, onClose, transaction }) => {
  const { addTransaction, updateTransaction } = useStore();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: 'Food',
    type: 'Expense',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (transaction) {
      setFormData({
        ...transaction,
        amount: Math.abs(transaction.amount).toString(), // Absolute amount for form
        type: transaction.type,
      });
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        category: 'Food',
        type: 'Expense',
        description: '',
      });
    }
  }, [transaction]);

  const categories = ['Food', 'Salary', 'Shopping', 'Bills', 'Travel', 'Other'];

  const validate = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
      isValid = false;
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const amountValue = Number(formData.amount);
      const finalAmount = formData.type === 'Expense' ? -amountValue : amountValue;
      
      const txData = {
        ...formData,
        amount: finalAmount,
      };

      if (transaction && transaction.id) {
        updateTransaction(transaction.id, txData);
      } else {
        addTransaction(txData);
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-md bg-surface border border-white/10 rounded-2xl shadow-2xl shadow-black overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-surface/50">
          <h2 className="text-xl font-bold text-text">
            {transaction ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text hover:bg-white/5 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-muted mb-1 font-medium">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary/50 transition-colors"
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-text-muted mb-1 font-medium">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary/50 transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-text-muted mb-1 font-medium">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full bg-background/50 border ${errors.description ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary/50 transition-colors placeholder:text-text-muted/50`}
              placeholder="e.g. Groceries"
            />
            {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-muted mb-1 font-medium">Amount ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className={`w-full bg-background/50 border ${errors.amount ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary/50 transition-colors placeholder:text-text-muted/50`}
                placeholder="0.00"
              />
              {errors.amount && <p className="text-xs text-red-400 mt-1">{errors.amount}</p>}
            </div>
            
            <div>
              <label className="block text-sm text-text-muted mb-1 font-medium">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full bg-background/50 border ${errors.date ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-2.5 text-text focus:outline-none focus:border-primary/50 transition-colors`}
              />
              {errors.date && <p className="text-xs text-red-400 mt-1">{errors.date}</p>}
            </div>
          </div>

          <div className="mt-8 flex gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-surface border border-white/10 hover:bg-white/5 text-text font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-primary/90 hover:bg-primary text-white font-medium rounded-xl shadow-lg shadow-primary/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {transaction ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TransactionModal;
