import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard = () => (
  <div className="premium-card p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 rounded-xl bg-surface animate-pulse" />
      <div className="w-24 h-6 rounded bg-surface animate-pulse" />
    </div>
    <div className="w-3/4 h-8 rounded bg-surface animate-pulse mb-2" />
    <div className="w-1/2 h-4 rounded bg-surface animate-pulse" />
  </div>
);

const SkeletonChart = () => (
  <div className="premium-card p-6">
    <div className="w-48 h-6 rounded bg-surface animate-pulse mb-6" />
    <div className="h-64 rounded-xl bg-surface/50 animate-pulse" />
  </div>
);

const SkeletonTable = () => (
  <div className="premium-card p-6">
    <div className="w-48 h-6 rounded bg-surface animate-pulse mb-6" />
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center gap-4 py-4 border-b border-white/5">
        <div className="w-10 h-10 rounded-lg bg-surface animate-pulse" />
        <div className="flex-1">
          <div className="w-32 h-4 rounded bg-surface animate-pulse mb-2" />
          <div className="w-24 h-3 rounded bg-surface animate-pulse" />
        </div>
        <div className="w-20 h-5 rounded bg-surface animate-pulse" />
      </div>
    ))}
  </div>
);

const SkeletonInsights = () => (
  <div className="premium-card p-6">
    <div className="w-40 h-6 rounded bg-surface animate-pulse mb-6" />
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i}>
          <div className="flex justify-between mb-2">
            <div className="w-24 h-4 rounded bg-surface animate-pulse" />
            <div className="w-16 h-4 rounded bg-surface animate-pulse" />
          </div>
          <div className="w-full h-2 rounded-full bg-surface animate-pulse" />
        </div>
      ))}
    </div>
  </div>
);

const LoadingSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-7xl mx-auto space-y-6 pb-8"
    >
      {/* Header Skeleton */}
      <div className="mb-2">
        <div className="w-48 h-8 rounded bg-surface animate-pulse mb-2" />
        <div className="w-64 h-4 rounded bg-surface animate-pulse" />
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonChart />
        <SkeletonChart />
      </div>

      {/* Table and Insights Skeleton */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-[3]">
          <SkeletonTable />
        </div>
        <div className="flex-1">
          <SkeletonInsights />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingSkeleton;
