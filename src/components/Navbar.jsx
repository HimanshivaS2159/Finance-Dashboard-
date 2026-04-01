import React, { useEffect } from 'react';
import RoleToggle from './RoleToggle';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { theme, toggleTheme } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <nav className="h-20 w-full flex items-center justify-between px-8 bg-transparent">
      <div className="flex-1 flex items-center max-w-xl">
        <div className="relative w-full glass-panel flex items-center px-4 py-2 border-white/5">
          <Search className="w-5 h-5 text-text-muted mr-3" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-text focus:outline-none w-full placeholder:text-text-muted/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-8">
        <RoleToggle />
        
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface border border-transparent hover:border-white/5 transition-all text-text-muted hover:text-text"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-surface/50 border border-white/5 flex items-center justify-center text-text-muted hover:text-[#00F5FF] hover:border-[#00F5FF]/30 hover:shadow-neon-cyan transition-all relative"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#00F5FF] rounded-full animate-pulse shadow-neon-cyan"></span>
          </motion.button>

          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] p-[2px] cursor-pointer shadow-neon-violet hover:shadow-neon-cyan transition-shadow duration-300">
            <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
