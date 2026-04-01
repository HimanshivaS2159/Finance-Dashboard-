import React from 'react';
import SummaryCards from '../components/SummaryCards';
import Charts from '../components/Charts';
import Filters from '../components/Filters';
import TransactionTable from '../components/TransactionTable';
import Insights from '../components/Insights';

const Dashboard = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 flex flex-col h-full scrollbar-hide pb-8">
      {/* Header Info */}
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-text mb-1 tracking-tight">Financial Overview</h2>
        <p className="text-text-muted text-sm">Welcome back! Here's a summary of your finances today.</p>
      </div>

      <SummaryCards />
      
      <Charts />

      <div className="flex flex-col lg:flex-row gap-6 w-full">
         <div className="flex-[3] flex flex-col relative w-full overflow-hidden">
             <Filters />
             <TransactionTable />
         </div>
         <div className="flex-1 w-full lg:min-w-[300px]">
             <Insights />
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
