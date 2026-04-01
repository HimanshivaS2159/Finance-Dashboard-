import React from 'react';
import { motion } from 'framer-motion';
import SummaryCards from '../components/SummaryCards';
import Charts from '../components/Charts';
import Filters from '../components/Filters';
import TransactionTable from '../components/TransactionTable';
import Insights from '../components/Insights';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const Dashboard = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-7xl mx-auto space-y-6 flex flex-col h-full scrollbar-hide pb-8"
    >
      {/* Premium Header */}
      <motion.div variants={itemVariants} className="mb-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
          <h2 className="text-3xl font-bold text-text glow-text">Financial Overview</h2>
        </div>
        <p className="text-text-muted text-sm ml-4">
          Track your income, expenses, and savings all in one place
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <SummaryCards />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Charts />
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="flex flex-col lg:flex-row gap-6 w-full"
      >
         <div className="flex-[3] flex flex-col relative w-full overflow-hidden">
             <Filters />
             <TransactionTable />
         </div>
         <div className="flex-1 w-full lg:min-w-[300px]">
             <Insights />
         </div>
      </motion.div>

      {/* Floating Action Button for Mobile */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 lg:hidden w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full shadow-neon-cyan flex items-center justify-center z-40"
      >
        <span className="text-2xl">+</span>
      </motion.button>
    </motion.div>
  );
};

export default Dashboard;
