import React, { useEffect } from 'react';
import RoleToggle from './RoleToggle';
import { Bell, Search, Sun, Moon, User } from 'lucide-react';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { theme, toggleTheme } = useStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <nav className="h-24 w-full flex items-center justify-between px-8 bg-transparent relative">
      {/* Greeting Section */}
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1"
        >
          <h1 className="text-2xl font-bold text-text glow-text">
            {getGreeting()}, Himanshi 👋
          </h1>
          <p className="text-sm text-text-muted">
            {getCurrentDate()}
          </p>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 flex items-center max-w-xl mx-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative w-full premium-card px-4 py-3 group"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search transactions, categories..."
            className="bg-transparent text-sm text-text focus:outline-none w-full placeholder:text-text-muted/50 pl-8 pr-4"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <kbd className="px-2 py-1 text-xs bg-surface rounded border border-white/10 text-text-muted">
              ⌘K
            </kbd>
          </div>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <RoleToggle />
        
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="w-12 h-12 rounded-full premium-card flex items-center justify-center text-text-muted hover:text-primary group transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </motion.button>
          
          {/* Notifications */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full premium-card flex items-center justify-center text-text-muted hover:text-primary relative group transition-all duration-300"
          >
            <Bell size={20} />
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full shadow-neon-cyan"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary/20 rounded-full animate-ping" />
          </motion.button>

          {/* Profile */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary p-[2px] cursor-pointer shadow-neon-violet hover:shadow-neon-cyan transition-all duration-300"
          >
            <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
              <img 
                src="https://i.pravatar.cc/150?img=11" 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
