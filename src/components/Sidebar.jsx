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
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F5FF] to-[#7C3AED] flex items-center justify-center text-white font-bold text-xl shadow-neon-cyan relative">
          <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
          F
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00F5FF] to-[#7C3AED]">
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              isActive
                ? 'bg-primary/20 text-[#00F5FF] font-bold shadow-neon-cyan border border-primary/30'
                : 'text-text-muted hover:bg-surface hover:text-[#00F5FF] hover:shadow-[0_0_10px_rgba(0,245,255,0.2)]'
            }`}
          >
            <span className={isActive ? 'text-[#00F5FF]' : 'text-text-muted'}>{item.icon}</span>
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
