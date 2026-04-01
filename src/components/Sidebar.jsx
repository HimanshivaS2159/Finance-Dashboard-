import React from 'react';
import { Home, PieChart, List, Settings, LogOut, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

const Sidebar = () => {
  const { currentTab, setCurrentTab } = useStore();

  const menuItems = [
    { icon: Home, label: 'Dashboard', description: 'Overview & Analytics' },
    { icon: List, label: 'Transactions', description: 'Manage your expenses' },
    { icon: PieChart, label: 'Insights', description: 'Smart analysis' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings', description: 'Preferences' },
    { icon: LogOut, label: 'Logout', description: 'Sign out' },
  ];

  return (
    <div className="w-64 h-full premium-card flex flex-col p-5 m-4">
      {/* Logo Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-2 py-5 mb-8"
      >
        <motion.div 
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-neon-cyan relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          <Sparkles size={24} className="relative z-10" />
        </motion.div>
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            FinDash
          </h1>
          <p className="text-xs text-text-muted">Premium Finance</p>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = currentTab === item.label;
          const IconComponent = item.icon;
          return (
            <motion.button
              key={index}
              onClick={() => setCurrentTab(item.label)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-text-muted hover:text-primary'
              }`}
            >
              {/* Active Indicator */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-primary/10 border border-primary/30 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
              
              {/* Glow Effect for Active */}
              {isActive && (
                <motion.div
                  layoutId="glowEffect"
                  className="absolute inset-0 bg-primary/5 rounded-xl shadow-neon-cyan"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              {/* Icon */}
              <div className={`relative z-10 p-2 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-primary/20 shadow-neon-cyan' : 'bg-transparent group-hover:bg-surface/50'
              }`}>
                <IconComponent size={20} className={isActive ? 'text-primary' : 'text-text-muted group-hover:text-primary'} />
              </div>
              
              {/* Text */}
              <div className="relative z-10 flex flex-col items-start">
                <span className="text-sm font-medium">{item.label}</span>
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[10px] text-text-muted/70"
                    >
                      {item.description}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Active Dot */}
              {isActive && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute right-3 w-2 h-2 bg-primary rounded-full shadow-neon-cyan"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="space-y-2 mt-auto pt-6 border-t border-white/5">
        {bottomItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:text-text hover:bg-surface/50 transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg group-hover:bg-surface/80 transition-colors">
                <IconComponent size={20} className="group-hover:text-primary transition-colors" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-[10px] text-text-muted/70">{item.description}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
