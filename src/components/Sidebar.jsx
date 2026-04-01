import React from 'react';
import { Home, PieChart, List, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../store/useStore';

const Sidebar = () => {
  const { currentTab, setCurrentTab } = useStore();

  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard' },
    { icon: <List size={20} />, label: 'Transactions' },
    { icon: <PieChart size={20} />, label: 'Insights' },
  ];

  const bottomItems = [
    { icon: <Settings size={20} />, label: 'Settings' },
    { icon: <LogOut size={20} />, label: 'Logout' },
  ];

  return (
    <div className="w-64 h-full glass-panel flex flex-col p-4 m-4 rounded-3xl border-white/5">
      <div className="flex items-center gap-3 px-2 py-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
          F
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-orange-400">
          FinDash
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = currentTab === item.label;
          return (
          <motion.button
            key={index}
            onClick={() => setCurrentTab(item.label)}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
              isActive
                ? 'bg-primary/10 text-primary font-semibold'
                : 'text-text-muted hover:bg-surface/50 hover:text-text'
            }`}
          >
            <span className={isActive ? 'text-primary' : 'text-text-muted'}>{item.icon}</span>
            {item.label}
          </motion.button>
          );
        })}
      </nav>

      <div className="space-y-2 mt-auto pt-6 border-t border-white/5">
        {bottomItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-surface/50 hover:text-text transition-colors duration-200"
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
