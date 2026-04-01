import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info, Bell } from 'lucide-react';

const Toast = ({ id, message, type, onClose, duration = 4000 }) => {
  const [progress, setProgress] = useState(100);

  const icons = {
    success: <CheckCircle size={20} className="text-emerald-400" />,
    error: <AlertCircle size={20} className="text-red-400" />,
    info: <Info size={20} className="text-primary" />,
    warning: <Bell size={20} className="text-accent" />,
  };

  const colors = {
    success: 'border-emerald-500/30 shadow-neon-green bg-emerald-500/5',
    error: 'border-red-500/30 shadow-neon-red bg-red-500/5',
    info: 'border-primary/30 shadow-neon-cyan bg-primary/5',
    warning: 'border-accent/30 shadow-neon-gold bg-accent/5',
  };

  const progressColors = {
    success: 'bg-emerald-400',
    error: 'bg-red-400',
    info: 'bg-primary',
    warning: 'bg-accent',
  };

  // Handle swipe to dismiss
  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100 || info.offset.x < -100) {
      onClose(id);
    }
  };

  // Progress bar animation
  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateProgress = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / duration) * 100;
      
      setProgress(newProgress);

      if (remaining > 0) {
        requestAnimationFrame(updateProgress);
      }
    };

    const animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [duration]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.02 }}
      className={`premium-card p-4 mb-3 border ${colors[type]} flex items-center gap-3 min-w-[320px] max-w-md cursor-grab active:cursor-grabbing relative overflow-hidden`}
    >
      {/* Background glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${progressColors[type]}/5 to-transparent opacity-50`} />
      
      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="relative z-10"
      >
        {icons[type]}
      </motion.div>

      {/* Message */}
      <div className="flex-1 relative z-10">
        <p className="text-sm text-text font-medium">{message}</p>
        <p className="text-xs text-text-muted mt-0.5">Swipe to dismiss</p>
      </div>

      {/* Close button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onClose(id)}
        className="relative z-10 p-1 text-text-muted hover:text-text transition-colors rounded-full hover:bg-white/10"
      >
        <X size={16} />
      </motion.button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-white/10 w-full">
        <motion.div
          className={`h-full ${progressColors[type]}`}
          style={{ width: `${progress}%` }}
          transition={{ duration: 0 }}
        />
      </div>
    </motion.div>
  );
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    
    // Auto remove after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Make addToast available globally
  useEffect(() => {
    window.showToast = addToast;
    return () => {
      delete window.showToast;
    };
  }, [addToast]);

  return (
    <div className="fixed top-4 right-4 z-50 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              id={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={removeToast}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
