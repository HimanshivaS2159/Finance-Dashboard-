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

function App() {
  const [loading, setLoading] = useState(true);
  const { currentTab } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // simulate initial loading skeleton
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary/30 text-text">
      {/* Ambient glow effects behind the layout */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00F5FF]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none"></div>

      {loading ? (
        <div className="w-full flex items-center justify-center h-full z-50 bg-background absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full"
          />
        </div>
      ) : (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="flex w-full h-full relative z-10"
          >
             <div className="hidden md:flex h-full">
               <Sidebar />
             </div>
             
             <div className="flex-1 flex flex-col h-full overflow-hidden relative">
               <Navbar />
               <main className="flex-1 overflow-y-auto px-4 md:px-8 custom-scrollbar pb-8">
                 {currentTab === 'Dashboard' && <Dashboard />}
                 
                 {currentTab === 'Transactions' && (
                   <div className="w-full max-w-7xl mx-auto space-y-6 flex flex-col h-full">
                     <div className="mb-2">
                       <h2 className="text-2xl font-bold text-text mb-1 tracking-tight">Transactions Hub</h2>
                       <p className="text-text-muted text-sm">Manage and filter all your historical financial data.</p>
                     </div>
                     <Filters />
                     <TransactionTable />
                   </div>
                 )}

                 {currentTab === 'Insights' && (
                   <div className="w-full max-w-7xl mx-auto space-y-6 flex flex-col h-full">
                     <div className="mb-2">
                       <h2 className="text-2xl font-bold text-text mb-1 tracking-tight">Financial Insights</h2>
                       <p className="text-text-muted text-sm">Deep-dive into your analytics and saving targets.</p>
                     </div>
                     <Insights />
                   </div>
                 )}
               </main>
             </div>
          </motion.div>
        </AnimatePresence>
      )}
      
      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default App;
