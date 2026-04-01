import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Calendar, Tag, FileText, IndianRupee, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TransactionModal = ({ isOpen, onClose, transaction }) => {
  const { addTransaction, updateTransaction } = useStore();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: 'Zomato',
    type: 'Expense',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'Zomato', label: 'Zomato', icon: '🍔', color: 'orange' },
    { value: 'Swiggy', label: 'Swiggy', icon: '🍕', color: 'orange' },
    { value: 'Amazon', label: 'Amazon', icon: '📦', color: 'blue' },
    { value: 'Ola', label: 'Ola', icon: '🚗', color: 'yellow' },
    { value: 'Rent', label: 'Rent', icon: '🏠', color: 'purple' },
    { value: 'Salary', label: 'Salary', icon: '💰', color: 'emerald' },
    { value: 'Cashback', label: 'Cashback', icon: '💸', color: 'emerald' },
    { value: 'Freelance', label: 'Freelance', icon: '💻', color: 'cyan' },
    { value: 'Netflix', label: 'Netflix', icon: '🎬', color: 'red' },
    { value: 'Shopping', label: 'Shopping', icon: '🛍️', color: 'pink' },
    { value: 'UPI Payments', label: 'UPI', icon: '📱', color: 'cyan' },
  ];

  useEffect(() => {
    if (transaction) {
      setFormData({
        ...transaction,
        amount: Math.abs(transaction.amount).toString(),
        type: transaction.type,
      });
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        category: 'Zomato',
        type: 'Expense',
        description: '',
      });
    }
    setErrors({});
  }, [transaction, isOpen]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      const amountValue = Number(formData.amount);
      const finalAmount = formData.type === 'Expense' ? -amountValue : amountValue;
      
      const txData = {
        ...formData,
        amount: finalAmount,
      };

      // Simulate delay for premium feel
      await new Promise(resolve => setTimeout(resolve, 300));

      if (transaction && transaction.id) {
        updateTransaction(transaction.id, txData);
      } else {
        addTransaction(txData);
      }
      
      setIsSubmitting(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  const getSelectedCategory = () => categories.find(c => c.value === formData.category) || categories[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-lg premium-card overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${formData.type === 'Income' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                {formData.type === 'Income' ? (
                  <ArrowUpRight size={20} className="text-emerald-400" />
                ) : (
                  <ArrowDownRight size={20} className="text-red-400" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-text">
                  {transaction ? 'Edit Transaction' : 'Add Transaction'}
                </h2>
                <p className="text-xs text-text-muted">
                  {transaction ? 'Update transaction details' : 'Record a new transaction'}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 text-text-muted hover:text-text hover:bg-white/5 rounded-full transition-colors"
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Type Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm text-text-muted mb-2 font-medium">
                <Wallet size={16} />
                Transaction Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Expense', 'Income'].map((type) => (
                  <motion.button
                    key={type}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData({ ...formData, type })}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                      formData.type === type
                        ? type === 'Income'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-neon-green'
                          : 'bg-red-500/20 border-red-500/50 text-red-400 shadow-neon-red'
                        : 'bg-surface/50 border-white/10 text-text-muted hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {type === 'Income' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {type}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Category & Date Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm text-text-muted mb-2 font-medium">
                  <Tag size={16} />
                  Category
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl">
                    {getSelectedCategory().icon}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-sm text-text-muted mb-2 font-medium">
                  <Calendar size={16} />
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`w-full bg-surface/50 border ${errors.date ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary/50 transition-colors`}
                />
                {errors.date && <p className="text-xs text-red-400 mt-1">{errors.date}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm text-text-muted mb-2 font-medium">
                <FileText size={16} />
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full bg-surface/50 border ${errors.description ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary/50 transition-colors placeholder:text-text-muted/50`}
                placeholder="e.g. Dinner with friends"
              />
              {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
            </div>

            {/* Amount */}
            <div>
              <label className="flex items-center gap-2 text-sm text-text-muted mb-2 font-medium">
                <IndianRupee size={16} />
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-semibold">₹</span>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className={`w-full bg-surface/50 border ${errors.amount ? 'border-red-500/50' : 'border-white/10'} rounded-xl pl-8 pr-4 py-3 text-text text-lg font-semibold focus:outline-none focus:border-primary focus:shadow-neon-cyan transition-all placeholder:text-text-muted/50`}
                  placeholder="0"
                />
              </div>
              {errors.amount && <p className="text-xs text-red-400 mt-1">{errors.amount}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-surface border border-white/10 hover:bg-white/5 text-text font-medium rounded-xl transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl shadow-neon-cyan hover:shadow-glow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    {transaction ? 'Save Changes' : 'Add Transaction'}
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionModal;
