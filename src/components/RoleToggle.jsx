import React from 'react';
import useStore from '../store/useStore';

const RoleToggle = () => {
  const { role, setRole } = useStore();

  return (
    <div className="flex items-center space-x-2 bg-surface p-1 rounded-lg border border-white/5">
      <button
        onClick={() => setRole('Viewer')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-300 ${
          role === 'Viewer'
            ? 'bg-sky-500/20 text-sky-400 shadow-sm'
            : 'text-text-muted hover:text-text'
        }`}
      >
        Viewer
      </button>
      <button
        onClick={() => setRole('Admin')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-300 ${
          role === 'Admin'
            ? 'bg-orange-500/20 text-orange-400 shadow-sm'
            : 'text-text-muted hover:text-text'
        }`}
      >
        Admin
      </button>
    </div>
  );
};

export default RoleToggle;
