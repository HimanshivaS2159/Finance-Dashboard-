import React from 'react';
import { motion } from 'framer-motion';
import { Home, List, PieChart, Plus } from 'lucide-react';
import useStore from '../store/useStore';

const MobileNav = () => {
  const { currentTab, setCurrentTab } = useStore();

  const navItems = [
    { id: 'Dashboard', icon: Home, label: 'Home' },
    { id: 'Transactions', icon: List, label: 'Transactions' },
    { id: 'Insights', icon: PieChart, label: 'Insights' },
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-lg border-t border-white/10 md:hidden z-40"
      >
        <div className="flex items-center justify-around py-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
                  isActive ? 'text-primary' : 'text-text-muted'
                }`}
              >
                <div className={`relative ${isActive ? 'text-primary' : ''}`}>
                  <Icon size={22} />
                  {isActive && (
                    <motion.div
                      layoutId="mobileNavIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    />
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.nav>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-20 right-4 md:hidden w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full shadow-neon-cyan flex items-center justify-center z-50"
        onClick={() => window.showToast && window.showToast('Add transaction feature coming soon!', 'info')}
      >
        <Plus size={24} className="text-background" />
      </motion.button>
    </>
  );
};

export default MobileNav;
