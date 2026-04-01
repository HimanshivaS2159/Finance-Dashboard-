import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Filters from './components/Filters';
import TransactionTable from './components/TransactionTable';
import Insights from './components/Insights';
import ToastContainer from './components/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from './store/useStore';

// Premium Loading Skeleton Component
const LoadingSkeleton = () => {
  return (
    <div className="w-full h-full bg-background flex flex-col items-center justify-center z-50 absolute inset-0">
      {/* Animated Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-secondary p-[2px]"
        >
          <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              F
            </span>
          </div>
        </motion.div>
        
        {/* Orbiting dots */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <div className="absolute -top-2 left-1/2 w-3 h-3 bg-primary rounded-full shadow-neon-cyan" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-secondary rounded-full shadow-neon-violet" />
        </motion.div>
      </motion.div>

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h2 className="text-xl font-bold text-text mb-2">FinDash</h2>
        <p className="text-text-muted text-sm mb-4">Loading your financial dashboard...</p>
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-surface rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </div>

      {/* Loading dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const { currentTab } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Extended for premium loading experience
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary/30 text-text">
      {/* Ambient glow effects behind the layout */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00F5FF]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="fixed top-[40%] left-[30%] w-[20%] h-[20%] bg-[#F59E0B]/5 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex w-full h-full relative z-10"
          >
             <div className="hidden md:flex h-full">
               <Sidebar />
             </div>
             
             <div className="flex-1 flex flex-col h-full overflow-hidden relative">
               <Navbar />
               <main className="flex-1 overflow-y-auto px-4 md:px-8 custom-scrollbar pb-8">
                 <AnimatePresence mode="wait">
                   {currentTab === 'Dashboard' && (
                     <motion.div
                       key="dashboard"
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       transition={{ duration: 0.3 }}
                     >
                       <Dashboard />
                     </motion.div>
                   )}
                   
                   {currentTab === 'Transactions' && (
                     <motion.div
                       key="transactions"
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       transition={{ duration: 0.3 }}
                       className="w-full max-w-7xl mx-auto space-y-6 flex flex-col h-full"
                     >
                       <div className="mb-2">
                         <h2 className="text-2xl font-bold text-text mb-1 tracking-tight">Transactions Hub</h2>
                         <p className="text-text-muted text-sm">Manage and filter all your historical financial data.</p>
                       </div>
                       <Filters />
                       <TransactionTable />
                     </motion.div>
                   )}

                   {currentTab === 'Insights' && (
                     <motion.div
                       key="insights"
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       transition={{ duration: 0.3 }}
                       className="w-full max-w-7xl mx-auto space-y-6 flex flex-col h-full"
                     >
                       <div className="mb-2">
                         <h2 className="text-2xl font-bold text-text mb-1 tracking-tight">Financial Insights</h2>
                         <p className="text-text-muted text-sm">Deep-dive into your analytics and saving targets.</p>
                       </div>
                       <Insights />
                     </motion.div>
                   )}
                 </AnimatePresence>
               </main>
             </div>
          </motion.div>
        </AnimatePresence>
      )}
      
      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default App;
